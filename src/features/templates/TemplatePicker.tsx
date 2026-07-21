import { Mic, MessagesSquare, Scale, GraduationCap } from "lucide-react";
import type { ComponentType } from "react";
import { Modal } from "../../components/ui/Modal";
import { TEMPLATE_IDS, type TemplateId } from "../../domain/templates";
import type { TranslationKey } from "../../i18n/de";
import { useTranslation } from "../../i18n";
import styles from "./TemplatePicker.module.css";

type Props = {
  onSelect: (id: TemplateId) => void;
  onClose: () => void;
};

const icons: Record<TemplateId, ComponentType<{ size?: number; "aria-hidden"?: boolean }>> = {
  podcast: Mic,
  interview: MessagesSquare,
  debate: Scale,
  lesson: GraduationCap,
};

export function TemplatePicker({ onSelect, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <Modal title={t("templates.pickerTitle")} onClose={onClose} wide>
      <p className={styles.intro}>{t("templates.pickerIntro")}</p>
      <div className={styles.grid}>
        {TEMPLATE_IDS.map((id) => {
          const Icon = icons[id];
          return (
            <button
              key={id}
              type="button"
              className={styles.card}
              onClick={() => onSelect(id)}
            >
              <span className={styles.iconWrap}>
                <Icon size={22} aria-hidden={true} />
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardTitle}>{t(`templates.${id}.name` as TranslationKey)}</span>
                <span className={styles.cardDesc}>{t(`templates.${id}.desc` as TranslationKey)}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
