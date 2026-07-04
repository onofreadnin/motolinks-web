import React from 'react';
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const adminNavItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/media', label: 'Media Review' },
  { to: '/admin/bugs', label: 'App Bugs' },
  { to: '/admin/reports', label: 'Moderation' },
];

export default function AdminLayout() {
  const { isAdmin, isSupabaseReady, logout, profile, ready } = useAdminAuth();
  const location = useLocation();

  if (!isSupabaseReady) {
    return (
      <main className="admin-screen admin-screen--center">
        <section className="admin-auth-card">
          <p className="eyebrow">Admin</p>
          <h1>Supabase config required</h1>
          <p className="admin-muted">
            Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the web environment.
          </p>
        </section>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="admin-screen admin-screen--center">
        <section className="admin-auth-card">
          <p className="eyebrow">Admin</p>
          <h1>Loading session</h1>
          <p className="admin-muted">Checking MotoLinks admin access.</p>
        </section>
      </main>
    );
  }

  if (!profile || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <NavLink to="/" className="admin-brand" aria-label="MotoLinks home">
          <img src="/brand/motolinks-icon.png" alt="" aria-hidden="true" />
          <span>MotoLinks Admin</span>
        </NavLink>

        <nav className="admin-nav" aria-label="Admin navigation">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'admin-nav__link admin-nav__link--active' : 'admin-nav__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-profile">
          <span>{profile.name}</span>
          <small>{profile.email || profile.username}</small>
          <button className="admin-link-button" type="button" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
