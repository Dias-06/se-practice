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
  
  if (start < 0 || end <= start || end > 1440 || start <= now) {
    return false;
  }

  if (end - start > 120) {
    return false;
  }

  if (blocked) {
    return false;
  }

 
  for (const b of bookings) {
    if (start < b.end && b.start < end) {
      return false;
    }
  }

  return true;
}