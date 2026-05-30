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

const riderStats = [
  { value: '4.8/5', label: 'ride planning satisfaction' },
  { value: '< 45s', label: 'typical route post creation time' },
  { value: '99.9%', label: 'platform availability target' },
];

const testimonials = [
  {
    quote:
      'MotoLinks helps our weekend group lock meetup points fast without long message threads.',
    author: 'Sydney Group Ride Lead',
  },
  {
    quote:
      'The route-first flow is simple and practical. We can plan and move in minutes.',
    author: 'Melbourne Adventure Rider',
  },
];

const ctaCards = [
  {
    title: 'Book a Product Demo',
    body: 'Walk through ride creation, audience setup, and moderation controls with our team.',
    actionLabel: 'Schedule Demo',
    href: 'mailto:support@motolinks.org?subject=MotoLinks%20Product%20Demo',
  },
  {
    title: 'See Privacy and Safety',
    body: 'Review policies and trust foundations before onboarding your rider community.',
    actionLabel: 'Open Trust Center',
    to: '/privacy-policy',
  },
];

const communityBanners = [
  '/brand/community_banner_01.png',
  '/brand/community_banner_02.png',
  '/brand/community_banner_03.png',
  '/brand/community_banner_04.png',
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
            <a className="button button--primary" href="mailto:support@motolinks.org">
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

      <section className="section section--surface">
        <div className="container">
          <div className="section__heading">
            <p className="eyebrow">Proof and next steps</p>
            <h2>See rider impact and move straight to action.</h2>
          </div>
          <div className="impact-grid" aria-label="MotoLinks trust and conversion highlights">
            {riderStats.map((item) => (
              <article className="impact-stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <blockquote className="testimonial-card" key={item.author}>
                <p>{item.quote}</p>
                <cite>{item.author}</cite>
              </blockquote>
            ))}
          </div>
          <div className="cta-card-grid">
            {ctaCards.map((item) => (
              <article className="cta-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.href ? (
                  <a className="button button--primary" href={item.href}>
                    {item.actionLabel}
                  </a>
                ) : (
                  <Link className="button button--secondary" to={item.to}>
                    {item.actionLabel}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--brand">
        <div className="container brand-panel">
          <div className="brand-panel__visual" aria-hidden="true">
            <div className="brand-carousel">
              {communityBanners.map((src, index) => (
                <img
                  key={src}
                  className="brand-carousel__slide"
                  src={src}
                  alt=""
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
            <div className="brand-carousel__dots">
              {communityBanners.map((src, index) => (
                <span className="brand-carousel__dot" key={`${src}-dot-${index}`} />
              ))}
            </div>
            <div className="brand-panel__kpis">
              <span className="brand-kpi">Fast route setup</span>
              <span className="brand-kpi">Audience controls</span>
              <span className="brand-kpi">Map-ready details</span>
            </div>
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
