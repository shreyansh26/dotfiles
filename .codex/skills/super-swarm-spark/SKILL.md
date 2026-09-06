---
name: super-swarm-spark
description: "Execute a plan with a dependency-aware rolling worker pool only when explicitly requested."
---

# Rolling Parallel Task Executor

Execute the requested implementation plan through verified integration. Use the current runtime’s collaboration tools, supported roles, and advertised capacity; inherit model settings unless the user requests an override. If delegation is unavailable, carry out the ready tasks directly.

## Readiness and ownership

- Read the requested plan and extract task IDs, `depends_on`, file ownership, acceptance criteria, and validation.
- For a requested subset, include its required prerequisites unless already complete. Do not add unrelated work.
- Validate that dependency IDs exist and the selected graph has no cycle. Resolve obvious metadata errors from the plan; ask if fixing them requires a material scope decision.
- A task is ready only after every dependency is completed and validated. Failed or blocked tasks do not release their dependents. Continue independent ready work while resolving a blocker.
- Assign disjoint file ownership. Serialize tasks that edit the same files or shared generated outputs unless an explicit isolation strategy supports integration.
- The parent owns shared plan/progress updates and integrated Git operations. Workers return changes and evidence instead of editing the shared plan, staging, committing, or pushing.

## Scheduling

Maintain a rolling pool sized to the independent ready tasks and available runtime slots. When a worker finishes, validate its result before refilling that slot with a newly ready task. The capacity is a ceiling, not a target.

Do not fill slots with unnecessary work. Reuse idle workers where appropriate. Keep assignments concrete and use parameter names from the callable tool schema; do not assume foreign `Task` APIs, role names, or model availability.

## Worker assignment

```text
Implement task [ID]: [name].
Plan context: [goal and relevant requirements]
Prerequisites completed: [dependency IDs and outputs]
Owned files/modules: [paths and responsibility]
Acceptance criteria: [required behavior]
Validation: [relevant check]

You are not alone in the codebase. Preserve others’ edits and adapt to their changes.
Work within your assigned scope. A routine new file inside your owned module is allowed; coordinate with the parent before crossing another worker’s ownership or changing a shared contract.
Do not update the shared plan, stage, commit, or push. Return exact changed paths, the behavior implemented, validation evidence, and any blockers.
```

## Validate and integrate

1. Inspect each worker result against the acceptance criteria. Address failures before marking the task complete.
2. Update the shared plan with status, changed paths, and validation evidence. Release dependent tasks only after this check.
3. Integrate all selected tasks and run the affected checks. Fix regressions caused by the work; broaden testing only for a concrete unresolved risk.
4. The parent may make an integrated commit when the user’s request authorizes it. Skill invocation alone does not authorize a commit, push, or release.
5. Finish only when the requested plan or subset is integrated and verified, or identify the specific unresolved blocker with evidence. Report completed work and actual validation without treating attempted checks as passes.
