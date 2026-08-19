import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
        Hi, I'm building a portfolio.
      </h1>
      <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-400">
        This is a starter scaffold. Replace this copy with an introduction, then add real
        entries to <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">src/data/projects.ts</code>.
      </p>
      <Link
        to="/projects"
        className="mt-6 inline-block rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
      >
        View projects
      </Link>
    </section>
  )
}
