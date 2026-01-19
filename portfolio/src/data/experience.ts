export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  branchType: 'main' | 'feature' | 'hotfix' | 'merge';
  isMerged?: boolean;
}

export const experiences: Experience[] = [
  {
    id: 'dormy-golf',
    company: 'Dormy Golf',
    role: 'Senior Systemutvecklare',
    period: 'okt 2024 – pågående',
    description: 'Sveriges största golf-företag med e-handel över hela Europa. Arbetar med förvaltning, vidareutveckling och nyutveckling av kritiska integrationer. Fokus på driftsäkra och förvaltningsbara flöden mellan nya och legacy-system. Bidragit till mer proaktivt arbetssätt med högre fokus på kvalitetssäkring.',
    technologies: ['Github Actions', 'IIS', 'Kafka', 'Microsoft Azure', 'Blazor', '.NET Core', '.NET Framework'],
    branchType: 'main',
  },
  {
    id: 'vattenfall-2024',
    company: 'Vattenfall (VattenFast)',
    role: 'Fullstack Utvecklare',
    period: 'nov 2022 – okt 2024',
    description: 'Visualisering av geografisk information för Vattenfalls anläggningar och dotterbolag. Ansvarade för fullstackutveckling av kartsystemet "VattenFast" - från arkitektur och systemdesign till onboarding av nya teammedlemmar och implementation av kartwidgets. Höga krav på säkerhet och dataseparering mellan olika bolag.',
    technologies: ['Blazor WebAssembly', 'Tailwind', 'GraphQL', 'ArcGIS JS API', 'Entity Framework', 'NUnit', 'Azure'],
    branchType: 'feature',
    isMerged: true,
  },
  {
    id: 'far',
    company: 'FAR',
    role: 'Utvecklare',
    period: 'sep 2022 – okt 2024',
    description: 'Ansvarig för support och vidareutveckling av FAR:s digitala utbildningsplattform. Implementerade lösningar för att hantera trafiktoppar och integrerade systemet med Learning Locker (LRS) och Microsoft Dynamics 365. Proaktivt arbete för att upprätthålla strikta SLA-nivåer.',
    technologies: ['ASP.NET MVC', 'Azure ServiceBus', '.NET Framework', 'Dynamics 365'],
    branchType: 'feature',
    isMerged: true,
  },
  {
    id: 'anicura',
    company: 'AniCura (AniPlan)',
    role: 'Utvecklare / Support',
    period: 'aug 2022 – okt 2024',
    description: 'Underhåll och vidareutveckling av en maskininlärningsprodukt för klassificering av data. Tjänsten automatiserar hantering av fritextfält vid konsolidering av data från internationella kliniker, vilket möjliggjort AniPlans expansion i Europa.',
    technologies: ['Python', 'Machine Learning', 'Data Processing'],
    branchType: 'hotfix',
    isMerged: true,
  },
  {
    id: 'kickit',
    company: 'KickIt',
    role: 'Projektledare & Teknisk ansvarig',
    period: 'dec 2023 – mars 2024',
    description: 'Internt initiativ för att skapa en samlingsplats för en fotbollsturnering. Agerade projektledare för 4 utvecklare, satte upp infrastruktur, CI/CD-flöden, kodstruktur och skötte kontakten med kravställare.',
    technologies: ['NextJS', 'Minimal APIs', '.NET Core', 'Azure Bicep', 'Github Actions', 'EF Core'],
    branchType: 'feature',
    isMerged: true,
  },
  {
    id: 'previa',
    company: 'Previa',
    role: 'Fullstackutvecklare',
    period: 'aug 2021 – aug 2022',
    description: 'Förvaltning och utveckling av en produktsvit för användarrättigheter inom hälsobranschen. Levererade en framgångsrik integration mot Mobilt BankID för att stärka säkerheten i systemet.',
    technologies: ['ASP.NET MVC', 'Angular', '.NET Framework', 'BankID API'],
    branchType: 'feature',
    isMerged: true,
  },
  {
    id: 'esab',
    company: 'ESAB',
    role: 'Fullstackutvecklare',
    period: 'apr 2021 – maj 2022',
    description: 'Utveckling av en plattform för R&D-avdelningen för att justera svetsparametrar. Byggde en exportfunktion för binärfiler utifrån strikta specifikationer samt utvecklade webbgränssnittet för konfigurationshantering.',
    technologies: ['Vue', '.NET Core', 'Entity Framework', 'SQL', 'Azure'],
    branchType: 'feature',
    isMerged: true,
  },
];

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

export const skills = {
  backend: ['.NET Core', '.NET Framework', 'ASP.NET MVC', 'Entity Framework', 'Python', 'GraphQL', 'Minimal APIs'],
  frontend: ['Blazor', 'Vue', 'Angular', 'NextJS', 'React', 'Tailwind CSS'],
  cloud: ['Microsoft Azure', 'Azure ServiceBus', 'Azure Bicep', 'Github Actions', 'CI/CD'],
  databases: ['SQL', 'Entity Framework', 'Kafka'],
  other: ['Machine Learning', 'ArcGIS JS API', 'BankID', 'IIS', 'NUnit'],
};

