import { describe, expect, it } from "vitest";
import {
  MAX_CHECKLIST_ITEMS,
  MAX_QUESTIONS_PER_PHASE,
  parseInterviewProject,
  parseProjectJson,
  PROJECT_SCHEMA_VERSION,
} from "./projectSchema";

describe("project schema", () => {
  it("accepts and normalizes a current project file", () => {
    const result = parseInterviewProject({
      schemaVersion: PROJECT_SCHEMA_VERSION,
      id: "project-1",
      title: "Interview",
      partner: "Ada Lovelace",
      created_at: "2026-06-30T10:00:00.000Z",
      updated_at: "2026-06-30T10:05:00.000Z",
      phases: {
        intro: [{ id: "q-1", text: "Intro?", notes: "", estimated_minutes: 2 }],
        main: [{ id: "q-2", text: "Main?", notes: "Ask follow-up", estimated_minutes: 4 }],
        outro: [],
      },
      checklist: [{ id: "c-1", text: "Mic", checked: true }],
      sources: [{ id: "s-1", title: "Source", url: "https://example.com" }],
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.schemaVersion).toBe(PROJECT_SCHEMA_VERSION);
    expect(result.state.partner).toBe("Ada Lovelace");
    expect(result.state.total_estimated_time).toBe(6);
    expect(result.migrated).toBe(false);
  });

  it("migrates legacy questions, icebreakers, interviewee, and question text fields", () => {
    const result = parseInterviewProject({
      title: "Legacy",
      interviewee: "Grace Hopper",
      icebreakers: [{ id: "i-1", question: "Warmup?", notes: "" }],
      questions: [{ id: "q-1", question: "Core?", notes: "", is_backup: true }],
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.migrated).toBe(true);
    expect(result.state.partner).toBe("Grace Hopper");
    expect(result.state.phases.intro[0]?.text).toBe("Warmup?");
    expect(result.state.phases.main[0]?.text).toBe("Core?");
    expect(result.state.phases.main[0]?.is_backup).toBe(true);
  });

  it("rejects future schema versions", () => {
    const result = parseInterviewProject({
      schemaVersion: PROJECT_SCHEMA_VERSION + 1,
      title: "Future",
      phases: { intro: [], main: [], outro: [] },
    });

    expect(result).toEqual({ ok: false, reason: "future-version" });
  });

  it("rejects invalid JSON and unknown shapes", () => {
    expect(parseProjectJson("{")).toEqual({ ok: false, reason: "invalid-json" });
    expect(parseInterviewProject({ arbitrary: true })).toEqual({ ok: false, reason: "missing-project-content" });
  });

  it("limits imported arrays", () => {
    const result = parseInterviewProject({
      title: "Large",
      phases: {
        intro: Array.from({ length: MAX_QUESTIONS_PER_PHASE + 5 }, (_, index) => ({
          id: `q-${index}`,
          text: `Question ${index}`,
          notes: "",
        })),
        main: [],
        outro: [],
      },
      checklist: Array.from({ length: MAX_CHECKLIST_ITEMS + 5 }, (_, index) => ({
        id: `c-${index}`,
        text: `Item ${index}`,
        checked: false,
      })),
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.state.phases.intro).toHaveLength(MAX_QUESTIONS_PER_PHASE);
    expect(result.state.checklist).toHaveLength(MAX_CHECKLIST_ITEMS);
  });
});
