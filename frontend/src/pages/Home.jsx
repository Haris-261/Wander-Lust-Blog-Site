import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api, { assetUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

function BlogSection({ title, subtitle, posts, loading }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        {loading && <p className="muted">Loading…</p>}

        {!loading && posts.length === 0 && (
          <div className="empty-state">
            <p>No blogs</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="post-grid">
            {posts.map((post, i) => (
              <PostCard key={post._id} post={post} index={i} compact />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [trending, setTrending] = useState([]);
  const [forYou, setForYou] = useState([]);
  const [mostLoved, setMostLoved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, f, m] = await Promise.all([
          api.get('/posts', { params: { category: 'Trending', limit: 6 } }),
          api.get('/posts', { params: { category: 'For You', limit: 6 } }),
          api.get('/posts', { params: { category: 'Most Loved', limit: 6 } }),
        ]);
        setTrending(t.data.posts);
        setForYou(f.data.posts);
        setMostLoved(m.data.posts);
      } catch {
        setTrending([]);
        setForYou([]);
        setMostLoved([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const spotlight = trending[0] || mostLoved[0] || forYou[0] || null;

  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__content">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Travel magazine
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Wanderlust
          </motion.h1>
          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            Field notes, destination guides, and slow travel essays from writers who stay a while.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <Link to="/blog" className="btn btn--primary">
              Read stories
            </Link>
            {!user && (
              <Link to="/register" className="btn btn--outline">
                Create account
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      <BlogSection
        title="Trending blogs"
        subtitle="Stories readers are opening right now — sorted by the Trending category."
        posts={trending}
        loading={loading}
      />

      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <h2>For you</h2>
            <p>Picks that feel personal — curated under the For You category.</p>
          </div>
          {loading && <p className="muted">Loading…</p>}
          {!loading && forYou.length === 0 && (
            <div className="empty-state">
              <p>No blogs</p>
            </div>
          )}
          {forYou.length > 0 && (
            <div className="post-grid">
              {forYou.map((post, i) => (
                <PostCard key={post._id} post={post} index={i} compact />
              ))}
            </div>
          )}
        </div>
      </section>

      <BlogSection
        title="Most loved blogs"
        subtitle="Favourites from the road — published in the Most Loved category."
        posts={mostLoved}
        loading={loading}
      />

      {!loading && !spotlight && (
        <section className="section">
          <div className="container empty-state">
            <p>No blogs</p>
            <p className="muted">When an admin publishes a post, it will appear here for everyone.</p>
          </div>
        </section>
      )}

      {spotlight && (
        <section className="section spotlight-section">
          <div className="container">
            <div className="section__head">
              <h2>Latest trending</h2>
              <p>A larger look at the story leading the magazine this week.</p>
            </div>
            <motion.article
              className="spotlight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Link to={`/blog/${spotlight.slug}`} className="spotlight__media">
                {spotlight.coverImage ? (
                  <img src={assetUrl(spotlight.coverImage)} alt={spotlight.title} />
                ) : (
                  <div className="post-card__placeholder spotlight__placeholder" />
                )}
              </Link>
              <div className="spotlight__body">
                <span className="eyebrow">{spotlight.category}</span>
                <h3>
                  <Link to={`/blog/${spotlight.slug}`}>{spotlight.title}</Link>
                </h3>
                <p>{spotlight.excerpt}</p>
                <Link to={`/blog/${spotlight.slug}`} className="text-link">
                  Continue reading →
                </Link>
              </div>
            </motion.article>
          </div>
        </section>
      )}
    </>
  );
}
