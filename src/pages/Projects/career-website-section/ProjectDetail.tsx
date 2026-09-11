import Markdown from '../../../components/Markdown/Markdown'
import CodeSnippetView from '../../../components/CodeSnippetView/CodeSnippetView'
import SnippetTabs from '../../../components/SnippetTabs/SnippetTabs'
import project from '../../../data/projects/highlighted/career-website-section'
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
        <CodeSnippetView key={`${snippet.label}-${index}`} snippet={snippet} />
      ))}

      {project.tabbedSnippets && (
        <>
          <h2 className={styles.sectionHeading}>Exploring each tab</h2>
          <p className={styles.blurb}>
            The career detail page itself is tabbed — so is its code. Click a tab below to see that tab's component.
          </p>
          <SnippetTabs snippets={project.tabbedSnippets} />
        </>
      )}
    </article>
  )
}
