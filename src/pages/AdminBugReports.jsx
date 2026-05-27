import React, { useEffect, useState } from 'react';
import AdminReportQueue from '../components/AdminReportQueue';
import { getAppBugReports, updateAppBugReport } from '../lib/adminApi';

const bugStatuses = ['open', 'triaged', 'in_progress', 'resolved', 'closed'];

export default function AdminBugReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReports = async () => {
    setLoading(true);
    setError('');

    try {
      setReports(await getAppBugReports());
    } catch (loadError) {
      setError(loadError.message || 'Unable to load app bug reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadReports();
  }, []);

  const onSave = async (id, updates) => {
    await updateAppBugReport(id, updates);
    await loadReports();
  };

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <div>
          <p className="eyebrow">Reports</p>
          <h1>App Bug Reports</h1>
        </div>
        <button className="button button--secondary" type="button" onClick={loadReports}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert">{error}</div> : null}
      {loading ? (
        <div className="admin-panel">Loading app bug reports...</div>
      ) : (
        <AdminReportQueue
          emptyLabel="No app bug reports found."
          onSave={onSave}
          reports={reports}
          statusOptions={bugStatuses}
          title="Bug Queue"
          type="bug"
        />
      )}
    </section>
  );
}
