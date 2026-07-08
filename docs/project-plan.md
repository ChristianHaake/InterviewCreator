InterviewDesigner

Kurzbeschreibung

Planungswerkzeug für Interviews im Rahmen von Podcasts, Reportagen oder Projektarbeiten.

Zielgruppe

* Schülerinnen und Schüler
* Lehrkräfte

Einsatzszenarien

* Podcasts
* Reportagen
* Zeitzeugeninterviews
* Expertenbefragungen
* Forschendes Lernen

User Story

Als Lernende möchte ich mein Interview strukturiert vorbereiten, damit ich zielgerichtete und vollständige Gespräche führen kann.

Akzeptanzkriterien

* Fragen können erstellt werden.
* Reihenfolge ist anpassbar.
* Notizen können ergänzt werden.
* Projekt wird lokal gespeichert.
* Export ist möglich.

MVP

* Projekttitel
* Interviewpartner
* Frageliste
* Drag & Drop
* Notizfelder
* JSON-Export

Erweiterungen

* Priorisierung
* Eisbrecherfragen
* Checklisten
* Quellenverwaltung
* Druckansicht

--- 

## Projektübersicht: InterviewCreator (PWA)

Ein Planungswerkzeug für Interviews. Die Anwendung verarbeitet Daten nach dem Local-First-Ansatz ausschließlich lokal im Browser.

### Zielgruppe und Einsatz

* **Nutzer:** Lernende, Lehrkräfte.
* **Szenarien:** Podcasts, Reportagen, Zeitzeugeninterviews, Expertenbefragungen, Forschendes Lernen.

### User Story (MVP)

Als Lernende möchte ich ein Interview mit Fragen und Notizen digital planen, die Reihenfolge anpassen sowie den Arbeitsstand lokal speichern und austauschen, damit ich ein strukturiertes Gespräch führen und meine Vorbereitung geräteübergreifend sichern kann.

---

## Architektur und Tech-Stack

* **Hosting:** Cloudflare Pages (Continuous Deployment).
* **Datenhaltung:** IndexedDB für Projektdaten, localStorage für Einstellungen.
* **Netzwerk:** Progressive Web App (PWA) mit Service Worker für Offline-Fähigkeit.
* **Design:** Minimalistisches UI, natives CSS (Grid/Flexbox), Verzicht auf große Frameworks.
* **Lokalisierung:** Statische JSON-Wörterbücher im Frontend.

---

## Funktionsumfang

### MVP (Minimum Viable Product)

* Erfassung von Projekttitel und Gesprächsgast.
* Erstellung, Bearbeitung und Löschung von Fragen und Notizen.
* Sortierung der Frageliste per Drag & Drop.
* Lokale Speicherung (Auto-Save).
* JSON-Export und JSON-Import.
* Infrastruktur für Mehrsprachigkeit (i18n).

### Erweiterungen (Ausbaustufe)

* Mehrsprachigkeit für die Benutzeroberfläche (DE, EN, FR, ES, NL).
* Druckansicht und lesbarer Export (Markdown oder TXT).
* Phasen-Strukturierung (Einleitung, Hauptteil, Schluss).
* Zeitschätzung pro Frage mit Berechnung der Gesamtdauer.
* Checklisten für die technische Vorbereitung.

---

## Datenstruktur

Das JSON-Datenmodell für den Export und die lokale Speicherung:

  ```json
  {
  "schemaVersion": 1,
  "id": "uuid",
  "title": "Titel des Projekts",
  "partner": "Name der Person",
  "created_at": "2026-06-30T10:00:00Z",
  "updated_at": "2026-06-30T10:30:00Z",
  "total_estimated_time": 15,
  "phases": {
    "intro": [
      {
        "id": "q-1",
        "text": "Fragetext",
        "notes": "Stichpunkte",
        "estimated_minutes": 2,
        "is_backup": false
      }
    ],
    "main": [],
    "outro": []
  },
  "checklist": [],
  "sources": []
}

```

---

## Sprint-Planung

| Phase | Zeitraum | Fokus |
| --- | --- | --- |
| **Sprint 1** UI-Gerüst, Listen-Logik, Drag & Drop, temporärer State, i18n-Setup. |
| **Sprint 2** IndexedDB-Anbindung, Auto-Save, JSON-Import und -Export. |
| **Sprint 3** PWA-Konfiguration (Offline-Modus), Druckansicht, Text-Export. |
| **Sprint 4** Sprachauswahl (5 Sprachen), Phasen-Logik, Zeitschätzung, Checklisten. |
