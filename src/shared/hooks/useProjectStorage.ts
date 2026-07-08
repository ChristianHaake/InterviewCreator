import { MAX_PROJECT_FILE_BYTES, parseProjectJson, PROJECT_SCHEMA_VERSION } from "../../domain/projectSchema";
import type { InterviewState } from "../../domain/types";
import { useTranslation } from "../../i18n";

function downloadTextFile(contents: string, filename: string, type: string) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.href = url;
  downloadAnchorNode.download = filename;
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  URL.revokeObjectURL(url);
}

function safeFilename(title: string) {
  return title.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "interview";
}

export function useProjectStorage(state: InterviewState | null, setState: (state: InterviewState) => void) {
  const { t } = useTranslation();

  function handleDownload() {
    if (!state) return;

    const totalTime = [
      ...(state.phases?.intro || []),
      ...(state.phases?.main || []),
      ...(state.phases?.outro || [])
    ].reduce((acc, q) => acc + (q.estimated_minutes || 0), 0);
    
    const exportData = {
      ...state,
      schemaVersion: PROJECT_SCHEMA_VERSION,
      total_estimated_time: totalTime,
      updated_at: new Date().toISOString()
    };

    downloadTextFile(
      JSON.stringify(exportData, null, 2),
      `${safeFilename(state.title)}.json`,
      "application/json;charset=utf-8",
    );
  }

  function handleExportMarkdown() {
    if (!state) return;

    let md = `# ${state.title || t("preview.untitled")}\n\n`;
    if (state.partner) md += `**${t("preview.partnerLabel")}** ${state.partner}\n\n`;

    const totalTime = [
      ...(state.phases?.intro || []),
      ...(state.phases?.main || []),
      ...(state.phases?.outro || [])
    ].reduce((acc, q) => acc + (q.estimated_minutes || 0), 0);
    
    if (totalTime > 0) md += `**${t("preview.totalTime")}** ${t("preview.approx")} ${totalTime} ${t("preview.minutes")}\n\n`;

    if (state.checklist && state.checklist.length > 0) {
      md += `## ${t("preview.checklistTitle")}\n`;
      state.checklist.forEach(c => {
        md += `- [ ] ${c.text}\n`;
      });
      md += `\n`;
    }

    const phases = [
      { title: t("preview.introTitle"), prefix: t("preview.introPrefix"), data: state.phases?.intro || [] },
      { title: t("preview.mainTitle"), prefix: t("preview.mainPrefix"), data: state.phases?.main || [] },
      { title: t("preview.outroTitle"), prefix: t("preview.outroPrefix"), data: state.phases?.outro || [] }
    ];

    phases.forEach(phase => {
      if (phase.data.length > 0) {
        md += `## ${phase.title}\n`;
        phase.data.forEach((q, i) => {
          md += `### ${phase.prefix} ${i + 1}: ${q.text}`;
          const badges = [];
          if (q.is_backup) badges.push(t("preview.badgeBackup"));
          if (q.estimated_minutes) badges.push(t("preview.badgeTime", { minutes: q.estimated_minutes }));
          if (badges.length > 0) md += ` (${badges.join(', ')})`;
          md += `\n`;
          if (q.notes) {
            md += `> ${q.notes.split('\n').join('\n> ')}\n`;
          }
          md += `\n`;
        });
      }
    });

    if (state.sources && state.sources.length > 0) {
      md += `## ${t("preview.sourcesTitle")}\n`;
      state.sources.forEach(s => {
        if (s.url) md += `- [${s.title || t("preview.untitledSource")}](${s.url})\n`;
        else md += `- ${s.title || t("preview.untitledSource")}\n`;
      });
    }

    downloadTextFile(md, `${safeFilename(state.title)}.md`, "text/markdown;charset=utf-8");
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_PROJECT_FILE_BYTES) {
      alert(t("storage.fileTooLarge"));
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = typeof e.target?.result === "string" ? e.target.result : "";
      const result = parseProjectJson(content);
      if (result.ok) {
        setState(result.state);
      } else if (result.reason === "invalid-json") {
        alert(t("storage.readError"));
      } else {
        alert(t("storage.invalidFormat"));
      }
    };
    reader.onerror = () => alert(t("storage.readError"));
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  }

  return { handleDownload, handleExportMarkdown, handleUpload };
}
