import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import NotFound from './pages/NotFound'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Process = lazy(() => import('./pages/Process/Process'))
const Skills = lazy(() => import('./pages/Skills/Skills'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route
          path="projects/:slug"
          element={
            <Suspense fallback={null}>
              <ProjectDetail />
            </Suspense>
          }
        />
        <Route path="about" element={<About />} />
        <Route
          path="process"
          element={
            <Suspense fallback={null}>
              <Process />
            </Suspense>
          }
        />
        <Route
          path="skills"
          element={
            <Suspense fallback={null}>
              <Skills />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
