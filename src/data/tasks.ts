export interface DecisionDoc {
  context: string
  optionsConsidered: string
  decision: string
  why: string
  consequences: string
  changesForcedByLaterWork: string | null
}

export interface TaskEntry {
  id: string
  title: string
  type: string
  status: string
  summary: string
  outcome: string
  changesForcedByLaterWork: string | null
  decision: DecisionDoc | null
}

function parseFrontmatter(raw: string): { fields: Record<string, string>; body: string } {
  const normalized = raw.replace(/\r\n/g, '\n')
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error('Task file is missing frontmatter')
  }
  const fields = Object.fromEntries(
    match[1]
      .trim()
      .split('\n')
      .map((line) => {
        const i = line.indexOf(':')
        return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
      }),
  )
  return { fields, body: match[2] }
}

function parseSections(body: string): Record<string, string> {
  return Object.fromEntries(
    body
      .split(/^## /m)
      .filter(Boolean)
      .map((part) => {
        const [heading, ...rest] = part.split('\n')
        return [heading.trim(), rest.join('\n').trim()]
      }),
  )
}

function withoutNone(value: string | undefined): string | null {
  return value && value !== 'none' ? value : null
}

function folderOf(path: string): string {
  return path.replace(/\/(task|decision)\.md$/, '')
}

function parseDecisionDoc(raw: string): DecisionDoc {
  const body = raw.replace(/\r\n/g, '\n').replace(/^# Decision:.*\n/, '')
  const sections = parseSections(body)
  return {
    context: sections['Context'] ?? '',
    optionsConsidered: sections['Options considered'] ?? '',
    decision: sections['Decision'] ?? '',
    why: sections['Why'] ?? '',
    consequences: sections['Consequences'] ?? '',
    changesForcedByLaterWork: withoutNone(sections['Changes forced by later work']),
  }
}

const taskFiles = import.meta.glob<string>(['/tasks/*/task.md', '!/tasks/_template/**'], {
  eager: true,
  query: '?raw',
  import: 'default',
})

const decisionFiles = import.meta.glob<string>(['/tasks/*/decision.md', '!/tasks/_template/**'], {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const tasks: TaskEntry[] = Object.entries(taskFiles)
  .map(([path, raw]) => {
    const { fields, body } = parseFrontmatter(raw)
    const sections = parseSections(body)
    const decisionRaw = decisionFiles[`${folderOf(path)}/decision.md`]

    return {
      id: fields.id,
      title: fields.title,
      type: fields.type,
      status: fields.status,
      summary: sections['Summary'] ?? '',
      outcome: sections['Outcome'] ?? '',
      changesForcedByLaterWork: withoutNone(sections['Changes forced by later work']),
      decision: decisionRaw ? parseDecisionDoc(decisionRaw) : null,
    }
  })
  .sort((a, b) => a.id.localeCompare(b.id))
