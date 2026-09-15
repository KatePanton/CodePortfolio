import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import ScreenshotGallery from '../../../components/ScreenshotGallery/ScreenshotGallery'
import CodeSnippetView from '../../../components/CodeSnippetView/CodeSnippetView'
import { briefProjects } from '../../../data/projects'
import NotFound from '../../NotFound'
import styles from './BriefDetail.module.css'

export default function BriefDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const project = briefProjects.find((p) => p.slug === slug)
  if (!project || !project.detail) return <NotFound />

  const hasInAppHistory = location.key !== 'default'
  const { media, snippets } = project.detail

  return (
    <article>
      {hasInAppHistory ? (
        <button type="button" onClick={() => navigate(-1)} className={styles.backLink}>
          ← Back
        </button>
      ) : (
        <Link to="/projects" className={styles.backLink}>
          ← Back to projects
        </Link>
      )}

      <h1 className={styles.heading}>{project.name}</h1>
      <p className={styles.blurb}>{project.blurb}</p>

      {media?.kind === 'screenshots' && <ScreenshotGallery screenshots={media.screenshots} columns={2} />}
      {media?.kind === 'video' && (
        <div className={styles.videoWrap}>
          <video src={media.video.src} controls aria-label={media.video.alt} className={styles.video} />
          {media.video.caption && <p className={styles.videoCaption}>{media.video.caption}</p>}
        </div>
      )}

      {snippets?.map((snippet, index) => (
        <CodeSnippetView key={`${snippet.label}-${index}`} snippet={snippet} />
      ))}
    </article>
  )
}
