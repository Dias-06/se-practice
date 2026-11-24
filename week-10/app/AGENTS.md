# AGENTS.md — Smart Campus Room Availability Checker

Instructions for any coding agent working in this project. Read this file before you change
anything, and follow it over any general habit of yours.

## Project

A React + TypeScript page (Vite) that tells a student whether a campus room is free for a
requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
the tests are in `src/booking.test.ts`.

Use one fictional room with synthetic bookings; do not use real KBTU portal data or personal information.

## Acceptance contract

- AC1 Reject start ≥ end and requests in the past.
- AC2 Enforce the maximum allowed duration (120 minutes).
- AC3 Reject a blocked room.
- AC4 Reject overlaps; allow bookings that only touch at endpoints.
- AC5 Return Available / Unavailable without changing booking data.
- AC6 Preserve clear UI feedback on desktop and mobile.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Tests: `npm test`
- Build: `npm run build`

## You may

- Edit files in `src/` within scope; do not weaken tests or add packages without approval.
- Keep everything in-memory: do not add a login page, database, Supabase table, secrets, or `.env` files.

## Before you finish

- Run `npm test` and `npm run build` and verify they pass before proposing acceptance; make sure the page still loads.
- Do not run `npx netlify deploy --prod` or deploy to any external production service.
