import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <article className="container content-page">
      <p className="eyebrow">Contact</p>
      <h1>Talk to the MotoLinks team.</h1>
      <p className="lead">
        For support, partnerships, app review questions, or product inquiries,
        reach the team directly.
      </p>

      <div className="info-card">
        <span>Email</span>
        <a href="mailto:support@motolinks.app">support@motolinks.app</a>
      </div>

      <p>
        You can also review our <Link to="/privacy-policy">Privacy Policy</Link>{' '}
        and <Link to="/delete-data">Data Deletion</Link> process.
      </p>
    </article>
  );
}
