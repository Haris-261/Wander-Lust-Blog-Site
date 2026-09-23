import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__brand">Wanderlust</p>
          <p className="footer__tag">Stories from roads less traveled — destinations, culture, and quiet corners of the world.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/blog">All stories</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Stay curious</h4>
          <p className="footer__tag">New essays each week. No noise — just travel worth writing home about.</p>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Wanderlust Magazine</p>
      </div>
    </footer>
  );
}
