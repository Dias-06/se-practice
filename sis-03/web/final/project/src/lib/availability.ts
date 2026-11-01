export const MAX_DAY_MINUTES = 1440;
export const MAX_DURATION_MINUTES = 120;

export interface Booking {
  title: string;
  start: number;
  end: number;
}

export interface StudyRoom {
  id: string;
  name: string;
  floor: string;
  capacity: number;
  bookings: Booking[];
  blockedReason: string | null;
}

export interface WindowErrors {
  start?: string;
  end?: string;
}

export interface AvailabilityOutcome {
  room: StudyRoom;
  start: number;
  end: number;
  blockedReason: string | null;
  conflicts: Booking[];
  isAvailable: boolean;
}

export function validateTimeWindow(start: number, end: number, nowMinutes: number): WindowErrors {
  const errors: WindowErrors = {};

  if (end <= start) {
    errors.end = 'End time must be later than the start time.';
    return errors;
  }

  if (start <= nowMinutes) {
    errors.start = 'Start time must be later than the current time.';
  }

  const duration = end - start;
  if (duration > MAX_DURATION_MINUTES) {
    errors.end = `Bookings can be at most ${MAX_DURATION_MINUTES} minutes (2 hours). This window is ${duration} minutes.`;
  }

  return errors;
}

export function evaluateAvailability(room: StudyRoom, start: number, end: number): AvailabilityOutcome {
  const conflicts = room.bookings
    .filter((booking) => start < booking.end && end > booking.start)
    .sort((a, b) => a.start - b.start);

  return {
    room,
    start,
    end,
    blockedReason: room.blockedReason,
    conflicts,
    isAvailable: room.blockedReason === null && conflicts.length === 0,
  };
}
