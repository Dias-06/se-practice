# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name: Mukashev Dias**
**Group: Monday: 16:00-19:00**
**Date: 20.09.2026**

> Fill in every section. **Do not delete or renumber the headings** — the grading pass reads them
> by number. If something did not happen, write "did not happen" and why; an empty section and a
> fabricated one are graded the same way.

---

## 1. The frozen experiment

| | |
| --- | --- |
| AI assistant | ChatGpt |
| Exact model name |GPT-5.6 Luna |
| Implementation language | Python |
| Date of the runs | 20.09.2026 |

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:

```
(paste here, or write "n/a — used Python")
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes
- No follow-up questions were asked before Part 7: yes 
- Every output was saved **before** any editing: yes 

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence): Write Python code to analyze student marks.

```

```

**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass
threshold, a rounding rule, an input method, an invented feature all count.

1.It hardcoded a dictionary of 5 sample students with specific names and marks instead of accepting dynamic input.
2.It assumed a hardcoded pass threshold of 50.
3.It printed formatted text directly to the console (CLI output) instead of defining a reusable function or returning a structure.
4.It created separate lists for "passed" and "failed" students with their names instead of computing a overall pass rate percentage.

**Questions it should have asked and did not:**

1.What format should the input marks be provided in (a list, a dictionary, or function parameters)?

2.Should the output be returned as a data structure or printed to the console?


**Is the function named `analyze_marks` with the required signature?** no — it wrote a top-level script with no function defined at all.

**First impression before testing** (one sentence — you will compare this with section 6 later):
The AI produced a working script for its own sample data, but completely failed to provide the required analyze_marks function, so it will trigger an ERROR in the test harness.
---

## 3. Prompt B — structured context

**Prompt sent** (paste it in full, including any substitutions):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100; raise ValueError for an empty list, non-numeric values, or out-of-range values. Use no external libraries. Return code plus a short explanation
```

**What B fixed compared to A:**

It defined the required function signature analyze_marks(marks, pass_mark=50) and returned a dictionary with the exact requested keys.

It implemented explicit input validation for empty lists, non-numeric values, and out-of-range numbers, raising a ValueError for invalid cases.

**What B still leaves open:**

1It does not specify whether pass_rate should be rounded to 2 decimal places or returned as a raw float.

It leaves floating-point precision in average and pass_rate open to raw Python division.

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40, pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list, text value, and marks below 0 or above 100. State any remaining assumptions before the code.
```

**Tests the AI wrote for itself** — how many, and which situations do they cover?

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark | yes|
| decimals | yes|
| custom pass_mark | yes |
| empty list | yes |
| text value | yes |
| below 0 / above 100 | yes |

**Do the AI's own tests pass against the AI's own code?** yes 

**Do they agree with the harness in section 6?** yes — all test cases in the AI's own code align with the harness specifications.

**Assumptions C stated explicitly before the code:**The AI assumed that pass_rate should be rounded to 2 decimal places using round(..., 2), boolean values should be explicitly rejected, and the result dictionary must maintain exact key names. 

---

## 5. Prompt D — my combined prompt

**The complete prompt I wrote** (one message, sent to a fresh chat):

```
You are a senior Python developer. Implement the function analyze_marks(marks, pass_mark=50).

Requirements:
1. Accept a list of marks (int or float) and an optional pass_mark threshold (default 50).
2. Input Validation:
   - Raise a ValueError if marks is an empty list.
   - Raise a ValueError if marks contains any non-numeric value or boolean (note: bool is a subclass of int in Python, so explicitly reject bool).
   - Raise a ValueError if any mark is strictly less than 0 or strictly greater than 100.
3. Computation & Return Format:
   - Return a standard Python dictionary with exact keys: "average", "highest", "lowest", "pass_rate".
   - "average": float mean of all marks.
   - "highest": maximum mark in the list.
   - "lowest": minimum mark in the list.
   - "pass_rate": percentage of marks that are >= pass_mark, rounded to exactly 2 decimal places using round(..., 2).
4. Constraints: Use only the standard Python library; do not import external packages.

Return only the clean implementation code without additional commentary.

```

**What I deliberately added that A, B and C did not have:**

Explicit instruction to reject bool types, which pass isinstance(x, (int, float)) in Python by default.

Explicit specification that pass_rate must be rounded to 2 decimal places using round(..., 2).

Strict requirement to return clean implementation code without unnecessary conversational text or noise.

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**

The primary ambiguity was whether pass_rate should be a raw float or rounded to 2 decimal places, and how boundary casс should be treated. I resolved this in Prompt D by explicitly mandating mark >= pass_mark and round((passed_count / total_count) * 100, 2).

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | | | | |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | | | | |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | | | | |
| 4 | `analyze_marks([], 50)` | raises ValueError | | | | |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | | | | |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | | | | |
| | **Totals** | | 0/6 | 6/6 | 6/6 | 6/6 |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
Prompt A | All (1-6) | ERROR: week-02/code/prompt_a.py defines no callable named 'analyze_marks' |
| | | |
| | | |
| | | |

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```
ERROR: week-02/code/prompt_a.py defines no callable named 'analyze_marks'.
All six cases count as ERROR. Record that in lab-report.md.

```

**Prompt B**

```
========================================================================
analyze_marks harness — week-02/code/prompt_b.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks cannot be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: all marks must be numeric
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: all marks must be between 0 and 100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_b.py)
========================================================================
```

**Prompt C**

```
{'average': 60.0, 'highest': 80, 'lowest': 40, 'pass_rate': 66.67}
========================================================================
analyze_marks harness — week-02/code/prompt_c.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must not be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: all marks must be numeric
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: marks must be between 0 and 100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_c.py)
========================================================================
```

**Prompt D**

```
========================================================================
analyze_marks harness — week-02/code/prompt_d.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must not be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: marks must contain only int or float values
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: marks must be between 0 and 100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_d.py)
========================================================================
```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | 0 | 2 | 2 | 2 |
| Requirement coverage | 0 | 2 | 2 | 2 |
| Verifiability (tests) | 0 | 0 | 2 | 2 |
| Assumptions stated | 0 | 1 | 2 | 2 |
| Noise (2 = none) | 0 | 1 | 1 | 2 |
| **Total / 10** | **0** | **6** | **9** | **10** |

**Prompt length, in words:** A 8 · B 44 · C 83 · D 136

**Words added per point gained:**
- B over A: 36 words for 6 points gained (6 words/point).
- C over B: 39 words for 3 points gained (13 words/point).
- D over C: 53 words for 1 point gained (53 words/point).

---

## 8. Conclusion — 150–200 words

```text
Prompt D scored best (10/10) and is the prompt I would actually use at work because it provides complete constraints, type safety specifications, and zero conversational noise. Prompt A failed completely (0/6 PASS) due to missing the required function signature, returning an unrequested CLI script instead.

The single addition that bought the most correctness between Prompt A and B was explicitly specifying the function signature analyze_marks(marks, pass_mark=50), the exact return dictionary keys, and the required ValueError exceptions. This single structural context shift immediately brought correctness from 0 to 6 passed test cases.

Prompt C added executable self-tests and example usage, which were beneficial for verifiability but added minor output noise.

The specification contained ambiguity regarding floating-point precision for pass_rate and explicit handling of boolean values (since bool is an int subclass in Python). In Prompt D, I resolved this by explicitly requiring round(..., 2) for pass_rate and adding explicit type checks to reject boolean inputs.

---
Word count: 168

## 9. Two questions for the debrief

Written before class, answered in class.

1. Why did Prompt A generate a hardcoded script with a CLI instead of asking for clarification or writing a reusable function?
2. Is it worth writing longer, highly detailed prompts like Prompt D in real-world development, or is an iterative approach (starting with Prompt B and refining) more efficient?
