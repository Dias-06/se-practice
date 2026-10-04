# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every `<...>`
> placeholder; a row that still contains `<...>` counts as empty.

---

## 1. Setup

| Field | Value |
| --- | --- |
| Name | <your name> |
| Group | <your group> |
| AI assistant | <e.g. Claude, ChatGPT, Gemini, DeepSeek, Grok> |
| Exact model | <the exact model name with its version, e.g. claude-sonnet-4-5> |
| Renderer | <PlantUML web server / VS Code extension / IntelliJ plugin / local jar> |
| Behaviour diagram | <sequence / activity / both> |
| Stories used | <my week-03 stories, revised / the reference set from README §3> |

---

## 2. Prompts as sent

Paste every prompt **exactly as you sent it**, in the order you sent it, one code block each. The
AI's first replies are saved as files in `models/original/` — do not paste them here.

### 2.1 Task 1 — use-case prompt

```text
<paste>
```

### 2.2 Task 2 — class prompt

```text
<paste>
```

### 2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)

```text
<paste>
```

### 2.4 Focused correction prompts (if you sent any)

```text
<paste, or write "none">
```

### 2.5 Critique prompt

```text
<paste>
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

Run the critique prompt once, on all your revised diagrams together. At least **three** rows. A
critique is another claim to evaluate, not a verdict: reject what is wrong and say why.

| # | Issue the AI raised | Element it cited | Verdict | Why |
| --- | --- | --- | --- | --- |
| 1 | <issue> | <element> | <accept / reject> | <your reason> |
| 2 | <issue> | <element> | <accept / reject> | <your reason> |
| 3 | <issue> | <element> | <accept / reject> | <your reason> |

---

## 7. Consistency table

One row for each of **R1–R4**, then one row for **every use case in your revised use-case
diagram**, spelled exactly as in the diagram, with the story ID it traces to.

| Requirement / story | Use case | Classes | Behaviour element |
| --- | --- | --- | --- |
| R1 | <use case> | <classes and attributes> | <message, guard or decision> |
| R2 | <use case> | <classes, note> | <message, guard or decision> |
| R3 | <use case> | <classes and attributes> | <message, guard or decision> |
| R4 | <use case> | <classes> | <message or action> |
| <US-01> | <Book room> | <Student, Booking, Room> | <message or action> |

---

## 8. Change log

At least **three** rows, and at least one for each required diagram (use case, class, your
behaviour diagram). "Before" is what the AI produced; "After" is what you submitted.

| # | Diagram | Before (AI's original) | After (your revision) | Reason |
| --- | --- | --- | --- | --- |
| 1 | <use case> | <before> | <after> | <rule, story or notation reason> |
| 2 | <class> | <before> | <after> | <reason> |
| 3 | <sequence / activity> | <before> | <after> | <reason> |

---

## 9. Checker output

Paste the complete output of `python tests/check_models.py`, then explain **every FAIL you are
keeping**. The same IDs go in `submission.yml` under `checker.kept_fails`. A FAIL you report and explain costs you nothing. One you hide costs the whole criterion.

```text
<paste the full output>
```

**FAILs I am keeping, and why:** <one line per check ID, or "none">

---

## 10. Conclusion (120–180 words)

<Which diagram did the AI get most wrong, and what exactly was wrong? Which error would have
reached the code if nobody had reviewed it? What did the critique find that you missed — and what
did it claim that was false? Be specific: "the AI got the multiplicities wrong" is worth nothing;
"the AI put 1..* on the Booking end, which says every room must already have a booking" is worth
everything.>
