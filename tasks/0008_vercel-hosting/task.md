---
id: 0008
title: Vercel hosting
type: site-build
status: done
---

## Summary
Get the site actually hosted on Vercel — `vercel.json` (SPA rewrite) was
already committed and the root README already described a Deployment
process, but neither had ever been acted on or tracked as a task (see task
0007's investigation).

Sharpened via a full `/grill-me` session:
- The user performed the actual Vercel signup + GitHub-authorization +
  "Import Git Repository" step themselves in the Vercel dashboard — that's
  account/OAuth linking, which the agent cannot perform on the user's
  behalf.
- Vercel auto-detected the Vite preset (`npm run build`, output `dist`) and
  the existing `vercel.json` rewrite.
- No custom domain for this task — default Vercel subdomain only. Live URL:
  https://code-portfolio-pi.vercel.app/ (not the plain repo-name subdomain,
  due to a naming collision on Vercel's side).
- Preview deployments deliberately not verified with a throwaway test PR —
  assumed enabled per Vercel's default behavior for Git-connected projects;
  the next real task's PR will be the actual confirmation.

Done = site reachable at the live URL, a client-side route resolves
correctly on a direct/hard navigation (proves the SPA rewrite works in
production, not just client-side nav), and the README's Deployment section
updated with the real URL.

## Decision doc
[decision.md](decision.md)

## Patterns
None — infra/config task, no reusable code pattern.

## Screenshots
See screenshots/ in this folder.

## Outcome
Site is live at https://code-portfolio-pi.vercel.app/. Verified the
`vercel.json` SPA rewrite works in production: a direct/hard navigation to
`/about` (not client-side nav) returned HTTP 200 with the correct rendered
content, rather than a 404. Updated the README's Deployment section with
the live URL. Preview-deployment behavior wasn't independently verified
(deliberately, per the grill session) — will confirm on the next PR opened
against this repo. See [decision.md](decision.md).