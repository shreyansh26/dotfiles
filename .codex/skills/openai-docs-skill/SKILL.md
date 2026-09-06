---
name: openai-docs-skill
description: "Use the legacy OpenAI documentation CLI wrapper only when explicitly requested as a fallback."
---

# OpenAI Docs MCP Skill

## Overview

Use the OpenAI developer documentation MCP server from the shell to search and fetch authoritative docs. This is an optional CLI fallback; it is not the default OpenAI documentation entrypoint.

## Core rules

- Use the current `openai-docs` skill for ordinary OpenAI questions. This legacy wrapper is available only when explicitly requested.
- For this explicit CLI fallback, query the MCP server through `scripts/openai-docs-mcp.sh`. Do not displace an available official connector for ordinary documentation work.
- Use `search` or `list` to find the best doc page, then `fetch` the page (or anchor) for exact text.
- Surface the doc URL you used in your response so sources are clear.

## Quick start

```bash
scripts/openai-docs-mcp.sh search "Responses API" 5
scripts/openai-docs-mcp.sh fetch https://platform.openai.com/docs/guides/migrate-to-responses
```

## Workflow

1. Discover: `search` with a focused query. If unsure, use `list` to browse.
2. Read: `fetch` the most relevant URL (optionally add an anchor).
3. Apply: summarize and/or quote relevant sections; include the URL.

## Script reference

The CLI wrapper is at `scripts/openai-docs-mcp.sh` and uses `curl` + `jq` against `https://developers.openai.com/mcp`.

Subcommands:
- `init`: initialize and inspect server capabilities.
- `tools`: list available tools on the MCP server.
- `search <query> [limit] [cursor]`: return JSON hits from the docs index.
- `list [limit] [cursor]`: browse docs index.
- `fetch <url> [anchor]`: return markdown for a doc page or section.
- `endpoints`: list OpenAPI endpoints.
- `openapi <endpoint-url> [lang1,lang2] [code-only]`: fetch OpenAPI schema or code samples.

Environment:
- `MCP_URL`: override the default MCP endpoint.
