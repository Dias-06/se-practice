import { test, expect } from 'vitest';
import { canBook } from './booking';

test('starts at current time', () => {
  expect(canBook({ start: 540, end: 570, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('zero duration', () => {
  expect(canBook({ start: 720, end: 720, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('reversed interval', () => {
  expect(canBook({ start: 750, end: 720, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('ends after midnight boundary', () => {
  expect(canBook({ start: 1380, end: 1441, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('starts at midnight', () => {
  expect(canBook({ start: 0, end: 60, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('allows a booking lasting exactly 120 minutes', () => {
  expect(canBook({ start: 720, end: 840, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(true);
});

test('rejects a booking lasting 121 minutes', () => {
  expect(canBook({ start: 720, end: 841, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('rejects a booking when the time slot is blocked', () => {
  expect(canBook({ start: 660, end: 720, now: 540, blocked: true, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('touching after an existing booking', () => {
  expect(canBook({ start: 660, end: 720, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(true);
});

test('touching before an existing booking', () => {
  expect(canBook({ start: 570, end: 600, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(true);
});

test('partially overlaps an existing booking', () => {
  expect(canBook({ start: 630, end: 690, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('contains an existing booking', () => {
  expect(canBook({ start: 570, end: 690, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('is inside an existing booking', () => {
  expect(canBook({ start: 615, end: 645, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('is identical to an existing booking', () => {
  expect(canBook({ start: 600, end: 660, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] })).toBe(false);
});

test('has no conflicting bookings', () => {
  expect(canBook({ start: 630, end: 690, now: 540, blocked: false, bookings: [] })).toBe(true);
});

test('allows an available request without modifying bookings', () => {
  const bookings = [{ start: 600, end: 660 }];
  const original = structuredClone(bookings);
  const result = canBook({ start: 660, end: 720, now: 540, blocked: false, bookings });
  expect(result).toBe(true);
  expect(bookings).toEqual(original);
});

test('touches two existing bookings', () => {
  const bookings = [{ start: 600, end: 660 }, { start: 720, end: 780 }];
  expect(canBook({ start: 660, end: 720, now: 540, blocked: false, bookings })).toBe(true);
});