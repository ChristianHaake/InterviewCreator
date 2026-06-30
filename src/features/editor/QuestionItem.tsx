import { Draggable } from "@hello-pangea/dnd";
import { GripVertical, Trash2 } from "lucide-react";
import { memo } from "react";
import type { ChangeEvent } from "react";
import type { Question } from "../../domain/types";
import styles from "./Editor.module.css";
import { useTranslation } from "../../i18n";

type Props = {
  question: Question;
  index: number;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
};

export const QuestionItem = memo(function QuestionItem({ question, index, onUpdate, onDelete }: Props) {
  const { t } = useTranslation();
  return (
    <Draggable draggableId={question.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${styles.questionItem} ${snapshot.isDragging ? styles.dragging : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={styles.dragHandle} {...provided.dragHandleProps} aria-label="Frage verschieben">
            <GripVertical size={20} />
          </div>

          <div className={styles.questionContent}>
            <div className={styles.inputGroup}>
              <label htmlFor={`question-text-${question.id}`}>{t("editor.questionPrefix", { number: index + 1 })}</label>
              <textarea
                id={`question-text-${question.id}`}
                value={question.text}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onUpdate({ text: e.target.value })}
                placeholder={t("editor.questionPlaceholder")}
                rows={2}
                className={styles.textarea}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor={`question-notes-${question.id}`}>{t("editor.notesLabel")}</label>
              <textarea
                id={`question-notes-${question.id}`}
                value={question.notes}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onUpdate({ notes: e.target.value })}
                placeholder={t("editor.notesPlaceholder")}
                rows={1}
                className={styles.textarea}
              />
            </div>
            
            <div className={styles.priorityGroup}>
              <div className={styles.inputGroup} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <label htmlFor={`question-time-${question.id}`}>{t("editor.timeLabel")}</label>
                <input
                  type="number"
                  id={`question-time-${question.id}`}
                  value={question.estimated_minutes || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdate({ estimated_minutes: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                  placeholder="2"
                  min="1"
                  className={styles.input}
                  style={{ width: '60px' }}
                />
              </div>
              <div className={styles.inputGroup} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id={`question-backup-${question.id}`}
                  checked={question.is_backup || false}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdate({ is_backup: e.target.checked })}
                />
                <label htmlFor={`question-backup-${question.id}`}>{t("editor.backupLabel")}</label>
              </div>
            </div>
          </div>

          <button
            className={styles.deleteButton}
            onClick={onDelete}
            type="button"
            title="Frage löschen"
            aria-label="Frage löschen"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </Draggable>
  );
});
