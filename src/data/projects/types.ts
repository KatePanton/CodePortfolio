export type ProjectTier = 'highlighted' | 'brief'

export interface CodeSnippet {
  label: string
  language: string
  code: string
  talkThrough: string
  screenshot?: ProjectScreenshot
}

export interface ProjectScreenshot {
  src: string
  alt: string
}

interface BaseProject {
  slug: string
  name: string
  techStack?: string[]
}

export interface BriefProject extends BaseProject {
  tier: 'brief'
  blurb: string
  codeLink?: string
}

export interface HighlightedProject extends BaseProject {
  tier: 'highlighted'
  blurb: string
  screenshots?: ProjectScreenshot[]
  problem: string
  snippets: CodeSnippet[]
  /** Rendered as a tab switcher instead of a flat list — for projects where the code itself splits into the same tabs the UI does. */
  tabbedSnippets?: CodeSnippet[]
}

export type Project = BriefProject | HighlightedProject
