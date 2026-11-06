import { test, expect } from 'vitest';
import { canBook } from './booking';

test('T01 AC4: touching after existing booking', () => {
  const result = canBook({ start: 660, end: 720, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(true);
});

test('T02 AC1: starts at current time', () => {
  const result = canBook({ start: 540, end: 570, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T03 AC1: zero duration interval', () => {
  const result = canBook({ start: 720, end: 720, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T04 AC1: reversed start and end time', () => {
  const result = canBook({ start: 750, end: 720, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T05 AC1: ends after midnight boundary', () => {
  const result = canBook({ start: 1380, end: 1441, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T06 AC2: maximum booking duration of 120 minutes', () => {
  const result = canBook({ start: 720, end: 840, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(true);
});

test('T07 AC2: duration of 121 minutes exceeding maximum', () => {
  const result = canBook({ start: 720, end: 841, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T08 AC4: touching before existing booking', () => {
  const result = canBook({ start: 570, end: 600, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(true);
});

test('T09 AC4: partial overlap with existing booking', () => {
  const result = canBook({ start: 630, end: 690, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T10 AC4: candidate interval fully contains existing booking', () => {
  const result = canBook({ start: 570, end: 690, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T11 AC4: candidate interval lies entirely inside existing booking', () => {
  const result = canBook({ start: 615, end: 645, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T12 AC4: candidate interval identical to existing booking', () => {
  const result = canBook({ start: 600, end: 660, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T13 AC3: blocked room availability check', () => {
  const result = canBook({ start: 660, end: 720, now: 540, blocked: true, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('T14 AC4: availability request with empty bookings list', () => {
  const result = canBook({ start: 630, end: 690, now: 540, blocked: false, bookings: [] });
  expect(result).toBe(true);
});

test('AC5: booking data remains unchanged after call', () => {
  const bookings = [{ start: 600, end: 660 }];
  const originalCopy = structuredClone(bookings);
  const result = canBook({ start: 660, end: 720, now: 540, blocked: false, bookings });
  expect(result).toBe(true);
  expect(bookings).toEqual(originalCopy);
});

test('X1 AC1: start at midnight with past now time', () => {
  const result = canBook({ start: 0, end: 60, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] });
  expect(result).toBe(false);
});

test('X2 AC4: slot touching two existing bookings on both boundaries', () => {
  const bookings = [
    { start: 600, end: 660 },
    { start: 720, end: 780 }
  ];
  const result = canBook({ start: 660, end: 720, now: 540, blocked: false, bookings });
  expect(result).toBe(true);
});