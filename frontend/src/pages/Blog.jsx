import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import PostCard from '../components/PostCard';

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    api.get('/posts/categories/list').then((res) => setCategories(res.data.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get('/posts', { params: { category: category || undefined, search: search || undefined, page, limit: 9 } })
      .then((res) => {
        setPosts(res.data.posts);
        setPagination(res.data.pagination);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [category, search, page]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  };

  return (
    <section className="section page-top">
      <div className="container">
        <div className="section__head">
          <h1>Stories</h1>
          <p>Browse destination guides, essays, and travel notes.</p>
        </div>

        <div className="filters">
          <input
            type="search"
            placeholder="Search stories…"
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateParam('search', e.target.value.trim());
            }}
            className="input"
          />
          <div className="chips">
            <button
              type="button"
              className={`chip ${!category ? 'is-active' : ''}`}
              onClick={() => updateParam('category', '')}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip ${category === c ? 'is-active' : ''}`}
                onClick={() => updateParam('category', c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="muted">Loading…</p>}
        {!loading && posts.length === 0 && (
          <div className="empty-state">
            <p>No blogs</p>
            <p className="muted">
              {category || search
                ? 'No stories match your filters.'
                : 'When an admin publishes a post, it will be visible to every user.'}
            </p>
          </div>
        )}

        <div className="post-grid">
          {posts.map((post, i) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>

        {pagination.pages > 1 && (
          <div className="pagination">
            <button
              type="button"
              className="btn btn--ghost"
              disabled={page <= 1}
              onClick={() => updateParam('page', String(page - 1))}
            >
              Previous
            </button>
            <span>
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              type="button"
              className="btn btn--ghost"
              disabled={page >= pagination.pages}
              onClick={() => updateParam('page', String(page + 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
