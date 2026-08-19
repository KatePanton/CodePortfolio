import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="text-center">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-sm text-neutral-500 underline hover:text-neutral-900 dark:hover:text-neutral-100">
        Back home
      </Link>
    </section>
  )
}
