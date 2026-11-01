import { useState, type FormEvent } from 'react';
import { CalendarClock, Search } from 'lucide-react';
import { studyRooms } from '@/data/studyRooms';
import {
  evaluateAvailability,
  validateTimeWindow,
  MAX_DURATION_MINUTES,
  type AvailabilityOutcome,
  type WindowErrors,
} from '@/lib/availability';
import { parseTimeInput } from '@/lib/timeUtils';
import AvailabilityResultPanel from '@/components/AvailabilityResultPanel';

function currentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

const fieldClass =
  'w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-4';
const validFieldClass = `${fieldClass} border-slate-300 focus:border-teal-600 focus:ring-teal-100`;
const invalidFieldClass = `${fieldClass} border-rose-400 focus:border-rose-500 focus:ring-rose-100`;

export default function AvailabilityChecker() {
  const [roomId, setRoomId] = useState(studyRooms[0].id);
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [errors, setErrors] = useState<WindowErrors>({});
  const [outcome, setOutcome] = useState<AvailabilityOutcome | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const start = parseTimeInput(startInput);
    const end = parseTimeInput(endInput);
    const nextErrors: WindowErrors = {};

    if (!start.ok) nextErrors.start = start.error;
    if (!end.ok) nextErrors.end = end.error;

    if (start.ok && end.ok) {
      Object.assign(nextErrors, validateTimeWindow(start.minutes, end.minutes, currentMinutes()));
    }

    setErrors(nextErrors);
    if (!start.ok || !end.ok || Object.keys(nextErrors).length > 0) {
      setOutcome(null);
      return;
    }

    const room = studyRooms.find((candidate) => candidate.id === roomId);
    if (!room) return;

    setOutcome(evaluateAvailability(room, start.minutes, end.minutes));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <CalendarClock className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Check a time slot</h2>
            <p className="text-sm text-slate-500">Pick a room and a time window to see if it is open.</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="room" className="mb-2 block text-sm font-medium text-slate-700">
              Study room
            </label>
            <select
              id="room"
              value={roomId}
              onChange={(event) => {
                setRoomId(event.target.value);
                setOutcome(null);
              }}
              className={validFieldClass}
            >
              {studyRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} ({room.floor}, seats {room.capacity})
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <label htmlFor="start" className="mb-2 block text-sm font-medium text-slate-700">
                Start time
              </label>
              <input
                id="start"
                type="text"
                inputMode="text"
                autoComplete="off"
                placeholder="09:30 or 570"
                value={startInput}
                aria-invalid={Boolean(errors.start)}
                aria-describedby={errors.start ? 'start-error' : 'start-hint'}
                onChange={(event) => {
                  setStartInput(event.target.value);
                  setOutcome(null);
                }}
                className={errors.start ? invalidFieldClass : validFieldClass}
              />
              {errors.start ? (
                <p id="start-error" className="mt-2 text-sm text-rose-600">
                  {errors.start}
                </p>
              ) : (
                <p id="start-hint" className="mt-2 text-sm text-slate-500">
                  HH:MM or minutes since midnight, later than now
                </p>
              )}
            </div>

            <div>
              <label htmlFor="end" className="mb-2 block text-sm font-medium text-slate-700">
                End time
              </label>
              <input
                id="end"
                type="text"
                inputMode="text"
                autoComplete="off"
                placeholder="10:30 or 630"
                value={endInput}
                aria-invalid={Boolean(errors.end)}
                aria-describedby={errors.end ? 'end-error' : 'end-hint'}
                onChange={(event) => {
                  setEndInput(event.target.value);
                  setOutcome(null);
                }}
                className={errors.end ? invalidFieldClass : validFieldClass}
              />
              {errors.end ? (
                <p id="end-error" className="mt-2 text-sm text-rose-600">
                  {errors.end}
                </p>
              ) : (
                <p id="end-hint" className="mt-2 text-sm text-slate-500">
                  After start, up to {MAX_DURATION_MINUTES} minutes long
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200 active:scale-[0.99]"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Check availability
          </button>
        </div>
      </form>

      <div aria-live="polite" className="min-h-[200px]">
        {outcome ? (
          <AvailabilityResultPanel key={`${outcome.room.id}-${outcome.start}-${outcome.end}`} outcome={outcome} />
        ) : (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
            <p className="text-base font-medium text-slate-700">No result yet</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Choose a room and enter a start and end time to see whether it is free.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
