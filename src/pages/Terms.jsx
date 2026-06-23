import React from 'react';

export default function Terms() {
  const lastUpdated = 'May 21, 2026';

  return (
    <article className="container content-page">
      <p className="eyebrow">Terms</p>
      <h1>Terms of Service</h1>
      <p className="lead">Last updated: {lastUpdated}</p>
      <p>
        By accessing or using MotoLinks (the "App"), you agree to these Terms. If you
        do not agree, you must not use the App.
      </p>

      <h2>Eligibility</h2>
      <p>
        MotoLinks is intended only for individuals who meet the minimum legal age required
        to obtain and hold a motorcycle rider license or permit in their jurisdiction.
      </p>

      <h2>Acceptable Use</h2>
      <p>You agree to use the App lawfully, responsibly, and respectfully.</p>
      <ul className="content-list">
        <li>No unlawful, abusive, threatening, discriminatory, or offensive content.</li>
        <li>No harassment, impersonation, or dangerous conduct toward other users.</li>
        <li>No illegal activity, malicious code, spam, scams, or security interference.</li>
      </ul>

      <h2>Community Conduct</h2>
      <p>
        MotoLinks is intended to foster a respectful, inclusive, and safety-focused rider community.
      </p>
      <ul className="content-list">
        <li>Treat other users respectfully and communicate responsibly.</li>
        <li>Ride safely, lawfully, and within your skill level.</li>
        <li>Respect road laws, rider privacy, and public safety.</li>
      </ul>

      <h2>User-Generated Content</h2>
      <p>
        You are responsible for content you post or share through MotoLinks. MotoLinks does not
        guarantee the accuracy, legality, or safety of user-generated content. By posting content,
        you grant MotoLinks a non-exclusive, worldwide, royalty-free license to use and display
        that content in connection with operating and promoting the App.
      </p>

      <h2>Content Moderation &amp; User Safety</h2>
      <p>
        MotoLinks may use automated systems, AI-assisted moderation tools, reporting features,
        blocking functions, and human review to detect, review, restrict, or remove content and
        accounts that may violate these Terms, community standards, or applicable law.
      </p>
      <p>
        Users may report, block, or flag content and accounts through in-app tools. We take
        reasonable steps to review reports, but cannot guarantee all harmful content or behavior
        will be prevented or removed.
      </p>

      <h2>Ride Coordination &amp; Safety Disclaimer</h2>
      <p>
        MotoLinks is a social and ride-coordination platform only. MotoLinks does not organize,
        supervise, verify, control, or guarantee rides, routes, riders, vehicles, or meetup locations.
      </p>
      <p>
        Participation in activities connected through MotoLinks is at your own risk. You are
        responsible for legal compliance, insurance, registration, riding decisions, and interactions
        with other users.
      </p>

      <h2>Location Features</h2>
      <p>
        Certain features may display approximate rider proximity or ride-related location data.
        Exact live GPS locations are not continuously shared publicly unless explicitly enabled by
        a specific feature.
      </p>

      <h2>External Services &amp; Links</h2>
      <p>
        MotoLinks may link to third-party services including map providers and external websites.
        MotoLinks is not responsible for third-party availability, content, policies, or practices.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, MotoLinks is provided "as is" and "as available"
        without warranties. MotoLinks and related parties are not liable for indirect, incidental,
        special, consequential, exemplary, or punitive damages related to use of the App, ride
        participation, user conduct, location sharing, interruptions, data loss, or third-party services.
      </p>

      <h2>Changes to the App and Terms</h2>
      <p>
        We may modify features, services, subscriptions, or functionality at any time. We may also
        update these Terms from time to time. Continued use after updates means you accept the
        updated Terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these Terms can be sent to{' '}
        <a href="mailto:support@motolinks.com.au">support@motolinks.com.au</a>.
      </p>
    </article>
  );
}
