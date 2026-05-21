import React from 'react';
import { Link } from 'react-router-dom';

const metrics = [
  { value: '24/7', label: 'ride planning' },
  { value: '30d', label: 'data requests' },
  { value: 'Maps', label: 'route handoff' },
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
        <div className="hero__media" aria-hidden="true" />
        <div className="container hero__content">
          <p className="eyebrow">Ride. Connect. Explore.</p>
          <h1>MotoLinks for riders who move together.</h1>
          <p className="hero__lede">
            Discover routes, create ride posts, and connect local motorcycle
            communities from one focused platform.
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
        <aside className="hero__glass-stack" aria-label="MotoLinks product highlights">
          <div className="glass-card glass-card--primary">
            <span>Live Ride Posts</span>
            <strong>Route-ready meetups</strong>
          </div>
          <div className="glass-card">
            <span>Map Handoff</span>
            <strong>Start to destination</strong>
          </div>
          <div className="glass-card glass-card--compact">
            <span>Community</span>
            <strong>Built for crews</strong>
          </div>
        </aside>
      </section>

      <section className="section section--surface">
        <div className="container split">
          <div>
            <p className="eyebrow">Built for focus</p>
            <h2>A sharper home for ride discovery.</h2>
          </div>
          <p className="section__intro">
            MotoLinks brings routes, rider profiles, destination details, and
            simple trust pages into one practical product experience.
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
          <div className="brand-panel__visual" aria-hidden="true">
            <span className="glass-tile glass-tile--large" />
            <span className="glass-tile glass-tile--small" />
            <span className="glass-tile glass-tile--rail" />
          </div>
          <div className="brand-panel__content">
            <p className="eyebrow">Launch-ready foundation</p>
            <h2>Polished for first impressions, structured for growth.</h2>
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
