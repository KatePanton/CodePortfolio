import lessonScreenshot from '../../../pages/Projects/worker-type-lifecycle/images/WorkerType_Lesson.png'
import longformScreenshot from '../../../pages/Projects/worker-type-lifecycle/images/WorkerType_Longform.png'
import slidesScreenshot from '../../../pages/Projects/worker-type-lifecycle/images/WorkerType_Slides.png'
import type { HighlightedProject } from '../types'

const project: HighlightedProject = {
  slug: 'worker-type-lifecycle',
  tier: 'highlighted',
  name: 'Worker Type Assessment Lifecycle',
  techStack: ['React', 'TypeScript', 'Inertia.js', 'Web Components'],
  blurb:
    "A three-stage frontend lifecycle for a personality/aptitude-style assessment feature on a student career-guidance platform: a button-based visual quiz that collects a user's answers, a multi-section report with two switchable view modes (a normal scrollable view and a slide-by-slide view), and a standalone full-screen lesson walkthrough of the same report content. All three stages are thin Inertia.js page wrappers that hand off the actual rendering to an internal web-component library, so the React layer stays focused on data flow, routing, and layout rather than visual presentation. The report view is built on a single generic layout component, shared across every report type on the platform (not just this one), that's driven entirely by a component-name prop and a shared navigation store. Switching between the scrollable and slide views doesn't require any different data plumbing — both read from the same section state.",
  screenshots: [
    { src: lessonScreenshot, alt: 'Full-screen lesson walkthrough of the report content', caption: 'Lesson' },
    { src: longformScreenshot, alt: 'Report page in its normal scrollable view, with the section navigation sidebar', caption: 'Report — longform view' },
    { src: slidesScreenshot, alt: 'Report page in its slide-by-slide view, with the slide navigation bar', caption: 'Report — slides view' },
  ],
  problem:
    "The report needed to support two structurally different ways of consuming the same content — a normal scrollable page and a slide-by-slide presentation — without duplicating the section-navigation logic (current section, mobile drawer open/closed, menu options) between them. On top of that, the layout component itself couldn't be specific to this one report: it had to work for every report type on the platform, taking which web component actually renders the content as a prop rather than hard-coding it. That left the quiz, the report, and the lesson each needing their own thin page — a different entry point, a different underlying web component, different finish/close routing — while still ultimately reading and writing the same underlying assessment data.",
  snippets: [
    {
      label: 'Quiz — collecting answers',
      language: 'tsx',
      code: `import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';

export default function Quiz({ assessment }) {
  const handleFinish = async (data) => {
      router.visit(route('reports.worker-type.submit'), {
        method: 'post',
        data: {
          answers: data.detail.answers,
          time_taken: 1,
        },
      });
  };

  return (
    <div className="h-screen w-screen bg-gray-300">
      <div className="mx-auto h-screen max-w-[1024px] rounded p-4">
        <custom-image-response
          useDummyData={false}
          componentData={assessment}
          assessmentType={'buttons'}
          onfinish={handleFinish}
        ></custom-image-response>
      </div>
    </div>
  );
}`,
      talkThrough:
        "The quiz page itself does almost nothing beyond wiring up the assessment web component and handling what happens when it finishes: the collected answers get posted to a submit endpoint via Inertia's router, which then redirects the user on to the report. The web component owns the entire quiz experience (question flow, image-based button choices, progress) — the React wrapper is just the bridge between that component's `onfinish` event and the server.",
    },
    {
      label: 'Report layout — shared across every report type',
      language: 'tsx',
      code: `type ReportLayoutProps = {
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  menuOptions: { [key: string]: string };
  webComponentName: string;
  breadcrumbs?: BreadcrumbItem[];
  pageHeader?: React.ReactNode;
};

export default function ReportLayout({
  children,
  toolbar,
  menuOptions,
  webComponentName,
  breadcrumbs,
  pageHeader,
}: ReportLayoutProps) {
  const { viewOption, setSections, setCurrentSection, currentSection, openContentNav } = useReportStore();

  useEffect(() => {
    setSections(Object.keys(menuOptions));
  }, []);

  return (
    <PageLayout fullWidth pageHeader={pageHeader} breadcrumbs={breadcrumbs}>
      <div className="bg-background-default relative mx-auto flex min-h-screen w-full max-w-7xl flex-col py-12">
        {toolbar}

        <div className="relative my-12 flex flex-1 flex-col sm:flex-row sm:gap-0 lg:mt-16 lg:px-2 lg:pb-4">
          {/* Main content */}
          <main className="w-full flex-1 p-0 sm:w-9/12 sm:px-16">
            {children}
            {/* Slide Navigation bar: only shown when viewOption */}
            {viewOption === 'slides' && <ReportSlideNavigationBar />}
          </main>

          {/* Sidebar/Menu: show on top for mobile */}
          <nav className="absolute top-0 w-full flex-shrink-0 lg:hidden">
            <Transition show={openContentNav}>
              <ReportNavigation
                viewOption={viewOption}
                sections={menuOptions}
                htmlTag={webComponentName}
                onSlide={(section) => setCurrentSection(section)}
                storeCurrentSection={currentSection}
              />
            </Transition>
          </nav>

          {/* Sidebar/Menu: show on top for desktop */}
          <nav className="relative hidden w-3/12 flex-shrink-0 lg:block">
            <ReportNavigation
              viewOption={viewOption}
              sections={menuOptions}
              htmlTag={webComponentName}
              onSlide={(section) => setCurrentSection(section)}
              storeCurrentSection={currentSection}
            />
          </nav>
        </div>
      </div>
    </PageLayout>
  );
}`,
      talkThrough:
        "This is the piece that makes the whole lifecycle work across more than just Worker Type: it knows nothing about what report it's rendering, only a `webComponentName` string and a `menuOptions` map of section keys to labels — both handed down by the caller. A shared store tracks the current section and whether the mobile nav drawer is open, and that same state drives two visually different outputs from one `ReportNavigation` component: a top drawer on mobile, a sidebar on desktop, and (when the view option is 'slides') a slide navigation bar rendered alongside the content instead of a normal scroll. Any new report type on the platform reuses this exact layout by passing its own component name and sections — nothing here changes.",
    },
    {
      label: 'Report page — composing into the shared layout',
      language: 'tsx',
      code: `export default function WorkerTypeResultPage({ report, breadcrumbs }) {
  const { setViewOption, currentSection, viewOptionsKeyLabel } = useReportStore();

  const sections = {
    summary_of_results: 'Summary of Results',
    introduction: 'Introduction',
    archetype: 'Archetype',
    primary: 'Primary Worker Type',
    secondary: 'Secondary Worker Type',
  };

  const RenderedContextBar = (
    <>
      <ContextBar
        LeftSection={<ViewSelectGroup setViewOption={(option) => setViewOption(option)} labels={viewOptionsKeyLabel} />}
        RightSection={<ReportRightSectionButtons lessonLink="reports.worker-type.lesson" />}
      />
    </>
  );

  return (
    <ReportLayout
      menuOptions={sections}
      toolbar={RenderedContextBar}
      webComponentName="custom-wt-report"
      breadcrumbs={breadcrumbs}
      pageHeader={<NavigatorsPageCover backgroundType="brand" heading="Worker Type Report" icon={faNewspaper} />}
    >
      <custom-wt-report componentData={report} section={currentSection}></custom-wt-report>
    </ReportLayout>
  );
}`,
      talkThrough:
        "This page is the actual Worker Type-specific piece — it declares the 5 sections the report has (summary, introduction, archetype, primary/secondary worker type) and a toolbar with a view-mode switcher and a link into the lesson, then hands both to the shared `ReportLayout` along with which web component should render the content for the currently selected section. Everything about how those sections navigate, or which view mode is active, is left entirely to the layout — this page just supplies the report's own shape.",
    },
    {
      label: 'Lesson — a standalone walkthrough of the same content',
      language: 'tsx',
      code: `import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function WorkerTypeLessonPage({ report }) {

  function handleFinish() {
    router.visit(route('reports.worker-type'));
  }

  return (
        <div className="w-screen h-screen">
          <custom-wt-lesson componentData={report} onfinish={handleFinish} onclose={handleFinish}></custom-wt-lesson>
        </div>
  );
}`,
      talkThrough:
        "The lesson is the third and simplest consumption format: the same report data, but rendered full-screen by a different web component built for a guided walkthrough rather than free navigation. Both finishing the lesson and explicitly closing it route back to the main report page — there's no separate 'lesson complete' state to manage on the React side, since the web component itself owns the walkthrough progress.",
    },
  ],
}

export default project
