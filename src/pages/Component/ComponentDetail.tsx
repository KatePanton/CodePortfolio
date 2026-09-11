import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { componentsBySlug } from '../../data/components'
import NotFound from '../NotFound'
import styles from './ComponentDetail.module.css'

export default function ComponentDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const component = slug ? componentsBySlug[slug] : undefined
  if (!component) return <NotFound />

  const hasInAppHistory = location.key !== 'default'

  return (
    <article>
      {hasInAppHistory ? (
        <button type="button" onClick={() => navigate(-1)} className={styles.backLink}>
          ← Back
        </button>
      ) : (
        <Link to="/projects" className={styles.backLink}>
          ← Back to projects
        </Link>
      )}

      <h1 className={styles.heading}>{component.name}</h1>
      <p className={styles.subheading}>{`<${component.tagName}>`}</p>
      <p className={styles.description}>{component.description}</p>

      <div className={styles.snippetBlock}>
        <SyntaxHighlighter
          language={component.language}
          style={oneDark}
          customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem' }}
        >
          {component.code}
        </SyntaxHighlighter>
      </div>
    </article>
  )
}
