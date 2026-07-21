import { Modal } from "./Modal";
import styles from "./ConfirmDialog.module.css";
import { useTranslation } from "../../i18n";

type Props = {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** Style the confirm action as destructive (red). */
  danger?: boolean;
};

export function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel, danger }: Props) {
  const { t } = useTranslation();
  return (
    <Modal title={title} onClose={onCancel}>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          {t("common.cancel")}
        </button>
        <button
          type="button"
          className={danger ? styles.dangerButton : styles.confirmButton}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
