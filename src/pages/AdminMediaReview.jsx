import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMediaReviewItems, reviewMediaItem } from '../lib/adminApi';

const PAGE_SIZE = 15;
const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

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
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState('');
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

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
  }, [location.key]);

  useEffect(() => {
    const onAdminRouteSelected = (event) => {
      if (event.detail?.to === '/admin/media') {
        void loadItems();
      }
    };

    window.addEventListener('motolinks-admin-route-selected', onAdminRouteSelected);
    return () => window.removeEventListener('motolinks-admin-route-selected', onAdminRouteSelected);
  }, []);

  useEffect(() => {
    if (!expandedItem) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setExpandedItem(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expandedItem]);

  useEffect(() => {
    if (!statusMenuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setStatusMenuOpen(false);
      }
    };
    const onPointerDown = (event) => {
      if (!event.target.closest?.('.admin-status-menu')) {
        setStatusMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [statusMenuOpen]);

  const counts = useMemo(() => {
    return items.reduce((nextCounts, item) => {
      nextCounts[item.status] = (nextCounts[item.status] || 0) + 1;
      return nextCounts;
    }, {});
  }, [items]);

  const filteredItems = useMemo(() => {
    if (statusFilter === 'all') return items;
    return items.filter((item) => item.status === statusFilter);
  }, [items, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, page, totalPages]);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

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

  const goToPreviousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const goToNextPage = () => {
    setPage((currentPage) => Math.min(totalPages, currentPage + 1));
  };

  const pagination = filteredItems.length > PAGE_SIZE ? (
    <div className="admin-pagination">
      <button className="button button--secondary" disabled={page <= 1} type="button" onClick={goToPreviousPage}>
        Previous
      </button>
      <span>
        Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filteredItems.length)} of{' '}
        {filteredItems.length}
      </span>
      <button className="button button--secondary" disabled={page >= totalPages} type="button" onClick={goToNextPage}>
        Next
      </button>
    </div>
  ) : null;

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
                pending: {counts.pending || 0} &middot; approved: {counts.approved || 0} &middot; rejected:{' '}
                {counts.rejected || 0}
              </p>
            </div>
            <div className="admin-review-toolbar">
              <label className="admin-select-field">
                <span>Status</span>
                <div className="admin-status-menu">
                  <button
                    className="admin-status-menu__button"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={statusMenuOpen}
                    onClick={() => setStatusMenuOpen((open) => !open)}
                  >
                    <span>{STATUS_OPTIONS.find((option) => option.value === statusFilter)?.label}</span>
                    <span aria-hidden="true" className="admin-status-menu__chevron" />
                  </button>
                  {statusMenuOpen ? (
                    <div className="admin-status-menu__list" role="listbox" aria-label="Filter media by status">
                      {STATUS_OPTIONS.map((option) => (
                        <button
                          className={`admin-status-menu__option${
                            option.value === statusFilter ? ' admin-status-menu__option--selected' : ''
                          }`}
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={option.value === statusFilter}
                          onClick={() => {
                            setStatusFilter(option.value);
                            setStatusMenuOpen(false);
                          }}
                        >
                          <span>{option.label}</span>
                          {option.value === statusFilter ? <span aria-hidden="true">✓</span> : null}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </label>
              {filteredItems.length > PAGE_SIZE ? (
                <div className="admin-pagination admin-pagination--top">
                <button className="button button--secondary" disabled={page <= 1} type="button" onClick={goToPreviousPage}>
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="button button--secondary"
                  disabled={page >= totalPages}
                  type="button"
                  onClick={goToNextPage}
                >
                  Next
                </button>
                </div>
              ) : null}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <p className="admin-muted">
              {items.length === 0 ? 'No media uploads found.' : 'No media uploads match this status.'}
            </p>
          ) : (
            <>
              <div className="admin-media-list">
                {pageItems.map((item) => {
                  const saving = savingId === item.id;
                  const disabled = saving || item.status !== 'pending';

                  return (
                    <section className="admin-media-row" key={item.id}>
                      <button
                        className="admin-media-row__preview"
                        type="button"
                        onClick={() => setExpandedItem(item)}
                      >
                        <img src={item.public_url} alt={`${mediaLabel(item.media_type)} upload preview`} />
                        <span>Click to expand</span>
                      </button>

                      <div className="admin-media-row__main">
                        <div className="admin-media-row__heading">
                          <span className="admin-badge">{mediaLabel(item.media_type)}</span>
                          <h3>{riderName(item.user, item.user_id)}</h3>
                        </div>
                        <dl className="admin-media-row__meta">
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
                            <dd title={item.storage_path}>{item.storage_path}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="admin-media-row__status">
                        <span className={`admin-badge admin-badge--${item.status}`}>{item.status}</span>
                        {item.status === 'pending' ? (
                          <>
                            <label className="admin-media-row__field">
                              <span>Reject reason</span>
                              <textarea
                                rows="2"
                                disabled={disabled}
                                value={rejectionReasons[item.id] ?? item.rejection_reason ?? ''}
                                onChange={(event) =>
                                  setRejectionReasons((current) => ({
                                    ...current,
                                    [item.id]: event.target.value,
                                  }))
                                }
                              />
                            </label>

                            <div className="admin-media-row__actions">
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
                          </>
                        ) : (
                          <div className="admin-media-row__reviewed">
                            <button
                              className={`button admin-review-state admin-review-state--${item.status}`}
                              disabled
                              type="button"
                            >
                              {item.status === 'approved' ? 'Approved' : 'Rejected'}
                            </button>
                            <span>
                              {item.reviewed_at ? `Reviewed ${formatDate(item.reviewed_at)}` : 'Review complete'}
                            </span>
                          </div>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
              {pagination}
            </>
          )}
        </article>
      )}

      {expandedItem ? (
        <div className="admin-lightbox" role="dialog" aria-modal="true" aria-label="Expanded media preview">
          <button className="admin-lightbox__backdrop" type="button" onClick={() => setExpandedItem(null)}>
            <span className="sr-only">Close preview</span>
          </button>
          <div className="admin-lightbox__content">
            <div className="admin-lightbox__header">
              <div>
                <span className="admin-badge">{mediaLabel(expandedItem.media_type)}</span>
                <h2>{riderName(expandedItem.user, expandedItem.user_id)}</h2>
              </div>
              <button className="button button--secondary" type="button" onClick={() => setExpandedItem(null)}>
                Close
              </button>
            </div>
            <img src={expandedItem.public_url} alt={`${mediaLabel(expandedItem.media_type)} expanded preview`} />
            <a className="admin-lightbox__link" href={expandedItem.public_url} target="_blank" rel="noreferrer">
              Open original image
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
