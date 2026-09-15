import type { BriefProject } from './types'
import toastNotificationsDetail from './brief-detail/toast-notifications'

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
    name: 'TODO: generic project name (no real employer/product names)',
    blurb: 'TODO: 1-2 sentence blurb — a consistent system for tracking, using, and updating a large light/dark colour palette.',
  },
  {
    slug: 'button-pill-styling',
    tier: 'brief',
    name: 'TODO: generic project name (no real employer/product names)',
    blurb:
      'TODO: 1-2 sentence blurb — a dynamic, generic button/pill component replacing several visually different but functionally identical variants.',
  },
  {
    slug: 'cv-builder',
    tier: 'brief',
    name: 'TODO: generic project name (no real employer/product names)',
    blurb: 'TODO: 1-2 sentence blurb — a two-person build of a CV builder; built three sections plus sortable-entry functionality.',
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
