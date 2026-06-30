import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import styles from './ContentPage.module.css';

// Load all markdown files from the content directory as raw strings
const markdownFiles = import.meta.glob('../../content/*.md', { query: '?raw', import: 'default' });

export function ContentPage() {
  const { pageId } = useParams<{ pageId: string }>();
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
      } catch (err) {
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
          Zurück zum Editor
        </Link>
      </div>

      <article className={styles.article}>
        {loading && <p>Lade Inhalt...</p>}
        {error && (
          <div>
            <h1>Seite nicht gefunden</h1>
            <p>Die angeforderte Seite konnte nicht geladen werden.</p>
          </div>
        )}
        {!loading && !error && (
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </article>
    </div>
  );
}
