import fs from 'fs';
import path from 'path';

const outDir = path.resolve('src/i18n');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const de = {
  "app.title": "InterviewDesigner",
  "app.metaDescription": "Planungswerkzeug für Interviews im Rahmen von Podcasts, Reportagen oder Projektarbeiten.",
  "tab.editor": "Editor",
  "tab.preview": "Vorschau",
  "home.editorTitle": "Interview-Fragen bearbeiten",
  "home.resetProject": "Projekt zurücksetzen",
  "home.livePreview": "Live Vorschau",
  "home.localView": "Lokale Darstellung",
  "home.project": "Projekt",
  "home.load": "Laden",
  "home.save": "Speichern",
  "home.export": "Export",
  "home.print": "Drucken / PDF",
  "home.resetConfirm": "Bist du sicher, dass du das aktuelle Projekt löschen möchtest? Alle nicht exportierten Daten gehen verloren.",
  
  "footer.localData": "Lokale Datenverarbeitung im Browser",
  "footer.help": "Hilfe",
  "footer.about": "Über",
  "footer.privacy": "Datenschutz",
  "footer.legal": "Impressum",
  "footer.coffee": "Kaffee spendieren",

  "preview.untitled": "Unbenanntes Interview",
  "preview.partnerLabel": "Interviewpartner:in:",
  "preview.noPartner": "Nicht angegeben",
  "preview.totalTime": "Gesamtdauer:",
  "preview.approx": "ca.",
  "preview.minutes": "Minuten",
  "preview.checklistTitle": "Checkliste (Vorab)",
  "preview.introTitle": "Einleitung (Intro)",
  "preview.introPrefix": "Einleitung",
  "preview.mainTitle": "Hauptteil",
  "preview.mainPrefix": "Frage",
  "preview.outroTitle": "Schluss (Outro)",
  "preview.outroPrefix": "Schluss",
  "preview.badgeBackup": "Backup",
  "preview.badgeTime": "~{minutes} Min",
  "preview.notesLabel": "Notizen:",
  "preview.sourcesTitle": "Quellen & Referenzen",
  "preview.untitledSource": "Ohne Titel",
  "preview.emptyMain": "Es wurden noch keine Hauptfragen hinzugefügt.",

  "editor.metaTitle": "Projekttitel:",
  "editor.metaTitlePlaceholder": "Name des Interviews",
  "editor.metaPartner": "Interviewpartner:in:",
  "editor.metaPartnerPlaceholder": "Name der Person",

  "editor.checklistTitle": "Checkliste (Vorbereitung)",
  "editor.checklistAdd": "Checklisten-Punkt hinzufügen",
  "editor.checklistEmpty": "Keine Vorbereitungspunkte vorhanden.",
  "editor.checklistPlaceholder": "Aufgabe / Checklisten-Punkt",

  "editor.sourceTitle": "Quellen & Referenzen",
  "editor.sourceAdd": "Quelle hinzufügen",
  "editor.sourceEmpty": "Keine Quellen hinterlegt.",
  "editor.sourceTitlePlaceholder": "Titel der Quelle",
  "editor.sourceUrlPlaceholder": "URL / Link",

  "editor.introTitle": "Einleitung (Intro)",
  "editor.introEmpty": "Keine Fragen zur Einleitung vorhanden.",
  "editor.mainTitle": "Hauptteil",
  "editor.mainEmpty": "Keine Hauptfragen vorhanden. Füge eine Frage hinzu.",
  "editor.outroTitle": "Schluss (Outro)",
  "editor.outroEmpty": "Keine Schlussfragen vorhanden.",
  
  "editor.questionPrefix": "Frage {number}",
  "editor.questionPlaceholder": "Was möchten Sie fragen?",
  "editor.notesLabel": "Stichpunkte / Notizen (optional)",
  "editor.notesPlaceholder": "Antwort-Optionen oder eigene Notizen...",
  "editor.timeLabel": "Dauer (Min):",
  "editor.backupLabel": "Backup-Frage",
  "editor.addQuestion": "Frage hinzufügen",

  "storage.invalidFormat": "Das Dateiformat ist ungültig. Es fehlen benötigte Felder.",
  "storage.readError": "Fehler beim Lesen der Datei. Ist es eine gültige JSON-Datei?"
};

const en = {
  "app.title": "InterviewDesigner",
  "app.metaDescription": "Planning tool for interviews in podcasts, reports or projects.",
  "tab.editor": "Editor",
  "tab.preview": "Preview",
  "home.editorTitle": "Edit Interview Questions",
  "home.resetProject": "Reset Project",
  "home.livePreview": "Live Preview",
  "home.localView": "Local Display",
  "home.project": "Project",
  "home.load": "Load",
  "home.save": "Save",
  "home.export": "Export",
  "home.print": "Print / PDF",
  "home.resetConfirm": "Are you sure you want to delete the current project? All unexported data will be lost.",
  
  "footer.localData": "Local data processing in the browser",
  "footer.help": "Help",
  "footer.about": "About",
  "footer.privacy": "Privacy",
  "footer.legal": "Legal",
  "footer.coffee": "Buy me a coffee",

  "preview.untitled": "Untitled Interview",
  "preview.partnerLabel": "Interviewee:",
  "preview.noPartner": "Not specified",
  "preview.totalTime": "Total duration:",
  "preview.approx": "approx.",
  "preview.minutes": "minutes",
  "preview.checklistTitle": "Checklist (Prep)",
  "preview.introTitle": "Introduction (Intro)",
  "preview.introPrefix": "Intro",
  "preview.mainTitle": "Main Part",
  "preview.mainPrefix": "Question",
  "preview.outroTitle": "Conclusion (Outro)",
  "preview.outroPrefix": "Outro",
  "preview.badgeBackup": "Backup",
  "preview.badgeTime": "~{minutes} Min",
  "preview.notesLabel": "Notes:",
  "preview.sourcesTitle": "Sources & References",
  "preview.untitledSource": "Untitled",
  "preview.emptyMain": "No main questions have been added yet.",

  "editor.metaTitle": "Project Title:",
  "editor.metaTitlePlaceholder": "Name of the interview",
  "editor.metaPartner": "Interviewee:",
  "editor.metaPartnerPlaceholder": "Name of the person",

  "editor.checklistTitle": "Checklist (Preparation)",
  "editor.checklistAdd": "Add checklist item",
  "editor.checklistEmpty": "No preparation items available.",
  "editor.checklistPlaceholder": "Task / Checklist item",

  "editor.sourceTitle": "Sources & References",
  "editor.sourceAdd": "Add Source",
  "editor.sourceEmpty": "No sources saved.",
  "editor.sourceTitlePlaceholder": "Title of the source",
  "editor.sourceUrlPlaceholder": "URL / Link",

  "editor.introTitle": "Introduction (Intro)",
  "editor.introEmpty": "No questions for the introduction.",
  "editor.mainTitle": "Main Part",
  "editor.mainEmpty": "No main questions. Add a question.",
  "editor.outroTitle": "Conclusion (Outro)",
  "editor.outroEmpty": "No questions for the conclusion.",
  
  "editor.questionPrefix": "Question {number}",
  "editor.questionPlaceholder": "What do you want to ask?",
  "editor.notesLabel": "Bullet points / Notes (optional)",
  "editor.notesPlaceholder": "Answer options or your own notes...",
  "editor.timeLabel": "Duration (Min):",
  "editor.backupLabel": "Backup Question",
  "editor.addQuestion": "Add Question",

  "storage.invalidFormat": "The file format is invalid. Required fields are missing.",
  "storage.readError": "Error reading the file. Is it a valid JSON file?"
};

const fr = {
  "app.title": "InterviewDesigner",
  "app.metaDescription": "Outil de planification pour les entretiens dans les podcasts, les reportages ou les projets.",
  "tab.editor": "Éditeur",
  "tab.preview": "Aperçu",
  "home.editorTitle": "Modifier les questions d'entretien",
  "home.resetProject": "Réinitialiser le projet",
  "home.livePreview": "Aperçu en direct",
  "home.localView": "Affichage local",
  "home.project": "Projet",
  "home.load": "Charger",
  "home.save": "Enregistrer",
  "home.export": "Exporter",
  "home.print": "Imprimer / PDF",
  "home.resetConfirm": "Êtes-vous sûr de vouloir supprimer le projet actuel ? Toutes les données non exportées seront perdues.",
  
  "footer.localData": "Traitement local des données dans le navigateur",
  "footer.help": "Aide",
  "footer.about": "À propos",
  "footer.privacy": "Confidentialité",
  "footer.legal": "Mentions légales",
  "footer.coffee": "Offrez-moi un café",

  "preview.untitled": "Entretien sans titre",
  "preview.partnerLabel": "Interlocuteur/trice:",
  "preview.noPartner": "Non spécifié",
  "preview.totalTime": "Durée totale:",
  "preview.approx": "env.",
  "preview.minutes": "minutes",
  "preview.checklistTitle": "Liste de contrôle (Préparation)",
  "preview.introTitle": "Introduction (Intro)",
  "preview.introPrefix": "Intro",
  "preview.mainTitle": "Partie principale",
  "preview.mainPrefix": "Question",
  "preview.outroTitle": "Conclusion (Outro)",
  "preview.outroPrefix": "Conclusion",
  "preview.badgeBackup": "Secours",
  "preview.badgeTime": "~{minutes} Min",
  "preview.notesLabel": "Notes:",
  "preview.sourcesTitle": "Sources et références",
  "preview.untitledSource": "Sans titre",
  "preview.emptyMain": "Aucune question principale n'a encore été ajoutée.",

  "editor.metaTitle": "Titre du projet:",
  "editor.metaTitlePlaceholder": "Nom de l'entretien",
  "editor.metaPartner": "Interlocuteur/trice:",
  "editor.metaPartnerPlaceholder": "Nom de la personne",

  "editor.checklistTitle": "Liste de contrôle (Préparation)",
  "editor.checklistAdd": "Ajouter un élément",
  "editor.checklistEmpty": "Aucun élément de préparation.",
  "editor.checklistPlaceholder": "Tâche / Élément de la liste",

  "editor.sourceTitle": "Sources et références",
  "editor.sourceAdd": "Ajouter une source",
  "editor.sourceEmpty": "Aucune source enregistrée.",
  "editor.sourceTitlePlaceholder": "Titre de la source",
  "editor.sourceUrlPlaceholder": "URL / Lien",

  "editor.introTitle": "Introduction (Intro)",
  "editor.introEmpty": "Pas de questions pour l'introduction.",
  "editor.mainTitle": "Partie principale",
  "editor.mainEmpty": "Pas de questions principales. Ajoutez une question.",
  "editor.outroTitle": "Conclusion (Outro)",
  "editor.outroEmpty": "Pas de questions pour la conclusion.",
  
  "editor.questionPrefix": "Question {number}",
  "editor.questionPlaceholder": "Que voulez-vous demander ?",
  "editor.notesLabel": "Points / Notes (optionnel)",
  "editor.notesPlaceholder": "Options de réponse ou vos propres notes...",
  "editor.timeLabel": "Durée (Min):",
  "editor.backupLabel": "Question de secours",
  "editor.addQuestion": "Ajouter une question",

  "storage.invalidFormat": "Le format du fichier est invalide. Des champs requis sont manquants.",
  "storage.readError": "Erreur lors de la lecture du fichier. Est-ce un fichier JSON valide ?"
};

const es = { ...en };
const nl = { ...en };

const writeLang = (lang, obj) => {
  const content = `export const ${lang} = ${JSON.stringify(obj, null, 2)} as const;\n\nexport type TranslationKey = keyof typeof ${lang};\n`;
  fs.writeFileSync(path.join(outDir, `${lang}.ts`), content);
}

writeLang('de', de);
fs.writeFileSync(path.join(outDir, `en.ts`), `export const en = ${JSON.stringify(en, null, 2)};\n`);
fs.writeFileSync(path.join(outDir, `fr.ts`), `export const fr = ${JSON.stringify(fr, null, 2)};\n`);
fs.writeFileSync(path.join(outDir, `es.ts`), `export const es = ${JSON.stringify(es, null, 2)};\n`);
fs.writeFileSync(path.join(outDir, `nl.ts`), `export const nl = ${JSON.stringify(nl, null, 2)};\n`);

const indexTsx = `import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "../domain/types";
import { de, type TranslationKey } from "./de";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { nl } from "./nl";

type Params = Record<string, string | number>;

const dictionaries = { de, en, fr, es, nl };
const storageKey = "interview-creator-locale";

function detectLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored && ["de", "en", "fr", "es", "nl"].includes(stored)) return stored as Locale;
  } catch {}
  const browserLang = window.navigator.language.toLowerCase().substring(0, 2);
  if (["de", "en", "fr", "es", "nl"].includes(browserLang)) return browserLang as Locale;
  return "de";
}

function translate(locale: Locale, key: TranslationKey, params?: Params) {
  let value = (dictionaries[locale] as any)[key] || dictionaries.de[key];
  if (params) {
    Object.entries(params).forEach(([name, replacement]) => {
      value = value.replaceAll(\`{\${name}}\`, String(replacement));
    });
  }
  return value;
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Params) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, locale);
    } catch {}
    document.documentElement.lang = locale;
    document.title = translate(locale, "app.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", translate(locale, "app.metaDescription"));
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (key: TranslationKey, params?: Params) => translate(locale, key, params),
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("LocaleProvider is missing.");
  return context;
}
`;

fs.writeFileSync(path.join(outDir, `index.tsx`), indexTsx);

console.log("i18n generated successfully.");
