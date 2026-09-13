# AI Generation Log (Rocket)

## Initial Prompt
Build a small program that processes a list of student marks and prints: average, highest, lowest, and pass rate.

## Questions Asked by Rocket
Rocket did not ask clarifying questions directly. Instead, its prompt score reached 80%, and it automatically generated an updated specification.

## Rewritten / Enhanced Prompt & Added Features
Rocket automatically decided to build:
- Stack: Next.js web application with interactive UI
- UI Components: KPI cards for Class Average, Highest Score, Lowest Score, and Pass Rate
- Added configurable pass threshold with live recalculation, grade distribution chart, and per-student status badges
- Implemented add/remove students, inline score editing, search/filter/sort, and paginated student table

## Testing with 4 Cases

1. **Case A (85, 23, 45, 90, 92):**
   - Expected: Valid: 5 | Avg: 67.00 | High: 92 | Low: 23 | Pass Rate: 60.0%
   - Result: Success

2. **Case B (88, 47, -5, 101, abc, 73, 50, , 100):**
   - Expected: Valid: 5 | Avg: 71.60 | High: 100 | Low: 47 | Pass Rate: 80.0%
   - Result: Ui form blocked incorrect information like (-5,abc, or empty input value)

3. **Case C (10, 20, 30):**
   - Expected: Valid: 3 | Avg: 20.00 | High: 30 | Low: 10 | Pass Rate: 0.0%
   - Result: success

4. **Case D (abc, , xyz):**
   - Expected: Message "No valid marks found", no crash
   - Result: Ui form blocked incorrect information like (-5,abc, or empty input value)

