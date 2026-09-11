import type { ComponentDoc } from './types'
import customImageResponse from './custom-image-response'
import customWtReport from './custom-wt-report'
import customWtLesson from './custom-wt-lesson'

const components: ComponentDoc[] = [customImageResponse, customWtReport, customWtLesson]

export const componentsBySlug: Record<string, ComponentDoc> = Object.fromEntries(
  components.map((component) => [component.slug, component]),
)
