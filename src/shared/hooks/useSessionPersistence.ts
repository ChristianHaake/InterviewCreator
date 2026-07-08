import { useEffect, useRef, useState } from "react";
import { parseInterviewProject, STORAGE_KEY } from "../../domain/projectSchema";
import { createDefaultInterviewState } from "../../domain/types";
import type { InterviewState } from "../../domain/types";
import { get, set, del } from "idb-keyval";
import { useTranslation } from "../../i18n";

export function useSessionPersistence() {
  const [state, setState] = useState<InterviewState | null>(null);
  const { t } = useTranslation();

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
            setState(result.state);
          } else {
            setState(createDefaultInterviewState());
          }
        } else {
          setState(createDefaultInterviewState());
        }
      } catch (err) {
        console.error("Failed to load state", err);
        setState(createDefaultInterviewState());
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
    if (window.confirm(t("home.resetConfirm"))) {
      del(STORAGE_KEY).catch(console.error);
      localStorage.removeItem(STORAGE_KEY);
      setState(createDefaultInterviewState());
    }
  }

  return { state, setState, clearSession };
}
