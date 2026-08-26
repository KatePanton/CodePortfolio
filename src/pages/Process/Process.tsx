import TimelineCard from '../../components/TimelineCard/TimelineCard'
import { tasks } from '../../data/tasks'
import styles from './Process.module.css'

export default function Process() {
  return (
    <section>
      <h1 className={styles.heading}>Build Log</h1>
      <p className={styles.intro}>
        A running record of how this site is being built, task by task, straight from the repo's own{' '}
        <code>tasks/</code> folder.
      </p>
      <ol className={styles.timeline}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.entry}>
            <span className={styles.dot} />
            <TimelineCard task={task} />
          </li>
        ))}
      </ol>
    </section>
  )
}
