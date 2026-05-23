import React from 'react';

export default function DeleteData() {
  const lastUpdated = 'May 22, 2026';

  return (
    <article className="container content-page">
      <p className="eyebrow">Data rights</p>
      <h1>Account &amp; Data Deletion</h1>
      <p className="lead">Last updated: {lastUpdated}</p>
      <p>
        MotoLinks respects your right to control your personal information and account data.
      </p>

      <h2>Requesting Deletion</h2>
      <p>
        You may request deletion of your MotoLinks account and associated personal information by
        contacting us at <a href="mailto:support@motolinks.org">support@motolinks.org</a>.
      </p>
      <p>
        For security purposes, requests should be sent from the email address connected to your
        MotoLinks account. We may ask for account ownership verification before processing.
      </p>

      <h2>What Happens After a Verified Request</h2>
      <ul className="content-list">
        <li>Delete or anonymize personal account information.</li>
        <li>Remove associated profile data where applicable.</li>
        <li>Remove or disassociate certain user-generated content where appropriate.</li>
      </ul>

      <h2>Information That May Be Retained</h2>
      <p>
        MotoLinks may retain certain information where reasonably necessary to:
      </p>
      <ul className="content-list">
        <li>Comply with legal obligations.</li>
        <li>Resolve disputes and enforce Terms of Service.</li>
        <li>Detect or prevent fraud, abuse, or harmful activity.</li>
        <li>Maintain security, moderation, and platform integrity.</li>
        <li>Comply with backup, archival, and operational requirements.</li>
      </ul>
      <p>
        Some residual or cached information may remain in backups or archives for a limited
        period before permanent deletion.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        Some information may be stored or processed by trusted third-party providers used by
        MotoLinks. Data removal from those systems is handled in line with applicable provider
        processes and retention obligations.
      </p>

      <h2>Contact Us</h2>
      <p>
        For account or data deletion questions, contact{' '}
        <a href="mailto:support@motolinks.org">support@motolinks.org</a>.
      </p>
    </article>
  );
}
