import React, { useEffect, useMemo, useState } from 'react';
import { getMediaReviewItems, reviewMediaItem } from '../lib/adminApi';

function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function riderName(profile, fallback) {
  if (!profile) return fallback || '-';
  return profile.full_name || profile.username || profile.email || fallback || '-';
}

function mediaLabel(type) {
  return String(type || 'media').replaceAll('_', ' ');
}

export default function AdminMediaReview() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState('');
  const [rejectionReasons, setRejectionReasons] = useState({});

  const loadItems = async () => {
    setLoading(true);
    setError('');

    try {
      setItems(await getMediaReviewItems());
    } catch (loadError) {
      setError(loadError.message || 'Unable to load media review queue.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const counts = useMemo(() => {
    return items.reduce((nextCounts, item) => {
      nextCounts[item.status] = (nextCounts[item.status] || 0) + 1;
      return nextCounts;
    }, {});
  }, [items]);

  const submitReview = async (item, status) => {
    setSavingId(item.id);
    setError('');

    try {
      await reviewMediaItem(item.id, {
        status,
        rejectionReason: status === 'rejected' ? rejectionReasons[item.id] ?? '' : '',
      });
      await loadItems();
    } catch (reviewError) {
      setError(reviewError.message || `Unable to ${status} media.`);
    } finally {
      setSavingId('');
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <div>
          <p className="eyebrow">Safety</p>
          <h1>Media Review</h1>
          <p className="admin-muted">
            Pending user-uploaded avatar, cover, and Bike Garage images for App Review readiness.
          </p>
        </div>
        <button className="button button--secondary" type="button" onClick={loadItems}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert">{error}</div> : null}

      {loading ? (
        <div className="admin-panel">Loading media review queue...</div>
      ) : (
        <article className="admin-panel">
          <div className="admin-panel__header">
            <div>
              <h2>Review Queue</h2>
              <p className="admin-muted">
                pending: {counts.pending || 0} · approved: {counts.approved || 0} · rejected: {counts.rejected || 0}
              </p>
            </div>
          </div>

          {items.length === 0 ? (
            <p className="admin-muted">No media uploads found.</p>
          ) : (
            <div className="admin-media-grid">
              {items.map((item) => {
                const saving = savingId === item.id;
                const disabled = saving || item.status !== 'pending';

                return (
                  <section className="admin-media-card" key={item.id}>
                    <a href={item.public_url} target="_blank" rel="noreferrer" className="admin-media-card__preview">
                      <img src={item.public_url} alt={`${mediaLabel(item.media_type)} upload preview`} />
                    </a>

                    <div className="admin-media-card__body">
                      <div className="admin-report-card__heading">
                        <div>
                          <span className="admin-badge">{mediaLabel(item.media_type)}</span>
                          <h3>{riderName(item.user, item.user_id)}</h3>
                        </div>
                        <span className={`admin-badge admin-badge--${item.status}`}>
                          {item.status}
                        </span>
                      </div>

                      <dl className="admin-meta-grid">
                        <div>
                          <dt>Uploaded</dt>
                          <dd>{formatDate(item.created_at)}</dd>
                        </div>
                        <div>
                          <dt>User</dt>
                          <dd>{item.user?.email || item.user?.username || item.user_id}</dd>
                        </div>
                        <div>
                          <dt>Source</dt>
                          <dd>{item.source_table}</dd>
                        </div>
                        <div>
                          <dt>Path</dt>
                          <dd>{item.storage_path}</dd>
                        </div>
                      </dl>

                      <label className="admin-media-card__field">
                        <span>Reject reason</span>
                        <textarea
                          rows="3"
                          disabled={item.status !== 'pending'}
                          value={rejectionReasons[item.id] ?? item.rejection_reason ?? ''}
                          onChange={(event) =>
                            setRejectionReasons((current) => ({
                              ...current,
                              [item.id]: event.target.value,
                            }))
                          }
                        />
                      </label>

                      <div className="admin-media-card__actions">
                        <button
                          className="button button--primary"
                          disabled={disabled}
                          type="button"
                          onClick={() => void submitReview(item, 'approved')}
                        >
                          {saving ? 'Saving...' : 'Approve'}
                        </button>
                        <button
                          className="button button--secondary"
                          disabled={disabled}
                          type="button"
                          onClick={() => void submitReview(item, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </article>
      )}
    </section>
  );
}
