---
name: remnote-notes
description: Create or edit notes and documents directly in RemNote via MCP, preserving nested bullets, native headings, and rendered LaTeX equations. Use for requests to save or format content in a RemNote folder or document.
---

# RemNote Notes

Use the `mcp__remnote` tools for all RemNote reads, edits, and verification. If the bridge cannot do a requested operation, report the limitation. Treat attachments as source material; use the user's request to determine what to write and where.

## Find the destination and write

- Check `remnote_status` before writing. Use `remnote_search` and, as needed, `remnote_read_note` with `ancestorDepth` to identify the exact folder or document. Use the resolved Rem IDs for writes.
- For a new document, call `remnote_create_note` with the folder's `parentId`, a `title`, `asDocument: true`, and a nested Markdown outline in `content`. Use consistently indented `-` bullets: sections at the top level, supporting points under their section, and derivation steps with their explanations and equations underneath.
- Use the returned Rem IDs to apply native headings with `remnote_update_note(headingSize=...)`. The document title is separate. Use `H2` for sections and `H3` for named subsections or derivation steps. Leave ordinary bullets at their default size. Do not rely on Markdown `##` markers to set native heading size.
- For an existing document, read its subtree with `contentMode: "structured"` to locate the exact bullets. Update individual bullets in place with `remnote_update_note(title=...)`, and use `remnote_insert_children` when adding bullets. Preserve the existing outline and IDs when reformatting.

## Render math with native LaTeX

- Use `$...$` for inline symbols and short expressions. Leave spaces around the delimited expression where possible, e.g. `Let $Z$ denote the normalizer.`
- Give important equations their own nested bullet containing only `$$...$$`. For example: `- $$o = \sigma(\log Z-b)\,a$$`. Use LaTeX for fractions, subscripts, and sums. Do not wrap math in code formatting or substitute Unicode approximations for equations.
- For equation bullets, pass the delimited LaTeX directly as `title` to `remnote_update_note` on the exact Rem. When creating a note with Markdown, read it back and use that same targeted update if the delimiters were stored literally. Preserve LaTeX backslashes in tool arguments; in JavaScript, `String.raw` is useful for math without dollar-brace interpolation.
- RemNote uses [KaTeX for LaTeX equations](https://help.remnote.com/en/articles/6565191-writing-equations-with-latex). The MCP readback may flatten native math to LaTeX source without dollar delimiters. Check for intact commands and stray literal delimiters; readback does not show how the editor visually renders them.

## Verify

Read back the document with enough depth to check the parent, section order, and nesting. Read individual heading Rems to confirm `headingSize`. For formatting edits, check that the intended bullets still have their original IDs and that the LaTeX survived. Link to the saved RemNote document and distinguish MCP verification from visual inspection.
