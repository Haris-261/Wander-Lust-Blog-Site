import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assetUrl } from '../api/client';

export default function PostCard({ post, index = 0, compact = false }) {
  return (
    <motion.article
      className={`post-card ${compact ? 'post-card--compact' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Link to={`/blog/${post.slug}`} className="post-card__media">
        {post.coverImage ? (
          <img src={assetUrl(post.coverImage)} alt={post.title} loading="lazy" />
        ) : (
          <div className="post-card__placeholder" />
        )}
      </Link>
      <div className="post-card__body">
        {!compact && <span className="eyebrow">{post.category}</span>}
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {!compact && (
          <>
            <p>{post.excerpt}</p>
            <div className="post-card__meta">
              <span>{post.author?.name || 'Wanderlust'}</span>
              <span>·</span>
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}
