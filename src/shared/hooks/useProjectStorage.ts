import type { InterviewState } from "../../domain/types";
import { defaultInterviewState } from "../../domain/types";
import { useTranslation } from "../../i18n";

export function useProjectStorage(state: InterviewState, setState: (state: InterviewState) => void) {
  const { t } = useTranslation();

  function handleDownload() {
    const totalTime = [
      ...(state.phases?.intro || []),
      ...(state.phases?.main || []),
      ...(state.phases?.outro || [])
    ].reduce((acc, q) => acc + (q.estimated_minutes || 0), 0);
    
    const exportData = {
      ...state,
      total_estimated_time: totalTime,
      updated_at: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    const filename = state.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'interview';
    downloadAnchorNode.setAttribute("download", `${filename}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function handleExportMarkdown() {
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

    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(md);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    const filename = state.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'interview';
    downloadAnchorNode.setAttribute("download", `${filename}.md`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json && typeof json.title === 'string' && (Array.isArray(json.questions) || typeof json.phases === 'object')) {
          if (json.icebreakers || json.questions) {
            json.phases = {
              intro: json.icebreakers || [],
              main: json.questions || [],
              outro: []
            };
            delete json.icebreakers;
            delete json.questions;
          }
          setState({ ...defaultInterviewState, ...json });
        } else {
          alert(t("storage.invalidFormat"));
        }
      } catch (error) {
        alert(t("storage.readError"));
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  }

  return { handleDownload, handleExportMarkdown, handleUpload };
}
