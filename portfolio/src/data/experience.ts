import type { LocalizedText } from '../i18n';

export interface Experience {
  id: string;
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  /** Employer group (e.g. consultancy) – used for expandable experience sections */
  employer: string;
}

/** Experiences grouped by employer. Items within each group are ordered newest-first (reversed from chronological). */
const experiencesByEmployer: Experience[][] = [
  [
    {
      id: 'dormy-golf',
      company: 'Dormy Golf',
      role: {
        sv: 'Senior Systemutvecklare',
        en: 'Senior Software Developer',
      },
      period: {
        sv: 'okt 2024 – pågående',
        en: 'Oct 2024 – present',
      },
      description: {
        sv: 'Sveriges största golfföretag med e-handel över Europa. Förvaltning, vidareutveckling och nyutveckling av kritiska integrationer mellan system. Fokus på driftsäkra och förvaltningsbara integrationer; bidragit till mer proaktivt arbete och högre kvalitetsfokus i teamet.',
        en: "Sweden's largest golf company with e-commerce across Europe. Responsible for maintenance, improvement and new development of critical system integrations. Focus on reliable and easy to maintain integrations that support a more proactive way of working and a stronger focus on quality in the team.",
      },
      technologies: ['Github Actions', 'Kafka', 'Microsoft Azure', 'Blazor', '.NET Core', '.NET Framework', 'on-prem IIS'],
      employer: 'Dormy Golf',
    },
  ],
  [
    {
      id: 'kickit',
      company: 'KickIt',
      role: {
        sv: 'Projektledare & Teknisk ansvarig',
        en: 'Project Manager & Technical Lead',
      },
      period: {
        sv: 'dec 2023 – mars 2024',
        en: 'Dec 2023 – Mar 2024',
      },
      description: {
        sv: 'Samlingssida för innomhusfotbollsturnering. Ansvarig för teknik och projektledning med fyra utvecklare: infrastruktur, CI/CD, kodstruktur, agilt arbetsflöde och dialog med kravställare.',
        en: 'Landing site for an indoor football tournament. Responsible for technology and project management for a team of four developers, including infrastructure, CI/CD, code structure, agile workflow and communication with stakeholders.',
      },
      technologies: ['NextJS', 'Minimal APIs', '.NET Core', 'Azure Bicep', 'Github Actions', 'EF Core'],
      employer: 'B3 Consulting Group',
    },
    {
      id: 'anicura',
      company: 'AniPlan, AniCura',
      role: {
        sv: 'Systemutvecklare / Support',
        en: 'Software Developer / Support',
      },
      period: {
        sv: 'aug 2022 – okt 2024',
        en: 'Aug 2022 – Oct 2024',
      },
      description: {
        sv: 'Molnbaserad tjänst för djurhälsa med expansion till flera länder. Underhåll och vidareutveckling av ML-produkt som klassificerar data vid sammanslagning av företag (t.ex. fritextfält), vilket underlättat expansion.',
        en: 'Cloud based service for pet health in several countries. Maintenance and further development of a machine learning product that classifies data when companies are merged, for example free text fields, which makes expansion easier.',
      },
      technologies: ['Python', 'Machine Learning', 'Data Processing'],
      employer: 'B3 Consulting Group',
    },
    {
      id: 'far',
      company: 'FLS, FAR',
      role: {
        sv: 'Systemutvecklare',
        en: 'Software Developer',
      },
      period: {
        sv: 'sep 2022 – okt 2024',
        en: 'Sep 2022 – Oct 2024',
      },
      description: {
        sv: 'Digital plattform för uppspelning och administration av FAR:s utbildningar. SLA-ansvar genom support och utveckling. Integration med Learning Locker (LRS) och Microsoft Dynamics 365. Lösningar för trafiköverbelastning och vidareutveckling.',
        en: "Digital platform for playback and administration of FAR's training courses. Responsible for support and development within the SLA. Integrations with Learning Locker (LRS) and Microsoft Dynamics 365, and solutions for traffic spikes and ongoing improvements.",
      },
      technologies: ['ASP.NET MVC', 'Azure ServiceBus', '.NET Framework'],
      employer: 'B3 Consulting Group',
    },
    {
      id: 'vattenfall-2024',
      company: 'VattenFast, Vattenfall',
      role: {
        sv: 'Systemutvecklare',
        en: 'Software Developer',
      },
      period: {
        sv: 'nov 2022 – okt 2024',
        en: 'Nov 2022 – Oct 2024',
      },
      description: {
        sv: 'Avancerat kartsystem för att visualisera ägande och geografisk information över Vattenfalls dotterbolag. Strikta säkerhetskrav och dataseparering. Fullstack från frontend-widgets och Lantmäteriet-integration till backend och databasmigreringar. Större ansvar för arkitektur, systemdesign och onboarding 2024; tekniskt stöd i RFP med ArcGIS-expertis.',
        en: "Advanced mapping system for visualizing ownership and geographic information across Vattenfall subsidiaries. Strict security requirements and data separation. Work across the fullstack from frontend widgets and integration with the Swedish land registry (Lantmäteriet) to backend and database migrations. In 2024 the role also included more responsibility for architecture, system design and onboarding, as well as technical support in RFP processes with ArcGIS expertise.",
      },
      technologies: ['Blazor WebAssembly', 'Tailwind', 'GraphQL', 'ArcGIS', 'Entity Framework', 'NUnit', 'Azure'],
      employer: 'B3 Consulting Group',
    },
  ],
  [
    {
      id: 'esab',
      company: 'ESAB',
      role: {
        sv: 'Systemutvecklare',
        en: 'Software Developer',
      },
      period: {
        sv: 'apr 2021 – maj 2022',
        en: 'Apr 2021 – May 2022',
      },
      description: {
        sv: 'Digitalisering av R&D-processer för konfiguration av svetsmaskiner. Webbgränssnitt för parametrar och export till binärfil enligt specifikation; arbete i både frontend och backend.',
        en: 'Digitising R&D processes for configuring welding machines. Web interface for parameters and export to a binary file according to specification, with work across both frontend and backend.',
      },
      technologies: ['Git', 'SQL', 'Entity Framework', 'Microsoft Azure', '.NET Core', 'Vue'],
      employer: 'Nexer Group',
    },
    {
      id: 'yh-sky',
      company: 'YH SKY',
      role: {
        sv: 'Handledare / Examinator',
        en: 'Mentor and examiner',
      },
      period: {
        sv: 'jan 2022 – juni 2022',
        en: 'Jan 2022 – Jun 2022',
      },
      description: {
        sv: 'Handledning av yrkeshögskoleelever i praktiska workshops. Tillsammans med kollega ansvar för examination: skriftlig rapport och presentation.',
        en: 'Mentor for vocational students in practical workshops. Planned and ran sessions, gave feedback on code and helped students connect theory to real projects. Shared responsibility with a colleague for examination, including written reports and presentations.',
      },
      technologies: ['HTML', 'SQL', '.NET Core', 'Javascript'],
      employer: 'Nexer Group',
    },
    {
      id: 'previa',
      company: 'Previa',
      role: {
        sv: 'Systemutvecklare',
        en: 'Software Developer',
      },
      period: {
        sv: 'aug 2021 – aug 2022',
        en: 'Aug 2021 – Aug 2022',
      },
      description: {
        sv: 'Vidareutveckling och förvaltning av produktsvit; fokus på produkt för användarrättigheter (web-API och MVC). Framgångsrik integration mot Mobilt BankID.',
        en: 'Further development and maintenance of a product suite with a focus on the access rights product (web API and MVC). Included a successful integration with Swedish Mobile BankID.',
      },
      technologies: ['ASP.NET MVC', 'Angular', '.NET Framework', 'BankID API'],
      employer: 'Nexer Group',
    },
  ],
];

/** Flattened for components that use groupByEmployer. Employer order preserved; items within each employer reversed (newest first). */
export const experiences: Experience[] = experiencesByEmployer.flat();

/** Tailwind border-l-* class per employer (for experience cards). Add new employers here. */
export const EMPLOYER_BORDER_CLASS: Record<string, string> = {
  'Dormy Golf': 'border-l-primary',
  'B3 Consulting Group': 'border-l-orange-500',
  'Nexer Group': 'border-l-rose-500',
};

export interface EmployerSummary {
  name: string;
  role: LocalizedText;
  period: LocalizedText;
}

export const employers: EmployerSummary[] = [
  {
    name: 'Dormy Golf',
    role: {
      sv: 'Senior Systemutvecklare',
      en: 'Senior Software Developer',
    },
    period: {
      sv: '2024 – Pågående',
      en: '2024 – Present',
    },
  },
  {
    name: 'B3 Consulting Group',
    role: {
      sv: 'IT-konsult',
      en: 'IT Consultant',
    },
    period: {
      sv: '2022 – 2024',
      en: '2022 – 2024',
    },
  },
  {
    name: 'Nexer Group (Sigma IT)',
    role: {
      sv: 'IT-konsult',
      en: 'IT Consultant',
    },
    period: {
      sv: '2021 – 2022',
      en: '2021 – 2022',
    },
  },
  {
    name: 'Sigma IT',
    role: {
      sv: 'IT-konsult',
      en: 'IT Consultant',
    },
    period: {
      sv: '2019',
      en: '2019',
    },
  },
];

export interface EducationEntry {
  degree: LocalizedText;
  school: LocalizedText;
  period: LocalizedText;
}

export const education: EducationEntry[] = [
  {
    degree: {
      sv: 'Kandidatexamen i Datavetenskap',
      en: "Bachelor's degree in Computer Science",
    },
    school: {
      sv: 'Örebro Universitet',
      en: 'Örebro University',
    },
    period: {
      sv: '2016 – 2019',
      en: '2016 – 2019',
    },
  },
  {
    degree: {
      sv: 'Virtualisering och DevOps',
      en: 'Virtualisation and DevOps',
    },
    school: {
      sv: 'Blekinge Tekniska Högskola',
      en: 'Blekinge Institute of Technology',
    },
    period: {
      sv: '2021',
      en: '2021',
    },
  },
  {
    degree: {
      sv: 'Lärarledd Machine Learning',
      en: 'Instructor-led Machine Learning',
    },
    school: {
      sv: 'Högskolan i Halmstad',
      en: 'Halmstad University',
    },
    period: {
      sv: '2021',
      en: '2021',
    },
  },
  {
    degree: {
      sv: 'C#.NET',
      en: 'C#.NET',
    },
    school: {
      sv: 'Karlstads Universitet',
      en: 'Karlstad University',
    },
    period: {
      sv: '2021',
      en: '2021',
    },
  },
  {
    degree: {
      sv: 'Objektorienterad programmering i Java',
      en: 'Object-oriented programming in Java',
    },
    school: {
      sv: 'Luleå Tekniska Universitet',
      en: 'Luleå University of Technology',
    },
    period: {
      sv: '2021',
      en: '2021',
    },
  },
];

export const certifications = [
  { name: 'Microsoft Certified: Azure Developer Associate (AZ-204)', year: '2023' },
  { name: 'Microsoft Certified: Azure Fundamentals (AZ-900)', year: '2022' },
];

/** Ordered list of techs (most attractive / relevant first). */
export const skills: string[] = [
  '.NET Core',
  '.NET Framework',
  'Git',
  'NextJS',
  'Blazor',
  'Azure',
  'Kafka',
  'GitHub Actions',
  'IIS on-prem',
  'TypeScript',
  'Tailwind',
  'Azure Servicebus',
];

