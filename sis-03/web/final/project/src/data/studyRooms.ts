import type { StudyRoom } from '@/lib/availability';

export const studyRooms: StudyRoom[] = [
  {
    id: 'library-a',
    name: 'Library Room A',
    floor: 'Level 2',
    capacity: 4,
    blockedReason: null,
    bookings: [
      { title: 'Calculus study group', start: 540, end: 600 },
      { title: 'Thesis review', start: 780, end: 870 },
    ],
  },
  {
    id: 'library-b',
    name: 'Library Room B',
    floor: 'Level 2',
    capacity: 6,
    blockedReason: null,
    bookings: [{ title: 'Debate practice', start: 900, end: 1020 }],
  },
  {
    id: 'science-101',
    name: 'Science Hall 101',
    floor: 'Level 1',
    capacity: 8,
    blockedReason: null,
    bookings: [
      { title: 'Lab report writing', start: 600, end: 720 },
      { title: 'Chemistry tutoring', start: 810, end: 900 },
      { title: 'Project kickoff', start: 1080, end: 1140 },
    ],
  },
  {
    id: 'tech-quiet',
    name: 'Tech Center Quiet Pod',
    floor: 'Level 3',
    capacity: 2,
    blockedReason: 'Out of service for maintenance',
    bookings: [],
  },
];
