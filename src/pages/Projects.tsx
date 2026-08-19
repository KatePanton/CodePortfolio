import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section>
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Projects</h1>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              to={`/projects/${project.slug}`}
              className="block rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            >
              <h2 className="font-medium text-neutral-900 dark:text-neutral-100">{project.title}</h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
