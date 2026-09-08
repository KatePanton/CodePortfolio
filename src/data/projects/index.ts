import { highlightedProjects } from './highlighted'
import { briefProjects } from './brief'
import type { HighlightedProject } from './types'

export * from './types'
export { highlightedProjects, briefProjects }

export function getProject(slug: string): HighlightedProject | undefined {
  return highlightedProjects.find((project) => project.slug === slug)
}
