# Week 09 — Lab Report: canBook as a Tool

Fill in every section. Do not delete or renumber the headings: the README and the checker point at
them. Replace every `<!-- comment -->` with your own text (comments are ignored by the checker).

**Name:** Dias
**Student ID:** 24B031886
**GitHub:** Dias-06

---

## 1. Setup

| | |
| --- | --- |
| Assistant (frozen for the whole lab) | ChatGPT |
| Exact model (or "not displayed") | GPT-4o |
| Three fresh chats for R1, R2, R3? (yes / no) | yes |
| Python version (`python --version`) | Python 3.14.3 |

## 2. Tool definition (`tool/check_room.json`)

```json
{
  "name": "check_room",
  "description": "Checks whether a study room is available for a requested time slot. This tool only checks availability and does not save or create a booking. All time values (start, end, now, and existing bookings) must be whole integer minutes since midnight in the range 0 to 1440.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested booking start time in whole minutes since midnight (0 to 1440)."
      },
      "end": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested booking end time in whole minutes since midnight (0 to 1440)."
      },
      "now": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Current time in whole minutes since midnight (0 to 1440)."
      },
      "blocked": {
        "type": "boolean",
        "description": "Whether the room is currently blocked by an administrator (true or false)."
      },
      "bookings": {
        "type": "array",
        "description": "List of existing bookings for the room, each with start and end in whole minutes since midnight (0 to 1440). May be empty.",
        "items": {
          "type": "object",
          "properties": {
            "start": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440,
              "description": "Existing booking start time in whole minutes since midnight."
            },
            "end": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440,
              "description": "Existing booking end time in whole minutes since midnight."
            }
          },
          "required": ["start", "end"],
          "additionalProperties": false
        }
      }
    },
    "required": ["start", "end", "now", "blocked", "bookings"],
    "additionalProperties": false
  }
}

```

| Field | Constraint (e.g. `"type": "integer"`, `"maximum": 1440`) | What goes wrong without it |
| --- | --- | --- |
| `start`, `end`, `now` | `"type": "integer"`, `"minimum": 0`, `"maximum": 1440` | The model could send a string like `"11:00"` (S03), a fractional minute like `600.5` (S10), a negative value like `-30` (S06), or a time past the end of the day like `1500` (S07). |
| `blocked` | `"type": "boolean"` | The model could send the string `"false"` (S09) instead of a real boolean, and a non-empty string could be treated as true. |
| `bookings` | `"type": "array"`, items are objects with required integer `start` and `end` (0..1440) and `"additionalProperties": false` | The model could send a pair like `[660, 720]` (S12) or a booking with no `end` like `{start: 660}` (S08). |
| root object | `"required": ["start", "end", "now", "blocked", "bookings"]`, `"additionalProperties": false` | The model could leave out `now` (S04) or invent a field that does not exist, like `"room": "204"` (S05). |

## 3. The twelve calls — first run and final run

Your **first** run's S verdicts (before any fix), and your final ones. For every case that changed,
say what you changed.

| Case | First run | Final run | What you changed |
| --- | --- | --- | --- |
| S01 | PASS | PASS | Already valid in the starter schema; kept all 5 required fields valid. |
| S02 | PASS | PASS | Allowed an empty array `[]` for `bookings` without setting `minItems: 1`. |
| S03 | FAIL | PASS | Added `"type": "integer"` on `end` so the string `"11:00"` is refused. |
| S04 | FAIL | PASS | Added `now` to the `required` array so a missing `now` is refused. |
| S05 | FAIL | PASS | Added `"additionalProperties": false` at the root so the extra `"room"` field is refused. |
| S06 | FAIL | PASS | Added `"minimum": 0` on `start` so `-30` is refused. |
| S07 | FAIL | PASS | Added `"maximum": 1440` on `end` so `1500` is refused. |
| S08 | FAIL | PASS | Defined `bookings.items` as an object with `"required": ["start", "end"]` so `{start: 660}` is refused. |
| S09 | FAIL | PASS | Added `"type": "boolean"` on `blocked` so the string `"false"` is refused. |
| S10 | FAIL | PASS | Used `"type": "integer"` (instead of `number`) on `start` so `600.5` is refused. |
| S11 | PASS | PASS | Set `"maximum": 1440` inclusive so `1440` (24:00) is still accepted. |
| S12 | FAIL | PASS | Set `bookings.items` to `"type": "object"` so the pair `[660, 720]` is refused. |

## 4. Function calling — what the model wrote

For each request, paste the model's reply exactly, then judge it against the request.

### R1

```text
{
  "name": "check_room",
  "arguments": {
    "start": 600,
    "end": 660,
    "now": 540,
    "blocked": false,
    "bookings": [
      {
        "start": 660,
        "end": 720
      }
    ]
  }
}

```

<!-- Match? If F3 failed, which argument differs, and who was wrong: the model or the request? -->

### R2

```text
{"name":"check_room","arguments":{"start":840,"end":990,"now":810,"blocked":true,"bookings":[]}}

```

<!-- Same. R2 is a call that SHOULD be made, although canBook will say Unavailable. Did the model refuse to call? -->

### R3

```text
What time tomorrow afternoon would you like to start and finish? For example, 14:00–16:00.
```

<!-- What information was missing? Did the model ask, or call? If it called, which values did it invent, and from where? -->
Missing information: exact start time, exact end time ("tomorrow afternoon for a couple of hours" is ambiguous), current time now, blocked status, and existing bookings. Instead of hallucinating or guessing default numbers, the model followed instructions and asked one short clarifying question (F7 PASS).

## 5. What the schema cannot check

<!-- Name the acceptance criteria (AC1-AC6, README section 3) that a JSON Schema with the allowed keywords cannot
     enforce, and say why for each. At least two, by their AC number. Which part of AC1 CAN the schema enforce? -->
AC1 (relational ordering and future start): The schema enforces integer bounds 0 <= start <= 1440, 0 <= end <= 1440, and 0 <= now <= 1440, but JSON Schema with the allowed keywords cannot compare two fields against each other to enforce start < end or start > now.

AC2 (maximum 120-minute duration): The schema cannot compute end - start <= 120 because JSON Schema has no arithmetic expressions across fields; a 150-minute request like R2 (840 to 990) is structurally valid and must be rejected by canBook.

AC3 (business policy on blocked rooms): The schema checks that blocked is a boolean (true or false), not the business rule that blocked == true always forces an Unavailable result.

AC4 (interval overlap detection): The schema verifies that bookings is a list of {start, end} objects, but it cannot iterate over the array to check whether start < existing.end && existing.start < end or permit touching endpoints.

AC5 & AC6 (side-effect purity and UI feedback): A static input schema validates incoming JSON shape only; it cannot verify that the implementation does not mutate state or persist bookings (AC5), nor how the UI displays feedback to the user (AC6).

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | allow | Calling `check_room` is a read-only validation step that modifies no files or state and cannot cause harm. |
| A2 | read `week-08/app/src/booking.ts` | allow | Reading source code in the repository is safe and necessary for the agent to understand the existing booking logic without altering anything. |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | block | Silently weakening a core acceptance criterion (AC2) to satisfy a single user request violates the system specification and introduces a business-logic bug. |
| A4 | run `npm test` in `week-08/app` | allow | Running the existing automated test suite is a safe, local verification action that detects regressions without modifying code or git history. |
| A5 | run `git reset --hard` to undo its own last three edits | block | Destructive git commands like `git reset --hard` permanently erase uncommitted work and local changes that might include human edits. |
| A6 | `git commit` its change on the `week-09` branch | ask | Creating commits alters repository history and should require human review to verify the diff and commit message before recording it. |
| A7 | `git push` to `main` | block | Pushing directly to `main` violates the course workflow rules requiring all work to stay in `week-NN` branches and open Pull Requests. |
| A8 | send the contents of `.env` to an MCP server it found online | block | Exfiltrating `.env` to an untrusted external server leaks API keys, tokens and credentials, creating a severe security breach. |

## 7. Checkpoint

<!-- The commit you would make before letting such an agent edit anything: its real SHA (git log --oneline),
     the exact command that returns you to it, and what that command would throw away. -->
e296233

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text
PASS  D1    tool/check_room.json exists and is valid JSON
PASS  D2    has name, description and inputSchema
PASS  D3    name is exactly "check_room"
PASS  D4    description: 25+ words, says minutes, 1440, and that it does not save
PASS  D5    inputSchema: an object with exactly the five fields, all required
PASS  D6    inputSchema uses only the keywords listed in README section 5
PASS  S01   the R1 call, valid -> accept
PASS  S02   no existing bookings: bookings = [] -> accept
PASS  S03   end as a string: "11:00" -> refuse
PASS  S04   now missing -> refuse
PASS  S05   an extra field: "room": "204" -> refuse
PASS  S06   start below the day: -30 -> refuse
PASS  S07   end beyond the day: 1500 -> refuse
PASS  S08   a booking with no end: {start: 660} -> refuse
PASS  S09   blocked as a string: "false" -> refuse
PASS  S10   start not a whole minute: 600.5 -> refuse
PASS  S11   end at the end of the day: 1440 -> accept
PASS  S12   a booking as a pair: [660, 720] -> refuse
PASS  F1    calls\r1.json: a call to check_room
PASS  F2    calls\r1.json: arguments valid against your schema
PASS  F3    calls\r1.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F4    calls\r2.json: a call to check_room
PASS  F5    calls\r2.json: arguments valid against your schema
PASS  F6    calls\r2.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F7    calls/r3: exactly one of r3.json (it called) or r3.txt (it asked), not empty
PASS  L1    section 5 names at least two acceptance criteria (AC1-AC6) the schema cannot check
PASS  L2    section 6: A1-A8 each have allow / ask / block and a reason of 5+ words
PASS  L3    section 7 names the checkpoint commit (a SHA)
PASS  L4    section 10: a conclusion of 80-150 words
PASS  L5    AI_USAGE.md filled in (a tool row, and signed)

SUMMARY: 30 PASS · 0 FAIL · 0 ERROR  (of 30 checks)

```

## 9. What still fails

<!-- Every check in submission.yml known_fails, with the reason. "None" if all 30 pass. -->

## 10. Conclusion (80–150 words)

<!-- What did you learn about the line between the schema, the model and the function? Be specific:
     name a case, a request or an action. "Tool definitions are important" is worth nothing. -->
This lab clarified the strict boundary between structural validation in a tool schema, natural-language translation by a model, and domain logic inside the function. In Part 1, adding constraints like integer and additionalProperties: false to check_room.json blocked malformed inputs such as string times (S03), missing now (S04), and extra fields (S05), yet the schema still accepted R2 (840 to 990, 150 minutes) because JSON Schema cannot enforce relational rules like AC1 (start > now) or AC2 (end - start <= 120). In Part 2, GPT-4o accurately converted R1 and R2 into minutes and responsibly asked a question on R3 instead of guessing missing arguments. Finally, Part 3 showed why agents need explicit guardrails—blocking destructive commands like A5 (git reset --hard), direct pushes to main (A7), and credential leaks (A8).
