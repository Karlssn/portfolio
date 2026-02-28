export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
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
      role: 'Senior Systemutvecklare',
      period: 'okt 2024 – pågående',
      description: 'Sveriges största golfföretag med e-handel över Europa. Förvaltning, vidareutveckling och nyutveckling av kritiska integrationer mellan system. Fokus på driftsäkra och förvaltningsbara integrationer; bidragit till mer proaktivt arbete och högre kvalitetsfokus i teamet.',
      technologies: ['Github Actions', 'Kafka', 'Microsoft Azure', 'Blazor', '.NET Core', '.NET Framework', 'on-prem IIS'],
      employer: 'Dormy Golf',
    },
  ],
  [
    {
      id: 'kickit',
      company: 'KickIt',
      role: 'Projektledare & Teknisk ansvarig',
      period: 'dec 2023 – mars 2024',
      description: 'Samlingssida för innomhusfotbollsturnering. Ansvarig för teknik och projektledning med fyra utvecklare: infrastruktur, CI/CD, kodstruktur, agilt arbetsflöde och dialog med kravställare.',
      technologies: ['NextJS', 'Minimal APIs', '.NET Core', 'Azure Bicep', 'Github Actions', 'EF Core'],
      employer: 'B3 Consulting Group',
    },
    {
      id: 'anicura',
      company: 'AniPlan, AniCura',
      role: 'Systemutvecklare / Support',
      period: 'aug 2022 – okt 2024',
      description: 'Molnbaserad tjänst för djurhälsa med expansion till flera länder. Underhåll och vidareutveckling av ML-produkt som klassificerar data vid sammanslagning av företag (t.ex. fritextfält), vilket underlättat expansion.',
      technologies: ['Python', 'Machine Learning', 'Data Processing'],
      employer: 'B3 Consulting Group',
    },
    {
      id: 'far',
      company: 'FLS, FAR',
      role: 'Systemutvecklare',
      period: 'sep 2022 – okt 2024',
      description: 'Digital plattform för uppspelning och administration av FAR:s utbildningar. SLA-ansvar genom support och utveckling. Integration med Learning Locker (LRS) och Microsoft Dynamics 365. Lösningar för trafiköverbelastning och vidareutveckling.',
      technologies: ['ASP.NET MVC', 'Azure ServiceBus', '.NET Framework'],
      employer: 'B3 Consulting Group',
    },
    {
      id: 'vattenfall-2024',
      company: 'VattenFast, Vattenfall',
      role: 'Systemutvecklare',
      period: 'nov 2022 – okt 2024',
      description: 'Avancerat kartsystem för att visualisera ägande och geografisk information över Vattenfalls dotterbolag. Strikta säkerhetskrav och dataseparering. Fullstack från frontend-widgets och Lantmäteriet-integration till backend och databasmigreringar. Större ansvar för arkitektur, systemdesign och onboarding 2024; tekniskt stöd i RFP med ArcGIS-expertis.',
      technologies: ['Blazor WebAssembly', 'Tailwind', 'GraphQL', 'ArcGIS', 'Entity Framework', 'NUnit', 'Azure'],
      employer: 'B3 Consulting Group',
    },
  ],
  [
    {
      id: 'esab',
      company: 'ESAB',
      role: 'Systemutvecklare',
      period: 'apr 2021 – maj 2022',
      description: 'Digitalisering av R&D-processer för konfiguration av svetsmaskiner. Webbgränssnitt för parametrar och export till binärfil enligt specifikation; arbete i både frontend och backend.',
      technologies: ['Git', 'SQL', 'Entity Framework', 'Microsoft Azure', '.NET Core', 'Vue'],
      employer: 'Nexer Group',
    },
    {
      id: 'yh-sky',
      company: 'YH SKY',
      role: 'Handledare / Examinator',
      period: 'jan 2022 – juni 2022',
      description: 'Handledning av yrkeshögskoleelever i praktiska workshops. Tillsammans med kollega ansvar för examination: skriftlig rapport och presentation.',
      technologies: ['HTML', 'SQL', '.NET Core', 'Javascript'],
      employer: 'Nexer Group',
    },
    {
      id: 'previa',
      company: 'Previa',
      role: 'Systemutvecklare',
      period: 'aug 2021 – aug 2022',
      description: 'Vidareutveckling och förvaltning av produktsvit; fokus på produkt för användarrättigheter (web-API och MVC). Framgångsrik integration mot Mobilt BankID.',
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

export const employers = [
  { name: 'Dormy Golf', role: 'Senior Systemutvecklare', period: '2024 – Pågående' },
  { name: 'B3 Consulting Group', role: 'IT-konsult', period: '2022 – 2024' },
  { name: 'Nexer Group (Sigma IT)', role: 'IT-konsult', period: '2021 – 2022' },
  { name: 'Sigma IT', role: 'IT-konsult', period: '2019' },
];

export const education = [
  { degree: 'Kandidatexamen i Datavetenskap', school: 'Örebro Universitet', period: '2016 – 2019' },
  { degree: 'Virtualisering och DevOps', school: 'Blekinge Tekniska Högskola', period: '2021' },
  { degree: 'Lärarledd Machine Learning', school: 'Högskolan i Halmstad', period: '2021' },
  { degree: 'C#.NET', school: 'Karlstads Universitet', period: '2021' },
  { degree: 'Objektorienterad programmering i Java', school: 'Luleå Tekniska Universitet', period: '2021' },
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

