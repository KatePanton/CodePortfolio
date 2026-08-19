import { Navigate, useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { getProject } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <article>
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{project.title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">{project.description}</p>
      <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
        <SyntaxHighlighter
          language={project.language}
          style={oneDark}
          customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem' }}
        >
          {project.code}
        </SyntaxHighlighter>
      </div>
    </article>
  )
}
