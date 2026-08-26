import TimelineCard from '../components/TimelineCard'
import { tasks } from '../data/tasks'

export default function Process() {
  return (
    <section>
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Build Log</h1>
      <p className="mt-2 max-w-xl text-neutral-600 dark:text-neutral-400">
        A running record of how this site is being built, task by task, straight from the repo's own{' '}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">tasks/</code> folder.
      </p>
      <ol className="relative mt-8 border-l border-neutral-200 dark:border-neutral-800">
        {tasks.map((task) => (
          <li key={task.id} className="relative py-4 pl-8 first:pt-0 last:pb-0">
            <span className="absolute top-8 -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-white bg-neutral-400 dark:border-neutral-950 dark:bg-neutral-600" />
            <TimelineCard task={task} />
          </li>
        ))}
      </ol>
    </section>
  )
}
