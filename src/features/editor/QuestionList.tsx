import { memo } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
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
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const newQuestions = Array.from(questions);
    const [moved] = newQuestions.splice(sourceIndex, 1);
    newQuestions.splice(destinationIndex, 0, moved);

    onChange(newQuestions);
  };

  const handleUpdate = (id: string, updates: Partial<Question>) => {
    onChange(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleDelete = (id: string) => {
    onChange(questions.filter((q) => q.id !== id));
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

      <DragDropContext onDragEnd={handleDragEnd}>
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
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});
