import { memo } from "react";
import type { InterviewState, Question } from "../../domain/types";
import styles from "./Preview.module.css";
import { useTranslation } from "../../i18n";

type Props = {
  state: InterviewState;
};

export const InterviewPreview = memo(function InterviewPreview({ state }: Props) {
  const { t } = useTranslation();
  const checklist = state.checklist || [];
  const sources = state.sources || [];
  const intro = state.phases?.intro || [];
  const main = state.phases?.main || [];
  const outro = state.phases?.outro || [];
  
  const total_estimated_time = [...intro, ...main, ...outro].reduce((sum, q) => sum + (q.estimated_minutes || 0), 0);

  const renderQuestionCard = (q: Question, index: number, phaseName: string) => (
    <div key={q.id} className={`${styles.questionCard} ${phaseName === "intro" ? styles.icebreakerCard : ""}`}>
      <div className={styles.questionHeader}>
        <span className={styles.questionNumber}>
          {phaseName === "intro" ? `${t("preview.introPrefix")} ${index + 1}` : phaseName === "main" ? `${t("preview.mainPrefix")} ${index + 1}` : `${t("preview.outroPrefix")} ${index + 1}`}
        </span>
        {q.is_backup && <span className={styles.badgeOptional}>{t("preview.badgeBackup")}</span>}
        {q.estimated_minutes ? <span className={styles.badgeTime}>{t("preview.badgeTime", { minutes: q.estimated_minutes })}</span> : null}
      </div>
      <p className={styles.questionText}>{q.text || "..."}</p>
      
      {q.notes && (
        <div className={styles.notesSection}>
          <strong>{t("preview.notesLabel")}</strong>
          <p>{q.notes}</p>
        </div>
      )}

      {/* Ein Bereich für Notizen während des Interviews (zum Ausdrucken) */}
      <div className={styles.printSpace}>
        <div className={styles.printLine}></div>
        {phaseName === "main" && (
          <>
            <div className={styles.printLine}></div>
            <div className={styles.printLine}></div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.previewContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>{state.title || t("preview.untitled")}</h1>
        <p className={styles.partner}>
          <strong>{t("preview.partnerLabel")}</strong> {state.partner || t("preview.noPartner")}
        </p>
        {total_estimated_time > 0 && (
          <p className={styles.partner}>
             <strong>{t("preview.totalTime")}</strong> {t("preview.approx")} {total_estimated_time} {t("preview.minutes")}
             {typeof state.target_minutes === "number" && state.target_minutes > 0 && (
               <> · {t("budget.target")} {state.target_minutes} {t("budget.minutesShort")}</>
             )}
          </p>
        )}
      </header>

      {checklist.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("preview.checklistTitle")}</h2>
          <ul className={styles.checklist}>
            {checklist.map((item) => (
              <li key={item.id} className={styles.checklistItem}>
                <div className={styles.checkbox}></div>
                <span>{item.text || "..."}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {intro.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("preview.introTitle")}</h2>
          <div className={styles.questionList}>
            {intro.map((q, index) => renderQuestionCard(q, index, "intro"))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("preview.mainTitle")}</h2>
        <div className={styles.questionList}>
          {main.length === 0 ? (
            <p className={styles.emptyText}>{t("preview.emptyMain")}</p>
          ) : (
            main.map((q, index) => renderQuestionCard(q, index, "main"))
          )}
        </div>
      </section>

      {outro.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("preview.outroTitle")}</h2>
          <div className={styles.questionList}>
            {outro.map((q, index) => renderQuestionCard(q, index, "outro"))}
          </div>
        </section>
      )}

      {sources.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("preview.sourcesTitle")}</h2>
          <ul className={styles.sourceList}>
            {sources.map((item) => (
              <li key={item.id} className={styles.sourceItem}>
                <span className={styles.sourceTitle}>{item.title || t("preview.untitledSource")}</span>
                {item.url && (
                  <a 
                    href={/^javascript:/i.test(item.url.trim()) ? "#" : item.url.trim()} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={styles.sourceUrl}
                  >
                    {item.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});
