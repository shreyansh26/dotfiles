# Global Instructions

## File search

Prefer FFF for file discovery and content search when it indexes the relevant workspace. If unavailable, empty, or outside its coverage, use read-only filesystem discovery and `rg` without asking again.

## Research papers

Prefer alphaXiv for research-paper search and full-text retrieval. If it cannot retrieve the paper, use the supplied document or a canonical arXiv, publisher, or author source. State when only partial text is available.

## Python

Run Python in the existing project environment. If none exists, create a task-local uv environment. Install needed Python libraries there; use `uv tool` for standalone utilities. Respect the project's dependency constraints. Do not install into a global Python environment by default.
