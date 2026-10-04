# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every `<...>`
> placeholder; a row that still contains `<...>` counts as empty.

---

## 1. Setup

| Field | Value |
| --- | --- |
| Name | Dias |
| Group | Monday 16:00-19:00 |
| AI assistant | ChatGPT|
| Exact model | GPT-4o |
| Renderer | PlantUML web server |
| Behaviour diagram | sequence |
| Stories used | my week-03 stories, revised |

---

## 2. Prompts as sent

Paste every prompt **exactly as you sent it**, in the order you sent it, one code block each. The
AI's first replies are saved as files in `models/original/` — do not paste them here.

### 2.1 Task 1 — use-case prompt

```text
Using the supplied scenario and approved stories, generate PlantUML for a use-case diagram. Include Student and Administrator outside a named system boundary. Model their goals, show justified associations, and list assumptions. Use include or extend only with a clear reason.
```

### 2.2 Task 2 — class prompt

```text
Create a UML domain class diagram in PlantUML for Smart Campus. Start with Student, Room, and Booking. Add attributes, appropriate operations, and association multiplicities. Add other classes only when requirements justify them. Explain each relationship and list assumptions. Avoid unjustified inheritance or composition.
```

### 2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)

```text
Generate PlantUML for Book room. Use Student, BookingService, and BookingRepository lifelines. Validate the supplied rules, then attempt the reservation. Show a successful confirmation and an unavailable-room alternative using alt. Label messages and replies. Explain new design components and all assumptions.
```

### 2.4 Focused correction prompts (if you sent any)

```text
none
```

### 2.5 Critique prompt

```text
Compare my diagrams with the requirements. Identify missing rules, inconsistent names, and unjustified elements. Cite each issue and propose a specific correction.
```

---

## 3. Task 1 — use-case review

**Assumptions the AI listed:** The AI assumed that Student and Administrator are the only external actors.

At least **two** findings. A finding names the element, the problem and the rule or story that proves it is a problem.

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | Student -> Send confirmation | The AI linked Student directly to Send confirmation. A student does not trigger confirmation manually; it is automated. | R4 / US-06 | Removed direct link and converted it to an include relationship from Book room and Cancel booking. |
| 2 | Include relationship | The AI did not add the required comment above the include arrows. | PlantUML convention | Added ' why: comment directly above every include relationship. |

---

## 4. Task 2 — class diagram review

### 4.1 Relationships, read both ways

One row per association in your **revised** class diagram.

| Association | Read left → right | Read right → left | Multiplicities |
| --- | --- | --- | --- |
| Student — Booking | One student can make zero or many bookings | Each booking belongs to exactly one student | 1 / 0..* |
| Room — Booking | One room can have zero or many bookings | Each booking belongs to exactly one room | 1 / 0..* |

### 4.2 Constraints the multiplicities cannot show

- R2: Active bookings for the same room cannot overlap in time. This is stated in a note on the Booking class because multiplicities cannot express time constraints.
- R1: A booking start time must be in the future and last at most 2 hours. This is also specified inside the Booking class note.

### 4.3 Assumptions

- A1: When a room is blocked by an administrator, existing future bookings are kept unless manually managed.
- A2: Touching bookings (where one ends exactly when another begins) do not count as overlapping under R2.

### 4.4 Findings

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | R2 Constraint Note | The AI omitted the note explaining rule R2 on the Booking class. | R2 / CL8 | Added a explicit note attached to Booking explaining that active bookings cannot overlap. |
| 2 | Booking Attributes | The AI missed start/end time attributes necessary for duration validation. | R1 / CL7 | Added startTime and endTime attributes to the Booking class. |

---

## 5. Task 3 — behaviour diagram review

**Option chosen and why:** 3A sequence diagram was chosen because it clearly illustrates time-ordered interactions, validation checks, and alternative flows between design components.

**Design components added beyond the domain model:**
- `BookingService`: Coordinates business logic, checks validation rules (R1, R2, R3), and manages booking creation.
- `BookingRepository`: Handles data persistence and queries room and booking states from storage.

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | Guard brackets in alt block | The AI added square brackets inside the `alt` condition labels (e.g. `alt [valid]`), which PlantUML parses improperly. | PlantUML convention / SQ2 | Removed square brackets from alt conditions to follow PlantUML sequence syntax conventions. |
| 2 | Validation order | The AI draft attempted to save the booking before completing all validation checks. | SQ3 / SQ4 | Reordered messages so that room availability and duration checks complete before calling saveBooking. |

---

## 6. AI critique

Run the critique prompt once, on all your revised diagrams together. At least **three** rows. A critique is another claim to evaluate, not a verdict: reject what is wrong and say why.

| # | Issue the AI raised | Element it cited | Verdict | Why |
| --- | --- | --- | --- | --- |
| 1 | Claimed BookingService missing error output details | `BookingService` | reject | The sequence diagram clearly returns rejectBooking with an error message in the else branch. |
| 2 | Suggested creating separate BlockedRoom class | `Room` class | reject | Adding a separate class is redundant; a boolean isBlocked attribute in Room is sufficient for R3. |
| 3 | Claimed missing confirmation relationship | `use-case.puml` | reject | UC-06 Send confirmation is properly included in UC-02 and UC-03 with ' why: comments. |

---

## 7. Consistency table

One row for each of **R1–R4**, then one row for **every use case in your revised use-case diagram**, spelled exactly as in the diagram, with the story ID it traces to.

| Requirement / story | Use case | Classes | Behaviour element |
| --- | --- | --- | --- |
| R1 | Book room | Booking | Check duration <= 2 hours guard |
| R2 | Book room | Booking | checkOverlap message and note |
| R3 | Block or unblock room | Room, Booking | checkRoomBlocked message and isBlocked flag |
| R4 | Book room | Booking, Student | confirmBooking message and UC-06 include |
| US-01 | View availability | Room | viewAvailability message |
| US-02 | Book room | Student, Room, Booking | requestBooking message flow |
| US-03 | Cancel booking | Student, Booking | cancelBooking message flow |
| US-04 | Block or unblock room | Administrator, Room | blockRoom / unblockRoom operations |
| US-05 | Review usage | Administrator, Room | reviewUsage operation |
| US-06 | Send confirmation | Student, Booking | confirmBooking message |
---

## 8. Change log

At least **three** rows, and at least one for each required diagram (use case, class, your behaviour diagram). "Before" is what the AI produced; "After" is what you submitted.

| # | Diagram | Before (AI's original) | After (your revision) | Reason |
| --- | --- | --- | --- | --- |
| 1 | use-case | Included Check booking constraints as a use case | Removed internal constraint use case and added ' why: comments above includes | UC8 requirement and domain modeling principles |
| 2 | class | Omitted R2 note on Booking class | Added explicit note attached to Booking describing R2 and R1 constraints | CL8 requirement; multiplicities cannot show time overlap |
| 3 | sequence | Used square brackets in alt guards like `alt [valid]` | Removed brackets to `alt valid` and ordered validation before creation | PlantUML syntax conventions and SQ2 / SQ3 checks |

---

## 9. Checker output

Paste the complete output of `python tests/check_models.py`, then explain **every FAIL you are
keeping**. The same IDs go in `submission.yml` under `checker.kept_fails`. A FAIL you report and explain costs you nothing. One you hide costs the whole criterion.

```text
Week 04 structural check - shape only, never quality

UC1  PASS  Student and Administrator declared
UC2  PASS  named system boundary: "Smart Campus study room booking"
UC3  PASS  all actors declared outside the boundary
UC4  PASS  all scenario goals present (6 use cases)
UC5  PASS  no actor is associated with a confirmation use case
UC6  PASS  actor responsibilities match the scenario
UC7  PASS  use cases are goals, not screens or components
UC8  PASS  every include / extend / generalization carries a ' why: comment (or there are none)
UC9  PASS  revised diagram differs from the AI's original
CL1  PASS  Student, Room and Booking present
CL2  PASS  Booking is associated with Student and with Room
CL3  PASS  every association has multiplicities at both ends
CL4  PASS  1 student / 1 room per booking, 0..* bookings per student and per room
CL5  PASS  every inheritance / composition / aggregation carries a ' why: comment (or there are none)
CL6  PASS  only domain concepts in the class diagram
CL7  PASS  attributes needed by R1-R3 are present
CL8  PASS  a note states R2 (no overlapping active bookings)
SQ1  PASS  Student, BookingService and BookingRepository lifelines present
SQ2  PASS  alt block with a guard on every branch (2 branches)
SQ3  PASS  validation happens before creation
SQ4  PASS  nothing is saved on a failure branch
SQ5  PASS  every message is labelled
SQ6  PASS  R1 (time range) is visible - checked or stated as a precondition
SQ7  PASS  R3 (blocked room) is visible
FI1  PASS  the AI's original output is kept for every diagram
FI2  PASS  a rendered image for every diagram
LR1  PASS  §1 setup filled (tool and model recorded)
LR2  PASS  5 prompts pasted in §2
LR3  PASS  2 use-case findings in §3
LR4  PASS  §4 relationships read both ways, 2 assumption(s) declared
LR5  PASS  2 behaviour-diagram findings in §5
LR6  PASS  3 critique issues with a verdict
LR7  PASS  3 change-log rows covering all three diagrams
CS1  PASS  6 approved stories
CS2  PASS  §7 traces R1-R4 into the diagrams
CS3  PASS  every use case traces to an approved story
CS4  PASS  every lifeline is a domain class or an explained design component

SUMMARY pass=37 fail=0 error=0
A FAIL you report and explain in lab-report.md §9 costs you nothing. One you hide costs the criterion.
```

**FAILs I am keeping, and why:** "none"

---

## 10. Conclusion (120–180 words)

The AI got the class diagram most wrong by omitting explicit business rule constraints and misusing PlantUML syntax conventions. Specifically, it omitted the required note explaining rule R2 on the Booking class, assuming multiplicities alone could represent time overlap constraints. If nobody had reviewed it, these missing validation notes and improper alt guard syntax in the sequence diagram would have led to race conditions and syntax rendering errors in downstream development.

The AI critique attempted to suggest adding redundant classes like a separate BlockedRoom entity, which was false because a simple boolean attribute on the Room domain concept satisfies rule R3. However, the AI was effective at drafting initial lifeline interactions for the sequence diagram, which provided a solid foundation to refine into a fully validated sequence flow.
