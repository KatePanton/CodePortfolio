import { Link } from 'react-router-dom'
import { briefProjects, highlightedProjects } from '../../data/projects'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section>
      <h1 className={styles.heading}>Projects</h1>
      <p className={styles.intro}>
        A selection of work from prior roles, shared with employer permission in redacted form.
      </p>

      <h2 className={styles.sectionHeading}>Highlighted projects</h2>
      <div className={styles.highlightedGrid}>
        {highlightedProjects.map((project) => (
          <Link key={project.slug} to={`/projects/${project.slug}`} className={styles.card}>
            <span className={styles.cardBadge}>Case study</span>
            <h3 className={styles.cardTitle}>{project.name}</h3>
            <p className={styles.cardBlurb}>{project.blurb}</p>
            {project.techStack && (
              <div className={styles.tags}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.tag}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      <h2 className={styles.sectionHeading}>More projects</h2>
      <div className={styles.briefList}>
        {briefProjects.map((project) => (
          <div key={project.slug} className={styles.briefItem}>
            <div className={styles.briefHeader}>
              <span className={styles.briefTitle}>{project.name}</span>
              {project.codeLink && (
                <a href={project.codeLink} target="_blank" rel="noreferrer" className={styles.briefLink}>
                  View code ↗
                </a>
              )}
            </div>
            <p className={styles.briefBlurb}>{project.blurb}</p>
            {project.techStack && (
              <div className={styles.tags}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.tag}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
