import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const lastUpdated = 'May 21, 2026';

  return (
    <article className="container content-page">
      <p className="eyebrow">Policy</p>
      <h1>Privacy Policy</h1>
      <p className="lead">Last updated: {lastUpdated}</p>
      <p>
        This Privacy Policy explains how MotoLinks ("MotoLinks", "we", "us", or "our")
        collects, uses, stores, and protects your information when you use the
        MotoLinks mobile application and related services (the "App").
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul className="content-list">
        <li>
          <strong>Account Information:</strong> your name, email address, profile details,
          and authentication details needed for account security.
        </li>
        <li>
          <strong>User Content:</strong> ride posts, comments, messages, interactions, and
          uploaded images or media.
        </li>
        <li>
          <strong>Ride &amp; Location Information:</strong> meetup points, routes, and
          destinations created in ride features. Certain features may show approximate
          rider proximity by general area rather than precise always-on GPS location.
        </li>
        <li>
          <strong>Device &amp; Usage Information:</strong> device type, OS, app version,
          identifiers, crash data, analytics, and diagnostic logs.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul className="content-list">
        <li>Provide and operate the App.</li>
        <li>Maintain user accounts and profiles.</li>
        <li>Improve features, performance, and reliability.</li>
        <li>Personalize user experience and communication.</li>
        <li>Detect fraud, abuse, and security issues.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>Safety, Moderation &amp; Platform Integrity</h2>
      <p>
        MotoLinks may use automated systems, AI-assisted moderation tools, user reporting,
        blocking features, and human review processes to detect, review, and respond to
        content, accounts, or activity that may violate our Terms, community standards, or law.
      </p>
      <p>
        Information related to reports, moderation actions, and safety investigations may be
        reviewed and retained where reasonably necessary to protect users, enforce policies,
        comply with legal obligations, and maintain platform integrity.
      </p>

      <h2>Data Storage &amp; Third-Party Services</h2>
      <p>
        Data may be stored and processed using trusted third-party providers for authentication,
        database, analytics, storage, and hosting services, including Supabase or similar providers.
        If you open routes in third-party mapping services (for example Google Maps or Apple Maps),
        those services are governed by their own terms and privacy policies.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable measures to protect your information from unauthorized access, misuse,
        and disclosure. No internet transmission or electronic storage method is completely secure,
        so absolute security cannot be guaranteed.
      </p>

      <h2>Your Rights</h2>
      <p>You may request to access, correct, or delete your personal information.</p>
      <ul className="content-list">
        <li>Access your personal data.</li>
        <li>Correct inaccurate information.</li>
        <li>Request deletion of your data.</li>
        <li>Withdraw consent where applicable.</li>
      </ul>
      <p>
        For deletion requests, see our <Link to="/data-deletion">Account &amp; Data Deletion</Link> page.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        MotoLinks is intended only for individuals who meet the minimum legal age required to
        obtain and hold a motorcycle rider license or permit in their jurisdiction. If we become
        aware of data collected from ineligible users, we may suspend or terminate related accounts
        and remove that data where required or appropriate.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this policy from time to time. Updated versions are posted in the App and
        reflected by the "Last updated" date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or your data, contact us at{' '}
        <a href="mailto:support@motolinks.com.au">support@motolinks.com.au</a>.
      </p>
    </article>
  );
}
