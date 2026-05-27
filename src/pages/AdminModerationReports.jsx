import React, { useEffect, useState } from 'react';
import AdminReportQueue from '../components/AdminReportQueue';
import { getModerationReports, updateModerationReport } from '../lib/adminApi';

const moderationStatuses = ['open', 'reviewing', 'resolved', 'dismissed'];

export default function AdminModerationReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReports = async () => {
    setLoading(true);
    setError('');

    try {
      setReports(await getModerationReports());
    } catch (loadError) {
      setError(loadError.message || 'Unable to load moderation reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadReports();
  }, []);

  const onSave = async (id, updates) => {
    await updateModerationReport(id, updates);
    await loadReports();
  };

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <div>
          <p className="eyebrow">Safety</p>
          <h1>Moderation Reports</h1>
        </div>
        <button className="button button--secondary" type="button" onClick={loadReports}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert">{error}</div> : null}
      {loading ? (
        <div className="admin-panel">Loading moderation reports...</div>
      ) : (
        <AdminReportQueue
          emptyLabel="No moderation reports found."
          onSave={onSave}
          reports={reports}
          statusOptions={moderationStatuses}
          title="Moderation Queue"
          type="moderation"
        />
      )}
    </section>
  );
}
