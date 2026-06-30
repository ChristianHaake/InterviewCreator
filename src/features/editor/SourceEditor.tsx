import { memo } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { SourceItem } from "../../domain/types";
import styles from "./Editor.module.css";
import { useTranslation } from "../../i18n";

type Props = {
  sources: SourceItem[];
  onChange: (items: SourceItem[]) => void;
};

export const SourceEditor = memo(function SourceEditor({ sources, onChange }: Props) {
  const { t } = useTranslation();
  
  const handleAdd = () => {
    onChange([...sources, { id: crypto.randomUUID(), title: "", url: "" }]);
  };

  const handleUpdate = (id: string, updates: Partial<SourceItem>) => {
    onChange(sources.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleDelete = (id: string) => {
    onChange(sources.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.metadataPanel}>
      <div className={styles.listHeader}>
        <h3 className={styles.panelTitle}>{t("editor.sourceTitle")}</h3>
        <button className={styles.addButton} onClick={handleAdd} type="button">
          <Plus size={16} />
          {t("editor.sourceAdd")}
        </button>
      </div>
      <div className={styles.sourceContainer}>
        {sources.length === 0 && (
          <p className={styles.emptyText}>{t("editor.sourceEmpty")}</p>
        )}
        {sources.map((item) => (
          <div key={item.id} className={styles.sourceItem}>
            <div className={styles.sourceInputs}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleUpdate(item.id, { title: e.target.value })}
                placeholder={t("editor.sourceTitlePlaceholder")}
                className={styles.sourceInput}
              />
              <input
                type="url"
                value={item.url}
                onChange={(e) => handleUpdate(item.id, { url: e.target.value })}
                placeholder={t("editor.sourceUrlPlaceholder")}
                className={styles.sourceInput}
              />
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(item.id)}
              type="button"
              title="Entfernen"
              aria-label="Quelle entfernen"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
