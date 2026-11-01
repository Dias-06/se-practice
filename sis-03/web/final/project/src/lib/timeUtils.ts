export const MINUTES_PER_DAY = 24 * 60;

export type ParseResult = { ok: true; minutes: number } | { ok: false; error: string };

const CLOCK_PATTERN = /^(\d{1,2}):(\d{2})$/;
const INTEGER_PATTERN = /^\d+$/;

export function parseTimeInput(raw: string): ParseResult {
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Enter a time as minutes (e.g. 570) or HH:MM (e.g. 09:30).' };
  }

  if (INTEGER_PATTERN.test(value)) {
    const minutes = Number(value);
    if (minutes > MINUTES_PER_DAY) {
      return { ok: false, error: 'Minutes must be between 0 and 1440.' };
    }
    return { ok: true, minutes };
  }

  const match = CLOCK_PATTERN.exec(value);
  if (match) {
    const hours = Number(match[1]);
    const mins = Number(match[2]);
    const minutes = hours * 60 + mins;
    if (mins < 60 && minutes <= MINUTES_PER_DAY) {
      return { ok: true, minutes };
    }
    return { ok: false, error: 'Use a time between 00:00 and 24:00.' };
  }

  return { ok: false, error: 'Use whole minutes (e.g. 570) or HH:MM (e.g. 09:30).' };
}

export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
