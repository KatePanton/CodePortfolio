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
[decision.md](decision.md)

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
Opened this task's own PR (#14) to trigger the workflow's first real run —
it passed, and along the way this also confirmed Vercel preview
deployments genuinely work (assumed but never directly verified back in
tasks 0008/0009). Attempted to enable branch protection requiring the
check, but GitHub returned "Upgrade to GitHub Pro or make this repository
public" — required status checks aren't available on a private repo
without a paid plan. Checked the git history for secrets before proceeding
(none found; only routine `Author: ... <email>` lines) and confirmed with
the user, who chose to make the repository public rather than pay or drop
the requirement. Made the repo public via `gh repo edit`, then
successfully enabled branch protection on `main` requiring `lint-and-build`
(strict/up-to-date) — verified via the GitHub API and confirmed PR #14
shows `mergeStateStatus: CLEAN`.

## Changes forced by later work
none