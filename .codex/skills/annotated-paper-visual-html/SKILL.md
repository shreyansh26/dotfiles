---
name: annotated-paper-visual-html
description: Create high-signal visual HTML learning notes from annotated or raw papers, PDFs, arXiv papers, technical reports, or paper sections. Use when the user asks for a visual artifact, HTML note, explainer, deep dive, cheat sheet, distilled paper section, or paper-backed study guide that should include source snippets/crops, diagrams, math, tables, and crisp explanations in the user's preferred editorial style.
---

# Annotated Paper Visual HTML

Use this skill to turn a paper or paper section into a polished, source-grounded HTML learning artifact. The expected output is a standalone HTML file, usually under the current workspace `outputs/`, with local assets under `outputs/assets/`.

## Core Workflow

1. Identify the requested section, topic, or concept.
   - If the paper is annotated, prioritize highlighted text, handwritten comments, starred regions, and user-mentioned phrases.
   - If the paper is raw, infer the high-signal content from section headings, equations, figures, tables, dense paragraphs, and repeated claims.
2. Extract the complete relevant text first.
   - Use `uv` to create or reuse a venv for PDF tooling when Python packages are needed.
   - Prefer `pypdf` or `pdfplumber` for text and Poppler rendering for page crops.
3. Render and crop source evidence.
   - Include compact source crops from the paper where the original page carries signal.
   - Use actual paper figures/tables/images when useful instead of reconstructing them.
   - Keep standalone crops small enough to support the note rather than dominate it.
4. Research only when the paper names a method without defining it.
   - Use primary sources: cited papers, official repos, official docs.
   - Clearly distinguish paper claims from external-source explanations.
5. Build a long-form HTML reference note.
   - Use the visual style in `assets/reference-visual-note.html` as the starting point when style consistency matters.
   - Read `references/artifact-rubric.md` before writing substantial artifacts.
6. Verify before final response.
   - Check HTML parses.
   - Check every local image asset exists.
   - If possible, inspect in a browser or with screenshots. If browser `file://` access is blocked, state that and rely on static checks.

## Content Requirements

Every artifact should usually include:

- A source-anchor section with 2-6 compact paper crops or imported paper figures.
- A direct explanation of the user’s exact confusing phrases.
- Visual diagrams for mechanisms, not decorative visuals.
- Math boxes for equations, symbols, and “what changes compared with the baseline.”
- A comparison table when there are variants, tradeoffs, or stages.
- A final high-signal cheat sheet with columns like `Phrase`, `Operational meaning`, and `What to remember`.
- A footer listing the paper sections and external primary sources used.

## Style Requirements

- Use an editorial technical-note look: warm paper background, restrained grid texture, Georgia-style serif headings, compact white panels, teal/rust/blue/gold accents.
- Avoid landing-page composition. The first screen should be the learning artifact, not marketing copy.
- Prefer dense but readable layouts over oversized hero sections.
- Keep cards shallow; do not nest cards inside cards.
- Avoid text overflow by using `minmax(0, 1fr)`, `min-width: 0`, `overflow-wrap: anywhere`, and auto-fit grids for compact repeated items.
- Preserve ASCII in created files unless the target paper/title requires non-ASCII.

## Reference Resources

- `references/artifact-rubric.md`: checklist for signal, source grounding, and layout quality.
- `assets/reference-visual-note.html`: reusable standalone HTML style/template. Copy and adapt it into the workspace output rather than editing the skill asset in place.
