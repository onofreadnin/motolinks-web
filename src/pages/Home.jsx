import React from 'react';
import { Link } from 'react-router-dom';

const metrics = [
  { value: '24/7', label: 'ride planning access' },
  { value: '30 days', label: 'data deletion window' },
  { value: 'Maps', label: 'route handoff ready' },
];

const features = [
  {
    title: 'Discover nearby rides',
    body:
      'Give riders a focused place to post routes, meetups, destinations, and ride details without the noise of generic social feeds.',
  },
  {
    title: 'Connect riding communities',
    body:
      'Support local crews, weekend routes, and destination-led travel with a product built around rider intent and shared momentum.',
  },
  {
    title: 'Open routes in map apps',
    body:
      'Start and destination details are designed to hand off cleanly to preferred mapping apps for practical, road-ready planning.',
  },
];

const growthSignals = [
  'Mobile-first rider network with clear niche positioning',
  'Compliance pages ready for app store review and user trust',
  'Scalable design system prepared for future SaaS landing pages',
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <img src="/brand/motolinks-banner.png" alt="" />
        </div>
        <div className="container hero__content">
          <p className="eyebrow">Ride. Connect. Explore.</p>
          <h1>MotoLinks turns motorcycle rides into a connected local network.</h1>
          <p className="hero__lede">
            A rider-first platform for discovering routes, creating ride posts,
            and moving from community intent to real-world destinations.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="mailto:support@motolinks.app">
              Start a conversation
            </a>
            <Link className="button button--secondary" to="/privacy-policy">
              Review compliance
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container split">
          <div>
            <p className="eyebrow">Built for focus</p>
            <h2>A sharper home for ride discovery.</h2>
          </div>
          <p className="section__intro">
            MotoLinks positions motorcycle culture as a practical network:
            routes, rider profiles, destination details, safety expectations,
            and simple trust pages that make the product easier to evaluate.
          </p>
        </div>
        <div className="container metrics">
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__heading">
            <p className="eyebrow">Product pillars</p>
            <h2>Designed around the moments riders already care about.</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--brand">
        <div className="container brand-panel">
          <img
            className="brand-panel__image"
            src="/brand/motolinks-banner.png"
            alt="MotoLinks brand banner"
          />
          <div className="brand-panel__content">
            <p className="eyebrow">Launch-ready foundation</p>
            <h2>Polished enough for first impressions, structured for growth.</h2>
            <ul className="check-list">
              {growthSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
