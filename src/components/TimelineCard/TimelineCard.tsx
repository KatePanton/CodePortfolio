import { useRef } from 'react'
import type { TaskEntry } from '../../data/tasks'
import styles from './TimelineCard.module.css'
import Disclosure from '../Disclosure/Disclosure'
import Markdown from '../Markdown/Markdown'

function Section({ heading, content }: { heading: string; content: string }) {
  if (!content) return null
  return (
    <div className={styles.section}>
      <h4 className={styles.sectionHeading}>{heading}</h4>
      <div className={styles.sectionBody}>
        <Markdown>{content}</Markdown>
      </div>
    </div>
  )
}

export default function TimelineCard({ task }: { task: TaskEntry }) {
  const hasExtra = Boolean(task.outcome || task.decision || task.changesForcedByLaterWork)
  const articleRef = useRef<HTMLElement>(null)

  return (
    <article ref={articleRef} className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>{task.id}</span>
        <h2 className={styles.title}>{task.title}</h2>
      </div>
      <div className={styles.badges}>
        <span className={styles.badge}>{task.type}</span>
        <span className={styles.badge}>{task.status}</span>
      </div>
      <div className={styles.summary}>
        <Markdown>{task.summary}</Markdown>
      </div>
      {hasExtra && (
        <Disclosure
          label="Full details"
          onOpenChange={(open) => {
            if (!open) articleRef.current?.scrollIntoView({ block: 'start' })
          }}
        >
          <Section heading="Outcome" content={task.outcome} />
          {task.decision && (
            <div className={styles.decisionGroup}>
              <h3 className={styles.sectionHeading}>Why this decision</h3>
              <Section heading="Context" content={task.decision.context} />
              <Section heading="Options considered" content={task.decision.optionsConsidered} />
              <Section heading="Decision" content={task.decision.decision} />
              <Section heading="Why" content={task.decision.why} />
              <Section heading="Consequences" content={task.decision.consequences} />
            </div>
          )}
          <Section heading="Changes forced by later work" content={task.changesForcedByLaterWork ?? ''} />
        </Disclosure>
      )}
    </article>
  )
}
