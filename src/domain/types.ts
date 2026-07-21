import { createProjectFromTemplate } from "./templates";

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
  /** Optional target duration in minutes for planning against the plan. */
  target_minutes?: number;
  phases: InterviewPhases;
  checklist: ChecklistItem[];
  sources: SourceItem[];
};

export function createDefaultInterviewState(locale: Locale = "de"): InterviewState {
  return createProjectFromTemplate("podcast", locale);
}
