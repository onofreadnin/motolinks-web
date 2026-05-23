import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const META_TITLE = 'MotoLinks Child Safety Standards';
const META_DESCRIPTION =
  'MotoLinks standards against child sexual abuse and exploitation, reporting process, and child safety contact information.';

function ensureMetaDescription(content) {
  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.setAttribute('name', 'description');
    document.head.appendChild(description);
  }
  description.setAttribute('content', content);
}

export default function ChildSafety() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

    document.title = META_TITLE;
    ensureMetaDescription(META_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      ensureMetaDescription(previousDescription);
    };
  }, []);

  return (
    <article className="container content-page">
      <p className="eyebrow">Safety Standards</p>
      <h1>MotoLinks Child Safety Standards</h1>
      <p className="lead">Last updated: May 23, 2026</p>

      <p>
        MotoLinks is committed to maintaining a safe and respectful platform for riders and users.
        We have zero tolerance for child sexual abuse and exploitation (CSAE), child sexual abuse
        material (CSAM), grooming, sextortion, trafficking, or any behavior that exploits, abuses,
        or endangers children.
      </p>

      <section>
        <h2>1. Zero Tolerance for CSAE and CSAM</h2>
        <p>MotoLinks strictly prohibits:</p>
        <ul className="content-list">
          <li>Uploading, sharing, requesting, or promoting child sexual abuse material (CSAM)</li>
          <li>Grooming, sextortion, or attempts to exploit minors</li>
          <li>Any sexualized content involving minors</li>
          <li>Harassment, threats, or abuse targeting children</li>
          <li>Any conduct that violates child safety laws</li>
        </ul>
        <p>
          Accounts that violate these standards may be suspended, permanently banned, reported to
          relevant authorities, and removed from the platform.
        </p>
      </section>

      <section>
        <h2>2. Reporting Child Safety Concerns</h2>
        <p>
          MotoLinks allows users to report safety concerns, abusive content, suspicious accounts,
          or violations through in-app reporting or by contacting us directly.
        </p>
        <p>Users may report concerns by email:</p>
        <p>
          <a href="mailto:kingdavid.secured@gmail.com">kingdavid.secured@gmail.com</a>
        </p>
        <p>Reports involving child safety, CSAE, or CSAM are prioritized for review.</p>
      </section>

      <section>
        <h2>3. Handling CSAM and CSAE Reports</h2>
        <p>When MotoLinks receives a report involving suspected CSAM or CSAE, we will:</p>
        <ul className="content-list">
          <li>Review and prioritize the report</li>
          <li>Remove violating content when confirmed</li>
          <li>Restrict or ban accounts involved in violations</li>
          <li>Preserve relevant information where legally required</li>
          <li>
            Report confirmed CSAM or child exploitation concerns to appropriate regional, national,
            or international authorities where required by law
          </li>
          <li>Cooperate with law enforcement when legally required</li>
        </ul>
      </section>

      <section>
        <h2>4. User Safety and Moderation</h2>
        <p>
          MotoLinks may use manual review, user reports, account restrictions, content removal, and
          other safety measures to help prevent abuse. We encourage users to report any suspicious
          or harmful behavior immediately.
        </p>
      </section>

      <section>
        <h2>5. Compliance With Child Safety Laws</h2>
        <p>
          MotoLinks complies with applicable child safety laws and regulations. We are committed to
          taking appropriate action against CSAE and CSAM and cooperating with relevant authorities
          when required.
        </p>
      </section>

      <section>
        <h2>6. Child Safety Contact</h2>
        <p>
          For child safety concerns, CSAE/CSAM reports, or compliance inquiries, contact:
        </p>
        <p>
          <a href="mailto:kingdavid.secured@gmail.com">kingdavid.secured@gmail.com</a>
        </p>
        <p>
          This contact is designated to receive and respond to child safety-related concerns for
          MotoLinks.
        </p>
      </section>

      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </article>
  );
}

