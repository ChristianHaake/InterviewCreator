import { memo } from "react";
import type { ChangeEvent } from "react";
import styles from "./Editor.module.css";
import { useTranslation } from "../../i18n";

type Props = {
  title: string;
  partner: string;
  onTitleChange: (value: string) => void;
  onPartnerChange: (value: string) => void;
};

export const ProjectMetadata = memo(function ProjectMetadata({ title, partner, onTitleChange, onPartnerChange }: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.metadataPanel}>
      <h3 className={styles.panelTitle}>{t("editor.metaTitle")}</h3>
      <div className={styles.inputGroup}>
        <label htmlFor="interview-title">{t("editor.metaTitle")}</label>
        <input
          id="interview-title"
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value)}
          placeholder={t("editor.metaTitlePlaceholder")}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="interview-partner">{t("editor.metaPartner")}</label>
        <input
          id="interview-partner"
          type="text"
          value={partner}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onPartnerChange(e.target.value)}
          placeholder={t("editor.metaPartnerPlaceholder")}
        />
      </div>
    </div>
  );
});
