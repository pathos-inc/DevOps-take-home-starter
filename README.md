# Pathos — DevOps / Security Take-Home Exercise

Welcome, and thank you for investing time in our process.

This is not a greenfield build exercise. You will receive a **working codebase** — a small clinical trial data service that another engineer wrote. It runs. Its tests pass. Your job is to find what's wrong with it — especially the security problems — get it ready to ship, and make a hard architectural decision.

We explicitly permit and expect AI assistance. We use AI tools at Pathos every day. What we're evaluating is your **judgment, debugging process, and decision-making** — the things that remain distinctly human even when AI writes code faster than we can.

**Window:** 5 calendar days from receipt  
**Submission:** See [Submission](#submission) below — do **not** fork this repository.

---

## Background

Pathos builds a pharmaceutical intelligence platform. The codebase you're receiving is a small service that:
- Serves clinical trial data via a REST API with filtering, sorting, and search
- Provides a streaming AI-powered analysis endpoint using the Vercel AI SDK
- Includes a small test suite that passes

The server runs. The tests pass. **But the codebase has real problems** — the kind that cause breaches and incidents in production.

---

## Part 1 — Security & Reliability Bug Hunt (find and fix)

The repository contains **at least 5 bugs**. Some are subtle. Some are severe. None are syntax errors — the code compiles and the existing tests pass.

We planted bugs that mirror real issues we've encountered at Pathos: credential handling mistakes, information exposure, input validation gaps, data integrity problems, and plain logic bugs.

**Your deliverables for Part 1:**

1. Create a file called `BUG_REPORT.md` in the project root. For each bug you find:
   - Describe the bug and how you discovered it
   - Explain the real-world impact (what would happen in production). For security findings, describe the attack: who can exploit it, how, and what they get
   - Show your fix (reference the file and line)
   - Explain why your fix is correct
   - If there was a tradeoff in how to fix it, explain the alternatives you considered

2. Fix the bugs in the code.

3. Write at least one test per bug that would have caught it. Add these to the test suite.

**We are evaluating:**
- How many bugs you find (there is no published total — find as many as you can)
- The quality of your explanations (do you understand *why* it's a bug, or just that it's wrong?)
- Whether your impact analysis reads like a threat model or just a complaint
- Whether your fixes are correct and minimal (don't rewrite the whole codebase)
- Whether your new tests actually target the specific failure mode

---

## Part 2 — Ship This Service

This service has never been deployed. It has no container image, no CI, no pipeline.

Get it ready to ship.

**Your deliverables for Part 2:**

1. **Containerize it.** A production-quality `Dockerfile` for this service.

2. **Build a CI pipeline** for the platform of your choice — GitHub Actions, GitLab CI, CircleCI, or anything else you can make run. At minimum it must:
   - Run the test suite
   - Catch vulnerable dependencies
   - Build the image

   If it's GitHub Actions, it should be green in your repo. If it's another platform, include evidence that it actually runs (a pipeline run link or the executed log). What else the pipeline does is up to you — and defending those choices is part of the exercise.

3. **Get it ready to ship.** The two requirements above are the minimum — anything else this repository needs before you'd be comfortable running it in production is for you to determine. Defend every choice in `DECISIONS.md`:
   - Each judgment call you made and **why** — base image and tag strategy, dependency pinning, what gates a merge and what doesn't
   - How you secured the CI pipeline itself (it's attack surface too)
   - What alternative approaches you considered
   - Any assumptions you made about how this service is deployed and who can reach it

**We are evaluating:**
- Whether the pipeline actually works — run it; green checks in your repo or a real run log count
- The quality of your judgment calls (not whether you match our preferred answer — there is no preferred answer)
- Whether your container and pipeline choices are grounded in what *this* service actually needs

---

## Part 3 — Architecture Decision Record

Read the file `ARCHITECTURE_PROMPT.md` (included in the starter). It describes two options for adding a "batch re-analysis" feature to this service. Both options are intentionally defensible.

Write a 1–2 page `ADR.md` (Architecture Decision Record) that:
1. States which option you'd choose
2. Argues for it with specific technical reasoning
3. Acknowledges the strongest argument for the option you *didn't* choose
4. Describes what would change your mind (under what conditions would the other option be better?)
5. Outlines a rough implementation plan (what would you build first, second, third?)

**We are evaluating:**
- The rigor of your technical reasoning (not which option you pick)
- Whether you engage honestly with the tradeoffs (not just cheerleading your choice)
- Your ability to think about a system that doesn't exist yet
- Whether your implementation plan is grounded and sequenced sensibly

---

## What We're Evaluating (Overall)

| Area | Weight | Source |
|---|---|---|
| Security bug discovery and explanation | High | Part 1 |
| Quality of fixes and regression tests | High | Part 1 |
| Container and CI pipeline design | High | Part 2 |
| Judgment calls and written reasoning (BUG_REPORT.md, DECISIONS.md) | High | Parts 1 & 2 |
| Architecture decision reasoning (ADR.md) | Medium | Part 3 |
| Code quality across all changes | Medium | All |
| Test design and coverage | Medium | Part 1 |

**Notice:** Written reasoning is weighted as heavily as code. A perfect fix with no explanation scores lower than a good fix with a clear explanation.

---

## Setup

```bash
cd starter
npm install
cp .env.example .env   # optional — no API key needed for this exercise
npm run dev             # starts on :3000
npm test                # tests should pass (that's part of the problem)
```

---

## Submission

**Do not fork this repository.** Instead:

1. Clone it — keep the full history, you'll want it
2. Create a new **private** repository under your own GitHub account
3. Push everything to it (all branches, all history)
4. Invite `jrdavison` as a collaborator
5. Send us the link

**A submission in a public repository — including a public fork — is an automatic disqualification.** Public submissions expose this exercise's answers to every candidate who comes after you, which ruins the take-home for everyone. If you fork by accident or push somewhere public, delete it and follow the steps above before submitting — we only review what you send us.

---

## Submission Checklist

Before submitting, verify:

- [ ] `npm install && npm run dev` starts the server
- [ ] `npm test` passes (including your new tests)
- [ ] Your CI pipeline actually runs (green checks, or an executed run log)
- [ ] `BUG_REPORT.md` exists and documents each bug
- [ ] `DECISIONS.md` exists and documents your shipping and remediation choices
- [ ] `ADR.md` exists and argues for an architecture option
- [ ] Your code changes are in clean, reviewable commits (we read commit history)

---

## A Note on AI Assistance

You may use any AI tools you like — Claude, ChatGPT, Copilot, whatever helps you. We use them at Pathos daily.

But here's what AI is good at and what it isn't:
- AI can write a Dockerfile or a CI workflow from a spec in seconds — which is exactly why we don't grade boilerplate. We're evaluating whether you know which gates matter for *this* service.
- AI can generate plausible-sounding security findings. We're looking for impact analysis that reveals you actually understood the *specific* exposure chain in *this specific* code.
- AI can propose remediation steps. We're looking for the judgment of someone who has actually rotated a live credential — what order you do things in, and what you check along the way.

The best submissions we've seen use AI as an accelerator while bringing their own judgment, experience, and intellectual honesty.

---

## Questions?

Email [chris.poshka@pathos.com] — we'll respond within 24 hours.
