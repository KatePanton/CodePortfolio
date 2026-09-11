import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects/Projects'
import About from './pages/About'
import NotFound from './pages/NotFound'

const NormaliseImportDataDetail = lazy(() => import('./pages/Projects/normalise-import-data/ProjectDetail'))
const AffordabilityAssessmentDetail = lazy(() => import('./pages/Projects/affordability-assessment/ProjectDetail'))
const CareerWebsiteSectionDetail = lazy(() => import('./pages/Projects/career-website-section/ProjectDetail'))
const Process = lazy(() => import('./pages/Process/Process'))
const Skills = lazy(() => import('./pages/Skills/Skills'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route
          path="projects/normalise-import-data"
          element={
            <Suspense fallback={null}>
              <NormaliseImportDataDetail />
            </Suspense>
          }
        />
        <Route
          path="projects/affordability-assessment"
          element={
            <Suspense fallback={null}>
              <AffordabilityAssessmentDetail />
            </Suspense>
          }
        />
        <Route
          path="projects/career-website-section"
          element={
            <Suspense fallback={null}>
              <CareerWebsiteSectionDetail />
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
