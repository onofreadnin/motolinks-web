import React from 'react';
import { Link } from 'react-router-dom';

export default function CookiesPolicy() {
  const lastUpdated = 'June 12, 2026';

  return (
    <article className="container content-page">
      <p className="eyebrow">Policy</p>
      <h1>Cookies Policy</h1>
      <p className="lead">Last updated: {lastUpdated}</p>
      <p>
        MotoLinks uses limited cookies and similar browser storage to operate this website,
        protect admin sessions, understand basic site performance, and support app store
        compliance pages.
      </p>

      <h2>How We Use Cookies</h2>
      <ul className="content-list">
        <li>Keep essential website and admin dashboard sessions working.</li>
        <li>Remember basic browser preferences where supported.</li>
        <li>Measure aggregate page performance and reliability.</li>
        <li>Protect the site from abuse, spam, and unauthorized access.</li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>
        Hosting, analytics, authentication, and database providers may process technical data
        needed to provide MotoLinks services. Where those providers use cookies, their own
        policies may also apply.
      </p>

      <h2>Your Choices</h2>
      <p>
        You can control cookies through your browser settings. Blocking essential cookies may
        prevent admin login or some website features from working correctly.
      </p>

      <h2>More Information</h2>
      <p>
        For broader data practices, review our <Link to="/privacy-policy">Privacy Policy</Link>
        {' '}or contact <a href="mailto:support@motolinks.org">support@motolinks.org</a>.
      </p>
    </article>
  );
}
