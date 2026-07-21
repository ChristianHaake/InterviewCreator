import { memo, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import type { Question } from "../../domain/types";
import { QuestionItem } from "./QuestionItem";
import { Lightbulb, Plus } from "lucide-react";
import styles from "./Editor.module.css";
import { useTranslation } from "../../i18n";
import { getImpulses, type PhaseKey } from "../../domain/impulses";

type Props = {
  title: string;
  droppableId: string;
  emptyMessage: string;
  phaseKey: PhaseKey;
  questions: Question[];
  onChange: (questions: Question[]) => void;
};

export const QuestionList = memo(function QuestionList({ title, droppableId, emptyMessage, phaseKey, questions, onChange }: Props) {
  const { t, locale } = useTranslation();
  const [showImpulses, setShowImpulses] = useState(false);

  const handleUpdate = (id: string, updates: Partial<Question>) => {
    onChange(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleDelete = (id: string) => {
    onChange(questions.filter((q) => q.id !== id));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= questions.length) return;

    const newQuestions = Array.from(questions);
    const [moved] = newQuestions.splice(index, 1);
    newQuestions.splice(nextIndex, 0, moved);
    onChange(newQuestions);
  };

  const handleAdd = (text = "") => {
    const newId = crypto.randomUUID();
    onChange([...questions, { id: newId, text, notes: "", estimated_minutes: 2, is_backup: false } as Question]);
  };

  const impulses = getImpulses(locale, phaseKey);

  return (
    <div className={styles.questionListPanel}>
      <div className={styles.listHeader}>
        <h3 className={styles.panelTitle}>{title}</h3>
        <div className={styles.listHeaderActions}>
          <button
            className={styles.impulseToggle}
            onClick={() => setShowImpulses((value) => !value)}
            type="button"
            aria-expanded={showImpulses}
          >
            <Lightbulb size={15} aria-hidden="true" />
            {t("editor.impulses")}
          </button>
          <button className={styles.addButton} onClick={() => handleAdd()} type="button">
            <Plus size={16} />
            {t("editor.addQuestion")}
          </button>
        </div>
      </div>

      {showImpulses && (
        <div className={styles.impulsePanel}>
          <p className={styles.impulseHint}>{t("editor.impulsesHint")}</p>
          <div className={styles.impulseChips}>
            {impulses.map((text) => (
              <button
                key={text}
                type="button"
                className={styles.impulseChip}
                onClick={() => handleAdd(text)}
                aria-label={t("editor.impulsesInsert", { text })}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className={styles.listContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {questions.length === 0 && (
              <p className={styles.emptyText}>{emptyMessage}</p>
            )}
            {questions.map((q, index) => (
              <QuestionItem
                key={q.id}
                question={q}
                index={index}
                onUpdate={(updates) => handleUpdate(q.id, updates)}
                onDelete={() => handleDelete(q.id)}
                onMoveUp={() => handleMove(index, -1)}
                onMoveDown={() => handleMove(index, 1)}
                canMoveUp={index > 0}
                canMoveDown={index < questions.length - 1}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});
