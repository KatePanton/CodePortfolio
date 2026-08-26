import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
    isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-500 dark:text-neutral-400'
  }`

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="font-semibold text-neutral-900 dark:text-neutral-100">
            Code Portfolio
          </NavLink>
          <div className="flex gap-6">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              Projects
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/process" className={navLinkClass}>
              Build Log
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-neutral-200 px-6 py-6 text-center text-sm text-neutral-400 dark:border-neutral-800">
        © {new Date().getFullYear()} Code Portfolio
      </footer>
    </div>
  )
}
