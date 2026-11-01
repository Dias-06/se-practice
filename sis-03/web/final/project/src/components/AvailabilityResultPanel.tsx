import { CheckCircle2, Clock, DoorOpen, Lock, XCircle } from 'lucide-react';
import type { AvailabilityOutcome } from '@/lib/availability';
import { formatMinutes } from '@/lib/timeUtils';

interface AvailabilityResultPanelProps {
  outcome: AvailabilityOutcome;
}

export default function AvailabilityResultPanel({ outcome }: AvailabilityResultPanelProps) {
  const { room, start, end, blockedReason, conflicts, isAvailable } = outcome;
  const windowLabel = `${formatMinutes(start)} to ${formatMinutes(end)}`;
  const durationLabel = `${end - start} min`;

  return (
    <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <DoorOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{room.name}</h2>
            <p className="text-sm text-slate-500">
              {room.floor} · Seats {room.capacity}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold sm:self-auto ${
            isAvailable ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200' : 'bg-rose-50 text-rose-800 ring-1 ring-rose-200'
          }`}
        >
          {isAvailable ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <XCircle className="h-4 w-4" aria-hidden="true" />
          )}
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <Clock className="h-4 w-4 text-slate-500" aria-hidden="true" />
        <span>
          Requested window: <span className="font-semibold text-slate-900">{windowLabel}</span>
        </span>
        <span className="text-slate-400">·</span>
        <span>{durationLabel}</span>
      </div>

      {blockedReason && (
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-900">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            This room is blocked: <span className="font-medium">{blockedReason}</span>. It cannot be booked right now.
          </p>
        </div>
      )}

      {conflicts.length > 0 && (
        <div className="mt-5">
          <p className="text-base text-slate-700">
            This window overlaps {conflicts.length === 1 ? 'one existing booking' : `${conflicts.length} existing bookings`}:
          </p>
          <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
            {conflicts.map((booking) => (
              <li key={`${booking.start}-${booking.end}`} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3">
                <span className="text-sm font-medium text-slate-900">{booking.title}</span>
                <span className="shrink-0 text-sm tabular-nums text-rose-700">
                  {formatMinutes(booking.start)} to {formatMinutes(booking.end)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAvailable && (
        <p className="mt-5 text-base text-slate-700">The room is open and free for the whole requested window.</p>
      )}

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h3 className="text-sm font-semibold text-slate-900">Full schedule for this room</h3>
        {room.bookings.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No bookings yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {room.bookings.map((booking) => {
              const overlaps = conflicts.includes(booking);
              return (
                <li
                  key={`${booking.start}-${booking.end}`}
                  className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-lg px-3 py-2 text-sm ${
                    overlaps ? 'bg-rose-50 text-rose-800' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="font-medium">{booking.title}</span>
                  <span className="shrink-0 tabular-nums">
                    {formatMinutes(booking.start)} to {formatMinutes(booking.end)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
