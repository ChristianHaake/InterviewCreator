import type { InterviewPhases, Locale } from "./types";

export type PhaseKey = keyof InterviewPhases;

/**
 * Generic, reusable prompt suggestions per phase. Students insert one with a
 * click and then adapt the wording. Kept talk-type agnostic on purpose.
 */
const impulses: Record<Locale, Record<PhaseKey, string[]>> = {
  de: {
    intro: [
      "Stell dich / euch kurz vor.",
      "Was verbindest du mit dem heutigen Thema?",
      "Wie geht es dir gerade?",
      "Worauf freust du dich bei diesem Gespräch?",
    ],
    main: [
      "Kannst du das an einem Beispiel erklären?",
      "Wie bist du zu dieser Einschätzung gekommen?",
      "Was war der wichtigste Moment dabei?",
      "Was würdest du anders machen?",
      "Wie siehst du das im Vergleich zu früher?",
    ],
    outro: [
      "Was möchtest du zum Schluss noch ergänzen?",
      "Was nimmst du aus dem Gespräch mit?",
      "Wo können wir mehr darüber erfahren?",
    ],
  },
  en: {
    intro: [
      "Briefly introduce yourself.",
      "What do you associate with today's topic?",
      "How are you doing right now?",
      "What are you looking forward to in this conversation?",
    ],
    main: [
      "Can you explain that with an example?",
      "How did you arrive at that view?",
      "What was the most important moment in it?",
      "What would you do differently?",
      "How does that compare to the past?",
    ],
    outro: [
      "Is there anything you'd like to add at the end?",
      "What are you taking away from this conversation?",
      "Where can we learn more about it?",
    ],
  },
  fr: {
    intro: [
      "Présente-toi brièvement.",
      "Qu'est-ce que le sujet du jour évoque pour toi ?",
      "Comment vas-tu en ce moment ?",
      "Qu'attends-tu de cet échange ?",
    ],
    main: [
      "Peux-tu l'expliquer avec un exemple ?",
      "Comment es-tu arrivé à cet avis ?",
      "Quel a été le moment le plus important ?",
      "Que ferais-tu différemment ?",
      "Comment vois-tu cela par rapport à avant ?",
    ],
    outro: [
      "Souhaites-tu ajouter quelque chose pour finir ?",
      "Que retiens-tu de cet échange ?",
      "Où peut-on en apprendre davantage ?",
    ],
  },
  es: {
    intro: [
      "Preséntate brevemente.",
      "¿Qué asocias con el tema de hoy?",
      "¿Cómo estás en este momento?",
      "¿Qué esperas de esta conversación?",
    ],
    main: [
      "¿Puedes explicarlo con un ejemplo?",
      "¿Cómo llegaste a esa opinión?",
      "¿Cuál fue el momento más importante?",
      "¿Qué harías de otra manera?",
      "¿Cómo lo ves en comparación con antes?",
    ],
    outro: [
      "¿Quieres añadir algo al final?",
      "¿Qué te llevas de esta conversación?",
      "¿Dónde podemos aprender más al respecto?",
    ],
  },
  nl: {
    intro: [
      "Stel jezelf kort voor.",
      "Wat associeer je met het onderwerp van vandaag?",
      "Hoe gaat het nu met je?",
      "Waar kijk je naar uit in dit gesprek?",
    ],
    main: [
      "Kun je dat met een voorbeeld uitleggen?",
      "Hoe kwam je tot dat oordeel?",
      "Wat was het belangrijkste moment daarin?",
      "Wat zou je anders doen?",
      "Hoe zie je dat vergeleken met vroeger?",
    ],
    outro: [
      "Wil je tot slot nog iets toevoegen?",
      "Wat neem je mee uit dit gesprek?",
      "Waar kunnen we er meer over te weten komen?",
    ],
  },
};

export function getImpulses(locale: Locale, phase: PhaseKey): string[] {
  return impulses[locale]?.[phase] ?? impulses.de[phase];
}
