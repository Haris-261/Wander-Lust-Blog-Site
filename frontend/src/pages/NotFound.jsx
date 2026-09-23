import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section page-top">
      <div className="container empty-state">
        <h1>404</h1>
        <p>That page wandered off the map.</p>
        <Link to="/" className="btn btn--primary">
          Back home
        </Link>
      </div>
    </section>
  );
}
