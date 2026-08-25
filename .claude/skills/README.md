# Skill Index

Project-authored skills, living at `.claude/skills/<name>/SKILL.md`. These
are portfolio content — not just internal tooling — and will eventually back
a dedicated page on the site. New rows are added here by `skill-creation` as
each skill is actually built; for what's still planned but not yet built,
see `tasks/README.md`.

Imported third-party skills (grill-me, improve-codebase-architecture) are a
separate mechanism, tracked in `.agents/skills/`, not here.

| Skill | Description | Task |
|---|---|---|
| [skill-creation](skill-creation/SKILL.md) | Checklist for authoring a new project skill: naming, frontmatter, folder layout, index/task registration. | [0002](../../tasks/0002_skill-creation-skill/task.md) |
| [task-management](task-management/SKILL.md) | Sole entry point for creating/updating tasks; folds in grill-me, decides when to split a request into multiple tasks. | [0003](../../tasks/0003_bootstrap-remaining-skill-tasks/task.md) |
| [ai-docs](ai-docs/SKILL.md) | Creates and maintains the root CLAUDE.md context file; reads it before other work starts. | [0004](../../tasks/0004_ai-docs-skill/task.md) |
