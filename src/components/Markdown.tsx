import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components: Components = {
  p: (props) => <p {...props} className="text-neutral-600 dark:text-neutral-400" />,
  strong: (props) => <strong {...props} className="font-medium text-neutral-900 dark:text-neutral-100" />,
  code: (props) => <code {...props} className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800" />,
  a: ({ href, ...props }) => (
    <a
      {...props}
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noreferrer' : undefined}
      className="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100"
    />
  ),
  ul: (props) => <ul {...props} className="list-disc space-y-1 pl-5" />,
  ol: (props) => <ol {...props} className="list-decimal space-y-1 pl-5" />,
  input: (props) => <input {...props} className="mr-2 align-middle accent-neutral-500" />,
}

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
