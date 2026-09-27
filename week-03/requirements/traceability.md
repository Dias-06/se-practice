# Traceability — use cases → stories → criteria

One row per use case. All six rows stay, even the ones with nothing behind them: an empty cell is a finding you report, not a failure you hide. Use real IDs, comma-separated; write `none` where there is nothing.

| Use case | Stories (US-nn) | Criteria (AC-nn) | Gap? |
| --- | --- | --- | --- |
| UC-01 View availability | US-01 | AC-01, AC-02, AC-03 | No gap |
| UC-02 Book room | US-02 | AC-04, AC-05, AC-06, AC-07 | No gap |
| UC-03 Cancel booking | US-03 | none | Missing AC |
| UC-04 Block or unblock room | US-04 | AC-08, AC-09, AC-10 | No gap |
| UC-05 Review usage | US-05 | none | Missing AC |
| UC-06 Send confirmation | US-06 | none | Missing AC |

**Stories that belong to no use case:** US-07

**What the gaps tell you:** The system covers all 6 core use cases with user stories, but detailed acceptance criteria were deliberately written for only three selected stories (US-01, US-02, US-04) as required by the assignment, leaving AC gaps for UC-03, UC-05, and UC-06.
