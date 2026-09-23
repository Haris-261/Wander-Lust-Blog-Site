import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { assetUrl } from '../api/client';

const empty = {
  title: '',
  excerpt: '',
  content: '',
  category: 'Trending',
  tags: '',
  published: true,
};

const CATEGORIES = ['Trending', 'For You', 'Most Loved'];


export default function PostForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    api
      .get(`/admin/posts/${id}`)
      .then((res) => {
        const p = res.data.post;
        setForm({
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          category: CATEGORIES.includes(p.category) ? p.category : 'Trending',
          tags: (p.tags || []).join(', '),
          published: p.published,
        });
        if (p.coverImage) setPreview(assetUrl(p.coverImage));
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load post'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCover(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    const data = new FormData();
    data.append('title', form.title);
    data.append('excerpt', form.excerpt);
    data.append('content', form.content);
    data.append('category', form.category);
    data.append('tags', form.tags);
    data.append('published', String(form.published));
    if (cover) data.append('cover', cover);

    try {
      if (isEdit) {
        await api.put(`/admin/posts/${id}`, data);
      } else {
        await api.post('/admin/posts', data);
      }
      navigate('/posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <header className="page-head">
        <div>
          <h1>{isEdit ? 'Edit post' : 'New post'}</h1>
          <p>Write and publish a travel story.</p>
        </div>
      </header>

      <form className="post-form" onSubmit={onSubmit}>
        {error && <p className="error">{error}</p>}

        <label>
          Title
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>

        <label>
          Excerpt
          <textarea
            required
            rows={3}
            maxLength={320}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </label>

        <label>
          Content
          <textarea
            required
            rows={12}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </label>

        <div className="form-row">
          <label>
            Category (homepage section)
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tags (comma separated)
            <input
              placeholder="italy, hiking, food"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </label>
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>

        <label>
          Cover image
          <input type="file" accept="image/*" onChange={onFile} />
        </label>

        {preview && <img className="cover-preview" src={preview} alt="Cover preview" />}

        <div className="form-actions">
          <button type="submit" className="btn" disabled={busy}>
            {busy ? 'Saving…' : isEdit ? 'Update post' : 'Create post'}
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => navigate('/posts')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
