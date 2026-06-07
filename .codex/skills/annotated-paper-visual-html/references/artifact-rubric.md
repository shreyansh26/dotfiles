# Artifact Rubric

Use this rubric before and after creating a visual HTML note from a paper.

## Source Grounding

- Extract the requested section completely before summarizing it.
- Preserve exact paper context for user-highlighted or user-mentioned claims.
- Include compact source crops for highlighted passages, figures, tables, and equations that anchor the explanation.
- Use external sources only to explain methods the paper names but does not define.
- Prefer cited papers, official repos, official docs, or official technical reports.

## Signal Density

- Turn dense text into mechanisms: inputs, operation, output, bottleneck, tradeoff.
- Explain every acronym or named technique at first use.
- Put math in a visible box with symbol definitions and the practical meaning.
- Convert implementation details into timelines, flow diagrams, layout maps, or compare/contrast tables.
- Include the user’s confusing phrases verbatim as row labels or section titles.

## Visual Structure

- Start with a title, one concise thesis, and a navigation row.
- Put paper source crops early, but keep them compact.
- Use 2-column and 3-column layouts for comparisons; use auto-fit for repeated small cards.
- Use source images from the paper when they are semantically important.
- Use CSS/HTML diagrams for conceptual mechanisms that the paper does not illustrate.
- End with a cheat sheet table and source footer.

## Quality Checks

- No clipped text, card overflow, or overlapping elements at around 1200px wide and mobile widths.
- Long labels such as `dispatch/combine`, equations, URLs, or acronyms wrap safely.
- All image paths resolve relative to the HTML file.
- HTML parses with Python `html.parser`.
- If browser verification is blocked, report the static checks performed.

## Common Section Patterns

- **Algorithm/objective section:** source crop, notation table, equation box, modification table, failure modes.
- **Systems section:** topology map, timeline, communication/computation overlap diagram, bottleneck table.
- **MoE/parallelism section:** rank layout map, token/activation movement flow, load-balance math, final terminology table.
- **RL section:** rollout-to-learner pipeline, objective math, sampling/reward strategy, hyperparameter comparison table.
