import type { InterviewPhases, InterviewState, Locale, Question } from "./types";

export type TemplateId = "podcast" | "interview" | "debate" | "lesson";

export const TEMPLATE_IDS: TemplateId[] = ["podcast", "interview", "debate", "lesson"];

type TemplateElement = {
  text: string;
  notes?: string;
  minutes: number;
  backup?: boolean;
};

type TemplateContent = {
  title: string;
  partner: string;
  intro: TemplateElement[];
  main: TemplateElement[];
  outro: TemplateElement[];
  checklist: string[];
  sources: { title: string; url: string }[];
};

type LocalizedTemplate = Record<Locale, TemplateContent>;

/**
 * Starter content for each talk type, localized in all supported UI
 * languages. Kept intentionally short: two or three example elements per
 * phase that users overwrite with their own content.
 */
const templates: Record<TemplateId, LocalizedTemplate> = {
  podcast: {
    de: {
      title: "Unser Podcast-Interview",
      partner: "Max Mustermann",
      intro: [{ text: "Was gab es heute zum Frühstück?", notes: "Lockere Atmosphäre schaffen", minutes: 2 }],
      main: [
        { text: "Was war Ihre größte Herausforderung bei diesem Projekt?", notes: "Ggf. auf aktuelle Ereignisse beziehen", minutes: 10 },
        { text: "Welche Frage wollten Sie schon immer mal gefragt werden?", minutes: 3, backup: true },
      ],
      outro: [],
      checklist: ["Aufnahmegerät / Mikrofon prüfen", "Wasser bereitstellen", "Einverständniserklärung unterzeichnet"],
      sources: [{ title: "Wikipedia: Geschichte des Podcasts", url: "https://de.wikipedia.org/wiki/Podcasting" }],
    },
    en: {
      title: "Our Podcast Interview",
      partner: "Jane Doe",
      intro: [{ text: "What did you have for breakfast today?", notes: "Create a relaxed atmosphere", minutes: 2 }],
      main: [
        { text: "What was your biggest challenge in this project?", notes: "Relate to current events if possible", minutes: 10 },
        { text: "Which question have you always wanted to be asked?", minutes: 3, backup: true },
      ],
      outro: [],
      checklist: ["Check recorder / microphone", "Provide water", "Consent form signed"],
      sources: [{ title: "Wikipedia: History of podcasting", url: "https://en.wikipedia.org/wiki/Podcast" }],
    },
    fr: {
      title: "Notre interview podcast",
      partner: "Jean Dupont",
      intro: [{ text: "Qu'avez-vous mangé au petit-déjeuner aujourd'hui ?", notes: "Créer une atmosphère détendue", minutes: 2 }],
      main: [
        { text: "Quel a été votre plus grand défi dans ce projet ?", notes: "Faire le lien avec l'actualité si possible", minutes: 10 },
        { text: "Quelle question avez-vous toujours voulu qu'on vous pose ?", minutes: 3, backup: true },
      ],
      outro: [],
      checklist: ["Vérifier l'enregistreur / le micro", "Prévoir de l'eau", "Formulaire de consentement signé"],
      sources: [{ title: "Wikipédia : Histoire du podcasting", url: "https://fr.wikipedia.org/wiki/Podcasting" }],
    },
    es: {
      title: "Nuestra entrevista de podcast",
      partner: "Juan Pérez",
      intro: [{ text: "¿Qué has desayunado hoy?", notes: "Crear un ambiente relajado", minutes: 2 }],
      main: [
        { text: "¿Cuál fue tu mayor desafío en este proyecto?", notes: "Relacionar con la actualidad si es posible", minutes: 10 },
        { text: "¿Qué pregunta siempre has querido que te hagan?", minutes: 3, backup: true },
      ],
      outro: [],
      checklist: ["Comprobar grabadora / micrófono", "Preparar agua", "Formulario de consentimiento firmado"],
      sources: [{ title: "Wikipedia: Historia del podcasting", url: "https://es.wikipedia.org/wiki/Podcast" }],
    },
    nl: {
      title: "Ons podcastinterview",
      partner: "Jan Jansen",
      intro: [{ text: "Wat heb je vandaag als ontbijt gegeten?", notes: "Ontspannen sfeer creëren", minutes: 2 }],
      main: [
        { text: "Wat was je grootste uitdaging bij dit project?", notes: "Indien mogelijk koppelen aan de actualiteit", minutes: 10 },
        { text: "Welke vraag zou je altijd al eens gesteld willen krijgen?", minutes: 3, backup: true },
      ],
      outro: [],
      checklist: ["Opnameapparaat / microfoon controleren", "Water klaarzetten", "Toestemmingsformulier ondertekend"],
      sources: [{ title: "Wikipedia: Geschiedenis van de podcast", url: "https://nl.wikipedia.org/wiki/Podcast" }],
    },
  },
  interview: {
    de: {
      title: "Zeitzeugen-Interview",
      partner: "Interviewpartner:in",
      intro: [
        { text: "Vorstellung: Wer sind Sie und worum geht es heute?", notes: "Kurz das Thema und den Ablauf erklären", minutes: 3 },
        { text: "Wie war Ihr erster Bezug zu diesem Thema?", minutes: 3 },
      ],
      main: [
        { text: "Was ist Ihre wichtigste Erinnerung dazu?", notes: "Bei Bedarf nachhaken: Wann? Wo? Wer?", minutes: 8 },
        { text: "Was würden Sie jungen Menschen heute mitgeben?", minutes: 4, backup: true },
      ],
      outro: [{ text: "Gibt es etwas, das wir nicht angesprochen haben?", notes: "Raum für Ergänzungen lassen", minutes: 2 }],
      checklist: ["Thema und Fragen vorab recherchieren", "Aufnahme/Notizen vorbereiten", "Einverständnis zur Aufnahme einholen"],
      sources: [],
    },
    en: {
      title: "Eyewitness Interview",
      partner: "Interview partner",
      intro: [
        { text: "Introduction: Who are you and what is this about today?", notes: "Briefly explain the topic and the plan", minutes: 3 },
        { text: "How did you first come into contact with this topic?", minutes: 3 },
      ],
      main: [
        { text: "What is your most important memory of it?", notes: "Follow up if needed: When? Where? Who?", minutes: 8 },
        { text: "What would you pass on to young people today?", minutes: 4, backup: true },
      ],
      outro: [{ text: "Is there anything we haven't touched on?", notes: "Leave room for additions", minutes: 2 }],
      checklist: ["Research topic and questions in advance", "Prepare recording/notes", "Obtain consent to record"],
      sources: [],
    },
    fr: {
      title: "Interview de témoin",
      partner: "Personne interviewée",
      intro: [
        { text: "Présentation : qui êtes-vous et de quoi parlons-nous aujourd'hui ?", notes: "Expliquer brièvement le sujet et le déroulé", minutes: 3 },
        { text: "Comment avez-vous découvert ce sujet pour la première fois ?", minutes: 3 },
      ],
      main: [
        { text: "Quel est votre souvenir le plus important à ce sujet ?", notes: "Relancer si besoin : Quand ? Où ? Qui ?", minutes: 8 },
        { text: "Que transmettriez-vous aux jeunes d'aujourd'hui ?", minutes: 4, backup: true },
      ],
      outro: [{ text: "Y a-t-il un point que nous n'avons pas abordé ?", notes: "Laisser la place aux compléments", minutes: 2 }],
      checklist: ["Rechercher le sujet et les questions à l'avance", "Préparer l'enregistrement/les notes", "Obtenir l'accord pour enregistrer"],
      sources: [],
    },
    es: {
      title: "Entrevista a un testigo",
      partner: "Persona entrevistada",
      intro: [
        { text: "Presentación: ¿quién eres y de qué hablamos hoy?", notes: "Explicar brevemente el tema y el plan", minutes: 3 },
        { text: "¿Cómo entraste en contacto con este tema por primera vez?", minutes: 3 },
      ],
      main: [
        { text: "¿Cuál es tu recuerdo más importante al respecto?", notes: "Repreguntar si hace falta: ¿Cuándo? ¿Dónde? ¿Quién?", minutes: 8 },
        { text: "¿Qué le transmitirías a los jóvenes de hoy?", minutes: 4, backup: true },
      ],
      outro: [{ text: "¿Hay algo que no hayamos tratado?", notes: "Dejar espacio para añadidos", minutes: 2 }],
      checklist: ["Investigar el tema y las preguntas con antelación", "Preparar la grabación/notas", "Obtener el consentimiento para grabar"],
      sources: [],
    },
    nl: {
      title: "Interview met een tijdgetuige",
      partner: "Geïnterviewde",
      intro: [
        { text: "Voorstellen: wie ben je en waar gaat het vandaag over?", notes: "Leg kort het onderwerp en het verloop uit", minutes: 3 },
        { text: "Hoe kwam je voor het eerst met dit onderwerp in aanraking?", minutes: 3 },
      ],
      main: [
        { text: "Wat is je belangrijkste herinnering hieraan?", notes: "Doorvragen indien nodig: Wanneer? Waar? Wie?", minutes: 8 },
        { text: "Wat zou je jongeren van nu willen meegeven?", minutes: 4, backup: true },
      ],
      outro: [{ text: "Is er iets dat we niet hebben besproken?", notes: "Ruimte laten voor aanvullingen", minutes: 2 }],
      checklist: ["Onderwerp en vragen vooraf onderzoeken", "Opname/notities voorbereiden", "Toestemming voor opname vragen"],
      sources: [],
    },
  },
  debate: {
    de: {
      title: "Debatte im Unterricht",
      partner: "Pro- und Contra-Team",
      intro: [
        { text: "Eröffnung: Formulierung des Streitthemas / der Leitfrage", notes: "Regeln und Redezeiten klären", minutes: 3 },
        { text: "Kurze Positionierung: Pro und Contra je ein Satz", minutes: 2 },
      ],
      main: [
        { text: "Hauptargument Pro mit Beleg", notes: "Ein Argument, eine Begründung, ein Beispiel", minutes: 5 },
        { text: "Hauptargument Contra mit Beleg", notes: "Ein Argument, eine Begründung, ein Beispiel", minutes: 5 },
        { text: "Freie Erwiderung / Nachfrage", minutes: 4, backup: true },
      ],
      outro: [{ text: "Schlusswort und Fazit beider Seiten", notes: "Kein neues Argument mehr", minutes: 3 }],
      checklist: ["Positionen und Argumente recherchieren", "Rollen und Reihenfolge festlegen", "Zeitwächter:in bestimmen"],
      sources: [],
    },
    en: {
      title: "Classroom Debate",
      partner: "Pro and con team",
      intro: [
        { text: "Opening: state the motion / guiding question", notes: "Clarify rules and speaking times", minutes: 3 },
        { text: "Brief positioning: one sentence each for pro and con", minutes: 2 },
      ],
      main: [
        { text: "Main argument in favour, with evidence", notes: "One claim, one reason, one example", minutes: 5 },
        { text: "Main argument against, with evidence", notes: "One claim, one reason, one example", minutes: 5 },
        { text: "Open rebuttal / follow-up question", minutes: 4, backup: true },
      ],
      outro: [{ text: "Closing statement and summary from both sides", notes: "No new arguments", minutes: 3 }],
      checklist: ["Research positions and arguments", "Assign roles and order", "Appoint a timekeeper"],
      sources: [],
    },
    fr: {
      title: "Débat en classe",
      partner: "Équipe pour et contre",
      intro: [
        { text: "Ouverture : énoncer le sujet / la question directrice", notes: "Préciser les règles et les temps de parole", minutes: 3 },
        { text: "Positionnement court : une phrase pour et une contre", minutes: 2 },
      ],
      main: [
        { text: "Argument principal pour, avec preuve", notes: "Une affirmation, une raison, un exemple", minutes: 5 },
        { text: "Argument principal contre, avec preuve", notes: "Une affirmation, une raison, un exemple", minutes: 5 },
        { text: "Réplique libre / question de relance", minutes: 4, backup: true },
      ],
      outro: [{ text: "Mot de la fin et bilan des deux camps", notes: "Pas de nouvel argument", minutes: 3 }],
      checklist: ["Rechercher les positions et les arguments", "Répartir les rôles et l'ordre", "Désigner un gardien du temps"],
      sources: [],
    },
    es: {
      title: "Debate en clase",
      partner: "Equipo a favor y en contra",
      intro: [
        { text: "Apertura: enunciar el tema / la pregunta guía", notes: "Aclarar las reglas y los turnos de palabra", minutes: 3 },
        { text: "Posicionamiento breve: una frase a favor y una en contra", minutes: 2 },
      ],
      main: [
        { text: "Argumento principal a favor, con prueba", notes: "Una afirmación, una razón, un ejemplo", minutes: 5 },
        { text: "Argumento principal en contra, con prueba", notes: "Una afirmación, una razón, un ejemplo", minutes: 5 },
        { text: "Réplica libre / pregunta de seguimiento", minutes: 4, backup: true },
      ],
      outro: [{ text: "Palabras finales y conclusión de ambas partes", notes: "Sin argumentos nuevos", minutes: 3 }],
      checklist: ["Investigar las posturas y los argumentos", "Asignar roles y orden", "Nombrar a un controlador del tiempo"],
      sources: [],
    },
    nl: {
      title: "Debat in de klas",
      partner: "Voor- en tegenteam",
      intro: [
        { text: "Opening: de stelling / hoofdvraag benoemen", notes: "Regels en spreektijden verduidelijken", minutes: 3 },
        { text: "Korte positiebepaling: één zin voor en één tegen", minutes: 2 },
      ],
      main: [
        { text: "Hoofdargument voor, met bewijs", notes: "Eén stelling, één reden, één voorbeeld", minutes: 5 },
        { text: "Hoofdargument tegen, met bewijs", notes: "Eén stelling, één reden, één voorbeeld", minutes: 5 },
        { text: "Vrije weerlegging / vervolgvraag", minutes: 4, backup: true },
      ],
      outro: [{ text: "Slotwoord en conclusie van beide kanten", notes: "Geen nieuwe argumenten", minutes: 3 }],
      checklist: ["Standpunten en argumenten onderzoeken", "Rollen en volgorde bepalen", "Een tijdbewaker aanwijzen"],
      sources: [],
    },
  },
  lesson: {
    de: {
      title: "Unterrichtsgespräch",
      partner: "Klasse / Lerngruppe",
      intro: [
        { text: "Einstieg: Impuls, Bild oder Frage zum Thema", notes: "Vorwissen aktivieren", minutes: 5 },
        { text: "Lernziel des Gesprächs transparent machen", minutes: 2 },
      ],
      main: [
        { text: "Leitfrage zur Erarbeitung", notes: "Think-Pair-Share oder Murmelphase", minutes: 15 },
        { text: "Ergebnisse sammeln und ordnen", notes: "Tafel / Whiteboard nutzen", minutes: 8 },
        { text: "Vertiefende Rückfrage", minutes: 5, backup: true },
      ],
      outro: [{ text: "Sicherung: Zusammenfassung und Ausblick", notes: "Kernaussagen festhalten", minutes: 5 }],
      checklist: ["Lernziel und Leitfrage festlegen", "Material und Medien bereitlegen", "Sozialform und Zeitplan klären"],
      sources: [],
    },
    en: {
      title: "Class Discussion",
      partner: "Class / learning group",
      intro: [
        { text: "Starter: an impulse, image or question on the topic", notes: "Activate prior knowledge", minutes: 5 },
        { text: "Make the learning goal of the discussion transparent", minutes: 2 },
      ],
      main: [
        { text: "Guiding question for the working phase", notes: "Think-pair-share or buzz phase", minutes: 15 },
        { text: "Collect and organize the results", notes: "Use the board / whiteboard", minutes: 8 },
        { text: "Deepening follow-up question", minutes: 5, backup: true },
      ],
      outro: [{ text: "Consolidation: summary and outlook", notes: "Record the key points", minutes: 5 }],
      checklist: ["Define the learning goal and guiding question", "Prepare materials and media", "Clarify grouping and timing"],
      sources: [],
    },
    fr: {
      title: "Discussion en classe",
      partner: "Classe / groupe d'apprentissage",
      intro: [
        { text: "Amorce : un déclencheur, une image ou une question sur le sujet", notes: "Activer les connaissances préalables", minutes: 5 },
        { text: "Rendre transparent l'objectif d'apprentissage de la discussion", minutes: 2 },
      ],
      main: [
        { text: "Question directrice pour la phase de travail", notes: "Réfléchir-échanger-partager ou phase de murmure", minutes: 15 },
        { text: "Recueillir et organiser les résultats", notes: "Utiliser le tableau", minutes: 8 },
        { text: "Question d'approfondissement", minutes: 5, backup: true },
      ],
      outro: [{ text: "Consolidation : synthèse et perspectives", notes: "Noter les points clés", minutes: 5 }],
      checklist: ["Définir l'objectif et la question directrice", "Préparer le matériel et les médias", "Clarifier la forme de travail et le timing"],
      sources: [],
    },
    es: {
      title: "Conversación en clase",
      partner: "Clase / grupo de aprendizaje",
      intro: [
        { text: "Inicio: un estímulo, imagen o pregunta sobre el tema", notes: "Activar conocimientos previos", minutes: 5 },
        { text: "Hacer transparente el objetivo de aprendizaje de la conversación", minutes: 2 },
      ],
      main: [
        { text: "Pregunta guía para la fase de trabajo", notes: "Pensar-emparejar-compartir o fase de murmullo", minutes: 15 },
        { text: "Recoger y ordenar los resultados", notes: "Usar la pizarra", minutes: 8 },
        { text: "Pregunta de profundización", minutes: 5, backup: true },
      ],
      outro: [{ text: "Consolidación: resumen y perspectivas", notes: "Anotar las ideas clave", minutes: 5 }],
      checklist: ["Definir el objetivo y la pregunta guía", "Preparar el material y los medios", "Aclarar la forma de trabajo y los tiempos"],
      sources: [],
    },
    nl: {
      title: "Klassengesprek",
      partner: "Klas / leergroep",
      intro: [
        { text: "Instap: een impuls, beeld of vraag over het onderwerp", notes: "Voorkennis activeren", minutes: 5 },
        { text: "Het leerdoel van het gesprek transparant maken", minutes: 2 },
      ],
      main: [
        { text: "Hoofdvraag voor de werkfase", notes: "Think-pair-share of overlegfase", minutes: 15 },
        { text: "Resultaten verzamelen en ordenen", notes: "Gebruik het bord / whiteboard", minutes: 8 },
        { text: "Verdiepende vervolgvraag", minutes: 5, backup: true },
      ],
      outro: [{ text: "Afronding: samenvatting en vooruitblik", notes: "Kernpunten vastleggen", minutes: 5 }],
      checklist: ["Leerdoel en hoofdvraag vaststellen", "Materiaal en media klaarleggen", "Werkvorm en tijdsplan verduidelijken"],
      sources: [],
    },
  },
};

function toQuestions(elements: TemplateElement[], prefix: string): Question[] {
  return elements.map((element, index) => ({
    id: `${prefix}-${index + 1}-${crypto.randomUUID().slice(0, 8)}`,
    text: element.text,
    notes: element.notes ?? "",
    estimated_minutes: element.minutes,
    is_backup: element.backup ?? false,
  }));
}

export function createProjectFromTemplate(id: TemplateId, locale: Locale): InterviewState {
  const content = templates[id][locale] ?? templates[id].de;
  const now = new Date().toISOString();

  const phases: InterviewPhases = {
    intro: toQuestions(content.intro, "intro"),
    main: toQuestions(content.main, "main"),
    outro: toQuestions(content.outro, "outro"),
  };
  const total = [...phases.intro, ...phases.main, ...phases.outro].reduce(
    (sum, question) => sum + (question.estimated_minutes ?? 0),
    0,
  );

  return {
    schemaVersion: 1,
    id: crypto.randomUUID(),
    title: content.title,
    partner: content.partner,
    created_at: now,
    updated_at: now,
    total_estimated_time: total,
    phases,
    checklist: content.checklist.map((text, index) => ({ id: `c-${index + 1}`, text, checked: false })),
    sources: content.sources.map((source, index) => ({ id: `s-${index + 1}`, title: source.title, url: source.url })),
  };
}
