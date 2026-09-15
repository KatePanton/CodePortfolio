import type { BriefProjectDetail } from '../types'

const detail: BriefProjectDetail = {
  snippets: [
    {
      label: 'Colour tokens',
      language: 'css',
      talkThrough:
        "A Tailwind v4 `@theme` block, one entry per named colour. Each colour gets the same fixed set of semantic roles — `text`, `background`, `background-pastel`, `solid-text`, `solid-background`, `hover` — each pointing at a Tailwind shade rather than a literal hex value. Components never reference `indigo-600` directly; they reference `brand-text`, so swapping the whole site's palette (or adding a white-label theme) is a matter of repointing these variables, not hunting through every component for a hardcoded shade.",
      code: `@import 'tailwindcss';

@theme {
  /* ... Other system CSS variables */

  /* Pills & Buttons */
  --color-border-subtle: var(--color-slate-300);

  --color-brand-text: var(--color-indigo-600);
  --color-brand-background: var(--color-indigo-100);
  --color-brand-background-pastel: var(--color-indigo-50);
  --color-brand-solid-text: var(--color-white);
  --color-brand-solid-background: var(--color-indigo-600);
  --color-brand-hover: var(--color-indigo-200);

  --color-secondary-text: var(--color-amber-600);
  --color-secondary-background: var(--color-amber-100);
  --color-secondary-background-pastel: var(--color-amber-50);
  --color-secondary-solid-text: var(--color-amber-950);
  --color-secondary-solid-background: var(--color-amber-400);
  --color-secondary-hover: var(--color-amber-300);

  --color-neutral-text: var(--color-slate-500);
  --color-neutral-background: var(--color-slate-200);
  --color-neutral-background-pastel: var(--color-neutral-50);
  --color-neutral-solid-text: var(--color-white);
  --color-neutral-solid-background: var(--color-slate-700);
  --color-neutral-hover: var(--color-slate-300);

  --color-black-text: var(--color-slate-900);
  --color-black-background: var(--color-slate-100);
  --color-black-background-pastel: var(--color-slate-50);
  --color-black-solid-text: var(--color-white);
  --color-black-solid-background: var(--color-slate-900);
  --color-black-hover: var(--color-slate-200);

  --color-blue-text: var(--color-blue-600);
  --color-blue-background: var(--color-blue-100);
  --color-blue-background-pastel: var(--color-blue-50);
  --color-blue-solid-text: var(--color-blue-50);
  --color-blue-solid-background: var(--color-blue-600);
  --color-blue-hover: var(--color-blue-200);

  --color-cyan-text: var(--color-cyan-600);
  --color-cyan-background: var(--color-cyan-100);
  --color-cyan-background-pastel: var(--color-cyan-50);
  --color-cyan-solid-text: var(--color-cyan-900);
  --color-cyan-solid-background: var(--color-cyan-400);
  --color-cyan-hover: var(--color-cyan-200);

  --color-dark-green-text: var(--color-emerald-700);
  --color-dark-green-background: var(--color-emerald-100);
  --color-dark-green-background-pastel: var(--color-emerald-50);
  --color-dark-green-solid-text: var(--color-emerald-50);
  --color-dark-green-solid-background: var(--color-emerald-600);
  --color-dark-green-hover: var(--color-emerald-200);

  --color-light-green-text: var(--color-lime-700);
  --color-light-green-background: var(--color-lime-100);
  --color-light-green-background-pastel: var(--color-lime-50);
  --color-light-green-solid-text: var(--color-lime-50);
  --color-light-green-solid-background: var(--color-lime-600);
  --color-light-green-hover: var(--color-lime-200);

  --color-magenta-text: var(--color-fuchsia-600);
  --color-magenta-background: var(--color-fuchsia-100);
  --color-magenta-background-pastel: var(--color-fuchsia-50);
  --color-magenta-solid-text: var(--color-fuchsia-50);
  --color-magenta-solid-background: var(--color-fuchsia-600);
  --color-magenta-hover: var(--color-fuchsia-200);

  --color-orange-text: var(--color-orange-700);
  --color-orange-background: var(--color-orange-100);
  --color-orange-background-pastel: var(--color-orange-50);
  --color-orange-solid-text: var(--color-orange-950);
  --color-orange-solid-background: var(--color-orange-400);
  --color-orange-hover: var(--color-orange-200);

  --color-pink-text: var(--color-pink-600);
  --color-pink-background: var(--color-pink-100);
  --color-pink-background-pastel: var(--color-pink-50);
  --color-pink-solid-text: var(--color-pink-50);
  --color-pink-solid-background: var(--color-pink-600);
  --color-pink-hover: var(--color-pink-200);

  --color-purple-text: var(--color-purple-700);
  --color-purple-background: var(--color-purple-100);
  --color-purple-background-pastel: var(--color-purple-50);
  --color-purple-solid-text: var(--color-purple-50);
  --color-purple-solid-background: var(--color-purple-600);
  --color-purple-hover: var(--color-purple-200);

  --color-red-text: var(--color-red-600);
  --color-red-background: var(--color-red-100);
  --color-red-background-pastel: var(--color-red-50);
  --color-red-solid-text: var(--color-red-50);
  --color-red-solid-background: var(--color-red-600);
  --color-red-hover: var(--color-red-200);

  --color-teal-text: var(--color-teal-600);
  --color-teal-background: var(--color-teal-100);
  --color-teal-background-pastel: var(--color-teal-50);
  --color-teal-solid-text: var(--color-teal-900);
  --color-teal-solid-background: var(--color-teal-400);
  --color-teal-hover: var(--color-teal-200);

  --color-violet-text: var(--color-violet-600);
  --color-violet-background: var(--color-violet-100);
  --color-violet-background-pastel: var(--color-violet-50);
  --color-violet-solid-text: var(--color-violet-50);
  --color-violet-solid-background: var(--color-violet-600);
  --color-violet-hover: var(--color-violet-200);

  --color-yellow-text: var(--color-amber-600);
  --color-yellow-background: var(--color-yellow-100);
  --color-yellow-background-pastel: var(--color-yellow-50);
  --color-yellow-solid-text: var(--color-yellow-950);
  --color-yellow-solid-background: var(--color-yellow-400);
  --color-yellow-hover: var(--color-yellow-200);
}
`,
    },
    {
      label: 'Colour type',
      language: 'ts',
      talkThrough:
        "The `Colors` union is the single source of truth for which named colours exist. Every style map that consumes it (see the button-pill-styling write-up) is typed as `Record<Colors, string>`, so TypeScript refuses to compile if a colour is added to this union without a matching entry in every one of those maps — adding a colour becomes a compiler-enforced checklist instead of a 'did I remember everywhere' search.",
      code: `export type Colors =
  | "brand"
  | "secondary"
  | "neutral"
  | "black"
  | "blue"
  | "cyan"
  | "dark-green"
  | "light-green"
  | "magenta"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "teal"
  | "violet"
  | "yellow";
`,
    },
  ],
}

export default detail
