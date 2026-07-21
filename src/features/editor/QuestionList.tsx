import { memo } from "react";
import { Droppable } from "@hello-pangea/dnd";
import type { Question } from "../../domain/types";
import { QuestionItem } from "./QuestionItem";
import { Plus } from "lucide-react";
import styles from "./Editor.module.css";
import { useTranslation } from "../../i18n";

type Props = {
  title: string;
  droppableId: string;
  emptyMessage: string;
  questions: Question[];
  onChange: (questions: Question[]) => void;
};

export const QuestionList = memo(function QuestionList({ title, droppableId, emptyMessage, questions, onChange }: Props) {
  const { t } = useTranslation();

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

  const handleAdd = () => {
    const newId = crypto.randomUUID();
    onChange([...questions, { id: newId, text: "", notes: "", estimated_minutes: 2, is_backup: false } as Question]);
  };

  return (
    <div className={styles.questionListPanel}>
      <div className={styles.listHeader}>
        <h3 className={styles.panelTitle}>{title}</h3>
        <button className={styles.addButton} onClick={handleAdd} type="button">
          <Plus size={16} />
          {t("editor.addQuestion")}
        </button>
      </div>

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
