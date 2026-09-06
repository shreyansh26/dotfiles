---
name: plan-harder
description: >
  Use when user specfically says 'plan harder'. 
---

# Planner Agent

Create detailed, phased implementation plans for bugs, features, or tasks. 
You make phased implementation plans with sprints and atomic tasks.

## Process

### Phase 0: Research

1. **Investigate the codebase:**
   - Architecture and patterns
   - Similar existing implementations
   - Dependencies and frameworks
   - Related components

2. **Analyze the request:**
   - Core requirements
   - Challenges and edge cases
   - Security/performance/UX considerations

### Phase 1: Clarify Requirements

Ask only when missing information materially changes scope, correctness, cost, or an external commitment and cannot be resolved from the available context. Otherwise state a reasonable assumption and finish the requested plan. Use a question mechanism available in the current runtime; do not require a fixed number of questions.

### Phase 2: Create Plan

Scale structure to the change. Use sprints only when the work benefits from staged increments; a small change may need only a short task list. The template below is an example, not a required size.

#### Structure
- **Overview**: Brief summary and approach
- **Sprints**: Logical phases that build on each other
- **Tasks**: Specific, actionable items within sprints

#### Sprint Requirements
Each sprint must:
- Result in **demoable, runnable, testable** increment
- Build on prior sprint work
- Include demo/verification checklist

#### Task Requirements
Each task must be:
- **Atomic and committable** (small, independent)
- Specific with clear inputs/outputs
- Independently testable
- Include file paths when relevant
- Include dependencies for parallel execution
- Include tests or validation method

**Bad:** "Implement Google OAuth"
**Good:**
- "Add Google OAuth config to env variables"
- "Install passport-google-oauth20 package"
- "Create OAuth callback route in src/routes/auth.ts"
- "Add Google sign-in button to login UI"

### Phase 3: Save
Save the file

Generate filename from request:
1. Extract key words
2. Convert to kebab-case
3. Add `-plan.md` suffix

Examples:
- "fix xyz bug" → `xyz-bug-plan.md`
- "implement google auth" → `google-auth-plan.md`

### Phase 4: Gotchas

AFTER it is saved. Identify potential issues and edge cases in the plan. Address them proactively. Where could something go wrong? What about the plan is ambiguous? 
Is there a missing step, dependency, or pitfall?

Resolve identified issues from the available evidence; ask only under the material-ambiguity boundary above.

Update the plan if you have improvements.

### Phase 5: Review

For complex plans with meaningful dependency or correctness risks, use an available subagent to review the plan when delegation is authorized. Give it the plan and relevant context, request concrete feedback without questions, and incorporate supported findings. Review straightforward plans directly.

## Plan Template

```markdown
# Plan: [Task Name]

**Generated**: [Date]
**Estimated Complexity**: [Low/Medium/High]

## Overview
[Summary of task and approach]

## Prerequisites
- [Dependencies or requirements]
- [Tools, libraries, access needed]

## Sprint 1: [Name]
**Goal**: [What this accomplishes]
**Demo/Validation**:
- [How to run/demo]
- [What to verify]

### Task 1.1: [Name]
- **Location**: [File paths]
- **Description**: [What to do]
- **Complexity**: [1-10]
- **Dependencies**: [Previous tasks]
- **Acceptance Criteria**:
  - [Specific criteria]
- **Validation**:
  - [Tests or verification]

### Task 1.2: [Name]
[...]

## Sprint 2: [Name]
[...]

## Testing Strategy
- [How to test]
- [What to verify per sprint]

## Potential Risks & Gotchas
- [What could go wrong]
- [Mitigation strategies]

## Rollback Plan
- [How to undo if needed]
```

## Important

- Think about full lifecycle: implementation, testing, deployment
- Consider non-functional requirements
- Show user summary and file path when done
- For a plan-only request, deliver the plan without implementing it. If the user also asks for implementation, continue through the authorized implementation and verification.
