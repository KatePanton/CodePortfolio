import { Link } from 'react-router-dom'
import type { SkillEntry } from '../../data/skills'
import Disclosure from '../Disclosure/Disclosure'
import Markdown from '../Markdown/Markdown'
import styles from './SkillCard.module.css'

export default function SkillCard({ skill }: { skill: SkillEntry }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{skill.name}</h2>
      <p className={styles.description}>{skill.description}</p>
      <Link className={styles.taskLink} to={`/process#task-${skill.taskId}`}>
        Built in task {skill.taskId}
      </Link>
      {skill.body && (
        <Disclosure label="Full details">
          <Markdown>{skill.body}</Markdown>
        </Disclosure>
      )}
    </article>
  )
}
