export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  language: string
  code: string
}

export const projects: Project[] = [
  {
    slug: 'example-project',
    title: 'Example Project',
    description: 'A sample entry showing how a project card links to a detail page with syntax-highlighted code.',
    tags: ['React', 'TypeScript'],
    language: 'tsx',
    code: `export function Example() {
  return <div>Replace this with a real project</div>
}
`,
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
