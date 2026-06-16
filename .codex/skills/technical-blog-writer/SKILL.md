---
name: technical-blog-writer
description: Draft, revise, outline, or review lucid technical blog posts in Shreyansh Singh's style for shreyansh26.github.io. Use when Codex is asked to write paper summaries, ML/LLM/CUDA/MLSys explainers, implementation walkthroughs, mathematical derivations, benchmark notes, or Markdown posts for the Jekyll blog, especially when the user wants a technical but conversational explanation aimed at engineers and researchers.
---

# Technical Blog Writer

## Core Goal

Write technical posts that feel like Shreyansh explaining a concept to a capable technical reader: precise, implementation-aware, and lucid without becoming shallow.

Before drafting a full post, read `references/shreyansh-blog-style.md`. It captures the observed structure from recent posts and the way posts render on the website.

## Workflow

1. Identify the post type:
   - **Paper summary**: paper link, official implementation, main idea, mechanism, math, empirical picture, implementation path.
   - **Implementation deep dive**: code repository, problem setup, algorithm variants, correctness constraints, performance tradeoffs.
   - **Derivation/math note**: forward definitions, local gradients, chain-rule path, final simplified result.
   - **Engineering optimization note**: setup, bottleneck, technique, benchmark, lessons, limitations.
2. Gather source truth before writing:
   - Use the paper, repository, benchmark data, slides, code, or notes supplied by the user.
   - For research-paper posts, prefer the full paper text and official implementation over secondary summaries.
   - Do not invent numbers, claims, benchmark results, architectural details, or paper conclusions.
3. Build an outline around explanation flow, not chronology:
   - Start from the familiar baseline.
   - State the mismatch or bottleneck.
   - Introduce the key mechanism.
   - Explain why it works using equations, shapes, or code.
   - Connect to implementation details and empirical behavior.
   - End with a concise takeaway or practical lesson.
4. Draft in layered depth:
   - Use short paragraphs that each carry one idea.
   - Define notation before using equations.
   - Put intuition before formalism, then explain what the formalism buys.
   - Use code snippets only when they reveal the mechanism or implementation path.
   - Use concrete examples, toy cases, tensor shapes, or memory/compute estimates whenever the concept is abstract.
5. Fit the website contract:
   - Use Jekyll Markdown with front matter when creating a new post.
   - Treat `description` as the post-list summary; make it specific and useful.
   - Include tags/categories that match the blog taxonomy.
   - Add a meaningful `thumbnail` when the post is meant to publish on the site.
   - Prefer `toc.sidebar: left` and `pretty_table: true` for long technical posts.
6. Review before handing off:
   - Check that every section advances the reader from "why care" to "how it works".
   - Remove generic hype, unsupported claims, and unexplained acronyms.
   - Verify equations, code shapes, and benchmark statements against sources.
   - Make headings descriptive enough to scan from the table of contents.

## Voice Rules

Use a calm explainer voice. Prefer "The important part is..." and "Concretely..." style transitions when moving from intuition to mechanics.

Keep the prose direct:

- Say what the mechanism does before naming every component.
- Use "why" sections for non-obvious design choices.
- Use "this matters because..." only when the reason is concrete.
- Use first person sparingly for notes, code references, or limitations.
- Avoid marketing language, overclaiming, and vague adjectives like "powerful" unless backed by a mechanism.

## Website Output

When creating a post file for `shreyansh26.github.io`, use this front matter shape unless the existing post suggests otherwise:

```yaml
---
layout: post
title: "Precise Technical Title"
date: YYYY-MM-DD
author: "Shreyansh Singh"
description: "One specific sentence describing the mechanism, problem, and what the reader learns."
thumbnail: /assets/img/posts_images/<post_slug>/<image>
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

Adjust tags, categories, thumbnail, and permalink to match the topic and existing repo conventions.

## Reference

Load `references/shreyansh-blog-style.md` for:

- Recent-post structure patterns.
- Live website rendering constraints.
- Recommended section templates by post type.
- Editing checklist for lucid technical explanations.
