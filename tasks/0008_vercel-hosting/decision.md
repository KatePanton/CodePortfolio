# Decision: Dashboard import, no test PR, default subdomain

## Context
`vercel.json` and README deployment instructions already existed but were
never acted on. Sharpening via `/grill-me` surfaced three real forks:
how to link the project, whether to prove preview deployments with a
throwaway PR, and whether to attach a custom domain now.

## Options considered
1. **Vercel CLI** (`vercel link` / `vercel --prod`) vs **dashboard**
   "Import Git Repository" flow.
2. **Open a disposable test PR** to prove preview deployments work, vs
   **trust the default** and let the next real task's PR be the proof.
3. **Attach a custom domain now** vs **default `*.vercel.app` subdomain**.

## Decision
Dashboard import (done by the user, since it requires GitHub OAuth
authorization the agent can't grant); no test PR; default subdomain.

## Why
The dashboard flow wires up automatic deployments *and* PR previews in a
single click-through, so there was no benefit to the CLI here — and the
initial `vercel login` would've needed interactive user auth either way.
A throwaway PR to prove previews work would just be process overhead for a
default Vercel already turns on for every Git-connected project; the very
next task's PR gives the same proof for free. A custom domain is a fully
separate, reversible decision (ownership, DNS) not worth bundling into
"get the site live."

## Consequences
- Live URL is `https://code-portfolio-pi.vercel.app/`, not a clean
  repo-name match — Vercel appended a suffix due to a name collision.
  Cosmetic only; renaming the project later is non-disruptive.
- Preview-deployment behavior is asserted, not directly verified in this
  task — worth a quick sanity check the next time a PR is opened.
