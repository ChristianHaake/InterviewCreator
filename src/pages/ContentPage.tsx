import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import styles from './ContentPage.module.css';
import { useTranslation } from '../i18n';

// Load all markdown files from the content directory as raw strings
const markdownFiles = import.meta.glob('../../content/*.md', { query: '?raw', import: 'default' });

export function ContentPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const { t } = useTranslation();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(false);
      try {
        const path = `../../content/${pageId}.md`;
        const loadMarkdown = markdownFiles[path] as () => Promise<string>;
        
        if (loadMarkdown) {
          const text = await loadMarkdown();
          setContent(text);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      loadContent();
    }
  }, [pageId]);

  return (
    <div className={styles.container}>
      <div className={styles.backLink}>
        <Link to="/">
          <ArrowLeft size={16} />
          {t("content.backToEditor")}
        </Link>
      </div>

      <article className={styles.article}>
        {loading && <p>{t("content.loading")}</p>}
        {error && (
          <div>
            <h1>{t("content.notFoundTitle")}</h1>
            <p>{t("content.notFoundBody")}</p>
          </div>
        )}
        {!loading && !error && (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </article>
    </div>
  );
}
