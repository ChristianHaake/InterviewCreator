import { memo } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { ChecklistItem } from "../../domain/types";
import styles from "./Editor.module.css";
import { useTranslation } from "../../i18n";

type Props = {
  checklist: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
};

export const ChecklistEditor = memo(function ChecklistEditor({ checklist, onChange }: Props) {
  const { t } = useTranslation();
  
  const handleAdd = () => {
    onChange([...checklist, { id: crypto.randomUUID(), text: "", checked: false }]);
  };

  const handleUpdate = (id: string, text: string) => {
    onChange(checklist.map((item) => (item.id === id ? { ...item, text } : item)));
  };

  const handleDelete = (id: string) => {
    onChange(checklist.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.metadataPanel}>
      <div className={styles.listHeader}>
        <h3 className={styles.panelTitle}>{t("editor.checklistTitle")}</h3>
        <button className={styles.addButton} onClick={handleAdd} type="button">
          <Plus size={16} />
          {t("editor.checklistAdd")}
        </button>
      </div>
      <div className={styles.checklistContainer}>
        {checklist.length === 0 && (
          <p className={styles.emptyText}>{t("editor.checklistEmpty")}</p>
        )}
        {checklist.map((item) => (
          <div key={item.id} className={styles.checklistItem}>
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleUpdate(item.id, e.target.value)}
              placeholder={t("editor.checklistPlaceholder")}
              className={styles.checklistInput}
            />
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(item.id)}
              type="button"
              title="Entfernen"
              aria-label="Punkt entfernen"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
