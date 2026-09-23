import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api, { assetUrl } from '../api/client';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/posts/${slug}`)
      .then((res) => setPost(res.data.post))
      .catch((err) => setError(err.response?.data?.message || 'Post not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="section page-top">
        <div className="container">
          <p className="muted">Loading story…</p>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="section page-top">
        <div className="container empty-state">
          <p>{error || 'Post not found'}</p>
          <Link to="/blog" className="btn btn--outline">
            Back to stories
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="article">
      <div className="article__hero">
        {post.coverImage ? (
          <img src={assetUrl(post.coverImage)} alt={post.title} />
        ) : (
          <div className="article__hero-fallback" />
        )}
        <div className="article__hero-overlay" />
        <div className="container article__hero-text">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="eyebrow">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="article__meta">
              By {post.author?.name || 'Wanderlust'} ·{' '}
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container article__body">
        <p className="article__excerpt">{post.excerpt}</p>
        <div className="article__content">
          {post.content.split('\n').map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />
          )}
        </div>
        {post.tags?.length > 0 && (
          <div className="chips" style={{ marginTop: '2rem' }}>
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="article__back">
          <Link to="/blog" className="text-link">
            ← All stories
          </Link>
        </div>
      </div>
    </article>
  );
}
