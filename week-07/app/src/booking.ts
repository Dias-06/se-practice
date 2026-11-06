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
  // AC1: 0 <= start < end <= 1440 и start > now
  if (start < 0 || end <= start || end > 1440 || start <= now) {
    return false;
  }

  // AC2: Длительность не более 120 минут
  if (end - start > 120) {
    return false;
  }

  // AC3: Заблокированная комната
  if (blocked) {
    return false;
  }

  // AC4: Перекрытие интервалов (соприкосновение границами разрешено)
  for (const b of bookings) {
    if (start < b.end && b.start < end) {
      return false;
    }
  }

  return true;
}