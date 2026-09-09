import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Markdown from '../../../components/Markdown/Markdown'
import project from '../../../data/projects/highlighted/normalise-import-data'
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

      {project.screenshots && (
        <div className={styles.screenshots}>
          {project.screenshots.map((screenshot) => (
            <img key={screenshot.src} src={screenshot.src} alt={screenshot.alt} />
          ))}
        </div>
      )}

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
        </div>
      ))}
    </article>
  )
}
