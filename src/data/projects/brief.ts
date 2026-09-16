import type { BriefProject } from './types'
import toastNotificationsDetail from './brief-detail/toast-notifications'
import cssColourVariantThemingDetail from './brief-detail/css-colour-variant-theming'
import buttonPillStylingDetail from './brief-detail/button-pill-styling'
import cvBuilderDetail from './brief-detail/cv-builder'

export const briefProjects: BriefProject[] = [
  {
    slug: 'portfolio-component-display',
    tier: 'brief',
    name: 'TODO: generic project name (no real employer/product names)',
    blurb: "TODO: 1-2 sentence blurb — a component and view model for displaying a selected user's portfolios.",
  },
  {
    slug: 'external-skills-api-integration',
    tier: 'brief',
    name: 'TODO: generic project name (no real employer/product names)',
    blurb:
      'TODO: 1-2 sentence blurb — frontend and backend integration with a third-party skills-courses API, delivered in phases.',
  },
  {
    slug: 'css-colour-variant-theming',
    tier: 'brief',
    name: 'Colour-Variant Token System',
    blurb:
      'A Tailwind colour-token system that maps a fixed set of semantic roles onto each named colour, with a single union type as the source of truth — so adding or restyling a colour is a one-place change instead of a hunt through every component.',
    techStack: ['Tailwind CSS', 'TypeScript'],
    detail: cssColourVariantThemingDetail,
  },
  {
    slug: 'button-pill-styling',
    tier: 'brief',
    name: 'Unified Button & Pill Components',
    blurb:
      'A single, dynamic Button and Pill component pair that replaced several visually different but functionally identical variants, driven entirely by variant/colour props against the colour-token system above.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'tailwind-merge', 'Font Awesome'],
    detail: buttonPillStylingDetail,
  },
  {
    slug: 'cv-builder',
    tier: 'brief',
    name: 'CV Builder',
    blurb:
      'A two-person build of a CV builder with live preview. Built the Interests, References, and Skill sections, plus the shared drag-to-reorder list component all six list-backed sections are built on.',
    techStack: ['React', 'TypeScript', 'Inertia.js', '@dnd-kit', 'Tailwind CSS'],
    detail: cvBuilderDetail,
  },
  {
    slug: 'toast-notifications',
    tier: 'brief',
    name: 'Themed Toast Notification System',
    blurb:
      'A themed toast-notification system built on react-toastify, with variant-based icon styling for different severities and layout components for plain, single-action, and dual-action toasts.',
    techStack: ['React', 'TypeScript', 'react-toastify', 'Font Awesome', 'Tailwind CSS'],
    detail: toastNotificationsDetail,
  },
  {
    slug: 'storybook-component-library',
    tier: 'brief',
    name: 'TODO: generic project name (no real employer/product names)',
    blurb: 'TODO: 1-2 sentence blurb — a full component-library Storybook, from low-level components to full-page compositions.',
  },
]
