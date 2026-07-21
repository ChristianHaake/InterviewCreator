export type Locale = "de" | "en" | "fr" | "es" | "nl";

export type Question = {
  id: string;
  text: string;
  notes: string;
  estimated_minutes?: number;
  is_backup?: boolean;
};

export type ChecklistItem = {
  id: string;
  text: string;
  checked: boolean;
};

export type SourceItem = {
  id: string;
  title: string;
  url: string;
};

export type InterviewPhases = {
  intro: Question[];
  main: Question[];
  outro: Question[];
};

export type InterviewState = {
  schemaVersion: 1;
  id: string;
  title: string;
  partner: string;
  created_at: string;
  updated_at: string;
  total_estimated_time: number;
  phases: InterviewPhases;
  checklist: ChecklistItem[];
  sources: SourceItem[];
};

type SampleContent = {
  title: string;
  partner: string;
  introText: string;
  introNotes: string;
  mainText: string;
  mainNotes: string;
  backupText: string;
  checklist: [string, string, string];
  sourceTitle: string;
  sourceUrl: string;
};

const sampleContent: Record<Locale, SampleContent> = {
  de: {
    title: "Unser Podcast-Interview",
    partner: "Max Mustermann",
    introText: "Was gab es heute zum Frühstück?",
    introNotes: "Lockere Atmosphäre schaffen",
    mainText: "Was war Ihre größte Herausforderung bei diesem Projekt?",
    mainNotes: "Ggf. auf aktuelle Ereignisse beziehen",
    backupText: "Welche Frage wollten Sie schon immer mal gefragt werden?",
    checklist: [
      "Aufnahmegerät / Mikrofon prüfen",
      "Wasser bereitstellen",
      "Einverständniserklärung unterzeichnet",
    ],
    sourceTitle: "Wikipedia: Geschichte des Podcasts",
    sourceUrl: "https://de.wikipedia.org/wiki/Podcasting",
  },
  en: {
    title: "Our Podcast Interview",
    partner: "Jane Doe",
    introText: "What did you have for breakfast today?",
    introNotes: "Create a relaxed atmosphere",
    mainText: "What was your biggest challenge in this project?",
    mainNotes: "Relate to current events if possible",
    backupText: "Which question have you always wanted to be asked?",
    checklist: [
      "Check recorder / microphone",
      "Provide water",
      "Consent form signed",
    ],
    sourceTitle: "Wikipedia: History of podcasting",
    sourceUrl: "https://en.wikipedia.org/wiki/Podcast",
  },
  fr: {
    title: "Notre interview podcast",
    partner: "Jean Dupont",
    introText: "Qu'avez-vous mangé au petit-déjeuner aujourd'hui ?",
    introNotes: "Créer une atmosphère détendue",
    mainText: "Quel a été votre plus grand défi dans ce projet ?",
    mainNotes: "Faire le lien avec l'actualité si possible",
    backupText: "Quelle question avez-vous toujours voulu qu'on vous pose ?",
    checklist: [
      "Vérifier l'enregistreur / le micro",
      "Prévoir de l'eau",
      "Formulaire de consentement signé",
    ],
    sourceTitle: "Wikipédia : Histoire du podcasting",
    sourceUrl: "https://fr.wikipedia.org/wiki/Podcasting",
  },
  es: {
    title: "Nuestra entrevista de podcast",
    partner: "Juan Pérez",
    introText: "¿Qué has desayunado hoy?",
    introNotes: "Crear un ambiente relajado",
    mainText: "¿Cuál fue tu mayor desafío en este proyecto?",
    mainNotes: "Relacionar con la actualidad si es posible",
    backupText: "¿Qué pregunta siempre has querido que te hagan?",
    checklist: [
      "Comprobar grabadora / micrófono",
      "Preparar agua",
      "Formulario de consentimiento firmado",
    ],
    sourceTitle: "Wikipedia: Historia del podcasting",
    sourceUrl: "https://es.wikipedia.org/wiki/Podcast",
  },
  nl: {
    title: "Ons podcastinterview",
    partner: "Jan Jansen",
    introText: "Wat heb je vandaag als ontbijt gegeten?",
    introNotes: "Ontspannen sfeer creëren",
    mainText: "Wat was je grootste uitdaging bij dit project?",
    mainNotes: "Indien mogelijk koppelen aan de actualiteit",
    backupText: "Welke vraag zou je altijd al eens gesteld willen krijgen?",
    checklist: [
      "Opnameapparaat / microfoon controleren",
      "Water klaarzetten",
      "Toestemmingsformulier ondertekend",
    ],
    sourceTitle: "Wikipedia: Geschiedenis van de podcast",
    sourceUrl: "https://nl.wikipedia.org/wiki/Podcast",
  },
};

export function createDefaultInterviewState(locale: Locale = "de"): InterviewState {
  const now = new Date().toISOString();
  const sample = sampleContent[locale] ?? sampleContent.de;

  return {
    schemaVersion: 1,
    id: crypto.randomUUID(),
    title: sample.title,
    partner: sample.partner,
    created_at: now,
    updated_at: now,
    total_estimated_time: 15,
    phases: {
      intro: [
        {
          id: "ib-1",
          text: sample.introText,
          notes: sample.introNotes,
          estimated_minutes: 2,
          is_backup: false,
        }
      ],
      main: [
        {
          id: "q-1",
          text: sample.mainText,
          notes: sample.mainNotes,
          estimated_minutes: 10,
          is_backup: false,
        },
        {
          id: "q-2",
          text: sample.backupText,
          notes: "",
          estimated_minutes: 3,
          is_backup: true,
        },
      ],
      outro: []
    },
    checklist: sample.checklist.map((text, index) => ({
      id: `c-${index + 1}`,
      text,
      checked: false,
    })),
    sources: [
      { id: "s-1", title: sample.sourceTitle, url: sample.sourceUrl }
    ]
  };
}
