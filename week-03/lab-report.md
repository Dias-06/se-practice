# Lab report — Practice #03, Requirements Engineering with AI

Fill in every section. **Do not delete or renumber the headings** — the README points at them and a
missing heading reads as a missing section.

Name:Mukashev Dias
Student ID:24B031886
GitHub username:Dias-06

---

## 1. Setup

| | |
| --- | --- |
| AI assistant (tool) | ChatGpt |
| Exact model name and version | GPT-4o|
| Date of the session | 27.09.2026 |
| Diagram renderer used | PlantUML online |

One tool and one model for all three prompts. If you switched, say why here — it changes what your
findings mean.

---

## 2. Original AI output — user stories (Part 1)

Paste the **unedited** response to Prompt 1. Do not tidy it. If it is long, paste all of it anyway;
this is the baseline everything else is measured against.

```
Goals

Student goals

Find available study rooms.
Book a room for a specific time.
View and manage personal bookings.
Cancel a booking when the room is no longer needed.

Administrator goals

Manage study rooms and their availability.
View and manage room bookings.
Ensure the booking system reflects current room availability.
User Stories
#	User story	Priority	Assumption
1	As a Student, I want to view available study rooms, so that I can choose a suitable room for studying.	High	Room availability is maintained in the system.
2	As a Student, I want to book an available study room for a selected time, so that I can reserve it for studying.	High	Students can only book rooms that are available for the selected time.
3	As a Student, I want to view my current room bookings, so that I can keep track of my reservations.	Medium	A student can have one or more bookings.
4	As a Student, I want to cancel my room booking, so that the room becomes available when I no longer need it.	Medium	Students can cancel their own active bookings.
5	As an Administrator, I want to add or update study room information, so that the system contains accurate room availability information.	High	Administrators have permission to manage room information.
6	As an Administrator, I want to view room bookings, so that I can monitor how study rooms are being reserved.	High	Administrators can access booking information for all rooms.
7	As an Administrator, I want to manage or cancel bookings when necessary, so that room reservations remain accurate and manageable.	Medium	Administrators are authorized to modify or cancel bookings.
8	As an Administrator, I want to mark rooms as unavailable, so that students cannot book rooms that cannot be used.	High	Administrators can change a room's availability status.
```

---

## 3. Story review (Part 2)

One row per change you made. "Kept unchanged" is a valid row and needs a reason too.

## 3. Story review (Part 2)

| Story (as generated) | What I did | Why | Final ID |
| --- | --- | --- | --- |
| Story 1 (View availability) | Kept unchanged | Aligns directly with Student role and UC-01 | US-01 |
| Story 2 (Book room) | Rewrote slightly | Added explicit constraint details (time slots) to align with UC-02 | US-02 |
| Story 3 (View current bookings) | Merged into US-07 | Covered under administrative/student monitoring, replaced with UC-06 Send confirmation | US-06 |
| Story 4 (Cancel booking) | Kept unchanged | Aligns directly with Student role and UC-03 | US-03 |
| Story 5 (Add/update rooms) | Rewrote completely | AI invented adding new rooms (out of scope). Replaced with UC-04 (Block or unblock room) | US-04 |
| Story 6 (View room bookings) | Rewrote for Admin | Focused specifically on administrative usage review (UC-05) | US-05 |
| Story 7 (Manage/cancel bookings) | Kept as US-07 | Covers Administrator global view of bookings | US-07 |
| Story 8 (Mark rooms unavailable) | Merged into US-04 | Redundant with Story 5 / UC-04 block/unblock room functionality | US-04 |

**Did the assistant invent anything outside the scenario?** Yes. In original Story 5, the assistant suggested "add or update study room information". Managing room inventory is out of scope; the system only supports blocking/unblocking existing rooms (UC-04).

**How many stories did you end with, and why that number?** I ended with 7 stories (US-01 through US-07). This covers all 6 required system use cases (UC-01 to UC-06) while staying within the required 6–8 story range.

**Did the assistant invent anything outside the scenario?** Name it against the out-of-scope list in
README section 1, or write "no, and here is how I checked".

**How many stories did you end with, and why that number?**

---

## 4. Original AI output — acceptance criteria (Part 3)

```
US-01 — View Availability

Assumptions

Availability is checked for a specific room and requested time period.
A room is considered unavailable if it has an overlapping booking or is blocked.
The requested time period must be in the future and no longer than two hours.

Acceptance Criteria

Show an available room
Given a room has no overlapping booking and is not blocked
When the student checks availability for a future period of up to two hours
Then the system shows the room as available.
Show an unavailable room due to booking
Given a room has an existing booking that overlaps the requested period
When the student checks availability
Then the system shows the room as unavailable.
Show an unavailable room due to blocking
Given a room is blocked
When the student checks availability
Then the system shows the room as unavailable.
Reject invalid time period
Given the requested period is in the past or is longer than two hours
When the student checks availability
Then the system rejects the request and displays a validation message.
US-02 — Book Room

Assumptions

Only students can create room bookings.
A booking must have a start and end time.
A booking can last a maximum of two hours.
A room cannot have overlapping bookings.

Acceptance Criteria

Successfully book an available room
Given the room is not blocked and has no overlapping booking
When the student submits a future booking of up to two hours
Then the system creates the booking and confirms it to the student.
Prevent overlapping bookings
Given the room already has a booking that overlaps the requested period
When the student attempts to book the room
Then the system rejects the booking and indicates that the room is unavailable for that period.
Prevent booking a blocked room
Given the selected room is blocked
When the student attempts to book it
Then the system rejects the booking and indicates that the room cannot be booked.
Validate booking duration
Given the requested booking is longer than two hours
When the student submits the booking
Then the system rejects it and displays a message that the maximum booking duration is two hours.
Prevent past bookings
Given the requested booking starts in the past
When the student submits the booking
Then the system rejects it and requires a future start time.
US-04 — Block or Unblock Room

Assumptions

Only administrators can block or unblock rooms.
A blocked room cannot be booked by students.
Unblocking a room makes it available for booking subject to existing bookings.

Acceptance Criteria

Successfully block a room
Given an administrator selects an unblocked room
When the administrator blocks the room
Then the system marks the room as blocked and prevents new bookings for it.
Successfully unblock a room
Given a room is currently blocked
When the administrator unblocks the room
Then the system marks the room as available for booking, provided no other availability restriction applies.
Prevent booking while blocked
Given a room has been blocked
When a student attempts to book it
Then the system rejects the booking and indicates that the room is blocked.
Reject unauthorized blocking/unblocking
Given the user is not an administrator
When the user attempts to block or unblock a room
Then the system rejects the action and does not change the room's status.
```

---

## 5. Criteria review (Part 3)

| Criterion (as generated) | Problem | What I changed it to | Final ID |
| --- | --- | --- | --- |
| AC-01 (Happy path view) | Missing explicit boundary definition | Added validation for future date filtering | AC-01 |
| AC-02 (View blocked room) | None | Kept unchanged to verify R4 | AC-02 |
| AC-03 (Past date view) | Lacked explicit error handling | Rewrote to ensure past date requests are rejected with validation error | AC-03 |
| AC-04 (Book 2 hours) | Vague duration definition | Explicitly defined 2-hour slot to test R2 boundary | AC-04 |
| AC-05 (Touching bookings) | AI left overlap boundary ambiguous | Added explicit Given/When/Then test proving touching bookings at 14:00 pass R3 | AC-05 |
| AC-06 (Over 2 hours) | AI omitted duration error case | Created negative case testing rejection of 2.5-hour duration | AC-06 |
| AC-07 (Overlap conflict) | Generic overlap error | Defined explicit overlapping time range (11:00-13:00 vs 10:00-12:00) | AC-07 |
| AC-08 (Admin block) | None | Kept unchanged for UC-04 | AC-08 |
| AC-09 (Student book blocked) | None | Kept unchanged to verify R4 enforcement | AC-09 |
| AC-10 (Admin unblock) | None | Kept unchanged for complete UC-04 lifecycle | AC-10 |

**The two open questions.** Write your decision and the reason. Either answer is accepted.

| Question | My decision | Why |
| --- | --- | --- |
| A booking ending exactly when another begins — overlap under R3? | allowed | Touching boundary hours (e.g. 12:00-14:00 and 14:00-16:00) do not occupy the room simultaneously. |
| Is exactly two hours allowed under R2? | allowed | Rule R2 specifies "at most two hours", which includes 2 hours inclusive. |

**Which invalid or boundary case did the assistant leave out?** The assistant initially omitted explicit boundary handling for touching booking slots (e.g., end time = start time of next booking) and duration limits exceeding 2 hours.

## 6. Original AI output — use-case diagram (Part 4)

```
@startuml
left to right direction

actor Student
actor Administrator

rectangle "Smart Campus Study Room Booking System" {
    usecase "View availability" as UC_View
    usecase "Book room" as UC_Book
    usecase "Cancel booking" as UC_Cancel
    usecase "Block or unblock room" as UC_Block
    usecase "Review usage" as UC_Review
    usecase "Send confirmation" as UC_Confirm
}

Student --> UC_View
Student --> UC_Book
Student --> UC_Cancel

Administrator --> UC_Block
Administrator --> UC_Review

UC_Book ..> UC_Confirm : <<include>>

@enduml
```

Rendered diagram (image, or a link):

---

## 7. Diagram review (Part 4)

| Element | Problem | What I changed |
| --- | --- | --- |
| Send confirmation link | AI linked Student / Admin directly to "Send confirmation" | Removed direct actor association; made UC-06 an <<include>> relationship from UC-02 and UC-03 because system triggers it automatically |
| Student -> Review usage | AI linked Student to usage review | Removed association; Review usage (UC-05) is strictly an Administrator function |
| System Actor | AI created an internal "System" actor outside boundary | Removed "System" actor; internal components must not appear as external UML actors |

**Associations.** Which actor–use-case links did the assistant draw that a person does not actually trigger? Name them.
The assistant drew direct associations from Student and Administrator to `Send confirmation`. A human user does not manually trigger confirmation emails; the system executes this automatically as an included step of `Book room` and `Cancel booking`.

**Did any screen, database or internal component appear as a use case or an actor?**
No. The revised diagram contains strictly business-level goals and legitimate human actors outside the system boundary.

---

## 8. Traceability (Part 5)

Summarise what the table in `requirements/traceability.md` shows:

- Use cases with **no story** behind them: None (All 6 use cases have corresponding stories US-01 through US-06).
- Stories with **no use case** they belong to: US-07 (Admin global view of bookings).
- Criteria that test **no rule** from section 1: None.

**What does the largest gap tell you about the generated requirements?**
The largest gap is the absence of Acceptance Criteria for UC-03 (Cancel booking), UC-05 (Review usage), and UC-06 (Send confirmation). This occurred because the lab assignment explicitly restricted the generation of Given/When/Then criteria to three selected stories, demonstrating how partial specification can leave functional areas unverified before implementation.

---

## 9. Checker runs

Paste the **real terminal output** of both runs. A table with nothing behind it does not count.

```
$ python tests/check_requirements.py
(paste)
```

```
$ python tests/validate_submission.py
(paste)
```

| | PASS | FAIL | ERROR |
| --- | --- | --- | --- |
| `check_requirements.py` | | | |

Commit these numbers were produced at (`git rev-parse --short HEAD`):

**Every FAIL, one line each: what it is and what you decided to do about it.** A FAIL you report and
explain costs you nothing.

**Did you run the checks by hand instead of with Python?** Say so here — it costs nothing, but it
has to be said.

---

## 10. Conclusion (150–200 words)

Answer all three:

1. Which part of the generated requirements was most wrong, and how would you have caught it without
   a checker?
2. What did the assistant get right that would have taken you noticeably longer by hand?
3. You are handing these requirements to someone who will implement them, and you will not be in the
   room. Which single one would you rewrite first, and why?

Be specific. "The AI was useful" is worth nothing; "UC-06 had no story behind it until I wrote
US-07, and the checker is what told me" is worth everything.
