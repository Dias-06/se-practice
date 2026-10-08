# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.3

<!-- Exactly one of 1.1 … 1.10, e.g.  **Topic:** 1.4  -->

---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->
**Question:** How do software engineering practices reduce total system costs over its lifecycle compared to fast, low-quality code generation?
**Users:** Students and campus cafeteria staff ordering and managing meal deliveries.
**Problem:** High long-term maintenance expenses and unexpected system downtime caused by hasty development without proper engineering standards.
**Constraints:** The system must process order placement within 2 seconds and operate under a strict initial budget of $5,000.
**Risk:** System failure during peak lunch hours causing lost orders, financial conflict, and reputational damage for campus cafeterias.
**Assumptions:** Fictional campus size of 5,000 students, 3 participating campus dining halls, and an estimated initial development window of 6 weeks.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

(write here)

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

(write here)

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

(write here)

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

(write here)

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->
- Ian Sommerville, Software Engineering, 10th ed., Pearson, 2015.
- IEEE Standard for Software Quality Assurance Processes, IEEE Std 730-2014, 2014. https://standards.ieee.org/ieee/730/5507/ accessed 2026-10-08

## 7. Appendix A — Initial outline
1. Initial development is only a small fraction of total software lifecycle cost.
2. Automated testing and clear architecture reduce expensive bug fixes in production.
3. AI tools speed up code generation but can introduce subtle architectural debt.
4. Maintenance costs grow rapidly if code lacks clear documentation and modularity.
5. Investing in requirements analysis prevents building features that users do not need.

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

- **Tool:** (ChatGpt)
- **Model:** (Gpt-4o)
- **Date:** (08-10-2026)
- **Purpose:** contextual draft

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.3 How do software engineering practices reduce total system costs over its lifecycle compared to fast, low-quality code generation? for a first-year-level university assignment.

My scenario is Users: Students and campus cafeteria staff ordering and managing meal deliveries. Problem: High long-term maintenance expenses and unexpected system downtime caused by hasty development without proper engineering standards. Constraints: The system must process order placement within 2 seconds and operate under a strict initial budget of 5000 dollars. Risk: System failure during peak lunch hours causing lost orders, financial conflict, and reputational damage for campus cafeterias. My initial ideas are 1. Initial development is only a small fraction of total software lifecycle cost. 2. Automated testing and clear architecture reduce expensive bug fixes in production. 3. AI tools speed up code generation but can introduce subtle architectural debt. 4. Maintenance costs grow rapidly if code lacks clear documentation and modularity. 5. Investing in requirements analysis prevents building features that users do not need. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
Software engineering practices can reduce the total cost of a software system over its lifecycle, even when they require more time and money during initial development. In the campus cafeteria system, the main trade-off is between meeting the strict initial budget of $5,000 and reducing the risk of expensive maintenance, downtime, and failures later.

**Fact:** Software development does not end when the first version is released. A system normally requires ongoing maintenance, bug fixing, changes, testing, and improvements throughout its lifecycle. Therefore, focusing only on the initial development cost can ignore significant future costs. In this scenario, spending the entire budget on fast code generation without sufficient engineering practices could create higher maintenance costs later.

Automated testing and a clear architecture can help reduce these risks. Tests can detect regressions when developers modify existing functionality, while modular architecture can make individual components easier to understand and change. For example, separating order processing, payment-related logic, and cafeteria management could make it easier to fix one component without accidentally breaking another. This is particularly important because a failure during peak lunch hours could cause lost orders, financial disputes, and reputational damage.

AI coding tools create another trade-off. **Fact:** AI tools can assist developers with code generation and can increase development speed in some situations. However, **assumption:** faster code generation will necessarily produce lower-quality architecture in this particular project. This claim should be verified through evidence or by evaluating the generated code. AI-generated code may still require human review, testing, and architectural decisions. Therefore, the project should measure whether AI actually reduces total development effort rather than assuming that more generated code means lower cost.

Documentation and modularity are also important for maintenance. **Fact:** Poorly structured software can become more difficult to understand and modify. However, the statement that maintenance costs “grow rapidly” should be treated as a claim to verify rather than a guaranteed result. For this system, maintaining understandable modules and useful documentation could reduce the time required for future developers to diagnose and modify the system.

Finally, requirements analysis can prevent unnecessary development. Understanding what students and cafeteria staff actually need can reduce the risk of spending the limited $5,000 budget on features that provide little value. The trade-off is that requirements analysis consumes time before implementation, but this may be cheaper than developing and later removing unwanted functionality.

Overall, the goal should not be to maximize initial development speed. The better objective is to minimize **total lifecycle cost** while satisfying the 2-second order-processing requirement and the $5,000 initial budget. Engineering practices require additional upfront effort, but they can reduce the probability and cost of defects, unnecessary features, and difficult maintenance.

```

### B2 — Critique (Prompt B)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** critical review of the draft

**Prompt:**

```text
(paste here)
```

**Response:**

```text
(paste here)
```

### B3 — Revision (Prompt C)

- **Tool:** (ChatGpt)
- **Model:** (Gpt-4o)
- **Date:** (08-10-2026)
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: Accepted feedback on clarifying maintenance costs and modifying claims about automated testing guarantees. Qualified the claim that fast code generation reduces total cost. Verified evidence: Ian Sommerville, Software Engineering 10th ed., ch. 1, p. 18 shows maintenance costs often exceed initial development. IEEE Std 730-2014, section 4.2 shows testing verifies specified behavior but cannot prove complete absence of defects. Draft: Software engineering practices reduce long-term system costs by focusing on quality, maintainability, and proper architecture from the beginning. While fast, low-quality code generation may seem cheaper initially, it often leads to high maintenance costs and system failures. In a campus food delivery system, hasty development without clear engineering standards creates hidden expenses. For example, if the system crashes during peak lunch hours, cafeterias lose money and students face delays. Good engineering practices prevent these problems by using structured requirements, automated testing, and modular design. Automated testing ensures that order placement remains fast and reliable under peak load. Modular architecture allows developers to fix bugs or update features without breaking the entire application. Investing in requirements analysis ensures the software fits user needs without wasted effort on unnecessary features. Although applying software engineering methods requires higher initial effort and planning, it significantly lowers total lifecycle costs by preventing system downtime and reducing long-term repair work.

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
Software engineering practices can reduce total system costs by addressing quality, maintainability, and reliability throughout the software lifecycle rather than focusing only on initial development speed. Ian Sommerville notes that maintenance costs often exceed initial development costs, which supports the idea that the initial development budget is only part of the total cost of a software system (Sommerville, *Software Engineering*, 10th ed., Chapter 1, p. 18). For the campus food delivery system, this is important because the initial budget is limited to $5,000, while future maintenance and operational problems could create additional costs.

Fast code generation may appear cheaper because more functionality can be produced within the six-week development window. However, this does not necessarily mean that it produces the lowest total lifecycle cost. If hasty development results in defects, unclear structure, or difficult-to-maintain code, developers may need to spend additional time debugging and modifying the system after deployment. In this scenario, an outage during peak lunch hours could also result in lost orders, financial disputes, delays for students, and reputational damage to the participating cafeterias. These are potential costs rather than guaranteed outcomes.

Several software engineering practices can reduce these risks. Requirements analysis can help the team identify what students and cafeteria staff actually need before development resources are spent. This is particularly relevant when the project has only six weeks and a $5,000 initial budget, because unnecessary features could consume limited resources.

Automated testing can also help detect whether the system behaves according to its specified requirements. However, testing cannot prove that a system contains no defects (IEEE Std 730-2014, Section 4.2). Therefore, automated testing should not be described as guaranteeing reliable performance. For this system, separate performance or load testing would be needed to evaluate whether order placement meets the required two-second limit under expected peak demand.

Modular architecture can also make future changes and bug fixes easier by reducing unnecessary dependencies between components. However, it cannot guarantee that changes will never affect other parts of the application. Clear documentation can similarly reduce the effort required for future developers to understand and modify the system.

Overall, the trade-off is between spending some of the limited initial budget and development time on engineering practices versus accepting potentially higher future costs. The available evidence supports the importance of considering maintenance costs, but it does not establish that these practices will produce a specific amount of savings for this fictional campus system. Their value should therefore be evaluated in relation to the system's risks, two-second performance requirement, $5,000 budget, and expected workload.

```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| Fast code generation always reduces overall software development costs. | Ian Sommerville, Software Engineering 10th ed., ch. 1, p. 18 | Software evolution and maintenance often cost much more than initial code development. | qualify |
| Automated testing alone guarantees that no system failures will occur in production. | IEEE Std 730-2014, section 4.2, https://standards.ieee.org/ieee/730/5507/ accessed 2026-10-08 | Testing shows the presence of defects but cannot prove their complete absence under all operational conditions. | qualify |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| Fast code generation reduces the total cost of building the software system. | Fast code generation may lower initial setup costs, but long-term maintenance costs increase without engineering standards. | Qualified the AI claim using evidence from Sommerville ch. 1 regarding evolution costs. |
| Automated testing ensures the order placement remains completely reliable under peak load. | Automated testing verifies that known order scenarios perform as specified under tested load limits. | Corrected the AI assumption according to IEEE 730 quality standards. |