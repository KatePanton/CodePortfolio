import { Link } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Markdown from '../Markdown/Markdown'
import type { CodeSnippet } from '../../data/projects/types'
import { componentsBySlug } from '../../data/components'
import styles from './CodeSnippetView.module.css'

export default function CodeSnippetView({ snippet, showLabel = true }: { snippet: CodeSnippet; showLabel?: boolean }) {
  return (
    <div className={styles.snippet}>
      {showLabel && <h3 className={styles.snippetLabel}>{snippet.label}</h3>}
      <div className={styles.snippetTalkThrough}>
        <Markdown>{snippet.talkThrough}</Markdown>
      </div>
      {snippet.screenshot && (
        <div className={styles.snippetScreenshot}>
          <img src={snippet.screenshot.src} alt={snippet.screenshot.alt} />
        </div>
      )}
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
        <div className={styles.componentLinks}>
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
  )
}
