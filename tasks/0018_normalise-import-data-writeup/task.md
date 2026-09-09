---
id: 0018
title: Normalise Raw Import Data Stored Procedure project write-up
type: project-writeup
status: done
---

## Summary
Fill in the real content for the highlighted "Normalise Raw Import Data
Stored Procedure" project
(`src/data/projects/highlighted/normalise-import-data.ts`), replacing
every `TODO:` placeholder per its entry in task 0014's
[content-checklist.md](../0014_determine-projects-and-content/content-checklist.md):
generic project name, 4-5 sentence blurb, tech stack (if remembered),
screenshot(s) (optional — add to `public/projects/normalise-import-data/`),
code snippet(s), and a talk-through narrative.

Hard constraint carried over from task 0014: no real employer or product
name anywhere — generic descriptors only.

## Decision doc
[decision.md](decision.md)

## Patterns
none

## Screenshots
See screenshots/ in this folder.

## Outcome
Filled in `src/data/projects/highlighted/normalise-import-data.ts`: a
generic name, the site owner's supplied short blurb, a `techStack` field
(SQL Server / T-SQL / Dynamic SQL — newly added, wasn't in the original
stub), and three redacted code snippets split from the real stored
procedure by logical concern (reading the mapping config, walking
parent-child relationships, assembling/executing the statement) rather
than one large block. The talk-through walks through each snippet and
closes with an invented, explicitly-labeled-as-illustrative worked
example (a "person + qualifications" import) since the real historical
file structures weren't precisely recalled. The proc's modification
history credits a colleague by name in the original source; anonymized to
"a colleague" in the retained comment. No screenshots — backend-only SQL
object with no UI. No new pattern — this is a one-off content fill against
the existing `HighlightedProject` shape from task 0014.

Also restructured, at the site owner's request: replaced the single
generic `src/pages/ProjectDetail/` component (looked up any project via
`getProject(slug)` on one dynamic route) with a real page per highlighted
project under `src/pages/Projects/<slug>/`, statically importing its own
data file, with its own route in `App.tsx` — created for
`normalise-import-data` now, and for each other highlighted project as
its own write-up task lands. See [decision.md](decision.md).

Further restructured the data shape, again at the site owner's request:
`HighlightedProject.talkThrough` split into a top-level `problem` field
(rendered as its own "The problem" section) and a `talkThrough` field on
each `CodeSnippet` (rendered directly above that snippet's code block),
so every code section carries its own explanation instead of one long
narrative for the whole project. Applied to all 4 highlighted projects'
data files for type-conformance (the 3 still-TODO ones got matching TODO
placeholders for `problem` and each snippet's `talkThrough`), though only
`normalise-import-data` has real content and a page.

## Changes forced by later work
none
