import React, { useMemo, useState } from 'react';

function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function actorName(profile, fallback) {
  if (!profile) return fallback || '-';
  return profile.full_name || profile.username || profile.email || fallback || '-';
}

export default function AdminReportQueue({
  emptyLabel,
  reports,
  statusOptions,
  title,
  type,
  onSave,
}) {
  const [drafts, setDrafts] = useState({});
  const [savingId, setSavingId] = useState('');
  const [error, setError] = useState('');

  const statusCounts = useMemo(() => {
    return reports.reduce((counts, report) => {
      counts[report.status] = (counts[report.status] || 0) + 1;
      return counts;
    }, {});
  }, [reports]);

  const updateDraft = (reportId, nextDraft) => {
    setDrafts((current) => ({
      ...current,
      [reportId]: {
        status: nextDraft.status ?? current[reportId]?.status,
        adminNotes: nextDraft.adminNotes ?? current[reportId]?.adminNotes,
      },
    }));
  };

  const saveDraft = async (report) => {
    const draft = drafts[report.id] ?? {};
    const updates = {
      adminNotes: draft.adminNotes ?? report.admin_notes ?? '',
      status: draft.status ?? report.status,
    };

    setSavingId(report.id);
    setError('');

    try {
      await onSave(report.id, updates);
    } catch (saveError) {
      setError(saveError.message || 'Unable to save report.');
    } finally {
      setSavingId('');
    }
  };

  return (
    <article className="admin-panel">
      <div className="admin-panel__header">
        <div>
          <h2>{title}</h2>
          <p className="admin-muted">
            {statusOptions.map((status) => `${status}: ${statusCounts[status] || 0}`).join(' · ')}
          </p>
        </div>
      </div>

      {error ? <div className="admin-alert">{error}</div> : null}

      {reports.length === 0 ? (
        <p className="admin-muted">{emptyLabel}</p>
      ) : (
        <div className="admin-report-list">
          {reports.map((report) => {
            const draft = drafts[report.id] ?? {};
            const status = draft.status ?? report.status;
            const adminNotes = draft.adminNotes ?? report.admin_notes ?? '';

            return (
              <section className="admin-report-card" key={report.id}>
                <div className="admin-report-card__main">
                  <div className="admin-report-card__heading">
                    <div>
                      <span className="admin-badge">{report.category || report.reason || type}</span>
                      <h3>{report.title || report.reason || 'Moderation report'}</h3>
                    </div>
                    <span className={`admin-badge admin-badge--${status.replaceAll('_', '-')}`}>
                      {status.replaceAll('_', ' ')}
                    </span>
                  </div>

                  <dl className="admin-meta-grid">
                    <div>
                      <dt>Reporter</dt>
                      <dd>{actorName(report.reporter, report.reporter_id)}</dd>
                    </div>
                    {type === 'bug' ? (
                      <>
                        <div>
                          <dt>Category</dt>
                          <dd>{report.category}</dd>
                        </div>
                        <div>
                          <dt>Platform</dt>
                          <dd>{report.platform || '-'}</dd>
                        </div>
                        <div>
                          <dt>Version</dt>
                          <dd>{report.app_version || '-'}</dd>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <dt>Reported Rider</dt>
                          <dd>{actorName(report.reportedUser, report.reported_user_id)}</dd>
                        </div>
                        <div>
                          <dt>Reported Ride</dt>
                          <dd>{report.reportedRide?.title || report.reported_ride_id || '-'}</dd>
                        </div>
                        <div>
                          <dt>Reason</dt>
                          <dd>{report.reason}</dd>
                        </div>
                      </>
                    )}
                    <div>
                      <dt>Created</dt>
                      <dd>{formatDate(report.created_at)}</dd>
                    </div>
                  </dl>

                  <p className="admin-report-body">{report.details}</p>
                  {report.steps_to_reproduce ? (
                    <pre className="admin-report-steps">{report.steps_to_reproduce}</pre>
                  ) : null}
                </div>

                <form className="admin-report-card__actions" onSubmit={(event) => {
                  event.preventDefault();
                  void saveDraft(report);
                }}>
                  <label>
                    <span>Status</span>
                    <select
                      value={status}
                      onChange={(event) => updateDraft(report.id, { status: event.target.value })}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.replaceAll('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Admin notes</span>
                    <textarea
                      rows="4"
                      value={adminNotes}
                      onChange={(event) => updateDraft(report.id, { adminNotes: event.target.value })}
                    />
                  </label>

                  <button className="button button--secondary" disabled={savingId === report.id} type="submit">
                    {savingId === report.id ? 'Saving...' : 'Save'}
                  </button>
                </form>
              </section>
            );
          })}
        </div>
      )}
    </article>
  );
}
