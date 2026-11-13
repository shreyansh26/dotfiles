---
name: update-remote-codex
description: Update Codex on a user-selected SSH host and verify that a requested model appears in its model picker. Use for missing remote Codex models or stale remote app servers; not for downloading model weights or changing a ChatGPT model catalog.
---

# Update remote Codex

Accept an SSH host/alias and an optional model name. Examples:

- `$update-remote-codex 8xH100 — make GPT-6.1 Sol available`
- `$update-remote-codex 8xB300 — refresh available models`

Resolve the host from the current request or unambiguous conversation context; ask if missing. Never default to a remembered host. Resolve friendly model names to exact catalog slugs (for example, GPT-6.1 Sol to `gpt-6.1-sol`), without substituting a different model. If omitted, refresh the catalog and report visible models. The request authorizes necessary updates and an idle server restart, but does not authorize interrupting active work.

## Inspect

Use the existing SSH configuration. Quote host and model arguments; reject host values beginning with `-` and do not interpolate user text as shell code. Keep host-key verification enabled. Start with read-only checks:

```sh
ssh -o BatchMode=yes -o ConnectTimeout=10 "$remote_host" 'command -v codex; codex --version; codex app-server daemon version'
```

Compare **CLI**, **managed package**, and **running app-server** versions. Updating a CLI alone does not replace a running server. Inspect `--help` on that host before using version-dependent daemon commands. If `codex` is missing from noninteractive PATH, locate the existing installation or inspect the user's shell setup; do not assume it needs reinstalling.

Check the host's current threads and server-owned processes before a restart. In Codex desktop, use `list_threads`, filtering the result to that host, then inspect exact server PID/children remotely. Thread status alone does not establish whether server-owned commands are still running. If active work would be interrupted, or activity cannot be established, finish read-only diagnosis and ask about interruption unless already authorized. Never stop GPU jobs or another IDE's Codex server.

Record the current daemon backend, managed path/version, pin/automatic-update policy, and remote-control settings when available. Do not print credentials, auth files, or entire model-cache entries: they may contain large instruction payloads. A cache is supporting evidence, not the final visibility check.

## Check model visibility

Prefer `model/list` on the connected live app server when an existing protocol client supports it. Otherwise use the bundled [check-model.cjs](scripts/check-model.cjs), which starts and closes a **temporary stdio server** using the selected binary. It issues no model generation requests and performs no update/restart; normal Codex startup may refresh its cache.

Run it remotely using the binary path returned by `daemon version`, not an assumed `codex` on PATH. This example's values are illustrative; substitute the observed path and requested model using proper shell quoting:

```sh
ssh -o BatchMode=yes -o ConnectTimeout=10 8xH100 \
  'node - gpt-6.1-sol /home/shreyansh/.codex/packages/app-server-daemon/current/bin/codex' \
  < /absolute/path/to/update-remote-codex/scripts/check-model.cjs
```

Pass `-` instead of the model slug to list all visible models. The helper requires an existing Node.js runtime; do not install a new runtime solely for this check. If absent, use an available app-server client or reproduce the same JSON-RPC handshake in an existing runtime. Protocol reference: [OpenAI Docs — model/list](https://learn.chatgpt.com/docs/app-server#list-models-modellist).

The Unix control socket uses WebSocket transport. `codex app-server proxy` proxies bytes; piping newline-delimited JSON directly into it can hang. The temporary `--listen stdio://` server accepts JSONL. An empty HTTP health response is not a model-list check.

If the requested model is already visible and the running server uses that verified version, do not reinstall or restart merely to satisfy the procedure. If only the desktop picker is stale, refresh/reconnect that host through supported UI controls, or explain that final UI refresh is still needed.

## Update only what is stale

For a managed daemon, prefer its supported native update command, normally:

```sh
codex app-server daemon update --yes
```

Use this on the **selected remote host** after checking activity. It updates the daemon package and may restart it. Inspect the returned state; if the running version remains stale, use the supported daemon restart command. Use the installation's own updater when a CLI update is also needed.

`codex app-server daemon update --from-cli --yes` copies the invoking CLI package and **pins it, disabling automatic updates** in observed versions. Use it only when copying that installed package is appropriate, not as the default update path. Do not accidentally downgrade a newer daemon. Preserve an intentional pin; when falling back to `--from-cli`, disclose the resulting policy change and restore the prior update policy through supported commands when appropriate. Do not silently switch a pinned installation to the production channel either.

If the command reports `app server is running but is not managed by codex app-server daemon`:

1. Identify the exact same-user process owning the control socket from daemon/process/socket evidence; record its command, executable, parent, and children. Never use `pkill codex` or a PID copied from this skill or an old session.
2. Recheck activity and confirm it is the intended idle server. Send `SIGTERM` only to that PID and wait for it to exit. If it does not exit, stop and diagnose; do not escalate to `SIGKILL` automatically.
3. Update the intended package, bootstrap supported daemon management, and start it if needed. Preserve remote-control enablement and required launch settings; an unqualified bootstrap may disable previously enabled remote control.
4. Re-run `codex app-server daemon version`. If replacement fails after stopping the server, recover the previously recorded installation/settings where feasible and report the failure.

## Verify and report

Reopen `daemon version` and verify the **running** version, then query the model catalog with `includeHidden: false`. The helper exits nonzero for a missing/hidden target, protocol error, early server exit, or timeout. If the requested model remains missing after one supported update/restart, diagnose authentication/catalog availability rather than retrying upgrades or fabricating model-cache entries. Updating software cannot grant account access.

Report the host, old/new running versions, requested model's actual visibility, and any pin-policy or UI-refresh requirement. Distinguish a temporary-server catalog check from a check against the existing connection; do not claim you visually inspected the picker unless you did. Do not change the user's default model, chat settings, credentials, or other hosts.

Local helper self-check (no remote changes):

```sh
node /absolute/path/to/update-remote-codex/scripts/check-model.cjs --self-test
```
