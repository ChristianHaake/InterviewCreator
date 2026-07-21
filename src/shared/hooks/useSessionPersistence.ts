import { useCallback, useEffect, useRef, useState } from "react";
import { parseInterviewProject, STORAGE_KEY } from "../../domain/projectSchema";
import { createDefaultInterviewState } from "../../domain/types";
import type { InterviewState } from "../../domain/types";
import { get, set, del } from "idb-keyval";
import { useTranslation } from "../../i18n";

function withFreshMetadata(state: InterviewState): InterviewState {
  const allQuestions = [...state.phases.intro, ...state.phases.main, ...state.phases.outro];
  return {
    ...state,
    updated_at: new Date().toISOString(),
    total_estimated_time: allQuestions.reduce((sum, q) => sum + (q.estimated_minutes ?? 0), 0),
  };
}

export function useSessionPersistence() {
  const [state, setStateRaw] = useState<InterviewState | null>(null);
  const { locale } = useTranslation();
  const localeRef = useRef(locale);
  localeRef.current = locale;

  // True while the current project is the untouched auto-generated default,
  // so switching UI language can re-seed it in the new language.
  const pristineRef = useRef(false);
  const prevLocaleRef = useRef(locale);

  useEffect(() => {
    async function load() {
      try {
        let stored = await get(STORAGE_KEY);
        if (!stored) {
          const legacy = localStorage.getItem(STORAGE_KEY);
          if (legacy) {
            stored = JSON.parse(legacy);
          }
        }

        if (stored) {
          const result = parseInterviewProject(stored);
          if (result.ok) {
            setStateRaw(result.state);
          } else {
            pristineRef.current = true;
            setStateRaw(createDefaultInterviewState(localeRef.current));
          }
        } else {
          pristineRef.current = true;
          setStateRaw(createDefaultInterviewState(localeRef.current));
        }
      } catch (err) {
        console.error("Failed to load state", err);
        pristineRef.current = true;
        setStateRaw(createDefaultInterviewState(localeRef.current));
      }
    }
    load();
  }, []);

  // Re-seed an untouched default project when the UI language changes, so a
  // German learner does not get an English sample after switching.
  useEffect(() => {
    if (prevLocaleRef.current === locale) return;
    prevLocaleRef.current = locale;
    if (pristineRef.current) {
      setStateRaw(createDefaultInterviewState(locale));
    }
  }, [locale]);

  // Any user edit or deliberate project load ends the pristine state.
  const setState = useCallback((next: InterviewState) => {
    pristineRef.current = false;
    setStateRaw(next);
  }, []);

  const applyProject = useCallback((next: InterviewState) => {
    pristineRef.current = false;
    setStateRaw(next);
  }, []);

  const hydratedRef = useRef(false);
  const dirtyRef = useRef<InterviewState | null>(null);

  useEffect(() => {
    if (!state) return;
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }
    dirtyRef.current = state;
    const timeout = setTimeout(() => {
      dirtyRef.current = null;
      set(STORAGE_KEY, withFreshMetadata(state)).catch(console.error);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [state]);

  // Flush pending edits when the tab is hidden or closed, so the
  // debounce window cannot swallow the last change.
  useEffect(() => {
    function flush() {
      if (dirtyRef.current) {
        set(STORAGE_KEY, withFreshMetadata(dirtyRef.current)).catch(console.error);
        dirtyRef.current = null;
      }
    }
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") flush();
    }
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const clearSession = useCallback(() => {
    del(STORAGE_KEY).catch(console.error);
    localStorage.removeItem(STORAGE_KEY);
    pristineRef.current = true;
    setStateRaw(createDefaultInterviewState(localeRef.current));
  }, []);

  return { state, setState, clearSession, applyProject };
}
