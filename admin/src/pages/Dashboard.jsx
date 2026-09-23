import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then((res) => setStats(res.data.stats)).catch(() => {});
  }, []);

  return (
    <div>
      <header className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your magazine content.</p>
        </div>
        <Link className="btn" to="/posts/new">
          New post
        </Link>
      </header>

      <div className="stats">
        <div className="stat">
          <span>Total posts</span>
          <strong>{stats?.total ?? '—'}</strong>
        </div>
        <div className="stat">
          <span>Published</span>
          <strong>{stats?.published ?? '—'}</strong>
        </div>
        <div className="stat">
          <span>Drafts</span>
          <strong>{stats?.drafts ?? '—'}</strong>
        </div>
        <div className="stat">
          <span>Categories</span>
          <strong>{stats?.categories ?? '—'}</strong>
        </div>
      </div>
    </div>
  );
}
