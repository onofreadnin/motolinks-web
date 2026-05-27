import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLogin() {
  const { authError, isAdmin, isSupabaseReady, login, profile, ready } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin';

  if (ready && profile && isAdmin) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login({ email: email.trim(), password });
      navigate(from, { replace: true });
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-screen admin-screen--center">
      <section className="admin-auth-card">
        <NavHome />
        <p className="eyebrow">Admin</p>
        <h1>Sign in</h1>
        <p className="admin-muted">MotoLinks operations access is restricted to admin profiles.</p>

        {!isSupabaseReady ? (
          <div className="admin-alert admin-alert--warning">
            Missing `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY`.
          </div>
        ) : null}

        {authError || error ? (
          <div className="admin-alert">{error || authError}</div>
        ) : null}

        <form className="admin-form" onSubmit={onSubmit}>
          <label>
            <span>Email</span>
            <input
              autoComplete="email"
              disabled={!isSupabaseReady || submitting}
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>

          <label>
            <span>Password</span>
            <input
              autoComplete="current-password"
              disabled={!isSupabaseReady || submitting}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>

          <button className="button button--primary admin-submit" disabled={!isSupabaseReady || submitting} type="submit">
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
}

function NavHome() {
  return (
    <a className="admin-auth-brand" href="/">
      <img src="/brand/motolinks-icon.png" alt="" aria-hidden="true" />
      <span>MotoLinks</span>
    </a>
  );
}
