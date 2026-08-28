import SkillCard from '../../components/SkillCard/SkillCard'
import { skills } from '../../data/skills'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section>
      <h1 className={styles.heading}>Skills</h1>
      <p className={styles.intro}>
        The project-authored agent skills that drive how this site gets built, sourced live from{' '}
        <code>.claude/skills/README.md</code>.
      </p>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  )
}
