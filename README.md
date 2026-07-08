# InterviewDesigner

Planungswerkzeug fuer Interviews im Rahmen von Podcasts, Reportagen oder Projektarbeiten.

Live application: [https://interviewdesigner.haak3.de](https://interviewdesigner.haak3.de)

## Purpose

InterviewDesigner ist eine React-basierte Webanwendung, mit der Schuelerinnen und Schueler sowie Lehrkraefte Interviews strukturiert vorbereiten koennen.

Zielgruppen:

- Schuelerinnen und Schueler
- Lehrkraefte

Einsatzszenarien:

- Podcasts
- Reportagen
- Zeitzeugeninterviews
- Expertenbefragungen
- Forschendes Lernen

## Features

- Projekttitel und Interviewpartner erfassen
- Interviewfragen nach Einleitung, Hauptteil und Schluss strukturieren
- Fragen mit Notizen, Dauer und Backup-Markierung pflegen
- Vorbereitung per Checkliste planen
- Quellen und Referenzen sammeln
- Lokale Autospeicherung im Browser
- JSON-Projektdateien importieren und exportieren
- Markdown exportieren
- Druck- und PDF-Ausgabe ueber die Browser-Druckfunktion

## Development

Requirements:

- Node.js `>=20`
- npm `>=10`

Setup:

```bash
npm install
npm run dev
```

Scripts:

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run typecheck` - run TypeScript type checking
- `npm run lint` - run oxlint
- `npm test` - run automated tests
- `npm run verify` - run typecheck, lint, and build

## haak3 Standard

Standard version: `1.0.0-draft`

This app follows the [haak3 Web App Standard](https://github.com/ChristianHaake/haak3-webapp-standard). See [docs/standard-conformance.md](docs/standard-conformance.md) for local conformance notes.

## License

GNU General Public License v3.0 only. See [LICENSE](LICENSE) for details.
