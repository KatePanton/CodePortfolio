import careerDashboardSummary from '../../../pages/Projects/career-website-section/images/CareerDashboard_Summary.png'
import careerDashboardOverview from '../../../pages/Projects/career-website-section/images/CareerDashboard_Overview.png'
import careerDashboardSkills from '../../../pages/Projects/career-website-section/images/CareerDashboard_Skills.png'
import careerDashboardEducation from '../../../pages/Projects/career-website-section/images/CareerDashboard_Education.png'
import type { HighlightedProject } from '../types'

const project: HighlightedProject = {
  slug: 'career-website-section',
  tier: 'highlighted',
  name: 'Career Exploration & Matching Section',
  techStack: ['React', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'Apache ECharts', 'Zustand'],
  blurb:
    "A browsable, filterable careers section built as part of a larger student career-guidance platform. Users explore a card grid of careers with a save/favourite toggle, then drill into a five-tab detail page per career covering its summary, day-to-day overview, required skills, education path, and career progression. The summary tab renders a live radar chart comparing a career's average suitability profile against the user's own assessment results, switchable between two different scoring models (a worker-type model and a Big Five personality model). Each tab pulls its own slice of a single nested `career` prop and normalizes it locally — flattening reference objects into pill lists, adjusting inconsistent score scales — so the page component itself stays a thin, declarative map from tabs to data. The favourite toggle uses optimistic UI so saving a career feels instant despite being a full server round-trip underneath.",
  problem:
    "The detail page needed a live chart comparison — a career's average suitability plotted against the user's own results, toggled between two different scoring models — built on top of a charting library that manages its own imperative instance rather than being a natural React citizen. That meant handling the chart's lifecycle manually (creating and disposing the instance as the view or data changed) and reading color values out of the site's own CSS custom properties at runtime so the chart stayed in sync with the site's theme rather than hardcoding colors that would drift. Elsewhere, the same nested `career` object had to feed five very different tabs, each expecting its own shape (pill lists, metric scores, linked lists) — so each tab needed its own small adapter layer to reshape a slice of that raw data, keeping the parent page free of that logic. And because the favourite/save toggle triggers a full server request, it needed optimistic local state with rollback-on-error so the interaction still felt instant.",
  screenshots: [
    {
      src: careerDashboardSummary,
      alt: 'Career detail page summary tab, showing match/salary/education/growth stat tiles and the worker-type radar chart',
    },
  ],
  snippets: [
    {
      label: 'Career detail page — composing the tabs',
      language: 'tsx',
      code: `import PageLayout from '@/Components/Layouts/PageLayout';
import Tabs, { TabPane } from '@/Components/Elements/Tabs';
import CareerDetailSummaryTab from './CareerDetailTabs/SummaryTab';
import CareerDetailOverviewTab from './CareerDetailTabs/OverviewTab';
import CareerDetailSkillsTab from './CareerDetailTabs/SkillsTab';
import CareerDetailEducationTab from './CareerDetailTabs/EducationTab';
import CareerDetailCareerTracksTab from './CareerDetailTabs/CareerTracksTab';
import NavigatorDetailPageCover from "@/Components/Groups/PageCovers/NavigatorDetailPageCover";

export default function CareerDetailsPage({ career, breadcrumbs }) {
  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      pageHeader={<NavigatorDetailPageCover backgroundType="image" heading={career.title} image={\`\${career.image}?crop=entropy&w=1920&h=400&fit=crop\`} />}
    >
      <Tabs>
        <TabPane id="summary" title="Summary">
          <CareerDetailSummaryTab
            graphData={{
              workerTypeSuitability: career.suitability.workerType,
              workerTypeUserResults: { r: 10, i: 10, a: 10, s: 10, e: 10, c: 10 }, //TBC
              personalityTraitsSuitability: career.suitability.personalityTraits,
              personalityTraitsUserResults: {
                agreeableness: 10,
                conscientiousness: 10,
                extraversion: 10,
                neuroticism: 10,
                openness: 10,
              }, //TBC
            }}
            matchPercentage={{ percentage: 'TBC', label: 'TBC' }}
            salary={'TBC'}
            educationLevel={{ type: 'TBC', level: 'TBC' }}
            growthPercentage={{ percentage: career.classification.ratings.jobGrowth, label: 'TBC' }}
            introduction={career.about.introduction}
            thingsToKnow={[{ label: 'TBC', href: '#' }]}
          />
        </TabPane>

        <TabPane id="overview" title="Overview">
          <CareerDetailOverviewTab
            responsibilities={career.about.responsibilities}
            workEnvironment={career.additionalInformation.workEnvironment}
            personalQualities={career.classification.personalQualities}
            workingConditions={career.classification.workingConditions}
          />
        </TabPane>

        <TabPane id="skills" title="Skills">
          <CareerDetailSkillsTab
            traits={career.about.requirements.traits}
            skills={career.about.requirements.skills}
            expertise={career.about.requirements.expertise}
            fundamentalSkills={[]}
          />
        </TabPane>

        <TabPane id="education" title="Education">
          <CareerDetailEducationTab
            requirementsSchool={career.becoming.requirements.school}
            requirementsTertiary={career.becoming.requirements.tertiary}
            experience={career.becoming.requirements.experience}
            subjects={[...(career.school.compulsorySubjects || []), ...(career.school.electiveSubjects || [])]}
            tertiaryCourses={career.tertiary}
          />
        </TabPane>

        <TabPane id="career-tracks" title="Career Tracks">
          <CareerDetailCareerTracksTab career={career} />
        </TabPane>
      </Tabs>
    </PageLayout>
  );
}`,
      talkThrough:
        "The page itself never renders a stat tile or a chart directly — it just maps each tab to the slice of the nested `career` prop that tab needs, and hands off to a dedicated component. That keeps this file purely declarative: adding or reordering a tab is a matter of adding another `TabPane`, not touching any rendering logic. The `//TBC` markers are left in deliberately rather than faked — they mark fields (like the user's own assessment results and salary) that were waiting on a separate part of the platform to land, so the tab still renders correctly with a career's real data while those specific fields are stubbed.",
    },
    {
      label: 'Match visualization — the radar chart',
      language: 'tsx',
      code: `import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import GraphSelectGroup from './GraphSelectGroup';

type viewOptions = 'workerType' | 'personalityTraits';

const viewOptionsKeyLabel: { key: viewOptions; label: string }[] = [
  { key: 'workerType', label: 'Worker Type' },
  { key: 'personalityTraits', label: 'Personality' },
];

const getCSSVariable = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const userResultColor = getCSSVariable('--color-brand-solid-background');
const averageColor = getCSSVariable('--color-secondary-solid-background');

export default function CareerMatchGraphs({ graphData }) {
  const [selectedView, setSelectedView] = useState<viewOptions>('workerType');
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose(); // Dispose the previous chart
    }

    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;

    let option: EChartsOption;

    if (selectedView === 'workerType') {
      const orderWorkerTypeAverageSuitability = [
        graphData.workerTypeSuitability.r,
        graphData.workerTypeSuitability.i,
        graphData.workerTypeSuitability.a,
        graphData.workerTypeSuitability.s,
        graphData.workerTypeSuitability.e,
        graphData.workerTypeSuitability.c,
      ];

      const orderWorkerTypeUserSuitability = [
        graphData.workerTypeUserResults.r,
        graphData.workerTypeUserResults.i,
        graphData.workerTypeUserResults.a,
        graphData.workerTypeUserResults.s,
        graphData.workerTypeUserResults.e,
        graphData.workerTypeUserResults.c,
      ]; //ToDo: Replace with actual user data

      option = {
        legend: { data: ['Career Average', 'My Results'], top: 'bottom' },
        color: [averageColor, userResultColor],

        radar: {
          indicator: [
            { text: 'Builder', max: 100 },
            { text: 'Thinker', max: 100 },
            { text: 'Creator', max: 100 },
            { text: 'Helper', max: 100 },
            { text: 'Influencer', max: 100 },
            { text: 'Organiser', max: 100 },
          ],
        },
        series: [
          {
            type: 'radar',
            areaStyle: {
              opacity: 0.4,
            },
            data: [
              { value: orderWorkerTypeAverageSuitability, name: 'Career Average' },
              { value: orderWorkerTypeUserSuitability, name: 'My Results' },
            ],
          },
        ],
      };
    } else {
      const orderPersonalityTraitsAverageSuitability = [
        graphData.personalityTraitsSuitability.agreeableness,
        graphData.personalityTraitsSuitability.conscientiousness,
        graphData.personalityTraitsSuitability.extraversion,
        graphData.personalityTraitsSuitability.neuroticism,
        graphData.personalityTraitsSuitability.openness,
      ];

      const orderPersonalityTraitsUserSuitability = [
        graphData.personalityTraitsUserResults.agreeableness,
        graphData.personalityTraitsUserResults.conscientiousness,
        graphData.personalityTraitsUserResults.extraversion,
        graphData.personalityTraitsUserResults.neuroticism,
        graphData.personalityTraitsUserResults.openness,
      ]; //ToDo: Replace with actual user data

      option = {
        legend: { data: ['Career Average', 'My Results'], top: 'bottom' },
        color: [averageColor, userResultColor],
        radar: {
          indicator: [
            { text: 'Agreeableness', max: 100 },
            { text: 'Conscientiousness', max: 100 },
            { text: 'Extraversion', max: 100 },
            { text: 'Emotional Stability', max: 100 },
            { text: 'Openness', max: 100 },
          ],
        },
        series: [
          {
            type: 'radar',
            areaStyle: {
              opacity: 0.4,
            },
            data: [
              { value: orderPersonalityTraitsAverageSuitability, name: 'Career Average' },
              { value: orderPersonalityTraitsUserSuitability, name: 'My Results' },
            ],
          },
        ],
      };
    }

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [selectedView, graphData]); // re-run when selectedView or career data changes

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-center">
        <div className="text-brand-text text-label-lg hidden md:block">Match</div>
        <GraphSelectGroup setViewOption={(option) => setSelectedView(option)} labels={viewOptionsKeyLabel} />
      </div>
      <div style={{ width: '100%', height: 400 }}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}`,
      talkThrough:
        "ECharts manages its own chart instance imperatively, so this component's job is really lifecycle management: a ref holds the live instance, and every time the selected view or the incoming data changes, the previous instance is disposed and a fresh one created before `setOption` is called — with cleanup on unmount too, so nothing leaks across re-renders. Rather than hardcoding chart colors, they're read once from the site's own CSS custom properties via `getComputedStyle`, so the chart automatically matches whatever theme is active instead of drifting out of sync with a separate color constant. The two view options (worker type vs. personality) share the same rendering path but build a differently-shaped `option` object, toggled by a small sibling component.",
    },
    {
      label: 'Favouriting a career — optimistic UI hook',
      language: 'typescript',
      code: `import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';

type FavouriteKey = 'careers' | 'subjectChoices' | 'tertiaryInstitutions';

export function useFavourites(favouriteKey: FavouriteKey, initialFavourites: string[] = []) {
  const [favourites, setFavourites] = useState<string[]>(initialFavourites);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const toggleFavourite = async (id: string) => {
    const isFavourite = favourites.includes(id);

    setFavourites(prev =>
      isFavourite
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );

    setLoading(prev => ({ ...prev, [id]: true }));
    setError(null);

    try {
      if (isFavourite) {
        await new Promise<void>((resolve, reject) => {
          router.delete(route('favourites.remove', [favouriteKey, id]), {
            preserveScroll: true,
            preserveState: true,
            only: [],
            onSuccess: () => resolve(),
            onError: () => reject(new Error('Failed to remove favourite')),
          });
        });
      } else {
        await new Promise<void>((resolve, reject) => {
          router.post(route('favourites.add', favouriteKey), { id }, {
            preserveScroll: true,
            preserveState: true,
            only: [],
            onSuccess: () => resolve(),
            onError: () => reject(new Error('Failed to add favourite')),
          });
        });
      }
    } catch (err) {
      setFavourites(prev =>
        isFavourite
          ? [...prev, id]
          : prev.filter(fav => fav !== id)
      );
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const isFavourite = (id: string) => favourites.includes(id);
  const isLoading = (id: string) => loading[id] || false;

  return {
    toggleFavourite,
    isFavourite,
    isLoading,
    error,
  };
}`,
      talkThrough:
        "Saving a career updates local state and fires the server request in the background rather than waiting for a response before showing the change — so the card's heart icon flips instantly. If the request fails, the local state gets rolled back to what it was before the optimistic update, and a per-id `loading` map means only the card being toggled shows a spinner rather than the whole grid. Both add and remove go through the same `router` request pattern wrapped in a promise, so the calling code (`toggleFavourite`) doesn't need to know which HTTP verb or endpoint shape it's dealing with.",
    },
  ],
  tabbedSnippets: [
    {
      label: 'Summary',
      language: 'tsx',
      code: `import { faGear, faStars, faSackDollar, faGraduationCap, faSeedling } from '@fortawesome/pro-solid-svg-icons';
import Button from '@/Components/Elements/Button';
import InformationBlock from '@/Components/Elements/InformationBlock';
import ListInteractive from '@/Components/Elements/ListContent/ListInteractive';
import CareerMatchGraphs from './CareerMatchGraphs';

export default function CareerDetailSummaryTab({
  graphData,
  matchPercentage,
  salary,
  educationLevel,
  growthPercentage,
  introduction,
  thingsToKnow,
}) {
  return (
    <div>
      <div className="bg-layer-01 rounded-xl p-12">
        <div className="mb-4 flex flex-row items-center justify-between pb-8">
          <h3 className="text-text-brand-secondary">Quick look</h3>
          <div className="hidden sm:flex">
            <Button color="brand" variant="outline" iconLeft={faGear}>
              Edit widgets
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-12 xl:flex-row xl:justify-between">
          <div className="border-border-subtle w-full rounded-3xl border-1 p-12 xl:w-1/2 xl:flex-1">
            <CareerMatchGraphs graphData={graphData} />
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2">
            <InformationBlock
              icon={faStars}
              mainContent={matchPercentage.percentage}
              topLabel="Match"
              bottomLabel={matchPercentage.label}
              color="violet"
              variant="tonal"
            ></InformationBlock>

            <InformationBlock
              icon={faSackDollar}
              mainContent={salary}
              topLabel="Salary"
              bottomLabel="Annual Average"
              color="blue"
              variant="tonal"
            ></InformationBlock>

            <InformationBlock
              icon={faGraduationCap}
              mainContent={educationLevel.type}
              topLabel="Education"
              bottomLabel={educationLevel.level}
              color="dark-green"
              variant="tonal"
            ></InformationBlock>

            <InformationBlock
              icon={faSeedling}
              mainContent={growthPercentage.percentage}
              topLabel="Growth"
              bottomLabel={growthPercentage.label}
              color="light-green"
              variant="tonal"
            ></InformationBlock>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12 py-12 lg:flex-row">
        <div className="flex-1 px-12 lg:pl-12">
          <h3 className="text-text-brand-secondary">About</h3>
          <div className="text-secondary">
            <rich-text-block richTextContent={introduction}></rich-text-block>
          </div>
        </div>
        <div className="flex-1 px-12 lg:px-0">
          <ListInteractive
            title="Things to know"
            content={thingsToKnow}
            color="brand"
            variant="default"
            viewAllHref="#"
          ></ListInteractive>
        </div>
      </div>
    </div>
  );
}`,
      talkThrough:
        "This tab is a pure layout — every value it renders (match %, salary, education, growth, the intro text, the chart data) arrives as a prop already shaped by the parent page, so the component itself has no data logic at all. The four stat tiles reuse the same `InformationBlock` presentational component with a different icon/color per tile, and the chart is delegated entirely to `CareerMatchGraphs` rather than this tab knowing anything about how it renders.",
      screenshot: { src: careerDashboardSummary, alt: 'Summary tab: match/salary/education/growth stat tiles and the worker-type radar chart' },
    },
    {
      label: 'Overview',
      language: 'tsx',
      code: `import {
  faUser,
  faWrench,
  faGraduationCap,
  faUsers,
  faMagnifyingGlass,
  faThoughtBubble,
  faPalette,
  faPuzzlePiece,
  faClock,
  faBrain,
  faDumbbell,
  faShuffle,
  faFlag,
  faHourglass,
  faChess,
} from '@fortawesome/pro-solid-svg-icons';
import ListStatic from '@/Components/Elements/ListContent/ListStatic';
import MetricCard from '@/Components/Groups/Cards/MetricCard';

function adjustScore(score) {
  if (score > 10) {
    return Math.round(score / 10);
  }
  return Math.round(score);
}

export default function CareerDetailOverviewTab({ responsibilities, workEnvironment, personalQualities, workingConditions }) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
      <div className="flex-7/12 flex-col gap-12">
        <div className="gap-8 p-6">
          <h3 className="text-violet-text">Job Description</h3>
          <ListStatic content={responsibilities} color="violet" />
        </div>

        <div className="p-6">
          <h3 className="text-dark-green-solid-background">Work Environment</h3>
          <rich-text-block richTextContent={workEnvironment}></rich-text-block>
        </div>

        <div>
          <h3>Salary</h3>
          TBC
        </div>
      </div>

      <div className="flex flex-5/12 flex-col gap-8 p-6">
        <MetricCard
          icon={faUser}
          title="Personal Demands"
          subtitle="Each career has a typical set of personal demands you can expect."
          metricArray={[
            {
              icon: faGraduationCap,
              label: 'Education',
              score: adjustScore(personalQualities.advancedQualificationRequirement),
              total: 10,
            },
            {
              icon: faUsers,
              label: 'Collaboration',
              score: adjustScore(personalQualities.levelOfCollaborationRequirement),
              total: 10,
            },
            {
              icon: faMagnifyingGlass,
              label: 'Attention to Detail',
              score: adjustScore(personalQualities.levelOfAttentionToDetail),
              total: 10,
            },
            { icon: faThoughtBubble, label: 'Logic', score: adjustScore(personalQualities.amountOfStructure), total: 10 },
            { icon: faPalette, label: 'Creativity', score: adjustScore(personalQualities.levelOfCreativeExpression), total: 10 },
            {
              icon: faPuzzlePiece,
              label: 'Problem Solving',
              score: adjustScore(personalQualities.levelOfNovelProblemSolvingRequirement),
              total: 10,
            },
          ]}
          color="violet"
          alignment="center"
        ></MetricCard>

        <MetricCard
          icon={faWrench}
          title="Working Conditions"
          subtitle="Working conditions are usually similar within a career field."
          metricArray={[
            { icon: faClock, label: 'Work Hours', score: adjustScore(workingConditions.lengthOfHours), total: 10 },
            { icon: faClock, label: 'Autonomy', score: adjustScore(workingConditions.abilityToFreelanceOrConsult), total: 10 },
            { icon: faBrain, label: 'Cognitive Demand', score: adjustScore(workingConditions.levelOfCognitiveDemand), total: 10 },
            { icon: faDumbbell, label: 'Physical Demand', score: adjustScore(workingConditions.levelOfPhysicalDemand), total: 10 },
            { icon: faShuffle, label: 'Variety', score: adjustScore(workingConditions.amountOfTaskVariety), total: 10 },
            { icon: faFlag, label: 'Competition', score: adjustScore(workingConditions.levelOfCompetition), total: 10 },
            { icon: faClock, label: 'Leadership', score: adjustScore(workingConditions.levelOfOperationalRequirement), total: 10 },
            { icon: faHourglass, label: 'Time Pressure', score: adjustScore(workingConditions.amountOfTimePressure), total: 10 },
            { icon: faChess, label: 'Strategy', score: adjustScore(workingConditions.levelOfStrategicRequirement), total: 10 },
          ]}
          color="blue"
          alignment="center"
        ></MetricCard>
      </div>
    </div>
  );
}`,
      talkThrough:
        "The two `MetricCard` blocks (Personal Demands, Working Conditions) run every score through a tiny `adjustScore` normalizer first, because the backend sends some fields on a 0–10 scale and others on a 0–100 scale depending on how that particular field was modeled — rather than pushing that inconsistency onto the display component, it's normalized once at the point of use so `MetricCard` itself can stay a dumb renderer that always expects a 0–10 score.",
      screenshot: { src: careerDashboardOverview, alt: 'Overview tab: job description, work environment, and the Personal Demands / Working Conditions metric cards' },
    },
    {
      label: 'Skills',
      language: 'tsx',
      code: `import { faUser, faWrench, faClock } from '@fortawesome/pro-solid-svg-icons';
import ListInteractive from '@/Components/Elements/ListContent/ListInteractive';
import PilledContentStatic from '@/Components/Groups/PilledContent/StaticPilledContent';

function extractTraitTitles(traits): string[] {
  if (!Array.isArray(traits)) return [];
  return traits.map((trait) => trait?.reference?.title).filter(Boolean);
}

function extractSkillTitles(skills): string[] {
  if (!Array.isArray(skills)) return [];
  return skills.map((skill) => skill?.reference?.title).filter(Boolean);
}

function extractExpertiseTitles(expertise): string[] {
  if (!Array.isArray(expertise)) return [];
  return expertise.map((exp) => exp?.reference?.title).filter(Boolean);
}

export default function CareerDetailSkillsTab({ traits, skills, expertise, fundamentalSkills }) {
  return (
    <div className="gap-4 p-12">
      <h3 className="text-text-brand-secondary pb-8">Skills overview</h3>
      <div className="xs:grid-cols-1 grid gap-12 lg:grid-cols-3">
        <PilledContentStatic
          icon={faUser}
          title="Traits"
          subtitle="Personal qualities that are beneficial"
          pillContentArray={extractTraitTitles(traits)}
          color="violet"
          variant="tonal"
        ></PilledContentStatic>

        <PilledContentStatic
          icon={faWrench}
          title="Skills"
          subtitle="What you can learn to do the job"
          pillContentArray={extractSkillTitles(skills)}
          color="blue"
          variant="tonal"
        ></PilledContentStatic>

        <PilledContentStatic
          icon={faClock}
          title="Expertise"
          subtitle="Professional skills you'll have to master"
          pillContentArray={extractExpertiseTitles(expertise)}
          color="dark-green"
          variant="tonal"
        ></PilledContentStatic>
      </div>
      <div className="mt-12">
        <ListInteractive title="Fundamental Skills" content={fundamentalSkills} color="light-green" variant="tonal"></ListInteractive>
      </div>
    </div>
  );
}`,
      talkThrough:
        "Traits, skills, and expertise all arrive as arrays of nested reference objects (`{ reference: { title } }`), so each gets its own one-line extractor that pulls out just the title and drops anything malformed (`.filter(Boolean)`) before it reaches the pill-list component. Three near-identical extractors rather than one generic one was a deliberate call — each is named for what it extracts, which keeps the call sites in the JSX self-explanatory.",
      screenshot: { src: careerDashboardSkills, alt: 'Skills tab: Traits, Skills, and Expertise pill lists' },
    },
    {
      label: 'Education',
      language: 'tsx',
      code: `import { faSchool, faGraduationCap, faClock } from '@fortawesome/pro-solid-svg-icons';
import ListInteractive from '@/Components/Elements/ListContent/ListInteractive';
import PilledContentStatic from '@/Components/Groups/PilledContent/StaticPilledContent';

function extractRequirements(requirements): string[] {
  if (!Array.isArray(requirements)) return [];
  return requirements.map((requirement) => requirement?.title).filter(Boolean);
}

function extractInteractiveListContent(
  content,
  href
): {
  label: string;
  href: string;
}[] {
  if (!Array.isArray(content)) return [];
  return content.map((item) => ({ label: item?.title, href: \`/\${href}/\${item?._id}\` })).filter(Boolean);
}

export default function CareerDetailEducationTab({ requirementsSchool, requirementsTertiary, experience, subjects, tertiaryCourses }) {
  return (
    <div className="gap-4 p-12">
      <h3 className="text-text-brand-secondary pb-8">Basic Requirements</h3>
      <div className="xs:grid-cols-1 grid gap-12 md:grid-cols-3">
        <PilledContentStatic
          icon={faSchool}
          title="School"
          pillContentArray={extractRequirements(requirementsSchool)}
          color="violet"
          variant="tonal"
        ></PilledContentStatic>

        <PilledContentStatic
          icon={faGraduationCap}
          title="Higher Education"
          pillContentArray={extractRequirements(requirementsTertiary)}
          color="blue"
          variant="tonal"
        ></PilledContentStatic>

        <PilledContentStatic
          icon={faClock}
          title="Experience"
          pillContentArray={extractRequirements(experience)}
          color="dark-green"
          variant="tonal"
        ></PilledContentStatic>
      </div>

      <div className="xs:grid-cols-1 mt-12 grid gap-5 lg:grid-cols-2">
        <ListInteractive
          title="Subjects"
          content={extractInteractiveListContent(subjects, 'subjects')}
          color="light-green"
          variant="tonal"
        ></ListInteractive>

        <ListInteractive
          title="Courses"
          content={extractInteractiveListContent(tertiaryCourses, 'courses')}
          color="orange"
          variant="tonal"
        ></ListInteractive>
      </div>
    </div>
  );
}`,
      talkThrough:
        "Two different adapter shapes live here: `extractRequirements` just flattens a list down to titles (School/Higher Education/Experience are already close to display-ready), while `extractInteractiveListContent` does more — it builds a clickable `href` per item by combining a base path with the item's id, so the same generic `ListInteractive` component can link out to either a subject or a course page without knowing the difference itself. The tab reuses the same pattern as the Skills tab (small, single-purpose local extractors ahead of a generic presentational component) rather than introducing a third abstraction for what's structurally the same problem.",
      screenshot: { src: careerDashboardEducation, alt: 'Education tab: School/Higher Education/Experience requirements plus linked Subjects and Courses lists' },
    },
    {
      label: 'Career Tracks',
      language: 'tsx',
      code: `export default function CareerDetailCareerTracksTab({ career }) {
  return (
    <div>
      ToDo: Create component for career progression bubbles (tracked internally, not yet built).
      <p>
        MotivationalQuote: ? <br />
        Career Progression: {career.becoming.progressionCareers} <br />
      </p>
    </div>
  );
}`,
      talkThrough:
        "Left in deliberately as a stub rather than cut from the write-up: this tab was scoped but not yet built when the rest of the feature shipped, so it renders the raw progression data it already has access to rather than a polished visualization. It's a small, honest snapshot of a real in-progress state — the surrounding tabs are equally driven by the `career` prop, this one just hasn't grown its presentational layer yet.",
    },
  ],
}

export default project
