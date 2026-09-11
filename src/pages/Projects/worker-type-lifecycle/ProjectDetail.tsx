import { Link } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Markdown from '../../../components/Markdown/Markdown'
import ScreenshotGallery from '../../../components/ScreenshotGallery/ScreenshotGallery'
import project from '../../../data/projects/highlighted/worker-type-lifecycle'
import { componentsBySlug } from '../../../data/components'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  return (
    <article>
      <h1 className={styles.heading}>{project.name}</h1>
      <p className={styles.blurb}>{project.blurb}</p>
      {project.techStack && (
        <div className={styles.tags}>
          {project.techStack.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.screenshots && <ScreenshotGallery screenshots={project.screenshots} columns={3} />}

      <h2 className={styles.sectionHeading}>The problem</h2>
      <Markdown>{project.problem}</Markdown>

      <h2 className={styles.sectionHeading}>Code</h2>
      {project.snippets.map((snippet, index) => (
        <div key={`${snippet.label}-${index}`} className={styles.snippet}>
          <h3 className={styles.snippetLabel}>{snippet.label}</h3>
          <div className={styles.snippetTalkThrough}>
            <Markdown>{snippet.talkThrough}</Markdown>
          </div>
          <div className={styles.snippetBlock}>
            <SyntaxHighlighter
              language={snippet.language}
              style={oneDark}
              customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem' }}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
          {snippet.components && (
            <div className="mt-3 flex flex-wrap gap-2">
              {snippet.components.map((slug) => {
                const component = componentsBySlug[slug]
                if (!component) return null
                return (
                  <Link
                    key={slug}
                    to={`/components/${slug}`}
                    className="inline-block rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
                  >
                    View {component.name} component
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </article>
  )
}
