---
id: 0015
title: Custom domain for Vercel-hosted site
type: site-build
status: done
---

## Summary

The site is live on Vercel's auto-assigned subdomain
(`code-portfolio-pi.vercel.app`) since task
[0008 "Vercel hosting"](../0008_vercel-hosting/task.md), which deliberately
deferred a custom domain as a separate decision. This task closes that loop:
point the already-registered apex domain `katepanton.dev` at the Vercel
project via DNS, and update the root `README.md` `## Deployment` section to
reference the new URL.

DNS/Vercel dashboard linking may require manual account steps (per 0008's
precedent for the initial Vercel import) — done with the user directly
involved when this task is worked, not automated end-to-end.

## Decision doc
none

## Patterns

## Screenshots

## Outcome

User linked `katepanton.dev` to the Vercel project via the Vercel dashboard
(DNS/account steps done manually, per 0008's precedent). Verified the domain
serves the same content as `code-portfolio-pi.vercel.app`. Updated
`README.md`'s `## Deployment` section to point at the new URL.

## Changes forced by later work
none
