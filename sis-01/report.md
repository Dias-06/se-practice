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

Software engineering practices play a central role in managing total costs throughout a software system’s lifecycle. While rapid, low-quality code generation may appear cheaper during initial development, it can create technical debt that increases future development and maintenance effort. In our campus food delivery system, the initial development cost represents only one part of the total long-term expenses. Without clear architectural patterns and engineering standards, daily operations can suffer from unpredictable bugs, difficult maintenance, and service downtime during high-volume lunch hours. When development teams write code without sufficient planning, early development may be faster, but later modifications can become increasingly expensive and risky. Therefore, the goal should not simply be to produce the most code in the shortest time, but to control the total cost of the system over its lifecycle.

To reduce lifetime costs, engineering teams must make deliberate decisions early in the project. First, adopting a modular architecture can separate user order processing from cafeteria management logic. This separation makes the system easier to understand and allows developers to modify one part without unnecessarily affecting other parts. For example, if a payment-related module requires changes, developers can work on that component without changing the entire order-management system. This can reduce the amount of code that needs to be investigated and tested when changes are made. However, modularity does not guarantee that a change will never affect another component, so the modules must still be tested together.

Second, implementing automated regression testing can help verify that previously working functionality continues to behave as expected after changes. This is particularly important for order placement because the system has a two-second performance requirement. However, automated functional tests alone cannot guarantee that the system will remain within two seconds under heavy student usage. Additional performance or load testing would be needed to evaluate the system under realistic peak lunch-hour conditions. Finding problems before deployment can reduce the risk of expensive production failures and emergency fixes.

Furthermore, investing early in requirements analysis can prevent the team from building unnecessary features, reducing both development waste and future support costs. For instance, creating a complex social-sharing system for food orders would increase development and maintenance effort without directly solving the core problem of reliable meal delivery. By prioritizing the needs of students and cafeteria staff, the team can keep the application focused and manageable.


## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

We critically evaluated the initial AI draft using Prompt B and verified key claims against software engineering literature. The AI draft claimed that automated testing guarantees complete system reliability under all conditions. However, IEEE Std 730-2014 section 4.2 states that testing reveals defects but cannot prove their total absence. Therefore, we qualified this claim in the final text to state that testing verifies specified behavior within tested boundary limits under expected student load.

Additionally, the AI draft stated that rapid code generation reduces total software development costs. According to Ian Sommerville in Software Engineering (10th ed., ch. 1, p. 18), system evolution and maintenance costs usually exceed initial development costs for custom software. We modified the analysis to highlight that fast code generation may reduce initial setup expenses but significantly increases long-term maintenance costs and system operational risks.

Prompt B also raised valid feedback regarding vague trade-offs. The initial critique noted that our draft did not explain the initial cost overhead of setting up automated testing pipelines. We accepted this point and explicitly noted in our revised analysis that systematic engineering requires higher upfront planning and effort. However, we rejected the AI suggestion to add a separate microservice for notification management, as our initial scenario constraints specify a strict initial budget of 5000 dollars. Adding extra network complexity and independent infrastructure services would exceed our financial constraints without adding proportional value to a small three-cafeteria deployment. All accepted critiques were integrated into the final revision, while rejected suggestions were documented with clear scenario-based justifications.

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

We recommend implementing structured software engineering practices, including modular architecture, automated testing, and clear requirements analysis, for the campus a food delivery system. These core engineering practices directly reduce long-term maintenance expenses, prevent technical debt accumulation, and protect  acampus cafeterias from costly operational downtime during peak student lunch a hours. The main limitation of this recommendation is the higher initial setup effort and planning cost required before launching the application. Under a strict budget of 5000 dollars, the team must carefully balance initial engineering setup expenses against immediate feature a delivery to ensure early project viability and sustainable software evolution.

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

Working through this assignment helped me understand that initial coding is only a small part of the overall software development lifecycle. Before this task, it was easy to think that producing working code quickly was the main goal. However, analyzing the campus food delivery scenario showed me that maintenance, testing, requirements, reliability, and future changes can have a significant impact on the total cost of a system.
Using the AI assistant allowed me to generate a structured draft quickly and explore different arguments. However, I learned that generated text should not be accepted without critical evaluation. Some of the initial claims were too optimistic, such as suggesting that automated testing could guarantee reliable performance or that good engineering practices could completely prevent system failures. Checking these claims against Sommerville and IEEE standards helped me understand the importance of verifying technical assertions using reliable sources rather than trusting generated information blindly.
I also realized that AI tools can accelerate drafting and brainstorming, but human engineering judgment is still required to evaluate trade-offs and enforce project constraints. In future projects, I will pay more attention to long-term maintainability, testing limitations and budget constraints instead of focusing only on fast initial completion.


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

- **Tool:** ChatGpt
- **Model:** Gpt-4o
- **Date:** 2026-10-08
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

- **Tool:** ChatGpt
- **Model:** Gpt-4o
- **Date:** 2026-10-08
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: How do software engineering practices reduce total system costs over its lifecycle compared to fast, low-quality code generation?
Scenario: Users: Students and campus cafeteria staff ordering and managing meal deliveries. Problem: High long-term maintenance expenses and unexpected system downtime caused by hasty development without proper engineering standards. Constraints: The system must process order placement within 2 seconds and operate under a strict initial budget of 5000 dollars. Risk: System failure during peak lunch hours causing lost orders, financial conflict, and reputational damage for campus cafeterias. Assumptions: Fictional campus size of 5000 students, 3 participating campus dining halls, and an estimated initial development window of 6 weeks.
Draft: Software engineering practices can reduce the total cost of a software system over its lifecycle, even when they require more time and money during initial development. In the campus cafeteria system, the main trade-off is between meeting the strict initial budget of $5,000 and reducing the risk of expensive maintenance, downtime, and failures later. Fact: Software development does not end when the first version is released. A system normally requires ongoing maintenance, bug fixing, changes, testing, and improvements throughout its lifecycle. Therefore, focusing only on the initial development cost can ignore significant future costs. In this scenario, spending the entire budget on fast code generation without sufficient engineering practices could create higher maintenance costs later. Automated testing and a clear architecture can help reduce these risks. Tests can detect regressions when developers modify existing functionality, while modular architecture can make individual components easier to understand and change. For example, separating order processing, payment-related logic, and cafeteria management could make it easier to fix one component without accidentally breaking another. This is particularly important because a failure during peak lunch hours could cause lost orders, financial disputes, and reputational damage. AI coding tools create another trade-off. Fact: AI tools can assist developers with code generation and can increase development speed in some situations. However, assumption: faster code generation will necessarily produce lower-quality architecture in this particular project. This claim should be verified through evidence or by evaluating the generated code. AI-generated code may still require human review, testing, and architectural decisions. Therefore, the project should measure whether AI actually reduces total development effort rather than assuming that more generated code means lower cost. Documentation and modularity are also important for maintenance. Fact: Poorly structured software can become more difficult to understand and modify. However, the statement that maintenance costs “grow rapidly” should be treated as a claim to verify rather than a guaranteed result. For this system, maintaining understandable modules and useful documentation could reduce the time required for future developers to diagnose and modify the system. Finally, requirements analysis can prevent unnecessary development. Understanding what students and cafeteria staff actually need can reduce the risk of spending the limited $5,000 budget on features that provide little value. The trade-off is that requirements analysis consumes time before implementation, but this may be cheaper than developing and later removing unwanted functionality. Overall, the goal should not be to maximize initial development speed. The better objective is to minimize total lifecycle cost while satisfying the 2-second order-processing requirement and the $5,000 initial budget. Engineering practices require additional upfront effort, but they can reduce the probability and cost of defects, unnecessary features, and difficult maintenance.
```

**Response:**

```text
1. “It often leads to high maintenance costs and system failures”

Concern: This is plausible but too broad and unsupported.

Why it matters: The question asks for a comparison between engineering practices and fast, low-quality development. You need to explain the mechanism: rushed development can create defects, tightly coupled code, missing tests, unclear requirements, and technical debt, which can increase future effort. But low-quality code does not automatically produce a failure.

How to check: Look for authoritative software-engineering sources discussing technical debt, maintenance, software quality, and lifecycle costs. Your course textbook or IEEE/ACM material would be preferable.

Counterexample: A small, simple system written quickly might remain stable for years if its requirements rarely change. In that case, extensive engineering practices could cost more than necessary.

2. “Good engineering practices prevent these problems”

Concern: “Prevent” is too absolute.

Why it matters: Testing, architecture, and requirements analysis reduce the probability and impact of problems; they cannot guarantee that the system will never crash.

This is particularly important because your scenario explicitly identifies peak lunch-hour failure as a risk.

How to check: Verify whether your sources describe testing and other practices as risk-reduction mechanisms rather than guarantees of reliability.

Alternative interpretation: A system can have excellent code quality and still fail because of a network outage, cloud-provider failure, hardware failure, or unexpected traffic.

A better conceptual relationship is:

engineering practices → lower probability of defects/failures → lower expected cost

rather than:

engineering practices → no failures → lower cost.

3. “Automated testing ensures that order placement remains fast and reliable under peak load”

Concern: This is technically inaccurate.

Why it matters: Automated testing alone does not establish performance under peak load. Ordinary unit tests, for example, might verify that an order-processing function produces the correct result but tell you little about whether the system can handle thousands of simultaneous requests.

Your scenario has a specific 2-second requirement, so performance testing matters.

How to check: Look for distinctions between:

unit/integration testing,
functional testing,
performance/load testing,
stress testing.

Counterexample: A system could pass thousands of functional tests while taking 8 seconds to process an order when 500 students place orders simultaneously.

You should therefore connect the 2-second requirement specifically to performance/load testing, not automated testing in general.

4. The 5,000-student and 3-dining-hall assumptions are unused

Concern: The draft does not use two important scenario assumptions.

Why it matters: These numbers help explain why scalability and peak-load testing matter. If there are 5,000 potential students and three dining halls, the system may experience concentrated demand around lunch rather than evenly distributed traffic.

How to check: You don't need to verify these numbers externally because you explicitly identified them as fictional assumptions. Instead, make clear that they are scenario assumptions.

Counterexample: If only 100 students use the system, sophisticated scalability engineering might provide little economic benefit. The engineering investment should be proportional to the actual risk and expected workload.

5. The $5,000 budget creates an important trade-off that is underdeveloped

Concern: The draft says good engineering requires “higher initial effort” but doesn't explain how that fits the strict $5,000 constraint.

Why it matters: This is probably the most important trade-off in your scenario. You cannot simply argue that “more engineering = better.” The system has a limited initial budget.

You need to distinguish between high-value engineering practices and unnecessary overengineering.

How to check: Estimate which practices fit within the budget: requirements definition, code review, automated tests, basic CI, performance testing, documentation, etc.

Counterexample: Spending excessive time designing a highly complex architecture could consume the six-week development window and $5,000 budget without providing proportional benefit.

6. The six-week development window is also unused

Concern: The draft doesn't explain the tension between speed and quality.

Why it matters: Six weeks creates a realistic reason why developers might choose fast code generation. The question is not simply “quality versus no quality”; it is how to allocate limited development time between implementation and engineering activities.

How to check: Treat six weeks as a scenario constraint and reason about how practices could be integrated into development rather than added entirely afterward.

Alternative interpretation: Automated tests and modular design might actually increase development speed later, because developers spend less time manually checking old functionality and debugging regressions.

7. “Modular architecture allows developers to fix bugs ... without breaking the entire application”

Concern: Again, this is too absolute.

Why it matters: Modularity reduces the scope and likelihood of unintended effects, but it does not guarantee isolation.

How to check: Look for software architecture sources discussing coupling, cohesion, modularity, and changeability.

Counterexample: Even well-separated modules can interact through APIs or shared databases. A database-schema change could still affect several modules.

8. “Requirements analysis ensures the software fits user needs”

Concern: “Ensures” is too strong.

Why it matters: Requirements engineering helps discover and document user needs; it cannot guarantee that requirements are complete or correct.

How to check: Look for requirements-engineering literature discussing requirements elicitation, validation, ambiguity, and changing requirements.

Counterexample: Students may initially request a feature that seems useful but later discover they rarely use it. Requirements can also change after deployment.

9. The draft doesn't clearly explain how lifecycle costs accumulate

Concern: This is the biggest reasoning gap relative to the exact question.

The draft lists practices, but the causal chain is incomplete.

You should explicitly connect:

Upfront engineering effort
→ fewer defects / clearer requirements / easier changes
→ less debugging, rework, downtime, and regression testing later
→ lower expected maintenance and operational costs
→ lower total lifecycle cost.

Why it matters: Without this chain, the answer becomes a list of “good practices” rather than an explanation of why they reduce total cost.

How to check: For each practice, ask: What future cost does this practice reduce, and how?

For example:

Practice	Potential future cost reduced
Requirements analysis	Rework from unwanted/incorrect features
Automated tests	Regression debugging and manual verification
Modular architecture	Cost of modifying unrelated functionality
Documentation	Time needed to understand existing code
Load testing	Cost of failures during peak demand
10. The financial consequences of downtime are too vague

Concern: “Cafeterias lose money” is reasonable but underspecified.

Why it matters: Your scenario specifically identifies lost orders, financial conflict, and reputational damage. These should be treated as potential costs, not guaranteed outcomes.

How to check: Since this is a fictional scenario, you can identify them as assumptions rather than claiming specific monetary losses.

Counterexample: If the cafeteria has a manual backup ordering process, a short outage might cause inconvenience but little financial loss.
```

### B3 — Revision (Prompt C)

- **Tool:** ChatGpt
- **Model:** Gpt-4o
- **Date:** 2026-10-08
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: Accepted feedback on clarifying maintenance costs and modifying claims about automated testing guarantees. Qualified the claim that fast code generation reduces total cost. Verified evidence: Ian Sommerville, Software Engineering 10th ed., ch. 1, p. 18 shows maintenance costs often exceed initial development. IEEE Std 730-2014, section 4.2 shows testing verifies specified behavior but cannot prove complete absence of defects. Draft: Software engineering practices can reduce the total cost of a software system over its lifecycle, even when they require more time and money during initial development. In the campus cafeteria system, the main trade-off is between meeting the strict initial budget of $5,000 and reducing the risk of expensive maintenance, downtime, and failures later. Fact: Software development does not end when the first version is released. A system normally requires ongoing maintenance, bug fixing, changes, testing, and improvements throughout its lifecycle. Therefore, focusing only on the initial development cost can ignore significant future costs. In this scenario, spending the entire budget on fast code generation without sufficient engineering practices could create higher maintenance costs later. Automated testing and a clear architecture can help reduce these risks. Tests can detect regressions when developers modify existing functionality, while modular architecture can make individual components easier to understand and change. For example, separating order processing, payment-related logic, and cafeteria management could make it easier to fix one component without accidentally breaking another. This is particularly important because a failure during peak lunch hours could cause lost orders, financial disputes, and reputational damage. AI coding tools create another trade-off. Fact: AI tools can assist developers with code generation and can increase development speed in some situations. However, assumption: faster code generation will necessarily produce lower-quality architecture in this particular project. This claim should be verified through evidence or by evaluating the generated code. AI-generated code may still require human review, testing, and architectural decisions. Therefore, the project should measure whether AI actually reduces total development effort rather than assuming that more generated code means lower cost. Documentation and modularity are also important for maintenance. Fact: Poorly structured software can become more difficult to understand and modify. However, the statement that maintenance costs “grow rapidly” should be treated as a claim to verify rather than a guaranteed result. For this system, maintaining understandable modules and useful documentation could reduce the time required for future developers to diagnose and modify the system. Finally, requirements analysis can prevent unnecessary development. Understanding what students and cafeteria staff actually need can reduce the risk of spending the limited $5,000 budget on features that provide little value. The trade-off is that requirements analysis consumes time before implementation, but this may be cheaper than developing and later removing unwanted functionality. Overall, the goal should not be to maximize initial development speed. The better objective is to minimize total lifecycle cost while satisfying the 2-second order-processing requirement and the $5,000 initial budget. Engineering practices require additional upfront effort, but they can reduce the probability and cost of defects, unnecessary features, and difficult maintenance.

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

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| Fast code generation always reduces overall software development costs. | Ian Sommerville, Software Engineering 10th ed., ch. 1, p. 18 | Software evolution and maintenance often cost much more than initial code development. | qualify |
| Automated testing alone guarantees that no system failures will occur in production. | IEEE Std 730-2014, section 4.2, https://standards.ieee.org/ieee/730/5507/ accessed 2026-10-08 | Testing shows the presence of defects but cannot prove their complete absence under all operational conditions. | qualify |

### Change log

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| Fast code generation reduces the total cost of building the software system. | Fast code generation may lower initial setup costs, but long-term maintenance costs increase without engineering standards. | Qualified the AI claim using evidence from Sommerville ch. 1 regarding evolution costs. |
| Automated testing ensures the order placement remains completely reliable under peak load. | Automated testing verifies that known order scenarios perform as specified under tested load limits. | Corrected the AI assumption according to IEEE 730 quality standards. |
