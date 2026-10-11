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
| 1 | | | |

**Boundary cases the assistant suggested that I kept as tests:**

-

---

## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.<ext>`, exactly as the assistant returned it: yes / no

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

-

---

## 4. Task 3 — my tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |
| 11 | | | | | | | |

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
(paste here)
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | | accept / reject | | |
| 2 | | accept / reject | | |

---

## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | | | |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
(paste here)
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
(paste here)
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
| | |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

-

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

-

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
