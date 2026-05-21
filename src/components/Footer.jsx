import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div>
          <Link to="/" className="footer__brand">
            MotoLinks
          </Link>
          <p className="footer__copy">
            Ride discovery and community tools for motorcycle crews.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/delete-data">Delete Data</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <p className="footer__legal">&copy; {currentYear} MotoLinks. All rights reserved.</p>
      </div>
    </footer>
  );
}
