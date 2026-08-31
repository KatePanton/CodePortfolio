import type { ReactNode } from 'react'
import Disclosure from '../components/Disclosure/Disclosure'

function AboutSection({
  title,
  children,
  defaultOpen,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <h2 className="font-medium text-neutral-900 dark:text-neutral-100">{title}</h2>
      <Disclosure label="Details" defaultOpen={defaultOpen}>
        {children}
      </Disclosure>
    </div>
  )
}

function Role({
  title,
  company,
  dates,
  children,
  tech,
}: {
  title: string
  company: string
  dates: string
  children: ReactNode
  tech: string
}) {
  return (
    <div className="mt-4 first:mt-0">
      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{title}</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {company} · {dates}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
        {children}
      </ul>
      <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">{tech}</p>
    </div>
  )
}

function Recommendation({ quote, name, role, dates }: { quote: string; name: string; role: string; dates: string }) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="text-sm text-neutral-600 italic dark:text-neutral-400">&ldquo;{quote}&rdquo;</p>
      <p className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {name} <span className="font-normal text-neutral-500 dark:text-neutral-400">— {role}, {dates}</span>
      </p>
    </div>
  )
}

export default function About() {
  return (
    <section>
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">About</h1>

      <div className="mt-6 space-y-4">
        <AboutSection title="Kate Panton" defaultOpen>
          <p className="text-neutral-600 dark:text-neutral-400">Frontend specialist, full-stack developer — React &amp; Vue.</p>
          <dl className="mt-3 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <div>
              <dt className="inline font-medium text-neutral-900 dark:text-neutral-100">Location: </dt>
              <dd className="inline">Rotterdam, South Holland, Netherlands</dd>
            </div>
            <div>
              <dt className="inline font-medium text-neutral-900 dark:text-neutral-100">Work authorization: </dt>
              <dd className="inline">Resident with full work authorization (no sponsorship required)</dd>
            </div>
            <div>
              <dt className="inline font-medium text-neutral-900 dark:text-neutral-100">Email: </dt>
              <dd className="inline">katep8073@gmail.com</dd>
            </div>
            <div>
              <dt className="inline font-medium text-neutral-900 dark:text-neutral-100">Phone: </dt>
              <dd className="inline">+31 6 13119359</dd>
            </div>
          </dl>
          <div className="mt-3 flex gap-4 text-sm">
            <a
              className="text-neutral-500 underline underline-offset-2 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              href="https://www.linkedin.com/in/kate-panton-244042140/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-neutral-500 underline underline-offset-2 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              href="https://github.com/KatePanton"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </AboutSection>

        <AboutSection title="About Me">
          <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
            <p>
              I studied Information Systems with a fourth-year focus on User Interface Design, which led me naturally
              into full-stack development at the start of 2020. In 2022 I made the deliberate choice to specialise in
              frontend development, drawn to the immediate visual feedback of crafting user interfaces — though I&apos;ve
              since found myself missing the breadth of working across an entire stack. I&apos;m naturally curious and
              quick to pick up new languages and practices.
            </p>
            <p>
              I was born in South Africa and spent my teenage years in a small beachfront town before moving to the
              Netherlands with my partner (also a software developer) in December 2023. We&apos;ve loved it here enough
              to put down roots — buying a house and taking on a full renovation, including a bathroom rebuild and an
              industrial-scale kitchen clean-up.
            </p>
            <p>
              Outside of work you&apos;ll find me doing arts and crafts, playing computer games and board games with
              friends, or 3D modelling. I&apos;ve been trying to read more, and public transport has been great for
              that. I&apos;m fascinated by colour theory and history, and I&apos;m slowly working my way into
              woodworking and home repairs now that I have a house to practice on.
            </p>
            <p>
              In the workplace I&apos;ve been described as dependable with a keen eye for detail. I&apos;ve worked
              remotely for two years and have mastered working independently, but I genuinely love collaborating with
              a team — I organised an after-hours pub quiz and a painting evening that transformed a colourless
              office, and I built an onboarding programme for graduate developers that the company kept using long
              after I left.
            </p>
          </div>
          <h3 className="mt-4 font-medium text-neutral-900 dark:text-neutral-100">Education</h3>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Rhodes University, Grahamstown, South Africa</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Bachelor of Commerce Honours, Information Systems — UI Design in Serious Games (2018)</li>
            <li>Post Graduate Certificate of Education, FET (South Africa) / VMBO (Netherlands): Accounting and Economics (2017)</li>
            <li>Bachelor of Commerce, Information Systems and Economics (2014–2016)</li>
          </ul>
        </AboutSection>

        <AboutSection title="Competencies and Skills">
          <dl className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-100">Programming Languages</dt>
              <dd>C#, CSS &amp; SASS, JavaScript, Lit, PHP, React, TypeScript, Vue, Visual Basic</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-100">Databases</dt>
              <dd>GROQ, jQuery, MongoDB Query Language (MQL), SQL, T-SQL, MySQL</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-100">Architectures / Frameworks</dt>
              <dd>
                .NET, ASP.NET, EF Core, Object-Oriented Programming, Micro architecture, Microservices, Monolithic
                Repository Pattern, MVC, MVVM, Next.js, Nuxt.js, Server-side rendering (Laravel)
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-100">Testing Tools</dt>
              <dd>Cypress, Jest, Playwright, Unit Testing, xUnit, Vitest</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-100">Project Management</dt>
              <dd>Bitbucket, ClickUp, Git, Jira, Scrum &amp; Agile</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-100">Design Tools</dt>
              <dd>
                Figma, Human-Centred Design, Interaction Design, Personas, Storyboarding, Storybook, UI Reviews,
                Wireframing &amp; Prototyping
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900 dark:text-neutral-100">Soft Skills</dt>
              <dd>
                Adaptability, Coaching &amp; Mentoring, Collaboration, Critical Thinking, Knowledge Sharing,
                Organisation, Problem Solving, Teamwork, Time Management
              </dd>
            </div>
          </dl>
        </AboutSection>

        <AboutSection title="Professional Details">
          <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
            <p>
              I&apos;m a highly skilled, resourceful, and adaptable full-stack software engineer with five years of
              professional experience across diverse tech stacks and architectures — from legacy banking systems and
              a brand-new loan management system to assessment interfaces, component libraries, and marketing
              websites. I have a proven ability to lead teams, optimise UI/UX through reusable component libraries,
              and improve application scalability in fast-paced Agile environments.
            </p>
            <p>
              I bridge design and development with a deep understanding of modern frameworks including React, Vue,
              Lit, and PHP, as well as backend technologies like EF Core and T-SQL. I&apos;ve been recognised for
              clear communication, mentorship, and a keen eye for quality, accessibility, and performance.
            </p>
            <p>Open to full-stack roles, remote or Rotterdam/Den Haag.</p>
          </div>
        </AboutSection>

        <AboutSection title="Recommendations">
          <Recommendation
            name="Nathan Burstein"
            role="CTO, Yenza"
            dates="2022–2025"
            quote="I have had the pleasure of working with Kate for the past three years at Yenza Career Technology. Kate joined the team as a Frontend developer and over her tenure grown from strength to strength, adding to her tool belt and skill sets. Her contribution to our project was felt in all areas, from adding value to our technical team as well as contributing directly to features that are used by our user base. I have always had great admiration for Kate's continuous willingness to tackle new projects, technical challenges and changes within our business. She never shied away from a new challenge and always worked hard at upping her knowledge to tackle the task at hand. She is a natural project manager and team player and always stepped in to provide her organisational input to ensuring we executed on the task at hand. We have experienced a multitude of technical shifts at Yenza starting with a strong focus on TypeScript, ExpressJS, NestJS and Vue to our current stack today of PHP, Typescript, React and Laravel. She took these changes in her stride and adapted to the challenges that come with a transition to a new stack and set of technologies. I believe Kate would be an asset any team she joins as a diligent, hard working and naturally curious team player. She was a pleasure to work with an everyone valued her insights and contributions to all aspects of our projects."
          />
          <Recommendation
            name="Warren Hall"
            role="Senior Frontend Developer, Yenza"
            dates="2023–2025"
            quote="I am pleased to provide this reference for Kate Panton, whom I had the opportunity to manage for approximately one year in her role as a mid-level Software Developer. During this time, Kate consistently demonstrated a level of professionalism, technical competency, and work ethic that exceeded expectations for her experience level. Kate quickly earned the trust of the team by delivering high quality work with minimal need for rework. Her pull requests were consistently clean, well structured, and thoughtfully implemented. She has a strong grasp of software development principles and shows excellent attention to detail in both her coding and documentation. One of Kate's standout qualities is her willingness to ask questions and seek clarity when needed. She engages proactively with colleagues, ensuring she fully understands requirements before implementing solutions. Kate would be an asset to any engineering team. She is reliable, motivated, and capable of working both independently and collaboratively. I confidently recommend her for any mid-level development position and believe she will continue to grow into an exceptional developer."
          />
          <Recommendation
            name="Daan Jacobs"
            role="Lead Architect, LMS project"
            dates="2020–2022"
            quote="Kate is a self-motivated, fast learner driven to get things done. She is open in her approach to junior and senior team members, asking for help when needed and providing help when she deems it fit or is asked to help. She is a team player through and through while taking pride in her work. Her interest was not only in the technology but in understanding the business and how people will use the final solution. Her growth over the period we worked together technically and professionally speaks of a great future."
          />
        </AboutSection>

        <AboutSection title="Work History">
          <Role
            title="Chief Household Officer & Property Development Executive"
            company="Self-employed"
            dates="Oct 2025 – Present"
            tech="Project management, budgeting, contractor coordination"
          >
            <li>
              A planned career break to navigate the notoriously competitive Dutch housing market — coordinating
              viewings, preparing offers, and securing a property after a prolonged process.
            </li>
            <li>
              Managed a full household relocation and a full renovation project, including a bathroom rebuild and an
              industrial-scale kitchen clean-up, liaising directly with contractors.
            </li>
          </Role>
          <Role
            title="Medior Frontend Developer"
            company="Yenza Career Development · Remote"
            dates="March 2024 – Oct 2025"
            tech="Storybook, React, PHP, Lit, Vite, Vitest, ESLint, TypeScript"
          >
            <li>
              Led a three-person team to consolidate the existing UI component library into a shared Storybook
              library used across multiple site repositories — defining architectural direction and reviewing pull
              requests for consistency.
            </li>
            <li>Took over version control and deployment of the Storybook repository from the CTO.</li>
            <li>
              Integrated Storybook components into a server-side-rendered PHP/React project and developed bespoke
              components for it.
            </li>
          </Role>
          <Role
            title="Frontend Engineer"
            company="Yenza Career Development · Cape Town, South Africa"
            dates="Sept 2022 – Sept 2023"
            tech="Vue 2, TypeScript, Vuetify, Cypress, i18n, MongoDB, Sanity CMS, React, Tailwind CSS, Next.js"
          >
            <li>Integrated Alison's API to enable seamless course login and progress tracking for users.</li>
            <li>Co-developed a multilingual monorepo marketing site for South Africa, Ethiopia, and Kenya.</li>
            <li>
              Delivered scalable code across main and marketing sites, contributed to backend work with MongoDB and
              Sanity CMS, and maintained shared UI/ESLint/TypeScript configurations.
            </li>
          </Role>
          <Role
            title="Junior to Intermediate Software Engineer"
            company="Singular Systems · Cape Town, South Africa"
            dates="Feb 2020 – April 2022"
            tech="React, EF Core, T-SQL, VB, ASP.NET, CSLA, MVVM, C#"
          >
            <li>Re-architected a Loan Management System frontend to support white-label solutions.</li>
            <li>Designed and implemented a new API to modernise legacy software integration.</li>
            <li>Trained and mentored new hires, leading the 2022 graduate training program.</li>
            <li>
              Maintained a legacy banking platform and built a web-based bank statement reconciliation tool for it.
            </li>
          </Role>
        </AboutSection>
      </div>
    </section>
  )
}
