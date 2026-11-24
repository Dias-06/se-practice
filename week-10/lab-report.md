# Week 10 — Lab report

**Name: DIas**
**Group: CSCI2208**
**Date: 24.11.2026**

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

|  |  |
| ------ | ------ |
| Assistant I reviewed with (tool) | ChatGPT |
| Exact model (with its version, or not displayed) | GPT-4o |
| Where the assistant read the project (Bolt.new / Claude Code / Cursor / Copilot / chat with pasted files) | chat with pasted files |
| Starting point (week-08 or week-07) | week-08 |
| Baseline commit — the checkpoint of Part 0 | 53313c8 |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer |
| Vitest version (the RUN  v… line of a run) | 1.6.0 |

---

## 2. Task 1 — the baseline

### 2.1 The project's commands

Run each command in `week-10/app/` before any change. **Exists:** `yes` or `no` (is there such a
script, or such a tool in `package.json`?). **Result:** `pass`, `fail`, `missing` or `not run`.

| Command | Exists | Result | Note |
| ------ | ------ | ------ | ------ |
| npx vitest run | yes | pass | 1 passed file, 17 passed tests (533ms) |
| npm test | yes | pass | Runs `vitest run`; 17 passed tests (485ms) |
| npm run test:unit (the test command in AGENTS.md) | no | missing | `Missing script: "test:unit"` in package.json |
| npm run build | yes | pass | Runs `tsc && vite build`; built in 490ms |
| npm run lint | no | missing | `Missing script: "lint"` in package.json |

### 2.2 The baseline test run

The **real** output of `npx vitest run` in `week-10/app/`, before any change:

```text
RUN  v1.6.0 C:/Users/diasm/se-practice/week-10/app

 ✓ src/booking.test.ts (17)
   ✓ T01 AC4: touching after existing booking
   ✓ T02 AC1: starts at current time
   ✓ T03 AC1: zero duration interval
   ✓ T04 AC1: reversed start and end time
   ✓ T05 AC1: ends after midnight boundary
   ✓ T06 AC2: maximum booking duration of 120 minutes
   ✓ T07 AC2: duration of 121 minutes exceeding maximum
   ✓ T08 AC4: touching before existing booking
   ✓ T09 AC4: partial overlap with existing booking
   ✓ T10 AC4: candidate interval fully contains existing booking
   ✓ T11 AC4: candidate interval lies entirely inside existing booking
   ✓ T12 AC4: candidate interval identical to existing booking
   ✓ T13 AC3: blocked room availability check
   ✓ T14 AC4: availability request with empty bookings list
   ✓ AC5: booking data remains unchanged after call
   ✓ X1 AC1: start at midnight with past now time
   ✓ X2 AC4: slot touching two existing bookings on both boundaries

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  16:24:14
   Duration  533ms (transform 47ms, setup 0ms, collect 37ms, tests 3ms, environment 0ms, prepare 163ms)
```

### 2.3 The agent reads the playbook

What you sent, exactly (the Practice #09 prompt):

```text
Read the root AGENTS.md before making changes. Summarize the project constraints and the exact test commands you found. Do not edit anything yet. If you cannot read AGENTS.md, tell me, and I will paste its content. Do not claim that AGENTS.md was automatically loaded.
```

The assistant's answer, pasted unedited:

```text
I can't confirm a root AGENTS.md exists in my environment, and nothing was auto-loaded. Everything below comes from the text you pasted. I haven't edited anything.

Project constraints (from the pasted AGENTS.md)

It is a React + TypeScript (Vite) page. The booking rule lives in src/booking.ts (canBook), the page is src/App.tsx, and the tests are in src/booking.test.ts.
The acceptance contract:
AC1: reject start ≥ end and requests in the past.
AC2: maximum duration of 120 minutes.
AC3: reject a blocked room.
AC4: reject overlaps, with touching at an endpoint counted as an overlap.
AC5: return Available/Unavailable without changing booking data.
It permits editing any file and adding packages if a task needs them. It also allows a Supabase table and a login page if bookings need to persist.
Before finishing, the page must still load, and once the build passes, npx netlify deploy --prod should be run.

Commands

Install: npm install
Dev: npm run dev
Build: npm run build, which runs tsc && vite build.
Tests: AGENTS.md says npm run test:unit, but your package.json has no such script. The real one is npm test, which runs vitest run.

Problems I found, which I'd want you to decide on before I change anything

AC4 contradicts the tests and the code. AGENTS.md says touching counts as an overlap. But T01, T08 and X2 expect touching slots to return true, and canBook uses strict comparisons, so touching is allowed. One side is wrong, and I need to know which.
Wrong test command. npm run test:unit would fail, so I'd use npm test unless you want the script added.
Real KBTU room names and timetable. I can't access the portal, and I won't invent data. You'd need to paste the data.
The deploy step. --prod pushes to production, not a preview, and it conflicts with the "preview" wording. I won't run it without your explicit approval. My sandbox also has no network.
Supabase and login. These are optional, and I'd only add them if you ask.
```

Which rules in its summary are wrong for this project, and how you know:

<!-- Write below this line -->
**Rules in its summary that are wrong for this project:** The summary falsely states that the test command is `npm run test:unit` (which does not exist in `package.json`), claims a database or login may be added if needed, omits `AC4` and `AC6`, and instructs running `netlify deploy --prod`.

---

## 3. Tasks 2–3 — the read-only review and the challenge

### 3.1 The review prompt and the answer

Where it ran, and how you made sure it could not edit:

<!-- Write below this line -->

**Where it ran and how it could not edit:** Ran in ChatGPT (`GPT-4o`) web chat with pasted files (`app/src/booking.ts`, `app/src/App.tsx`, `app/package.json`, `app/AGENTS.md`), so the assistant had no filesystem access and could not edit any files.
What you sent, exactly (the deck's prompt):

```text
Act as a cautious software reviewer. Inspect this Smart Campus Room Availability Checker WITHOUT editing files. Identify risks in correctness, security, privacy, reliability, maintainability, and agent operations. For each risk, cite the exact file/function or missing check, explain the impact, suggest a way to verify it, and state uncertainty. Do not invent test results.
```

The assistant's answer, pasted unedited:

```text
I reviewed only the text you pasted. I executed nothing and edited nothing. I haven't seen tsconfig.json, index.html, main.tsx, a lockfile, the Vite config, or git history. Everything below comes from reading the code, so any "would return X" is my trace, not a run. Severity labels are my judgment. I assume app.tst is a typo for App.tsx.

Correctness

C1. AC4 contradicts the code and tests (High)

Where: AGENTS.md AC4 says touching counts as overlap. canBook uses start < b.end && b.start < end, which allows touching. T01, T08 and X2 expect touching to be true.
Impact: An agent obeying AGENTS.md would change the comparison and break three tests, or "fix" the tests instead.
Verify: Run npm test before any change. By my reading, T01, T08 and X2 should pass today.
Uncertainty: Which side is right is a product decision. Allowing back-to-back bookings is the common convention, but the written contract says otherwise.

C2. Non-numeric input passes validation (High)

Where: the guard at the top of canBook. Comparisons with NaN are all false, so start: NaN (or end: NaN, or now: NaN) skips every rejection. The overlap loop also never rejects, so my trace returns true.
Impact: Garbage input is reported as "Available." App.tsx guards empty fields, but canBook is a public function with no validation of its own.
Verify: A throwaway test calling canBook with NaN and Infinity values, once edits are allowed.
Uncertainty: Only the current caller is known to be safe.

C3. room.blocked is never used (Medium)

Where: ROOMS[].blocked is defined, but check() passes the blocked checkbox state instead.
Impact: A room's real blocked status is ignored, and the user can un-block any room.
Verify: Set blocked: true on a room in data and check whether the page changes. By reading, it won't.
Uncertainty: The checkbox may be a deliberate demo control.

C4. check() shows an error and a result together (Medium)

Where: App.tsx, the !(s < e) branch sets the error but has no return, so canBook still runs.
Impact: The page can show "The end time must be after the start time" and "Unavailable" at once. The validation also duplicates AC1 logic from canBook.
Verify: Manually enter end earlier than start and click Check.

C5. Single-day model, user-supplied clock (Medium)

Where: all times are minutes since midnight, with no date or timezone, and now comes from a text input.
Impact: A booking for tomorrow morning is rejected as "in the past" if the current time is later. DST and timezones aren't representable.
Uncertainty: This may be fine for a teaching exercise.

C6. Stale result after inputs change (Low–Medium)

Where: result is only reset inside check().
Impact: "Available" stays on screen after you change the room or times, so it can describe a different request.
Verify: Manual UI check.

C7. Spec and test gaps (Low–Medium)

Where: booking_test has no case for end === 1440 (the UI's "Ends at 24:00" sends it) or for start === now + 1, which is the other side of the start <= now boundary. AGENTS.md has no midnight rule, yet T05 and X1 are labeled AC1. X1 actually tests "in the past," not midnight. "Past" in AC1 doesn't say whether start == now is rejected, though T02 assumes it is.
Verify: Add those cases when edits are allowed, after the rules are agreed.
Security

S1. Client-side authority if persistence is added (High later, none today)

Where: AGENTS.md "You may" allows a Supabase table. now, blocked and bookings all originate in the browser.
Impact: A client-only check can be bypassed. A check-then-insert flow can also double-book under concurrency.
Verify: Design review. Later, test two simultaneous inserts.
Uncertainty: There is no backend yet, so there is no exposure today.

S2. Unreviewed dependencies and unpinned tooling (Medium)

Where: AGENTS.md "Add packages when a task needs them" and npx netlify deploy. package.json uses caret ranges and doesn't list netlify-cli.
Impact: npx fetches and runs whatever is current. The package list can grow without review.
Verify: Check whether a lockfile is committed, then run npm audit and npm ls.

S3. Agent-built login and keys (Medium)

Where: AGENTS.md "add a small Supabase table and a login page."
Impact: Auth is easy to get subtly wrong (row-level security, key exposure) and is far beyond the stated project.
Verify: Require a separate task with explicit review.
Privacy

P1. Real KBTU timetable plus production deploy (High)

Where: AGENTS.md "use real room names and the real timetable from the KBTU portal," combined with npx netlify deploy --prod.
Impact: Data from an institutional portal could end up on a public URL. It might also require credentials or violate the portal's terms.
Verify: Check what the portal exposes, whether it's public, and the Netlify site's visibility settings.
Uncertainty: I don't know what the portal contains. Synthetic data avoids the problem entirely.

P2. Future user identity (Low now)

Where: bookings currently have no owner field. Adding login would introduce one.
Impact: Personal data would be introduced without any retention or access rules.
Reliability

R1. Test script mismatch and weak gates (Medium)

Where: AGENTS.md says npm run test:unit, but package.json only has test. There is no lint or standalone typecheck script. build runs tsc, and the test uses structuredClone, whose typing depends on the unseen tsconfig.
Impact: An agent gets a failing command on its first try, and "tests passed" can't be established reliably.
Verify: Run npm test, npx tsc --noEmit and npm run build separately and record real output.

R2. "Page still loads" can't be checked (Medium)

Where: AGENTS.md "Before you finish."
Impact: App.tsx has no component tests, so the UI bugs above (C3, C4, C6) would never be caught.
Verify: Run npm run dev and do a manual smoke pass, or add a component test later.
Maintainability

M1. Drift and duplication (Low–Medium)

Where: the App.tsx header comment still describes extraction as a future task. The numbers 120 and 1440 are magic constants in canBook, and 1440 is repeated in App.tsx. Validation is split between App.tsx and canBook. Tests repeat the same fixture inline.
Impact: Rules can change in one place and not the other.
Agent operations

A1. "Preview" is actually production (High)

Where: AGENTS.md "Before you finish."
Impact: --prod publishes publicly. It needs credentials and network access, and it triggers automatically once the build passes.
Verify: Don't run it. Ask where the Netlify site points and who can see it.

A2. No precedence or stop-and-ask rule (High)

Where: AGENTS.md says to follow it "over any general habit of yours," but gives no rule for conflicts (C1, R1) and no ban on weakening tests to make them pass.
Impact: An agent can silently pick a side.

A3. Broad permissions, no approval gates (Medium)

Where: AGENTS.md "Edit any file," "Add packages."
Impact: No protected files, no secrets guidance, and no confirmation for installs or network actions.

A4. Pressure to fabricate (Medium)

Where: "real room names and the real timetable."
Impact: An agent without portal access has an incentive to invent plausible data, so the page would present made-up data as real.
Suggested order of work
Decide C1, meaning which AC4 behavior you want.
Remove or gate the production deploy line and the real-portal-data line (A1, P1).
Run the three commands from R1 and record real results.
Then fix C2, C3 and C4, and add the missing tests from C7.
```

### 3.2 Challenging the AI's claims

At least **five** claims from the answer, across at least **three** categories. **What I
inspected** is what you opened or ran yourself. **Label:** `confirmed`, `plausible` or
`unsupported`.

| # | The AI's claim (short) | Category | What I inspected | Label | Why |
| --- | --- | --- | --- | --- | --- |
| 1 | `AGENTS.md` AC4 says touching counts as overlap, whereas `canBook` and tests `T01`, `T08`, `X2` allow touching endpoints. | Correctness | `AGENTS.md` (AC4), `src/booking.ts:24`, `src/booking.test.ts` (T01, T08, X2) | confirmed | `AGENTS.md` states touching at an endpoint counts as overlap, while `src/booking.ts` uses strict `start < b.end && b.start < end` and T01/T08/X2 expect `true`. |
| 2 | `NaN` or `Infinity` inputs in `canBook` bypass all `<`/`<=`/`>` comparisons and return `true` ("Available"). | Correctness | `src/booking.ts:13-29` | confirmed | All numeric comparisons (`start < 0`, `end <= start`, `end > 1440`, `start <= now`, `end - start > 120`, overlap loop) evaluate to `false` for `NaN`, so `canBook` returns `true`. |
| 3 | In `App.tsx`, `check()` sets an error when `!(s < e)` without returning, so `canBook` still executes and shows both error and result. | Correctness | `src/App.tsx:37-49` | confirmed | `if (!(s < e)) { setError(...); }` has no `return`, so execution continues into `canBook(...)` and calls `setResult(false)`, displaying error and result together. |
| 4 | `AGENTS.md` instructs running `npx netlify deploy --prod` after build and fetching real KBTU portal timetables. | Agent operations | `AGENTS.md` ("Project" and "Before you finish") | confirmed | Both directives appear verbatim in `AGENTS.md`, contradicting the project scope (fictional room, no external production deployment). |
| 5 | `AGENTS.md` specifies `npm run test:unit`, which does not exist in `package.json`, and `structuredClone` typing may fail under unseen `tsconfig.json`. | Reliability | `package.json:6-10`, `src/booking.test.ts:74`, `tsconfig.json` | unsupported | The script mismatch (`npm run test:unit` missing) is real, but the claim that `structuredClone` typing is uncertain/broken is unsupported because `npm run build` (`tsc && vite build`) already compiled cleanly in 490ms. |
| 6 | `package.json` uses caret ranges and lacks `netlify-cli`, and a lockfile might not be committed. | Security | `package.json:12-23`, `week-10/app/package-lock.json` | plausible | Caret ranges (`^18.3.1`, etc.) and absence of `netlify-cli` are real in `package.json`, though `package-lock.json` is present and committed in `week-10/app/`. |

---

## 4. Task 4 — the risk register

### 4.1 The register

At least five risks, each `confirmed` or `plausible`; at least two `confirmed`; at least three
categories. **Score = L × I.** **Component** is a path inside `app/` or `missing: <check>`.

| ID | Category | Cause → event → consequence | Component | Evidence | Status | L | I | Score | Mitigation | Owner | Verification |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| R1 | Agent operations | `AGENTS.md` contradicts AC4, names a missing `npm run test:unit`, permits Supabase/login, and mandates `npx netlify deploy --prod` → an autonomous agent breaks tests, adds out-of-scope auth/DB, or deploys to production → broken suite and unauthorized public deployment. | `AGENTS.md` | `AGENTS.md` lines 9, 16, 21, 26, 30; `npm run test:unit` missing in `package.json` | confirmed | 3 | 3 | 9 | Patch `AGENTS.md` minimally to align AC1–AC6, fix the test command to `npm test`, and forbid DB/login/secrets/deployments. | Dias | `git diff app/AGENTS.md` and `check_audit.py` checks `A1–A3`, `C1–C6` |
| R2 | Correctness | `canBook` lacks finite-number validation (`Number.isFinite`) → `NaN` or `Infinity` arguments make every comparison evaluate to `false` → `canBook` returns `true` ("Available") for invalid non-finite inputs. | `src/booking.ts` (`canBook`) | `src/booking.ts:13-29` (`start < 0`, `end <= start`, ... evaluate to `false` on `NaN`) | confirmed | 2 | 3 | 6 | Refactor availability validation into a pure module (`src/booking.ts`) with an explicit `Number.isFinite` guard. | Dias | `npm test` with new `NaN` / `Infinity` test cases |
| R3 | Correctness | `App.tsx` `check()` does not `return` when `!(s < e)` → `canBook` still runs on reversed/equal times → the UI displays both the validation error text and the "Unavailable" result simultaneously. | `src/App.tsx` (`check`) | `src/App.tsx:37-49` (`if (!(s < e)) { setError(...); }` without `return`) | confirmed | 2 | 2 | 4 | Add an early `return` in `check()` when `!(s < e)` (or clear the result cleanly) and verify manually in the UI. | Dias | Manual UI check on desktop and mobile widths |
| R4 | Reliability | The repository lacks a CI workflow (`.github/workflows/`), pre-commit hooks, and an ESLint script (`npm run lint` missing) → broken builds or style/type regressions are not caught automatically before push → defective commits reach PRs. | missing: CI workflow and lint script | `npm run lint` failed (`Missing script: "lint"`); no `.github/` or `.husky/` in `week-10/app/` | confirmed | 2 | 2 | 4 | Enforce manual `npm test` and `npm run build` gates in `AGENTS.md` before acceptance. | Dias | Baseline run and final `npm test` + `npm run build` output |
| R5 | Privacy | `AGENTS.md` instructs agents to fetch real room names and timetables from the KBTU portal and deploy publicly → real institutional schedule data could be scraped or fabricated and published → privacy/policy violation. | `AGENTS.md` | `AGENTS.md` line 9 ("use real room names and the real timetable from the KBTU portal") | confirmed | 2 | 3 | 6 | Replace the directive in `AGENTS.md` with an explicit rule requiring one fictional room and zero real personal/institutional data. | Dias | Diff review of `app/AGENTS.md` (`C1`, `C4`) |
| R6 | Correctness | `App.tsx` passes checkbox `blocked` directly to `canBook` instead of combining with `room.blocked` → user unchecking box could bypass room block state → incorrect availability shown. | `src/App.tsx` | `src/App.tsx` passes `blocked` state directly to `canBook` without checking `room.blocked` | plausible | 2 | 2 | 4 | Combine `room.blocked` and `blocked` with logical OR in `App.tsx`. | Dias | Manual UI check with blocked room |
### 4.2 The top two for action

Two confirmed risks, highest score first, each with the evidence that justifies its score.

1. **R? R1 — Score 9 ($3 \times 3$, confirmed): AGENTS.md contains five direct conflicts with the project contract and package.json (wrong AC4 touching rule, non-existent npm run test:unit, permission to add Supabase/login, instruction to use real KBTU portal data, and mandatory npx netlify deploy --prod). Any agent obeying AGENTS.md would immediately break existing tests or violate scope.** —
2. **R? R2 — Score 6 ($2 \times 3$, confirmed): canBook in src/booking.ts performs no finite-number check (Number.isFinite), so passing NaN or Infinity causes every guard comparison to evaluate to false and returns true ("Available") for invalid inputs.** —

---

## 5. Task 5 — the agent-readiness audit

### 5.1 The rows

`yes` or `no` for each row (README Part 5), and the evidence: the file or script that shows it, or
what is missing.

| Row | What | yes / no | Evidence |
| --- | --- | --- | --- |
| 1a | Formatter | no | No `.prettierrc` or `prettier` dependency/script in `week-10/app/package.json`. |
| 1b | Linter | no | No ESLint config or `eslint` dependency/script in `week-10/app/package.json` (`npm run lint` missing). |
| 1c | Type checks | yes | `week-10/app/tsconfig.json` exists and `typescript` (`^5.5.3`) is in `package.json` (`npm run build` runs `tsc`). |
| 1d | Unit tests | yes | `week-10/app/src/booking.test.ts` (17 tests) and `vitest` (`^1.6.0`) in `package.json`. |
| 1e | Pinned dependencies (lockfile) | yes | `week-10/app/package-lock.json` is present and committed. |
| 2a | `.env.example` | no | No `.env.example` file exists in `week-10/app/` (the app uses no environment variables). |
| 2b | Architecture notes | no | No `README.md` or module architecture document exists inside `week-10/app/`. |
| 2c | `AGENTS.md` | yes | `week-10/app/AGENTS.md` exists (copied from `provided/AGENTS.md` in Part 0). |
| 3a | CI | no | No `.github/workflows/` CI workflow exists in the repository. |
| 3b | Pre-commit hooks | no | No `.husky/`, `lint-staged`, `simple-git-hooks`, or `.pre-commit-config.yaml` exists. |
| 3c | Integration checks | no | Only unit tests for `canBook` exist in `src/booking.test.ts`; no component or integration tests for `App.tsx`. |
| 3d | Reviewable evidence | no | No CI logs, PR template, or automated test-artifact attachment rules exist in `week-10/app/`. |

### 5.2 The level and the gaps

**Level:** 0 (Baseline not cleared).

Level 1 (Baseline) needs at least 4 of 5 rows (80%). `app/` has 3 of 5 (60%): `1c` Type checks, `1d` Unit tests and `1e` Pinned dependencies are `yes`, while `1a` Formatter and `1b` Linter are `no`. Since 60% is below 80%, the repository stays at Level 0 even though `2c` (`AGENTS.md`) is present.

**Missing evidence for the next level:**

<!-- Name the rows and what would have to exist. Then one or two lines on the README's accuracy
     and the folder layout. -->
- `1a` Formatter: a `.prettierrc` and a `prettier` dependency/script in `week-10/app/package.json`.
- `1b` Linter: an ESLint config and an `eslint` dependency with an `npm run lint` script.
- `2a` `.env.example`: an `.env.example` file in `week-10/app/`.
- `2b` Architecture notes: a `README.md` or module architecture document inside `week-10/app/`.
- `3a` CI: a workflow in `.github/workflows/`.
- `3b` Pre-commit hooks: `.husky/`, `lint-staged` or `.pre-commit-config.yaml`.
- `3c` Integration checks: component or integration tests for `App.tsx`.
- `3d` Reviewable evidence: a PR template or CI logs that attach test results.
- README and layout: `week-10/app/` has no `README.md` of its own (see `2b`), but the source layout (`src/App.tsx`, `src/booking.ts`, `src/booking.test.ts`, `package.json`, `tsconfig.json`, `vite.config.ts`) is clean and clear.

---

## 6. Task 6 — the agent playbook

### 6.1 The playbook prompt and the answer

What you sent, exactly (the deck's prompt):

```text
Review AGENTS.md and project documentation only. Compare them with these constraints: one fictional room; no login/database; preserve AC1–AC6; no secrets; no external deployments; run tests before proposing acceptance. Report missing or conflicting rules. Draft a minimal patch to AGENTS.md, but wait for my approval before applying it.
```

The assistant's answer, pasted unedited:

```text
I reviewed only the pasted text of AGENTS.md and package.json, and I haven't edited anything. No README or other docs were pasted, so I can't speak for any that exist.

Gaps and conflicts against your constraints
Constraint	AGENTS.md today	Status
One fictional room	Says to use real room names and the real KBTU timetable	Conflict
No login/database	"You may" allows a Supabase table and a login page	Conflict
Preserve AC1–AC6	Lists only AC1–AC5, has no AC6, and has no rule against weakening tests	Missing, plus the existing AC4 conflict
No secrets	Says nothing about secrets, tokens, or .env files	Missing
No external deployments	Requires npx netlify deploy --prod after the build, and calls it a "preview"	Conflict
Run tests before proposing acceptance	Wrong test command (npm run test:unit does not exist in package.json), and "Before you finish" requires only that the page loads and the build passes	Conflict and missing
AC4: AGENTS.md says touching counts as an overlap, but your tests T01, T08 and X2 expect touching to be allowed. I haven't touched AC4 in the patch because it needs your decision.
No stop-and-ask rule: nothing says what an agent should do when a rule and a test disagree.
Outside the docs-only scope: the pasted App.tsx defines two rooms, so it would also need changing for the one-room constraint. I haven't proposed a code change.
Proposed minimal patch (not applied)
diff
--- AGENTS.md
+++ AGENTS.md
@@ Project
-For realism, use real room names and the real timetable from the KBTU portal.
+Use exactly one fictional room, with invented name and bookings. Do not use real
+room names, timetables, or any data from the KBTU portal or other external sources.
 
@@ Commands
-- Tests: `npm run test:unit`
+- Tests: `npm test` (runs `vitest run`)
 
@@ You may
 - Edit any file in the project.
 - Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+
+## You must not
+
+- Add a login, a database, a backend, or any persistence. Bookings stay in-memory.
+- Add, read, print, or commit secrets (API keys, tokens, `.env` files, credentials).
+- Deploy or publish anywhere. Do not run `netlify`, `npx netlify deploy`, or any
+  other external deployment command.
+- Weaken, delete, skip, or rewrite tests to make them pass. Preserve AC1–AC6.
+- Resolve a conflict between this file, the tests, and the code yourself. Stop and
+  ask the user.
 
 ## Before you finish
 
 - Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run `npm test` and `npm run build`, and report the actual output.
+- Do not propose acceptance until the tests have been run and pass. If you cannot
+  run them, say so instead of claiming they passed.
Two things I need before this is complete
What is AC6? I won't invent it. Once you tell me, I'll add it to the contract list.
Which AC4 behavior do you want? Either touching counts as an overlap, as AGENTS.md says now, or touching is allowed, as the code and tests do now. Whichever you choose, I'd update the other side in a follow-up patch.

I've changed nothing, and I'll wait for your approval, or your edits to the draft, before applying anything.
```

### 6.2 Findings and my decisions

One row per missing or conflicting rule the answer reported, plus any it missed. **Decision:**
`approve`, `reject` or `modify`.

| # | Rule or line in AGENTS.md | Missing / conflicting | Decision | Why |
| --- | --- | --- | --- | --- |
| 1 | "For realism, use real room names and the real timetable from the KBTU portal." | Conflicting with C1 (one fictional room, no real data) | approve | Replaced with a requirement for one fictional room with synthetic bookings and no real portal or personal data. |
| 2 | "You may: If bookings need to persist, add a small Supabase table and a login page." | Conflicting with C2 (no login or database) | approve | Removed the permission and explicitly prohibited login, database, and persistence. |
| 3 | AC4: "touching at an endpoint counts as an overlap" | Conflicting with C3 (preserve AC1–AC6): contradicts `canBook` and tests T01, T08, X2 | modify | AC4 updated to match the code and tests: "allow bookings that only touch at endpoints". |
| 4 | Acceptance contract lists only AC1–AC5 | Missing AC6 (C3) | modify | Added AC6: "Preserve clear UI feedback on desktop and mobile." |
| 5 | No rule about secrets, API keys, or `.env` files | Missing (C4: no secrets) | modify | Added a prohibition on secrets and `.env` files inside the existing `## You may` section, without a new `## You must not` heading, to preserve the original headings (A2). |
| 6 | "When the build passes, publish a preview with `npx netlify deploy --prod`" | Conflicting with C5 (no external deployments) | approve | Replaced with an explicit prohibition on `npx netlify deploy --prod` and any other external production deployment. |
| 7 | "Tests: `npm run test:unit`"; "Before you finish" does not require running tests | Conflicting and missing (A3, C6: valid commands, run tests first) | approve | Changed the test command to `npm test` (verified in `package.json`). Passing `npm test` and `npm run build` is required before proposing acceptance. |

### 6.3 The approved patch

`git diff app/AGENTS.md`, after you applied only what you approved:

```text
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..5c1cd5a 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,30 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.

-For realism, use real room names and the real timetable from the KBTU portal.
+Use one fictional room with synthetic bookings; do not use real KBTU portal data or personal information.
```

---

## 7. Task 7 — verify safely

### 7.1 The regression test fails before the mitigation

The risk it covers: **R2**. The real run, with the new test failing:

```text
❯ app/src/booking.test.ts (18 tests | 1 failed) 10ms
   ✓ T01 AC4: touching after existing booking 1ms
   ✓ T02 AC1: starts at current time 0ms
   ✓ T03 AC1: zero duration interval 0ms
   ✓ T04 AC1: reversed start and end time 0ms
   ✓ T05 AC1: ends after midnight boundary 0ms
   ✓ T06 AC2: maximum booking duration of 120 minutes 0ms
   ✓ T07 AC2: duration of 121 minutes exceeding maximum 0ms
   ✓ T08 AC4: touching before existing booking 0ms
   ✓ T09 AC4: partial overlap with existing booking 0ms
   ✓ T10 AC4: candidate interval fully contains existing booking 0ms
   ✓ T11 AC4: candidate interval lies entirely inside existing booking 0ms
   ✓ T12 AC4: candidate interval identical to existing booking 0ms
   ✓ T13 AC3: blocked room availability check 0ms
   ✓ T14 AC4: availability request with empty bookings list 0ms
   ✓ AC5: booking data remains unchanged after call 1ms
   ✓ X1 AC1: start at midnight with past now time 0ms
   ✓ X2 AC4: slot touching two existing bookings on both boundaries 0ms
   × R2 AC1: non-finite inputs (NaN and Infinity) are rejected 4ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  app/src/booking.test.ts > R2 AC1: non-finite inputs (NaN and Infinity) are rejected
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ app/src/booking.test.ts:97:92
     95|
     96| test('R2 AC1: non-finite inputs (NaN and Infinity) are rejected', () => {
     97|   expect(canBook({ start: Number.NaN, end: 720, now: 540, blocked: false, bookings: [] })).toBe(false);
       |                                                                                            ^
     98|   expect(canBook({ start: 660, end: Number.NaN, now: 540, blocked: false, bookings: [] })).toBe(false);
     99|   expect(canBook({ start: 660, end: 720, now: Number.NaN, blocked: false, bookings: [] })).toBe(false);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 17 passed (18)
   Start at  17:20:10
   Duration  232ms (transform 52%, import 26%, tests 15%, worker 7%)

```

### 7.2 The manual UI check

| View | Width | What I checked | Result | Screenshot |
| --- | --- | --- | --- | --- |
| Desktop | 1280px | Room selector, time inputs, checkboxes, Check availability button, Available feedback, and existing bookings list | Clear UI feedback (AC6), no clipping or overlap | `evidence/ui-desktop.png` |
| Mobile | 375px | Responsive layout of all inputs, labels, button, and result text in phone viewport | Clean wrapping, no horizontal overflow or overlapping elements | `evidence/ui-mobile.png` |

### 7.3 Tests and checks I did not run

<!-- Name each one and why. "None" only if it is true. -->
-
npm run lint — script does not exist in week-10/app/package.json (no ESLint configured).

npm run test:unit — script does not exist in week-10/app/package.json (npm test runs vitest run instead).

npx netlify deploy --prod — out of scope and prohibited by the patched AGENTS.md (no external production deployments).

Automated component/E2E tests (React Testing Library / Playwright) — not installed in package.json; UI was verified manually at desktop and mobile widths.
---

## 8. Task 8 — mitigate two risks

### 8.1 The first mitigation

**Risk:** R1

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

```text
```

**Problem → pattern → benefit:**

**What I rejected from the agent's patch, and why: Rejected adding a new `## You must not` heading (to preserve the exact original headings of `provided/AGENTS.md`) and rejected leaving `AC4` and `AC6` incomplete; merged the prohibitions into existing sections and explicitly aligned `AC1–AC6`.**

The diff I approved (`git diff`):

```text
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..5c1cd5a 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,30 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.

-For realism, use real room names and the real timetable from the KBTU portal.
+Use one fictional room with synthetic bookings; do not use real KBTU portal data or personal information.
```

### 8.2 The second mitigation

**Risk:** R2

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

```text
Refactor the availability logic into a small, pure module, keeping the existing function inputs, outputs, and UI behavior. Use a pattern only if the identified design problem justifies it. Do not add new features or dependencies. Show the files you plan to edit before making changes.
```

**Problem → pattern → benefit:** `canBook` mixed magic numbers (`120`, `1440`) and four validation rules in one monolithic body without checking for `NaN` or `Infinity`, allowing non-finite inputs to bypass comparisons and return `true`. Extracting pure helper functions (`hasFiniteTimes`, `isValidWindow`, `withinMaxDuration`, `overlapsAny`) with no unjustified OOP pattern isolates each rule cleanly and rejects non-finite inputs while keeping all 18 tests green.

**What I rejected from the agent's patch, and why:** rejected leaving non-finite inputs unhandled and rejected unnecessary extra class abstractions.

The diff I approved (`git diff`):

```text
diff --git a/week-10/app/src/booking.ts b/week-10/app/src/booking.ts
index bed2435..d2936c0 100644
--- a/week-10/app/src/booking.ts
+++ b/week-10/app/src/booking.ts
@@ -1,3 +1,30 @@
+const MAX_DURATION_MINUTES = 120;
+const MINUTES_PER_DAY = 1440;
+
+type Interval = { start: number; end: number };
+
+function hasFiniteTimes(start: number, end: number, now: number): boolean {
+  return Number.isFinite(start) && Number.isFinite(end) && Number.isFinite(now);
+}
+
+function isValidWindow(start: number, end: number, now: number): boolean {
+  return (
+    hasFiniteTimes(start, end, now) &&
+    start >= 0 &&
+    end > start &&
+    end <= MINUTES_PER_DAY &&
+    start > now
+  );
+}
+
+function withinMaxDuration(start: number, end: number): boolean {
+  return end - start <= MAX_DURATION_MINUTES;
+}
+
+function overlapsAny(start: number, end: number, bookings: Interval[]): boolean {
+  return bookings.some((b) => start < b.end && b.start < end);
+}
+
 export function canBook({
   start,
   end,
@@ -11,25 +38,10 @@ export function canBook({
   blocked: boolean;
   bookings: Array<{ start: number; end: number }>;
 }): boolean {
-
-  if (start < 0 || end <= start || end > 1440 || start <= now) {
-    return false;
-  }
-
-  if (end - start > 120) {
-    return false;
-  }
-
-  if (blocked) {
-    return false;
-  }
-
-
-  for (const b of bookings) {
-    if (start < b.end && b.start < end) {
-      return false;
-    }
-  }
-
-  return true;
+  return (
+    isValidWindow(start, end, now) &&
+    withinMaxDuration(start, end) &&
+    !blocked &&
+    !overlapsAny(start, end, bookings)
+  );
 }
```

### 8.3 The residual risk

| ID | L before | I before | Score before | L after | I after | Score after | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | 3 | 3 | 9 | 1 | 3 | 3 | `app/AGENTS.md` patched and committed; `AC1–AC6`, `npm test`, and bans on DB/login/secrets/deploys verified by `git diff`. |
| R2 | 2 | 3 | 6 | 1 | 2 | 2 | `src/booking.ts` refactored with a `Number.isFinite` guard; regression test `R2 AC1` and all 18 tests pass in `npx vitest run`. |

### 8.4 The final run

The real output of the **full** suite after both mitigations. Every test must pass.

```text
v1.6.0 C:/Users/diasm/se-practice/week-10/app

 ✓ src/booking.test.ts (18)
   ✓ T01 AC4: touching after existing booking
   ✓ T02 AC1: starts at current time
   ✓ T03 AC1: zero duration interval
   ✓ T04 AC1: reversed start and end time
   ✓ T05 AC1: ends after midnight boundary
   ✓ T06 AC2: maximum booking duration of 120 minutes
   ✓ T07 AC2: duration of 121 minutes exceeding maximum
   ✓ T08 AC4: touching before existing booking
   ✓ T09 AC4: partial overlap with existing booking
   ✓ T10 AC4: candidate interval fully contains existing booking
   ✓ T11 AC4: candidate interval lies entirely inside existing booking
   ✓ T12 AC4: candidate interval identical to existing booking
   ✓ T13 AC3: blocked room availability check
   ✓ T14 AC4: availability request with empty bookings list
   ✓ AC5: booking data remains unchanged after call
   ✓ X1 AC1: start at midnight with past now time
   ✓ X2 AC4: slot touching two existing bookings on both boundaries
   ✓ R2 AC1: non-finite inputs (NaN and Infinity) are rejected

 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  17:37:23
   Duration  492ms (transform 41ms, setup 1ms, collect 39ms, tests 3ms, environment 0ms, prepare 182ms)
```

---

## 9. Task 9, and what still fails

### 9.1 A background agent on this project

Rules for an agent working asynchronously on a separate branch. Be specific to this project: name
its files and its commands.

| Rule | What I require |
| ------ | ------ |
| Isolation | Work only on a dedicated feature branch (e.g., `agent/task-name`) branched off `week-10`, inside `week-10/app/` only; never push directly to `main` or `week-10`. |
| Permitted files | `week-10/app/src/booking.ts`, `week-10/app/src/App.tsx`, and `week-10/app/src/booking.test.ts` (may add tests, never delete or weaken existing tests). |
| Commands | Run `npm test` (`npx vitest run`) and `npm run build` (`tsc && vite build`) inside `week-10/app/`; never run `npm run lint`, `npm run test:unit`, or `npx netlify deploy --prod`. |
| Prohibited actions | Do not modify `week-10/provided/AGENTS.md`, `week-10/tests/`, or `week-10/app/package.json`; do not add a login page, database/Supabase, secrets/API keys, `.env` files, or real KBTU portal data; do not merge PRs or deploy externally. |
| Required evidence | Full `git diff` of `week-10/app/src/`, complete `npm test` output showing all 18+ tests passing, `npm run build` exit status 0, and a summary of changed files and assumptions. |
| Before merging or deploying | Stop at an open Pull Request with human review and explicit approval from the repository owner (`Dias`) after verifying `AC1–AC6` and checking desktop/mobile UI screenshots. |

### 9.2 Optional — the deck's checklist prompt (not graded)

<!-- If you sent it: the answer, and one thing it has that your rules in 9.1 do not, or the reverse. -->

### 9.3 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

none

---

## 10. Release decision and conclusion

**Decision:** CONDITIONAL

<!-- Keep one word above. GO is not allowed while any confirmed risk still scores 6 or more.
     Then 80-150 words, in your own words, without the assistant: why this decision, from the
     register, the tests and what you are still unsure about. Name at least two risk IDs.
     Worthless: "The project is mostly fine, so GO."
     Worth everything: "CONDITIONAL. R2 (the deploy line in AGENTS.md, 3 x 3 = 9) is closed by the
     approved patch, now 1 x 3. R4 (the page accepts a past start when 'now' is typed by hand,
     2 x 2 = 4) is open, owned by me, controlled by the AC1 test. The UI was checked at two widths,
     but no test covers App.tsx, so a regression there would be invisible." -->

<!-- Write your conclusion below this line -->
The release decision is **CONDITIONAL** because the core booking logic passes all 18 automated unit tests and builds cleanly, while the two highest-priority confirmed risks have been mitigated below the threshold of 6: **R1** (conflicting instructions in `app/AGENTS.md`) dropped from 9 to 3 after patching `AC1–AC6`, fixing `npm test`, and banning databases, secrets, and external deployments; **R2** (missing finite-number validation in `src/booking.ts`) dropped from 6 to 2 after refactoring `canBook` into pure helper functions with a `Number.isFinite` guard. However, **R3** (overlapping error and result text in `src/App.tsx` when `!(s < e)`), **R4** (missing CI workflow and ESLint script), and **R6** (`App.tsx` checkbox overriding `room.blocked`) remain as documented low-to-moderate limitations owned by Dias and controlled through manual `npm test`/`npm run build` gates and visual UI checks (`AC6`) before any future merge.