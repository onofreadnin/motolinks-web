import React, { useEffect, useMemo, useState } from 'react';
import {
  getAdminMetrics,
  getAppBugReports,
  getModerationReports,
  getRecentRiders,
} from '../lib/adminApi';

function formatPercent(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

function formatDecimal(value) {
  return Number(value || 0).toFixed(1);
}

export default function AdminDashboard() {
  const [data, setData] = useState({
    appBugReports: [],
    metrics: null,
    moderationReports: [],
    riders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    setLoading(true);
    setError('');

    try {
      const [metrics, appBugReports, moderationReports, riders] = await Promise.all([
        getAdminMetrics(),
        getAppBugReports(),
        getModerationReports(),
        getRecentRiders(),
      ]);
      setData({ appBugReports, metrics, moderationReports, riders });
    } catch (loadError) {
      setError(loadError.message || 'Unable to load admin dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const openModerationCount = useMemo(
    () => data.moderationReports.filter((report) => report.status === 'open').length,
    [data.moderationReports],
  );

  const openBugCount = useMemo(
    () => data.appBugReports.filter((report) => report.status === 'open').length,
    [data.appBugReports],
  );

  const metrics = data.metrics;
  const statCards = metrics
    ? [
        { label: 'Total riders', value: metrics.totalRiders },
        { label: 'New riders this week', value: metrics.newRidersThisWeek },
        { label: 'Rides this week', value: metrics.ridesCreatedThisWeek },
        { label: 'RSVPs this week', value: metrics.rsvpsThisWeek },
        { label: 'RSVP conversion', value: formatPercent(metrics.rsvpConversionRate) },
        { label: 'Messages per ride', value: formatDecimal(metrics.messagesPerRide) },
        { label: 'Completed profiles', value: metrics.completedProfiles },
        { label: 'Repeat hosts', value: metrics.repeatHosts },
        { label: 'Repeat riders', value: metrics.repeatRiders },
      ]
    : [];

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>Admin Dashboard</h1>
        </div>
        <button className="button button--secondary" type="button" onClick={loadDashboard}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert">{error}</div> : null}

      {loading ? (
        <div className="admin-panel">Loading dashboard...</div>
      ) : (
        <>
          <div className="admin-grid admin-grid--stats">
            {statCards.map((card) => (
              <article className="admin-stat-card" key={card.label}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </article>
            ))}
          </div>

          <div className="admin-grid admin-grid--two">
            <article className="admin-panel">
              <div className="admin-panel__header">
                <h2>Queues</h2>
              </div>
              <div className="admin-queue-metrics">
                <div>
                  <strong>{openBugCount}</strong>
                  <span>Open app bugs</span>
                </div>
                <div>
                  <strong>{openModerationCount}</strong>
                  <span>Open moderation reports</span>
                </div>
              </div>
            </article>

            <article className="admin-panel">
              <div className="admin-panel__header">
                <h2>Top Cities</h2>
              </div>
              <div className="admin-list">
                {(metrics?.topCities ?? []).length > 0 ? (
                  metrics.topCities.map((entry) => (
                    <div className="admin-list__row" key={entry.city}>
                      <span>{entry.city}</span>
                      <strong>{entry.count}</strong>
                    </div>
                  ))
                ) : (
                  <p className="admin-muted">No city data yet.</p>
                )}
              </div>
            </article>
          </div>

          <article className="admin-panel">
            <div className="admin-panel__header">
              <h2>Recent Riders</h2>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Bike</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.riders.map((rider) => (
                    <tr key={rider.id}>
                      <td>{rider.full_name || rider.username}</td>
                      <td>{rider.email || '-'}</td>
                      <td>{rider.city || '-'}</td>
                      <td>{rider.bike || '-'}</td>
                      <td>
                        <span className={rider.suspended ? 'admin-badge admin-badge--danger' : 'admin-badge'}>
                          {rider.suspended ? 'Suspended' : rider.is_admin ? 'Admin' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </>
      )}
    </section>
  );
}
