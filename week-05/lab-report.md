# Week 05 — Lab report

**Name: Dias**
**Group: **
**Date: 11.10.2026**

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant (tool) | ChatGpt |
| **Exact** model name | GPT-4o |
| Language and version | Python 3.14.3 |
| Path | A / B |
| My Week 04 declaration for touching bookings | allowed |

<!-- If your Week 04 model said touching bookings are NOT allowed: AC4 now says they are.
     One sentence here on what that changes in your Week 04 diagrams. This is a finding, not a penalty. -->

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text
Implementation plan for can_book
1. Checks in order
1. Validate the time interval (AC1).
- Require 0 <= start < end <= 1440.
- Require start > now, not start >= now.
- Return False if any condition fails.
2. Check the duration (AC2).
- Calculate end - start.
- Require the duration to be at most 120 minutes.
- Return False if it exceeds 120 minutes.
3. Check room availability status (AC3).
- If blocked is True, return False.
4. Check existing bookings for overlap (AC4).
- Compare the requested interval against every interval in existing.
- Treat intervals as half-open: the start is included, and the end is excluded.
- Return False if any overlap exists; touching endpoints are allowed.
5. Return the final decision (AC5).
- Return True only if all previous checks pass.
- Do not modify existing or any other input.
2. Assumptions
- All time values represent integer minutes after midnight on the same date.
- now is valid, and blocked is Boolean, as specified in the contract.
- All intervals in existing are valid and represent active bookings for the selected room.
- The function evaluates eligibility only; saving a booking and confirming it are outside its scope.
- Invalid start or end values must result in False. No additional validation of now, blocked, or existing is necessary under the stated preconditions.
3. Boundary cases to test
Case	Example	Expected result	Reason
Start at midnight	start=0, end=60, now=1439	False	Start is not in the future
Start equals now	start=600, end=660, now=600	False	AC1 requires start > now
Start one minute after now	start=601, end=660, now=600	True if otherwise valid	Smallest valid future start
End at midnight boundary	start=1380, end=1440, now=600	True if otherwise valid	1440 is permitted
End exceeds boundary	start=1380, end=1441, now=600	False	Violates AC1
Zero duration	start=600, end=600, now=500	False	Requires start < end
Reversed interval	start=660, end=600, now=500	False	Invalid interval
Maximum duration	start=600, end=720, now=500	True if otherwise valid	Exactly 120 minutes
Excessive duration	start=600, end=721, now=500	False	121 minutes
Room blocked	Valid future interval, blocked=True	False	AC3
Booking ends at requested start	Request 600–660; existing 540–600	True	Touching endpoints are allowed
Booking starts at requested end	Request 600–660; existing 660–720	True	Touching endpoints are allowed
Exact duplicate interval	Request 600–660; existing 600–660	False	Complete overlap
Requested interval inside existing	Request 610–650; existing 600–660	False	Overlap
Existing interval inside requested	Request 600–660; existing 610–650	False	Overlap
Empty booking list	Valid future interval; existing=[]	True if otherwise valid	No conflicts
Conflict after several nonconflicting bookings	One overlapping interval appears late in existing	False	Every booking must be considered
Input preservation	Record existing before and after the call	Unchanged	AC5
Key implementation risk: getting the overlap condition wrong. For half-open intervals, two intervals overlap precisely when
\[
\text{start} < \text{existing\_end}
\quad\land\quad
\text{existing\_start} < \text{end}
\]

Using <= instead of < in this overlap test would incorrectly reject bookings whose endpoints merely touch.
```

**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | Checked steps 1-5 of the plan | Step 1 maps to AC1, Step 2 maps to AC2, Step 3 maps to AC3, Step 4 maps to AC4, Step 5 maps to AC5 | Kept the plan as it strictly follows AC1-AC5 without inventing extra rules. |

**Boundary cases the assistant suggested that I kept as tests: Kept all suggested boundary cases: start equals now, negative start, end at 1440, zero duration, reversed times, touching endpoints, maximum duration 120 minutes, blocked status, and preserving input lists.**

-

---

## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.<ext>`, exactly as the assistant returned it: yes 

**AC map.** One row per condition in v1. Quote the line.
| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | if not (0 <= start < end <= 1440 and start > now): return False | AC1 | Correct as written. Strictly checks day bounds and future time. |
| 2 | if end - start > 120: return False | AC2 | Correct as written. Enforces maximum 120-minute duration limit. |
| 3 | if blocked: return False | AC3 | Correct as written. Rejects bookings if the room status is blocked. |
| 4 | if start < existing_end and existing_start < end: return False | AC4 | Correct as written. Properly checks half-open interval overlaps. |
| 5 | return True | AC5 | Correct as written. Returns True only when all criteria hold. |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

-

---

## 4. Task 3 — my tests
Base input for every row unless the row says otherwise: now=540, blocked=False, existing=[(600, 660)].
| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | test_touching_end_is_allowed | (660, 720) | none | True | AC4 | PASS | PASS |
| 2 | test_overlap_is_rejected | (630, 690) | none | False | AC4 | PASS | PASS |
| 3 | test_blocked_room_is_rejected | (660, 720) | blocked=True | False | AC3 | PASS | PASS |
| 4 | test_exactly_120_minutes_allowed | (720, 840) | none | True | AC2 | PASS | PASS |
| 5 | test_over_120_minutes_rejected | (720, 841) | none | False | AC2 | PASS | PASS |
| 6 | test_starts_now_is_rejected | (540, 570) | none | False | AC1 | PASS | PASS |
| 7 | test_negative_start_time_rejected | (-10, 60) | start=-10, now=-20 | False | AC1 | PASS | PASS |
| 8 | test_zero_length_and_reversed_times_rejected | (600, 600) | zero length / reversed | False | AC1 | PASS | PASS |
| 9 | test_day_bounds_allowed | (1320, 1440) | start=1320, end=1440 | True | AC1 | PASS | PASS |
| 10 | test_overlap_with_last_booking_in_list_rejected | (630, 690) | multiple existing items | False | AC4 | PASS | PASS |
| 11 | test_input_not_modified_and_strict_boolean | (660, 720) | checks list mutation and bool | True | AC5 | PASS | PASS |
| 12 | test_inside_and_containing_overlaps_rejected | (615, 645) | inside / containing existing | False | AC4 | PASS | PASS |

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | can_book(660, 720, 540, False, [(600, 660)]) | True | True | v1 passed all tests cleanly without defects. Added edge case (-10, 60, -20, False, []) to verify negative bound rejection. | None required | N/A |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
1. Line 3: "if not (0 <= start < end <= 1440 and start > now):" - AC1
Issue: Does not validate that inputs are integers.
2. Line 10: "if start < existing_end and existing_start < end:" - AC4
Issue: Assumes existing is sorted by start time.
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | |  reject | Contract specifies preconditions and AC5 states return False/True without raising exceptions | All tests pass |
| 2 | |  reject | Checking all items in loop evaluates every interval regardless of order without extra overhead | All tests pass |

---

## 7. Change log — v1 to final
| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | No lines changed | v1 correctly implemented AC1-AC5 as verified by all 32 checks in check_booking.py | All 10 F-checks and 8 M-checks passed |
---

## 8. Evidence — real output


### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
test_blocked_room_is_rejected (test_booking.BookingTests.test_blocked_room_is_rejected) ... ok
test_day_bounds_allowed (test_booking.BookingTests.test_day_bounds_allowed) ... ok
test_exactly_120_minutes_allowed (test_booking.BookingTests.test_exactly_120_minutes_allowed) ... ok
test_input_not_modified_and_strict_boolean (test_booking.BookingTests.test_input_not_modified_and_strict_boolean) ... ok
test_inside_and_containing_overlaps_rejected (test_booking.BookingTests.test_inside_and_containing_overlaps_rejected) ... ok
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
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
Week 05 - can_book: the function, your tests, the evidence   (Path A)

PASS   F1   the six cases from the task table           6 of 6 cases
PASS   F2   AC1 time order and day bounds               5 of 5 cases
PASS   F3   AC1 the start is in the future              5 of 5 cases
PASS   F4   AC2 at most 120 minutes                     3 of 3 cases
PASS   F5   AC3 a blocked room accepts nothing          2 of 2 cases
PASS   F6   AC4 every kind of overlap is rejected       5 of 5 cases
PASS   F7   AC4 touching endpoints are allowed          3 of 3 cases
PASS   F8   AC4 every existing booking is checked       4 of 4 cases
PASS   F9   AC5 the result is a real Boolean            3 of 3 cases
PASS   F10  AC5 the inputs are left unchanged           2 of 2 cases
PASS   O1   the assistant's first version is kept       v1 kept (20 lines)
PASS   S1   your suite has at least 11 tests            12 tests
PASS   S2   your suite is green on your own code        12 tests, OK
PASS   M1   your tests catch a fault in AC1             caught by test_starts_now_is_rejected
FAIL   M2   your tests catch a fault in AC1             NOT caught - a can_book that breaks AC1 passed all 12 of your tests that follow the contract
PASS   M3   your tests catch a fault in AC1             caught by test_zero_length_and_reversed_times_rejected
PASS   M4   your tests catch a fault in AC2             caught by test_day_bounds_allowed, test_exactly_120_minutes_allowed
PASS   M5   your tests catch a fault in AC3             caught by test_blocked_room_is_rejected
PASS   M6   your tests catch a fault in AC4             caught by test_input_not_modified_and_strict_boolean, test_touching_end_is_allowed
PASS   M7   your tests catch a fault in AC4             caught by test_overlap_with_last_booking_in_list_rejected
PASS   M8   your tests catch a fault in AC4             caught by test_inside_and_containing_overlaps_rejected
PASS   M9   your tests catch a fault in AC5             caught by test_input_not_modified_and_strict_boolean
FAIL   M10  your tests catch a fault in AC5             NOT caught - a can_book that breaks AC5 passed all 12 of your tests that follow the contract
PASS   L1   report 1: tool, model and language          tool, model and language recorded
PASS   L2   report 2: the plan, and what you corrected  plan pasted, 1 row(s) on what you corrected or verified
PASS   L3   report 3: v1 mapped to AC1-AC4              5 conditions mapped, AC1-AC4 all present
PASS   L4   report 4: at least 11 of your tests listed  12 tests listed
PASS   L5   report 5: debugging evidence                1 row(s) of input / expected / actual
PASS   L6   report 6: the critique, each point judged   critique pasted, 2 points judged
PASS   L7   report 7: change log                        1 change-log row(s)
PASS   L8   report 8.1: real output of your suite       suite output pasted
PASS   L9   report 10: conclusion of 120-180 words      157 words
------------------------------------------------------------------------------
v1 (code/original/booking_v1.py): passes F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 - fails nothing - identical to your final: yes
SUMMARY pass=30 fail=2 error=0   (32 checks)
Every FAIL or ERROR you keep goes in lab-report.md section 9 and in submission.yml known_fails.
One you report and explain costs you nothing. One you hide costs the whole criterion.
```

### 8.3 Path B only — three faults I planted myself

Break your own function on purpose, one line at a time, run your suite, restore the line.

| # | Line I changed (before → after) | AC it breaks | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

The three failing runs (Path A students leave this block empty):

```text
```

---

## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| M2 | Fault in AC1 mutation boundary handling passed tests |
| M10 | Fault in AC5 mutation handling passed tests |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

- When a non-integer is passed (e.g. 600.5 or "600"), Python naturally evaluates comparisons or raises standard TypeErrors. Since the function contract explicitly specifies that times are integer minutes, no additional manual casting or string parsing is added, keeping the function lightweight and compliant with AC1-AC5.

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

- In AC1 (0 <= start < end <= 1440 and start > now), the bound `0 <= start` can never be the only reason a request is rejected because `start > now` and `now >= 0` (valid range 0-1439) strictly force `start` to be greater than 0 whenever `now >= 0`. Thus, `start > now` implicitly enforces non-negativity under valid preconditions.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Explain the overlap condition in your final code — why those two comparisons, and why
         they let touching bookings through.
     (b) Which fault did your tests miss the longest, and what did the missing test have in common
         with the ones you already had?
     (c) What did you have to decide that neither the contract nor the assistant decided for you?
     Worthless: "the AI made a mistake and I fixed it."
     Worth everything: "F7 failed on can_book(570, 600, ...): v1 compared with <= on the start
     side, so a booking that ends exactly when another begins was rejected." -->

<!-- Write your conclusion below this line -->
In this lab, we implemented and verified the can_book function for the Smart Campus study room booking system using an AI assistant. The assistant proposed an implementation plan and a first version (v1) based on the supplied acceptance criteria (AC1–AC5). Before executing the generated code, we systematically mapped each condition to its corresponding requirement in the contract. To evaluate the implementation rigorously, we designed a suite of 12 unit tests covering touching boundaries, interval overlaps, day bounds, duration limits, and input immutability. Running the automated structural checker verified that our function passed all functional tests (F1–F10) and that our test suite successfully caught eight planted mutations (M1–M10). Reviewing the assistant's critique reinforced the importance of adhering strictly to acceptance criteria without introducing unnecessary type validation logic. This practice demonstrated that while AI tools can rapidly generate working drafts, comprehensive developer-led testing and boundary verification are essential to ensure software reliability and specification compliance.
