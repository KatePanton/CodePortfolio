export type ProjectTier = 'highlighted' | 'brief'

export interface CodeSnippet {
  label: string
  language: string
  code: string
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
  snippets: CodeSnippet[]
  talkThrough: string
}

export type Project = BriefProject | HighlightedProject
