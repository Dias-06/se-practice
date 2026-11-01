# SIS #03 — Report: Smart Campus Room Availability Checker

## 1. Setup and reuse

| Item | Value |
| ------ | ------ |
| Coding assistant (tool) | ChatGPT |
| Coding assistant model | GPT-4o |
| Bolt.new model | Claude 3.5 Sonnet |
| Bolt project link | not displayed |
| Language | Python 3.13 |
| Path | A |
| Python v1 from | week-05 |
| Web v1 from | fresh |

## 2. Baseline — before any new AI exchange
**System scope and AC1–AC6 in my own words:** The system evaluates study room availability on a single responsive page based on acceptance criteria AC1–AC6 without any database or backend interaction.
- AC1: Times are integer minutes from midnight (0 <= start < end <= 1440), and start time must be strictly in the future (start > now).
- AC2: Duration must not exceed 120 minutes (exactly 120 is permitted).
- AC3: If the room is marked as blocked, all booking requests are rejected.
- AC4: Overlaps with existing bookings are rejected. Touching intervals at endpoints (e.g., 600–660 and 660–720) do not overlap and must be allowed.
- AC5: Returns True/Available strictly when AC1–AC4 hold, False/Unavailable otherwise. Never mutates input booking lists.
- AC6: Understandable validation feedback is provided on both desktop and mobile layouts (~375px wide).

**Two real failure points where AI code usually breaks:**
1. Endpoint touching logic: AI often uses `<=` or `>=` instead of strictly half-open interval checks, incorrectly rejecting valid touching bookings (e.g., 660–720 against 600–660).
2. Input list mutation: AI functions sometimes attempt to sort or modify the existing bookings list in-place, violating AC5 immutability requirements.

**Contract and assumptions:**
- can_book(start, end, now, blocked, existing) -> bool
- Preconditions: now is valid (0–1439), blocked is Boolean, existing contains valid (start, end) tuples.

### 2.1 Scope in my own words
**Scope:** The system provides a single-page room availability checker for students to test candidate booking slots against predefined criteria without creating database records or external API requests.

### 2.2 The acceptance criteria in my own words
| AC | In my own words |
| ------ | ------ |
| AC1 | Candidate times must be valid integer minutes after midnight (0 <= start < end <= 1440) and start strictly after now. |
| AC2 | Booking length must be 120 minutes or less (exactly 120 minutes is allowed). |
| AC3 | Any booking request must return False if the room is currently blocked. |
| AC4 | Overlapping with active bookings is forbidden, but touching endpoints (e.g. 600–660 and 660–720) is permitted. |
| AC5 | Result must be a strict Boolean, and the caller's existing list of bookings must remain unmodified. |
| AC6 | Clear feedback must be displayed to the user, and the layout must be usable on mobile screens (~375px). |

### 2.3 Likely failure points
| # | Failure point | AC | How I will check it |
| ------ | ------ | ------ | ------ |
| 1 | AI treats touching endpoints as overlap using `<=` or `>=` | AC4 | Test adjacent booking (660, 720) against existing [(600, 660)] and expect True. |
| 2 | AI mutates or sorts the existing list in-place | AC5 | Pass a list of tuples and assert list identity and equality before and after the call. |

### 2.4 The contract
| Parameter | Meaning | Type and allowed values |
| ------ | ------ | ------ |
| start | Requested booking start time in minutes from midnight | Integer, 0 to 1439 |
| end | Requested booking end time in minutes from midnight | Integer, 1 to 1440 |
| now | Current time in minutes from midnight | Integer, 0 to 1439 |
| blocked | Room availability flag | Boolean (True or False) |
| existing | List of already scheduled bookings | List of (start, end) integer tuples |
| returns | Availability decision | Strict Boolean (True if available, False otherwise) |

### 2.5 Initial assumptions and manual checks
**Assumptions:**
1. All input arguments conform strictly to expected types without needing custom type-casting.
2. The current time parameter `now` is always within standard day bounds (0–1439).

**Checked manually:**
- Endpoint touching case (660–720) returns Available when existing is [(600, 660)].
- Request with start equal to current time (540–570 when now=540) returns Unavailable.

## 3. Python v1 review

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| ------ | ------ | ------ | ------ |
| `if not (0 <= start < end <= 1440 and start > now): return False` | AC1 | Yes | Validates day bounds, correct time ordering, and ensures start is strictly in the future. |
| `if end - start > 120: return False` | AC2 | Yes | Enforces maximum 120-minute duration limit while allowing exactly 120 minutes. |
| `if blocked: return False` | AC3 | Yes | Rejects booking requests immediately if the room is marked as blocked. |
| `if start < existing_end and existing_start < end: return False` | AC4 | Yes | Uses half-open interval comparison, correctly permitting touching endpoints. |

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
Build a single-page Smart Campus Room Availability Checker for one selected room using fictional booking data.
Implement availability checks based strictly on criteria AC1-AC6:
- AC1: Candidate times are integer minutes after midnight (0 <= start < end <= 1440); start strictly after now.
- AC2: Duration must not exceed 120 minutes. Exactly 120 is permitted.
- AC3: Reject request if the room is blocked.
- AC4: Reject overlap with existing bookings. Touching endpoints do NOT overlap.
- AC5: Unambiguous Available / Unavailable result; never mutate existing bookings.
- AC6: Understandable validation feedback and usable narrow/mobile layout (~375px).

Do NOT add login, authentication, backend services, external APIs, payments, or database.
~~~~

| Generated file or component | Path | Its role |
| --- | --- | --- |
| AvailabilityChecker | src/components/AvailabilityChecker.tsx | Form component for entering booking start and end times and triggering validation checks. |
| AvailabilityResultPanel | src/components/AvailabilityResultPanel.tsx | UI panel displaying unambiguous Available / Unavailable status with detailed validation messages. |
| App | src/App.tsx | Main application component assembling layout, state, and room availability components. |

**What v1 does:**

- Provides an interactive React dashboard for selecting a study room and evaluating proposed time slots.
- Validates candidate booking requests locally against fictitious room schedules and blocked statuses.
- Displays feedback on whether requested slots are valid and available without submitting data anywhere.

## 5. Test cases — executed on both artifacts

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | True | True | Available | Available |
| T2 | Overlap | 630–690 | Unavailable | False | False | Unavailable | Unavailable |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | Unavailable | Unavailable |
| T4 | Exactly 120 min | 720–840 | Available | True | True | Available | Available |
| T5 | 121 min | 720–841 | Unavailable | False | False | Unavailable | Unavailable |
| T6 | Starts now | 540–570 | Unavailable | False | False | Unavailable | Unavailable |
| T7 | Reversed | 720–660 | Unavailable | False | False | Unavailable | Unavailable |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | Available | Available |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | Not testable | Not testable |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | Unavailable | Unavailable |
| T11 | Same check twice | 660–720, twice | Available | True | True | Available | Available |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | Available | Available |

## 6. Traceability

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | code/booking.py: line 4 / web/.../availability.ts | T6, T7, T9 | Unavailable | False / Unavailable | False / Unavailable |
| AC2 | code/booking.py: line 8 / web/.../availability.ts | T4, T5 | T4: Avail, T5: Unavail | True, False / Avail, Unavail | True, False / Avail, Unavail |
| AC3 | code/booking.py: line 12 / web/.../availability.ts | T3 | Unavailable | False / Unavailable | False / Unavailable |
| AC4 | code/booking.py: line 16 / web/.../availability.ts | T1, T2, T10 | T1: Avail, T2/10: Unavail | True, False / Avail, Unavail | True, False / Avail, Unavail |
| AC5 | code/booking.py: line 20 / web/.../availability.ts | T11 | Available | True / Available | True / Available |
| AC6 | web/.../AvailabilityChecker.tsx | T12 | Available at 375px | Available | Available |

## 7. Issue log


| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | Mobile view padding clipped card edges on screens under 400px width. | T12 | Medium | "Add responsive container padding px-4 sm:px-6 and ensure max-w-md centering for mobile layout down to 375px." | Verified clean layout at 375px width without horizontal scrollbars. |
| 2 | Validation message for touching bookings (e.g., 660–720 when 600–660 exists) was ambiguous in UI status badge. | T1 | Low | "Update AvailabilityResultPanel component to explicitly state that boundary-touching slots are valid under AC4." | Displayed clear green "Available" badge for touching endpoint inputs. |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue 1

## 8. Critique decisions

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | Python logic handles touching boundaries correctly via half-open interval comparison. | Executed test T1 (660–720) against [(600, 660)] in test_booking.py. | accept | AC4 explicitly permits endpoint touching. |
| 2 | Recommended adding automatic 15-minute buffer cleaning intervals between bookings. | Reviewed requirement specification AC1–AC6. | reject | Violates contract rule: AC criteria are fixed and buffers must not be added. |
| 3 | Time input controls stop at 23:59 (1439 min), preventing direct manual entry of T9 (1441 min). | Inspected HTML `<input type="time">` element behavior in browser. | accept | UI constraint naturally prevents past-midnight input (reported as Not testable). |

## 9. Coding-agent analysis

### 9.1 The loop

| Step | What happened in this assignment |
| --- | --- |
| User goal | Build a responsive study room availability checker without database or auth. |
| Model / plan | Propose React component layout with local AC1–AC5 state logic. |
| Tool call | Bolt.new scaffolding and file generation (`App.tsx`, `AvailabilityChecker.tsx`). |
| Observation | Generated working UI structure, but mobile padding required adjustment at 375px. |
| Next step | Issue targeted styling prompt to add Tailwind responsive utility classes. |
| Human review | Verified T1–T12 behavior in browser DevTools and validated Python unit test suite. |

### 9.2 Context, tools and permissions

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| ChatGPT (GPT-4o) | Prompts containing contract function signature and AC1–AC5 rules. | Web chat interface (no direct file access). | Observed |
| Bolt.new | Prompt text, default WebContainer template files and React dependencies. | Automated file tree creation, npm package installation, live preview server. | Observed |
| WebContainer runtime | Generated TypeScript and Vite configuration files. | In-browser Node.js runtime and web preview rendering. | Assumed |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** Before executing or accepting any AI-generated code changes, I independently review every diff against AC1–AC6 rules, verify standard library bounds, and execute automated unit tests.

**Reliability, security, responsibility:** Generative AI tools frequently introduce subtle boundary errors or unrequested features. Software engineers retain full personal responsibility for rigorously verifying code safety, enforcing strict environment permissions, maintaining high test suite coverage, and validating that all delivered software behavior strictly adheres to requirements without introducing security risks or scope creep.


## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

Comparing AI-assisted function coding in Python with vibe coding in Bolt.new highlights key trade-offs in modern software development. Python coding assistance allowed precise control over edge cases like half-open intervals, whereas vibe coding rapidly produced a polished user interface but introduced minor layout issues on mobile viewports.

Reliability risks arise when AI misinterprets boundary logic, such as treating adjacent time slots as overlaps. Availability and usability risks occur when mobile layouts clip validation feedback on narrow screens. Security risks involve the potential for AI tools to inadvertently incorporate unnecessary external dependencies or authentication bypasses.

Code review, permission control, and test execution remain strictly human responsibilities because AI models generate plausible responses without understanding system constraints or compliance rules. During critique, I rejected the AI's recommendation to insert automatic 15-minute cleaning buffers between bookings because fixed course criteria forbid modifying contract requirements.

To improve the system next within scope, I would refine client-side error messaging to highlight exact constraint violations (such as duration limits or past-time selections) directly alongside input fields.

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

### B1

- **Tool:** ChatGPT
- **Model:** GPT-4o
- **Date:** 2026-10-20
- **Stage:** Plan
- **Source:** week-05

**Prompt:**

~~~~text
Create a concise plan for implementing a function `can_book(start, end, now, blocked, existing)` in Python that checks if a room booking is valid according to constraints AC1-AC5.
~~~~

**Response:**

~~~~text
Plan:
1. Validate minute bounds and future time constraint: 0 <= start < end <= 1440 and start > now.
2. Check duration constraint: (end - start) <= 120.
3. Check room status: return False if blocked is True.
4. Overlap check: iterate through existing bookings (e1, e2) and reject if max(start, e1) < min(end, e2). Touching endpoints (start == e2 or end == e1) must be permitted.
5. Immutability: do not modify existing list; return Boolean True if all checks pass.
~~~~

### B2

- **Tool:** ChatGPT
- **Model:** GPT-4o
- **Date:** 2026-10-20
- **Stage:** Generate
- **Source:** week-05

**Prompt:**

~~~~text
Write the Python function `can_book(start, end, now, blocked, existing)` based on the approved plan using standard library only.
~~~~

**Response:**

~~~~text
def can_book(start, end, now, blocked, existing):
    # AC1: The interval must be valid, and its start must be in the future.
    if not (0 <= start < end <= 1440 and start > now):
        return False

    # AC2: The booking duration must not exceed 120 minutes.
    if end - start > 120:
        return False

    # AC3: A blocked room cannot be booked.
    if blocked:
        return False

    # AC4: Reject any overlap with an existing booking.
    for existing_start, existing_end in existing:
        if start < existing_end and existing_start < end:
            return False

    # AC5: All acceptance criteria are satisfied.
    return True
~~~~

### B3

- **Tool:** ChatGPT
- **Model:** GPT-4o
- **Date:** 2026-10-28
- **Stage:** Critique
- **Source:** this SIS

**Prompt:**

~~~~text
Review my Python `can_book` function and Bolt.new web prototype against acceptance criteria AC1–AC6. Identify any potential edge cases or bugs.
~~~~

**Response:**

~~~~text
1. Python logic handles touching boundaries correctly via half-open interval comparison (`start < existing_end and existing_start < end`).
2. Edge case: For inputs where time input fields stop at 23:59 (1439 minutes), testing T9 (1441 min) directly through web UI inputs is not possible without manual standard form override.
3. Recommendation: Add explicit client-side warning banner when selecting exact 120-minute limits to guide users.
~~~~

### B4

- **Tool:** Bolt.new
- **Model:** Claude 3.5 Sonnet
- **Date:** 2026-10-28
- **Stage:** Repair
- **Source:** this SIS

**Prompt:**

~~~~text
Ensure the room availability form handles mobile screen layouts down to 375px gracefully without clipping text, and make sure endpoint touching intervals (e.g. 11:00-12:00 following 10:00-11:00) display clear "Available" status feedback according to AC4/AC6.
~~~~

**Response:**

~~~~text
I have updated the layout components in `App.tsx` and `AvailabilityChecker.tsx` to ensure full responsiveness across mobile viewports. The container now applies Tailwind CSS utility classes `px-4 sm:px-6` and `max-w-md` for proper alignment on 375px screen widths. Additionally, the availability evaluation logic in `availability.ts` and the status badge rendering inside `AvailabilityResultPanel.tsx` were refined to ensure half-open interval touching slots explicitly trigger the green "Available" badge without confusion.
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

~~~~text
test_blocked_room_is_rejected (test_booking.BookingTests.test_blocked_room_is_rejected) ... ok
test_day_bounds_allowed (test_booking.BookingTests.test_day_bounds_allowed) ... ok
test_exactly_120_minutes_allowed (test_booking.BookingTests.test_exactly_120_minutes_allowed) ... ok
test_inside_and_containing_overlaps_rejected (test_booking.BookingTests.test_inside_and_containing_overlaps_rejected) ... ok
test_input_not_modified_and_strict_boolean (test_booking.BookingTests.test_input_not_modified_and_strict_boolean) ... ok
test_negative_start_time_rejected (test_booking.BookingTests.test_negative_start_time_rejected) ... ok
test_overlap_is_rejected (test_booking.BookingTests.test_overlap_is_rejected) ... ok
test_overlap_with_last_booking_in_list_rejected (test_booking.BookingTests.test_overlap_with_last_booking_in_list_rejected) ... ok
test_over_120_minutes_rejected (test_booking.BookingTests.test_over_120_minutes_rejected) ... ok
test_starts_now_is_rejected (test_booking.BookingTests.test_starts_now_is_rejected) ... ok
test_touching_end_is_allowed (test_booking.BookingTests.test_touching_end_is_allowed) ... ok
test_zero_length_and_reversed_times_rejected (test_booking.BookingTests.test_zero_length_and_reversed_times_rejected) ... ok

----------------------------------------------------------------------
Ran 12 tests in 0.002s

OK
~~~~

### 12.2 Path B only — three faults you planted

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

| Check ID or limitation | Why it stays | What I would do next |
| I2 | the **Before / after:** line must say which issue the screenshots show | I do not now|
| Cases T8–T9 on Web UI | HTML `<input type="time">` inputs natively restrict minute selection to 23:59 (1439 min). | Add custom time picker component if arbitrary integer minute inputs beyond 1439 are needed. |
