import React from 'react';

export default function DeleteData() {
  return (
    <article className="container content-page">
      <p className="eyebrow">Data rights</p>
      <h1>Data Deletion Request</h1>
      <p className="lead">
        If you would like to delete your MotoLinks account and associated
        personal data, please follow these steps.
      </p>

      <ol className="step-list">
        <li>
          Send an email to{' '}
          <a href="mailto:support@motolinks.app?subject=MotoLinks%20Data%20Deletion%20Request">
            support@motolinks.app
          </a>{' '}
          from the email address associated with your MotoLinks account.
        </li>
        <li>
          Use the subject line: <strong>MotoLinks Data Deletion Request</strong>.
        </li>
        <li>
          In the body of the email, include your account details and request for
          deletion.
        </li>
        <li>Please allow up to 30 days for your request to be processed.</li>
      </ol>

      <p>
        We will delete your account profile, ride posts, saved ride data,
        uploaded photos, and related personal data. We may retain certain
        records if required by law or for security and fraud prevention.
      </p>
      <p>
        For further assistance, contact us at{' '}
        <a href="mailto:support@motolinks.app">support@motolinks.app</a>.
      </p>
    </article>
  );
}
