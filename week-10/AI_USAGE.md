# AI Usage Disclosure — Week 10

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| ------ | ------ | ------ | ------ |
| ChatGPT | GPT-4o | read-only risk review (Task 2) | none — "WITHOUT editing files" |
| ChatGPT | GPT-4o | AGENTS.md review and patch draft (Task 6) | app/AGENTS.md, only after my approval |
| ChatGPT | GPT-4o | minimal patches for two risks (Task 8) | app/src/booking.ts (with human finite-number guard added) |

**The review in Task 2 ran in a mode where the assistant could not edit, and `git status` showed no
change afterwards:** yes / no
<!-- If it edited anything, say what and how you undid it. -->

**The review in Task 2 ran in a mode where the assistant could not edit, and `git status` showed no
change afterwards:** yes

**I labelled every claim in lab-report.md §3.2 after opening the cited file myself:** yes

**Every change to `app/` was reviewed by me as a diff before I accepted it:** yes (in §8 I rejected leaving the `NaN`/`Infinity` bug unfixed in `src/booking.ts` and rejected adding a new heading in `app/AGENTS.md`)

**I used another assistant as well (to explain a risk, to draft text in lab-report.md, …):** no

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain every score in my register, and why my release decision follows from it, without
the assistant:** yes

**Anything I accepted from the AI without fully understanding it:** none
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->

Signed: Dias
Date: 24.11.2026
