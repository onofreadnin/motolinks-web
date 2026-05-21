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
        This Privacy Policy explains how MotoLinks ("we", "us", or "our")
        collects, uses, and protects your information when you use the MotoLinks
        mobile application (the "App").
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul className="content-list">
        <li>
          <strong>Account Information:</strong> When you create an account, we
          collect your name, email address, and optional profile details.
        </li>
        <li>
          <strong>Ride Content:</strong> Content you create within the app, such
          as ride posts and comments.
        </li>
        <li>
          <strong>Location-Related Information:</strong> Start and destination
          details for rides that may reference physical locations. You can
          choose to open these in your preferred map app; those external apps
          are governed by their own privacy policies.
        </li>
        <li>
          <strong>Uploaded Images:</strong> If photo uploads are enabled, we
          collect and store images you choose to share.
        </li>
        <li>
          <strong>Device and Usage Information:</strong> We may collect device
          identifiers and usage data for security, debugging, analytics, and to
          improve the App.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We use your information to provide and improve the App, communicate
        with you, personalize your experience, and ensure the security and
        integrity of our services.
      </p>

      <h2>Data Storage</h2>
      <p>
        Your data is stored using our backend and database provider. For
        example, we may use Supabase or similar services to handle data storage
        and authentication.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, correct, or request deletion of your
        personal data. To request deletion, please see our{' '}
        <Link to="/delete-data">Data Deletion</Link> page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at <a href="mailto:support@motolinks.app">support@motolinks.app</a>.
      </p>
    </article>
  );
}
