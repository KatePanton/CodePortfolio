import { useState } from 'react'
import CodeSnippetView from '../CodeSnippetView/CodeSnippetView'
import type { CodeSnippet } from '../../data/projects/types'
import styles from './SnippetTabs.module.css'

export default function SnippetTabs({ snippets }: { snippets: CodeSnippet[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = snippets[activeIndex]

  return (
    <div>
      <div role="tablist" className={styles.tabList}>
        {snippets.map((snippet, index) => (
          <button
            key={snippet.label}
            type="button"
            role="tab"
            id={`snippet-tab-${index}`}
            aria-selected={index === activeIndex}
            aria-controls={`snippet-tabpanel-${index}`}
            className={index === activeIndex ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => setActiveIndex(index)}
          >
            {snippet.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`snippet-tabpanel-${activeIndex}`} aria-labelledby={`snippet-tab-${activeIndex}`}>
        <CodeSnippetView snippet={active} showLabel={false} />
      </div>
    </div>
  )
}
