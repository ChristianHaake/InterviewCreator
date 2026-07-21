import { useState, useRef } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { FileDown, FileUp, Printer, RotateCcw } from "lucide-react";
import { useSessionPersistence } from "../shared/hooks/useSessionPersistence";
import { useProjectStorage } from "../shared/hooks/useProjectStorage";
import { ProjectMetadata } from "../features/editor/ProjectMetadata";
import { ChecklistEditor } from "../features/editor/ChecklistEditor";
import { SourceEditor } from "../features/editor/SourceEditor";
import { QuestionList } from "../features/editor/QuestionList";
import { InterviewPreview } from "../features/preview/InterviewPreview";
import { moveQuestion } from "../domain/projectSchema";
import type { InterviewPhases } from "../domain/types";
import styles from "./Home.module.css";
import { useTranslation } from "../i18n";

const droppablePhase: Record<string, keyof InterviewPhases> = {
  "intro-list": "intro",
  "main-list": "main",
  "outro-list": "outro",
};

export function Home() {
  const { state, setState, clearSession } = useSessionPersistence();
  const { t } = useTranslation();

  const { handleDownload, handleExportMarkdown, handleUpload } = useProjectStorage(state, setState);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const configInputRef = useRef<HTMLInputElement>(null);

  if (!state) {
    return <div className={styles.loadingState}>{t("home.loadingProject")}</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourcePhase = droppablePhase[result.source.droppableId];
    const destinationPhase = droppablePhase[result.destination.droppableId];
    if (!sourcePhase || !destinationPhase) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourcePhase === destinationPhase && sourceIndex === destinationIndex) return;

    setState({
      ...state,
      phases: moveQuestion(
        state.phases,
        { phase: sourcePhase, index: sourceIndex },
        { phase: destinationPhase, index: destinationIndex },
      ),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mobileViewToggle} aria-label={t("home.switchView")}>
        <button
          className={mobileView === "editor" ? styles.activeTab : ""}
          onClick={() => setMobileView("editor")}
          type="button"
          aria-pressed={mobileView === "editor"}
        >
          {t("tab.editor")}
        </button>
        <button
          className={mobileView === "preview" ? styles.activeTab : ""}
          onClick={() => setMobileView("preview")}
          type="button"
          aria-pressed={mobileView === "preview"}
        >
          {t("tab.preview")}
        </button>
      </div>

      <div className={styles.workspace}>
        {/* Editor Panel */}
        <section
          className={`${styles.editorPanel} ${
            mobileView === "editor" ? styles.mobilePanelActive : ""
          }`}
          aria-label={t("tab.editor")}
        >
          <div className={styles.panelHeading}>
            <div>
              <span className={styles.panelKicker}>{t("tab.editor")}</span>
              <h2>{t("home.editorTitle")}</h2>
            </div>
            <button
              className={styles.iconButton}
              onClick={clearSession}
              title={t("home.resetProject")}
              type="button"
            >
              <RotateCcw aria-hidden="true" size={18} />
              <span className="visually-hidden">{t("home.resetProject")}</span>
            </button>
          </div>

          <div className={styles.editorContent}>
            <ProjectMetadata
              title={state.title}
              partner={state.partner}
              onTitleChange={(value) => setState({ ...state, title: value })}
              onPartnerChange={(value) => setState({ ...state, partner: value })}
            />

            <ChecklistEditor
              checklist={state.checklist || []}
              onChange={(cl) => setState({ ...state, checklist: cl })}
            />

            <DragDropContext onDragEnd={handleDragEnd}>
              <QuestionList
                title={t("editor.introTitle")}
                droppableId="intro-list"
                emptyMessage={t("editor.introEmpty")}
                questions={state.phases.intro}
                onChange={(qs) => setState({ ...state, phases: { ...state.phases, intro: qs } })}
              />

              <QuestionList
                title={t("editor.mainTitle")}
                droppableId="main-list"
                emptyMessage={t("editor.mainEmpty")}
                questions={state.phases.main}
                onChange={(qs) => setState({ ...state, phases: { ...state.phases, main: qs } })}
              />

              <QuestionList
                title={t("editor.outroTitle")}
                droppableId="outro-list"
                emptyMessage={t("editor.outroEmpty")}
                questions={state.phases.outro}
                onChange={(qs) => setState({ ...state, phases: { ...state.phases, outro: qs } })}
              />
            </DragDropContext>

            <SourceEditor
              sources={state.sources || []}
              onChange={(s) => setState({ ...state, sources: s })}
            />
          </div>
        </section>

        {/* Preview Panel */}
        <section
          className={`${styles.previewPanel} ${
            mobileView === "preview" ? styles.mobilePanelActive : ""
          }`}
          aria-label={t("tab.preview")}
        >
          <div className={styles.panelHeading}>
            <div>
              <span className={styles.panelKicker}>{t("home.livePreview")}</span>
              <p>{t("home.localView")}</p>
            </div>
            <span className={styles.liveIndicator}>
              <span /> Live
            </span>
          </div>

          <div className={styles.previewStage}>
            <InterviewPreview state={state} />
          </div>
        </section>
      </div>

      <div className={styles.actionBar}>
        <div className={styles.actionGroup}>
          <span>{t("home.project")}</span>
          <button
            className={styles.actionButtonSecondary}
            onClick={() => configInputRef.current?.click()}
            type="button"
          >
            <FileUp aria-hidden="true" size={17} />
            {t("home.load")}
          </button>
          <input
            accept=".json,application/json"
            className="visually-hidden"
            onChange={handleUpload}
            ref={configInputRef}
            type="file"
          />
          <button
            className={styles.actionButtonSecondary}
            onClick={handleDownload}
            type="button"
          >
            <FileDown aria-hidden="true" size={17} />
            {t("home.save")}
          </button>
        </div>
        <div className={styles.actionGroup}>
          <span>{t("home.export")}</span>
          <button
            className={styles.actionButtonSecondary}
            onClick={handleExportMarkdown}
            type="button"
          >
            <FileDown aria-hidden="true" size={17} />
            {t("home.exportMd")}
          </button>
          <button
            className={styles.actionButtonPrimary}
            onClick={handlePrint}
            type="button"
          >
            <Printer aria-hidden="true" size={17} />
            {t("home.print")}
          </button>
        </div>
      </div>
    </div>
  );
}
