import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { assetUrl } from '../api/client';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api
      .get('/admin/posts')
      .then((res) => setPosts(res.data.posts))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load posts'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id, title) => {
    if (!window.confirm(`Delete “${title}”?`)) return;
    try {
      await api.delete(`/admin/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <header className="page-head">
        <div>
          <h1>Posts</h1>
          <p>Create, edit, and publish stories.</p>
        </div>
        <Link className="btn" to="/posts/new">
          New post
        </Link>
      </header>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading…</p>}

      {!loading && posts.length === 0 && <p className="muted">No posts yet.</p>}

      {posts.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    {post.coverImage ? (
                      <img className="thumb" src={assetUrl(post.coverImage)} alt="" />
                    ) : (
                      <div className="thumb thumb--empty" />
                    )}
                  </td>
                  <td>
                    <strong>{post.title}</strong>
                  </td>
                  <td>{post.category}</td>
                  <td>
                    <span className={`badge ${post.published ? 'badge--ok' : ''}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <Link to={`/posts/${post._id}/edit`}>Edit</Link>
                    <button type="button" onClick={() => onDelete(post._id, post.title)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
