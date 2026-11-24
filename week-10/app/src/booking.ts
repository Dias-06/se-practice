const MAX_DURATION_MINUTES = 120;
const MINUTES_PER_DAY = 1440;

type Interval = { start: number; end: number };

function hasFiniteTimes(start: number, end: number, now: number): boolean {
  return Number.isFinite(start) && Number.isFinite(end) && Number.isFinite(now);
}

function isValidWindow(start: number, end: number, now: number): boolean {
  return (
    hasFiniteTimes(start, end, now) &&
    start >= 0 &&
    end > start &&
    end <= MINUTES_PER_DAY &&
    start > now
  );
}

function withinMaxDuration(start: number, end: number): boolean {
  return end - start <= MAX_DURATION_MINUTES;
}

function overlapsAny(start: number, end: number, bookings: Interval[]): boolean {
  return bookings.some((b) => start < b.end && b.start < end);
}

export function canBook({
  start,
  end,
  now,
  blocked,
  bookings,
}: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: Array<{ start: number; end: number }>;
}): boolean {
  return (
    isValidWindow(start, end, now) &&
    withinMaxDuration(start, end) &&
    !blocked &&
    !overlapsAny(start, end, bookings)
  );
}