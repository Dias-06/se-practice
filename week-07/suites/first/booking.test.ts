
import { describe, expect, it } from 'vitest';
import { canBook } from './booking';

const createDefaultFixture = () => ({
  now: 540,
  blocked: false,
  bookings: [{ start: 600, end: 660 }],
});

describe('canBook', () => {
  describe('AC1 — Invalid time intervals', () => {
    it.each([
      { name: 'starts at current time', start: 540, end: 570 },
      { name: 'zero duration', start: 720, end: 720 },
      { name: 'reversed interval', start: 750, end: 720 },
      { name: 'ends after midnight boundary', start: 1380, end: 1441 },
      { name: 'starts at midnight', start: 0, end: 60 },
    ])('$name -> false', ({ start, end }) => {
      const fixture = createDefaultFixture();

      expect(canBook({
        ...fixture,
        start,
        end,
      })).toBe(false);
    });
  });

  describe('AC2 — Maximum booking duration', () => {
    it('allows a booking lasting exactly 120 minutes', () => {
      const fixture = createDefaultFixture();

      expect(canBook({
        ...fixture,
        start: 720,
        end: 840,
      })).toBe(true);
    });

    it('rejects a booking lasting 121 minutes', () => {
      const fixture = createDefaultFixture();

      expect(canBook({
        ...fixture,
        start: 720,
        end: 841,
      })).toBe(false);
    });
  });

  describe('AC3 — Blocked availability', () => {
    it('rejects a booking when the time slot is blocked', () => {
      const fixture = createDefaultFixture();

      expect(canBook({
        ...fixture,
        start: 660,
        end: 720,
        blocked: true,
      })).toBe(false);
    });
  });

  describe('AC4 — Booking overlap detection', () => {
    it.each([
      {
        name: 'touching after an existing booking',
        start: 660,
        end: 720,
        expected: true,
      },
      {
        name: 'touching before an existing booking',
        start: 570,
        end: 600,
        expected: true,
      },
      {
        name: 'partially overlaps an existing booking',
        start: 630,
        end: 690,
        expected: false,
      },
      {
        name: 'contains an existing booking',
        start: 570,
        end: 690,
        expected: false,
      },
      {
        name: 'is inside an existing booking',
        start: 615,
        end: 645,
        expected: false,
      },
      {
        name: 'is identical to an existing booking',
        start: 600,
        end: 660,
        expected: false,
      },
      {
        name: 'has no conflicting bookings',
        start: 630,
        end: 690,
        bookings: [],
        expected: true,
      },
      {
        name: 'touches two existing bookings',
        start: 660,
        end: 720,
        bookings: [
          { start: 600, end: 660 },
          { start: 720, end: 780 },
        ],
        expected: true,
      },
    ])('$name -> $expected', ({
      start,
      end,
      bookings,
      expected,
    }) => {
      const fixture = createDefaultFixture();

      expect(canBook({
        ...fixture,
        start,
        end,
        bookings: bookings ?? fixture.bookings,
      })).toBe(expected);
    });
  });

  describe('AC5 — Booking data remains unchanged', () => {
    it('allows an available request without modifying bookings', () => {
      const fixture = createDefaultFixture();

      const bookingsBefore = fixture.bookings.map(booking => ({
        ...booking,
      }));

      const result = canBook({
        ...fixture,
        start: 660,
        end: 720,
      });

      expect(result).toBe(true);
      expect(fixture.bookings).toEqual(bookingsBefore);
    });
  });
});
