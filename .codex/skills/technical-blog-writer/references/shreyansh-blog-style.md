# Shreyansh Blog Style Reference

## Source Basis

This guide is based on the newest 15 posts in `shreyansh26.github.io/_posts` as of May 23, 2026, plus the live `/post/` index and representative live post pages:

- `Paper Summary #17 - Engram`
- `Paper Summary #16 - Canon Layers`
- `Paper Summary #15 - Hyper-Connections and mHC`
- `Deep dive into CUDA Scan Kernels: Hierarchical and Single-Pass Variants`
- `Paper Summary #14 - Physics of Language Models: Part 3.1`
- `Understanding Multi-Head Latent Attention (MLA)`
- `Deriving the Gradient for the Backward Pass of Layer Normalization`
- GTC 2025 CUDA memory/compute notes
- Cross-encoder inference optimization
- Earlier paper-summary notes on Physics of LMs, Sora, DALL-E 3 recaptioning, and Gemini 1.5 Pro

## How Posts Render

The blog is a Jekyll site.

- The posts index at `/post/` is paginated, 10 posts per page.
- Each list item shows title, `description`, computed read time, date, year/tag/category links, and `thumbnail` on the right when present.
- The individual post layout renders `title` as the page H1, followed by published date, author, tags, categories, and then post content.
- If `_styles` exists in front matter, the post layout injects it into a `<style>` block before content.
- Long recent posts often use `toc.sidebar: left`, `pretty_table: true`, `giscus_comments: true`, and `related_posts: false`.
- The `description` field matters twice: it is metadata and the visible summary on the post list. Make it concrete, not teaser copy.

## Common Front Matter

Use this shape for new long technical posts:

```yaml
---
layout: post
title: "Paper Summary #N - Topic" # or a precise engineering title
date: YYYY-MM-DD
author: "Shreyansh Singh"
description: "A concrete explainer sentence: problem, mechanism, and implementation or empirical angle."
thumbnail: /assets/img/posts_images/<post_slug>/<featured_image>
tags: llms transformers mlsys paper-summaries
categories: ["LLMs", "MLSys"]
giscus_comments: true
related_posts: false
permalink: "post/YYYY-MM-DD_post-slug/"
featured: false
toc:
  sidebar: left
pretty_table: true
---
```

Adapt categories from existing usage: `LLMs`, `MLSys`, `CUDA`, `ML`, `Computer Vision`, `PPML`.

## Structural Patterns

### Paper Summary Pattern

Use when summarizing or explaining a paper.

1. Metadata links:
   - `**Paper:** [Title](...)`
   - `**Official implementation:** [repo](...)` when available
2. Optional short interactive/visual hero for newer deep dives.
3. First section states the conceptual mismatch or baseline limitation.
4. Next sections rebuild the mechanism from familiar pieces.
5. Mid-post sections answer "why this design?" questions.
6. Later sections explain empirical behavior, scaling, systems implications, or implementation path.
7. End by connecting the idea to related work or summarizing the practical mental model.

Good heading shapes:

- `## Attention is not memory`
- `## The FFN already looks like a memory`
- `## Why the residual matters`
- `## Where Canon goes in a Transformer block`
- `## Systems problem: HC is FLOP-light but I/O-heavy`
- `## Implementation path`

### Implementation Deep Dive Pattern

Use when explaining a codebase, kernel, benchmark, or optimization.

1. Link to source code or repo at the top.
2. Explain the primitive/problem in plain terms.
3. Split the solution into families or variants.
4. Add a quick primer for readers who know the field but may not know this exact subtopic.
5. For each algorithm/variant:
   - Name the kernel/file.
   - Explain the data flow.
   - Show the core code pattern.
   - State correctness hazards.
   - State work/depth/memory/synchronization tradeoffs.
6. Add performance overview, benchmark caveats, and lessons.

Useful moves:

- Use small numeric examples before general formulas.
- Explain why a synchronization, layout transform, or cache choice is necessary.
- Compare variants by cost model, not only by name.

### Derivation Pattern

Use when deriving gradients or mathematical results.

1. Recap the forward pass and notation.
2. Derive easy gradients first.
3. Isolate the core non-obvious dependency.
4. Apply chain rule in small steps.
5. Present the final expression.
6. Explain what each term does intuitively.

## Voice and Prose

The style is technical but conversational. The reader is assumed to be strong enough for equations and code, but the post should remove avoidable friction.

Prefer:

- "The basic idea is simple..."
- "The important part is not just..."
- "Concretely..."
- "This matters because..."
- "In the source, this is called..."
- "A key idea for readers..."
- "The useful way to read the demo is as a call graph."

Avoid:

- Hype words without mechanisms.
- Long literature-review openings.
- Vague "this is powerful" claims.
- Excessive caveats before the reader knows the idea.
- Dense equation blocks without prose immediately before and after.

## Explanation Tactics

Start from a baseline the reader already knows:

- MHA before GQA/MQA/MLA.
- Standard residual layer before hyper-connections.
- Ordinary Transformer block before Canon or Engram insertion.
- Simple scan before hierarchical and single-pass scan variants.
- Forward pass before backward derivation.

Use "why" sections when a design choice is non-obvious:

- Why multiplicative-XOR?
- Why the residual matters.
- Why `groups=channels` matters.
- Why coalescing matters here.
- Why a method is FLOP-light but I/O-heavy.

Use examples to make abstract math visible:

- Tiny arrays for scan.
- Tensor shapes for attention.
- Big-O or byte estimates for memory/cache behavior.
- Code snippets for implementation control flow.
- Toy probabilities for hash collisions.

## Equations and Code

Introduce notation before equations. After equations, state what changes in plain language.

Good sequence:

1. "The retrieved vector is projected into a key and value:"
2. Equation block.
3. "The hidden state decides whether the retrieved memory is relevant."

For code:

- Keep snippets selected and purposeful.
- Name files/functions when relevant.
- Add one sentence before the snippet explaining what to look for.
- Add one sentence after the snippet explaining the implication.
- Use code to reveal data flow, not to dump implementation.

## Visuals and Interactive Elements

Older posts use `{% include image.liquid url="..." description="..." %}`. Newer posts sometimes use custom HTML/CSS/JS in front matter and body for interactive explainers.

Use custom visuals only when they clarify the mechanism:

- Concept strips for the top-level mental model.
- Sliders for tradeoff curves or parameter allocation.
- Small demos for hashing, routing, or local mixing.
- Tables for model comparisons, complexity, or benchmark summaries.

Keep image captions informative. They should say what the reader should notice, not merely restate the filename.

## Section Templates

### Paper Summary Starter

```markdown
**Paper:** [Title](...)
**Official implementation:** [repo](...)

The basic idea is ...

That is useful because ...

## The baseline: ...

...

## The problem ...

...

## The core mechanism

...
```

### Engineering Post Starter

```markdown
**Code** - [GitHub repo](...)

When deploying/running/building ..., the bottleneck is ...

This post walks through ..., then compares ...

## The Setup

...

## Understanding ...

...
```

### CUDA/MLSys Variant Section

```markdown
### Variant name

Kernel: [`path/to/file.cu`](...)

The kernel does three things:

1. ...
2. ...
3. ...

Core pattern:

```cpp
// selected lines
```

The correctness issue is ...

Key characteristics:

- Work: ...
- Synchronization: ...
- Memory traffic: ...
```

## Editing Checklist

Before finalizing:

- Does the first page tell the reader why the topic matters?
- Does each heading teach a step in the mechanism?
- Are all equations introduced and interpreted?
- Are tensor shapes, dimensions, or variables defined before use?
- Are code snippets short enough to read in the blog layout?
- Is every benchmark claim backed by a source or clearly labeled as local?
- Does `description` work as a standalone post-list summary?
- Does the thumbnail/first visual communicate the actual topic?
- Are tags/categories consistent with existing posts?
- Does the ending leave the reader with a crisp mental model?
