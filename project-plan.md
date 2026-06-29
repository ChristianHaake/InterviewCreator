Die Integration von Mehrsprachigkeit (i18n – Internationalization) fügt sich gut in die browserbasierte Architektur ein. Da keine Backend-Ressourcen vorhanden sind, wird die Lokalisierung vollständig im Frontend über statische Wörterbücher gelöst.

Hier ist die Anpassung des Coding-Plans, um DE, EN, FR, ES (Spanisch) und NL zu unterstützen.

## Architektur-Update für Mehrsprachigkeit

* **Wörterbücher (Dictionaries):** Statische JSON-Dateien oder ein globales JavaScript-Objekt für jede Sprache (`de.json`, `en.json`, `fr.json`, `es.json`, `nl.json`).
* **Präferenz-Speicherung:** Die ausgewählte Sprache wird im `localStorage` gesichert (im Gegensatz zu den Projektdaten, die in der IndexedDB liegen).
* **Initiale Erkennung:** Beim ersten Aufruf der Webapp liest das Skript `navigator.language` aus dem Browser des Nutzers. Stimmt diese mit einer der fünf Sprachen überein, wird sie gewählt. Andernfalls greift ein Fallback (z. B. auf Deutsch oder Englisch).

---

## Integration in den Coding-Plan

Die Umsetzung der Mehrsprachigkeit wird am besten in zwei Phasen geteilt, um das MVP nicht zu verzögern.

### Ergänzung in Sprint 1 (Infrastruktur vorbereiten)

Anstatt feste Strings in den HTML-Code zu schreiben, werden von Beginn an Platzhalter oder Variablen genutzt.

* **i18n-Setup:** Ein einfaches Übersetzungs-Skript anlegen (z. B. eine Funktion `t(key)`), das Textbausteine aus einem Objekt lädt.
* **Standard-Sprache:** Zunächst nur Deutsch als Basis-Wörterbuch anlegen. Alle UI-Elemente (Buttons, Platzhalter, Labels) laden ihre Texte über die `t()`-Funktion.

### Neuer Sprint: Lokalisierung (Nach Sprint 3)

Fokus: Ausrollen der zusätzlichen Sprachen und des UI-Controls.

1. **Wörterbücher anlegen:** Die Dateien für EN, FR, ES und NL erstellen und die bestehenden deutschen Keys übersetzen.
2. **Sprachwechsler (UI):** Ein Dropdown-Menü oder Icon im Header der App implementieren, um zwischen den fünf Sprachen zu wechseln.
3. **Reaktives Rendering:** Sicherstellen, dass sich die UI-Texte beim Wechseln der Sprache im Dropdown sofort aktualisieren, ohne dass die Seite neu geladen werden muss (oder ein sauberer Reload mit Speicherung der Formulardaten ausgelöst wird).
4. **Metadaten:** Den Titel und die Beschreibung im `manifest.json` für die PWA-Installation (falls vom Betriebssystem unterstützt) mehrsprachig konfigurieren.

---

## Datenstruktur für das Wörterbuch

Eine flache Struktur für die Sprachdateien hält den Code simpel und performant.

**Beispiel `de.json`:**

```json
{
  "app_title": "InterviewCreator",
  "project_name_label": "Projekttitel",
  "interviewee_label": "Interviewpartner",
  "add_question_btn": "Neue Frage hinzufügen",
  "export_json_btn": "Als JSON speichern",
  "placeholder_question": "Welche Frage möchten Sie stellen?",
  "placeholder_notes": "Notizen für das Interview..."
}

```

**Beispiel `en.json`:**

```json
{
  "app_title": "InterviewCreator",
  "project_name_label": "Project Title",
  "interviewee_label": "Interviewee",
  "add_question_btn": "Add new question",
  "export_json_btn": "Save as JSON",
  "placeholder_question": "What question would you like to ask?",
  "placeholder_notes": "Notes for the interview..."
}

```
