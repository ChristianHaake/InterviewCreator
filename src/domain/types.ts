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

export function createDefaultInterviewState(): InterviewState {
  const now = new Date().toISOString();

  return {
    schemaVersion: 1,
    id: crypto.randomUUID(),
    title: "Unser Podcast-Interview",
    partner: "Max Mustermann",
    created_at: now,
    updated_at: now,
    total_estimated_time: 15,
    phases: {
      intro: [
        {
          id: "ib-1",
          text: "Was gab es heute zum Frühstück?",
          notes: "Lockere Atmosphäre schaffen",
          estimated_minutes: 2,
          is_backup: false,
        }
      ],
      main: [
        {
          id: "q-1",
          text: "Was war Ihre größte Herausforderung bei diesem Projekt?",
          notes: "Ggf. auf aktuelle Ereignisse beziehen",
          estimated_minutes: 10,
          is_backup: false,
        },
        {
          id: "q-2",
          text: "Welche Frage wollten Sie schon immer mal gefragt werden?",
          notes: "",
          estimated_minutes: 3,
          is_backup: true,
        },
      ],
      outro: []
    },
    checklist: [
      { id: "c-1", text: "Aufnahmegerät / Mikrofon prüfen", checked: false },
      { id: "c-2", text: "Wasser bereitstellen", checked: false },
      { id: "c-3", text: "Einverständniserklärung unterzeichnet", checked: false },
    ],
    sources: [
      { id: "s-1", title: "Wikipedia: Geschichte des Podcasts", url: "https://de.wikipedia.org/wiki/Podcasting" }
    ]
  };
}

export const defaultInterviewState: InterviewState = createDefaultInterviewState();
