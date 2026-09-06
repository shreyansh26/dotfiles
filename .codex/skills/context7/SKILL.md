---
name: context7
description: "Fetch current library documentation when version-specific APIs or behavior are not established by local sources."
---

# Context7 Documentation Fetcher

Retrieve current library documentation via Context7 API.

Prefer the connected Context7 tools: resolve the library ID, then query the relevant version and topic. Reuse an ID already resolved for the same library/version. Use the CLI below only if the connector is unavailable or the user requests it.

The CLI reads `CONTEXT7_API_KEY` from the environment or its `.env` loader. Let the process load credentials; do not print keys or read `.env` contents into the conversation. If credentials are unavailable, use official documentation or report the missing configuration. Run the CLI in a Python environment with `python-dotenv` installed.

## Workflow

### 1. Search for the library

```bash
python3 ~/.codex/skills/context7/scripts/context7.py search "<library-name>"
```

Example:
```bash
python3 ~/.codex/skills/context7/scripts/context7.py search "next.js"
```

Returns library metadata including the `id` field needed for step 2.

### 2. Fetch documentation context

```bash
python3 ~/.codex/skills/context7/scripts/context7.py context "<library-id>" "<query>"
```

Example:
```bash
python3 ~/.codex/skills/context7/scripts/context7.py context "/vercel/next.js" "app router middleware"
```

Options:
- `--type txt|md` - Output format (default: txt)
- `--tokens N` - Limit response tokens

## Quick Reference

| Task | Command |
|------|---------|
| Find React docs | `search "react"` |
| Get React hooks info | `context "/facebook/react" "useEffect cleanup"` |
| Find Supabase | `search "supabase"` |
| Get Supabase auth | `context "/supabase/supabase" "authentication row level security"` |

## When to Use

- When a library-dependent change requires version-specific information that local sources do not establish
- When unsure about current API signatures
- For library version-specific behavior
- To verify best practices and patterns
