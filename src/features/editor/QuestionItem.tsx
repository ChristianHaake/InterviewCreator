import { Draggable } from "@hello-pangea/dnd";
import { ArrowDown, ArrowUp, GripVertical, Trash2 } from "lucide-react";
import { memo } from "react";
import type { ChangeEvent } from "react";
import type { Question } from "../../domain/types";
import { MAX_ESTIMATED_MINUTES } from "../../domain/projectSchema";
import styles from "./Editor.module.css";
import { useTranslation } from "../../i18n";

type Props = {
  question: Question;
  index: number;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

export const QuestionItem = memo(function QuestionItem({
  question,
  index,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: Props) {
  const { t } = useTranslation();
  return (
    <Draggable draggableId={question.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${styles.questionItem} ${snapshot.isDragging ? styles.dragging : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={styles.dragHandle} {...provided.dragHandleProps} aria-label={t("editor.moveQuestion")}>
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
              <div className={`${styles.inputGroup} ${styles.inlineInputGroup}`}>
                <label htmlFor={`question-time-${question.id}`}>{t("editor.timeLabel")}</label>
                <input
                  type="number"
                  id={`question-time-${question.id}`}
                  value={question.estimated_minutes ?? ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const parsed = parseInt(e.target.value, 10);
                    onUpdate({
                      estimated_minutes: Number.isNaN(parsed)
                        ? undefined
                        : Math.max(1, Math.min(MAX_ESTIMATED_MINUTES, parsed)),
                    });
                  }}
                  placeholder="2"
                  min="1"
                  max={MAX_ESTIMATED_MINUTES}
                  className={styles.input}
                />
              </div>
              <div className={`${styles.inputGroup} ${styles.inlineInputGroup}`}>
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

          <div className={styles.questionActions}>
            <button
              className={styles.iconButton}
              onClick={onMoveUp}
              type="button"
              title={t("editor.moveQuestionUp")}
              aria-label={t("editor.moveQuestionUp")}
              disabled={!canMoveUp}
            >
              <ArrowUp size={18} />
            </button>
            <button
              className={styles.iconButton}
              onClick={onMoveDown}
              type="button"
              title={t("editor.moveQuestionDown")}
              aria-label={t("editor.moveQuestionDown")}
              disabled={!canMoveDown}
            >
              <ArrowDown size={18} />
            </button>
            <button
              className={styles.deleteButton}
              onClick={onDelete}
              type="button"
              title={t("editor.deleteQuestion")}
              aria-label={t("editor.deleteQuestion")}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
});
