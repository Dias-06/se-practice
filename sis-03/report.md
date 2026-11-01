# SIS #03 — Report: Smart Campus Room Availability Checker

## 1. Setup and reuse

| Item | Value |
| ------ | ------ |
| Coding assistant (tool) | ChatGPT |
| Coding assistant model | GPT-4o |
| Bolt.new model | Claude 3.5 Sonnet |
| Bolt project link | not displayed |
| Language | Python 3.13 |
| Path | Path A |
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
(paste here)
~~~~

<!-- Main generated files or components, with their path inside web/original/
     (for example src/App.tsx). At least two. -->

| Generated file or component | Path | Its role |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

**What v1 does:**

- (write here)

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | | | | |
| T2 | Overlap | 630–690 | Unavailable | | | | |
| T3 | Blocked | 660–720, blocked | Unavailable | | | | |
| T4 | Exactly 120 min | 720–840 | Available | | | | |
| T5 | 121 min | 720–841 | Unavailable | | | | |
| T6 | Starts now | 540–570 | Unavailable | | | | |
| T7 | Reversed | 720–660 | Unavailable | | | | |
| T8 | Ends at midnight | 1380–1440 | Available | | | | |
| T9 | Past midnight | 1380–1441 | Unavailable | | | | |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | | | | |
| T11 | Same check twice | 660–720, twice | Available | | | | |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | | |

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC2 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC3 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC4 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC5 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC6 | (write here) | (write here) | (write here) | (write here) | (write here) |

## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) | (write here) |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue (write here)

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) |
| 3 | (write here) | (write here) | (write here) | (write here) |

## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
| --- | --- |
| User goal | (write here) |
| Model / plan | (write here) |
| Tool call | (write here) |
| Observation | (write here) |
| Next step | (write here) |
| Human review | (write here) |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** (write here)

**Reliability, security, responsibility:** (write here)

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

(write here)

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

### B1

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B2

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B3

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

<!-- The complete terminal output of your final suite. Path A: python -m unittest -v, run inside
     code/ — the part ending in "Ran N tests" and OK or FAILED. -->

~~~~text
(paste here)
~~~~

### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
