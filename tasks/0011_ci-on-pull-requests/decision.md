# Decision: Make the repository public to enable required status checks

## Context
The user explicitly wanted the `lint-and-build` CI check to be
required/blocking, not just informational. Attempting to enable that via
GitHub's branch protection API failed with: "Upgrade to GitHub Pro or make
this repository public to enable this feature." Required status checks
(both classic branch protection and the newer rulesets) aren't available
on a private repository under GitHub's free plan.

## Options considered
1. **Drop the requirement**, keep the check informational only (the
   originally-recommended, lower-friction option).
2. **Upgrade to GitHub Pro** — a billing decision only the user can make;
   not something to purchase on their behalf.
3. **Make the repository public** — unlocks required status checks on the
   free plan, at the cost of exposing all code and git history publicly.

## Decision
Option 3 — made the repository public via `gh repo edit --visibility
public`, then successfully enabled branch protection on `main` requiring
`lint-and-build` to pass (strict/up-to-date) before merge.

## Why
The user was asked directly and chose this over the two alternatives.
Before making the change, the full git history was scanned for secrets,
API keys, or other sensitive material — none were found, only routine git
commit `Author: ... <email>` lines. This is also a personal portfolio site
explicitly meant to be shown to others, so public visibility isn't a
mismatch with its purpose the way it might be for a private/internal
project.

## Consequences
- The repository, all code, and its full commit history are now publicly
  visible on GitHub.
- Commit author emails (`katep8073@gmail.com`) are publicly visible in the
  history. Scrubbing this retroactively would require rewriting history
  (force-pushing rewritten commits) — a much larger, riskier operation not
  undertaken here. Flagged to the user; not yet acted on.
- Vercel preview deployments were confirmed genuinely working as a side
  effect of opening this task's PR (#14) — previously only assumed, per
  tasks 0008/0009.

## Changes forced by later work
none
