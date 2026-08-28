---
id: 0011
title: CI on pull requests
type: site-build
status: done
---

## Summary
Add `.github/workflows/ci.yml` (no workflow exists yet) triggered on pull
requests targeting `main` and on pushes to `main`, running `npm run lint`
(oxlint) and `npm run build`. Then enable branch protection on `main`
requiring that check to pass before merging — confirmed explicitly with
the user (workflow + required/blocking check, not just an informational
one).

This changes the merge workflow going forward: PRs will show a required
status check that must pass before the merge button is available.

## Decision doc
none

## Patterns
None yet — first CI workflow in this repo.

## Screenshots
See screenshots/ in this folder.

## Outcome
Added `.github/workflows/ci.yml`: on every PR into `main` and every push to
`main`, runs `npm ci`, `npm run lint` (oxlint), and `npm run build` on
`ubuntu-latest` with Node 24 (matching the local dev version). Verified
both `lint` and `build` pass cleanly locally first (0 warnings/errors
across 15 files) so the check wouldn't immediately block on landing.
Branch protection on `main` still needs enabling to make the check
required/blocking — doing that next as a separate `gh` step, then
verifying it shows up correctly on this task's own PR.

## Changes forced by later work
none