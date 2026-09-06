---
name: how
description: Explain how something works in this codebase by exploring code and producing a clear architectural explanation. Optionally critique the architecture for issues.
---

# How

Explore the codebase to answer "how does X work?" questions. Produce clear architectural explanations at the level of a senior engineer onboarding onto a subsystem — enough to build a working mental model, not so much that it reads like annotated source code.

Two modes:

1. **Explain** (default) — explore the codebase and produce a clear explanation
2. **Critique** — explain the relevant flow, then evaluate architectural issues against the code.

## Explain Mode

### Step 1 — Understand the Question and Assess Complexity

Parse what the user is asking about. They might say:

- "How does message virtualization work?" — a subsystem
- "How do we handle billing for on-demand usage?" — a feature flow
- "How is the auth service structured?" — an architectural overview
- "Walk me through what happens when a user sends a message" — a runtime trace

Identify the scope. If it's ambiguous, make your best guess and state your interpretation before exploring. Don't ask — explore and let the user redirect if you're off.

### Explore and explain

For a narrow question, trace the relevant code and write the explanation in the parent agent. Do not delegate merely to rephrase an answer.

For a subsystem with independent exploration angles, use available collaboration tools when delegation is authorized and adds useful parallel work. Use the actual tool schema and supported roles; inherit model settings unless the user requests an override. Specify read-only work in each assignment rather than inventing a tool parameter.

Give each worker a bounded question and relevant paths, using `references/explorer-prompt.md` when helpful. Workers return source evidence and unresolved gaps. The parent reconciles findings against the code and writes the final explanation; a separate synthesis worker is optional, not required. Consult `references/explainer-prompt.md` only when its writing guidance helps.

If collaboration is unavailable, continue directly. Stop exploring when the requested flow is supported by code evidence, and disclose any unresolved boundary.

### Output Format

The explanation should follow this structure, but adapt it to what makes sense for the question. Not every section is needed for every question.

**Overview** — 1-2 paragraphs. What is this thing, what does it do, why does it exist. Someone should be able to read this and decide whether they need to keep reading.

**Key Concepts** — The important types, services, or abstractions. Brief definition of each, not exhaustive — just the ones needed to understand the rest.

**How It Works** — The core of the explanation. Walk through the flow: what triggers it, what happens step by step, where does data go, what are the decision points. Use prose, not pseudocode. Reference specific files and functions so the reader can go look, but don't dump code blocks unless a specific snippet is genuinely necessary to understand the point.

**Where Things Live** — A brief map of the relevant files/directories. Not every file — just the ones someone would need to find to start working in this area.

**Gotchas** — Things that are non-obvious, surprising, or that would trip someone up. Historical context that explains why something looks weird. Known sharp edges.

## Critique Mode

Triggered when the user asks for architectural issues, problems, or improvements — not just understanding.

### Review the architecture

Understand the relevant flow before judging it. Use `references/critique-rubric.md` for architectural criteria. For a complex critique, independent reviewers may use `references/critic-prompt.md` when collaboration is available and authorized; use supported roles and inherited model settings. Review a small subsystem directly. Do not require a model roster or a second full explanation before investigating the critique.

### Step 3 — Lead Judgment

You're a pragmatic lead, not an aggregator.

Categorize findings:
- **Act on** — Architectural problems worth fixing now
- **Consider** — Real concerns, but the cost/benefit is unclear
- **Noted** — Valid observations, low priority
- **Dismissed** — Wrong, missing context, or style preference

Present the explanation first (from Step 1), then the critique verdict below it. The explanation should stand on its own — someone who just wants to understand the system shouldn't have to wade through critique.
