import { useEffect, useRef, useState } from "react";
import { defaultInterviewState } from "../../domain/types";
import type { InterviewState } from "../../domain/types";
import { get, set, del } from "idb-keyval";

const STORAGE_KEY = "interview-creator-session";

export function useSessionPersistence() {
  const [state, setState] = useState<InterviewState | null>(null);

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
          if (stored.icebreakers || stored.questions) {
            stored.phases = {
              intro: stored.icebreakers || [],
              main: stored.questions || [],
              outro: []
            };
            delete stored.icebreakers;
            delete stored.questions;
          }
          setState({ ...defaultInterviewState, ...stored });
        } else {
          setState(defaultInterviewState);
        }
      } catch (err) {
        console.error("Failed to load state", err);
        setState(defaultInterviewState);
      }
    }
    load();
  }, []);

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!state) return;
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }
    const timeout = setTimeout(() => {
      set(STORAGE_KEY, state).catch(console.error);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [state]);

  function clearSession() {
    if (window.confirm("Bist du sicher, dass du das aktuelle Projekt löschen möchtest? Alle nicht exportierten Daten gehen verloren.")) {
      del(STORAGE_KEY).catch(console.error);
      localStorage.removeItem(STORAGE_KEY);
      setState(defaultInterviewState);
    }
  }

  return { state, setState, clearSession };
}
