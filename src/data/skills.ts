export interface SkillEntry {
  name: string
  description: string
  taskId: string
  body: string
}

function parseIndexTable(readme: string): { name: string; description: string; taskId: string }[] {
  const rowRe = /^\|\s*\[([^\]]+)\]\([^)]+\)\s*\|\s*(.+?)\s*\|\s*\[(\d+)\]\([^)]+\)\s*\|$/gm
  return Array.from(readme.matchAll(rowRe)).map((match) => ({
    name: match[1],
    description: match[2],
    taskId: match[3],
  }))
}

const readmeFiles = import.meta.glob<string>('/.claude/skills/README.md', {
  eager: true,
  query: '?raw',
  import: 'default',
  exhaustive: true,
})

const skillFiles = import.meta.glob<string>('/.claude/skills/*/SKILL.md', {
  eager: true,
  query: '?raw',
  import: 'default',
  exhaustive: true,
})

function bodyFor(name: string): string {
  const raw = skillFiles[`/.claude/skills/${name}/SKILL.md`]
  if (!raw) return ''
  const normalized = raw.replace(/\r\n/g, '\n')
  return normalized.replace(/^---\n[\s\S]*?\n---\n?/, '').trim()
}

const readme = Object.values(readmeFiles)[0]?.replace(/\r\n/g, '\n') ?? ''

export const skills: SkillEntry[] = parseIndexTable(readme).map((entry) => ({
  ...entry,
  body: bodyFor(entry.name),
}))
