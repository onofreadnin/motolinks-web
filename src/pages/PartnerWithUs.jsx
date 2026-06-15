import React from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  'Reach rider communities through route-led local discovery.',
  'Support group rides, destination campaigns, and community safety.',
  'Collaborate on launch activations, venue meetups, and rider-focused offers.',
  'Align with a platform built around moderation, reporting, and privacy controls.',
];

export default function PartnerWithUs() {
  return (
    <article className="container content-page">
      <p className="eyebrow">Partnerships</p>
      <h1>Partner With MotoLinks</h1>
      <p className="lead">
        MotoLinks helps motorcycle communities discover rides, connect safely, and move from
        planning to the road with clear route details.
      </p>

      <h2>Who We Partner With</h2>
      <p>
        We are interested in thoughtful partnerships with motorcycle venues, rider groups,
        safety educators, tourism destinations, gear brands, dealerships, insurers, and local
        businesses that genuinely serve riders.
      </p>

      <h2>Partnership Benefits</h2>
      <ul className="content-list">
        {benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <div className="info-card">
        <span>Start a conversation</span>
        <p>
          Tell us who you support, where you operate, and what kind of rider outcome you want
          to create.
        </p>
        <a className="button button--primary" href="mailto:support@motolinks.org?subject=MotoLinks%20Partnership">
          Contact Partnerships
        </a>
      </div>

      <p>
        New to MotoLinks? Visit the <Link to="/">platform overview</Link> or review our
        {' '}<Link to="/privacy-policy">trust and privacy foundation</Link>.
      </p>
    </article>
  );
}
