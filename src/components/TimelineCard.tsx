import type { TaskEntry } from '../data/tasks'
import Disclosure from './Disclosure'
import Markdown from './Markdown'

const badgeClass = 'rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'

function Section({ heading, content }: { heading: string; content: string }) {
  if (!content) return null
  return (
    <div className="mt-3 first:mt-0">
      <h4 className="text-xs font-semibold tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
        {heading}
      </h4>
      <div className="mt-1">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  )
}

export default function TimelineCard({ task }: { task: TaskEntry }) {
  const hasExtra = Boolean(task.outcome || task.decision || task.changesForcedByLaterWork)

  return (
    <article className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">{task.id}</span>
        <h2 className="font-medium text-neutral-900 dark:text-neutral-100">{task.title}</h2>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className={badgeClass}>{task.type}</span>
        <span className={badgeClass}>{task.status}</span>
      </div>
      <div className="mt-3">
        <Markdown>{task.summary}</Markdown>
      </div>
      {hasExtra && (
        <Disclosure label="Full details">
          <Section heading="Outcome" content={task.outcome} />
          {task.decision && (
            <div className="mt-3 border-t border-neutral-100 pt-3 first:mt-0 first:border-t-0 first:pt-0 dark:border-neutral-800">
              <h3 className="text-xs font-semibold tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
                Why this decision
              </h3>
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
