import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { hasSupabaseConfig, supabase } from '../lib/supabase';

const APP_LOGIN_URL = import.meta.env.VITE_APP_LOGIN_URL ?? 'motolinks://login';

function collectAuthParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const params = new URLSearchParams(searchParams);

  hashParams.forEach((value, key) => {
    if (!params.has(key)) {
      params.set(key, value);
    }
  });

  return params;
}

function friendlyError(error) {
  return error?.message || 'This account link is invalid or has expired.';
}

export default function AuthAction() {
  const params = useMemo(() => collectAuthParams(), []);
  const requestedAction = params.get('action');
  const initialType = params.get('type');
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Finishing your secure MotoLinks account link...');
  const [mode, setMode] = useState(requestedAction === 'reset-password' || initialType === 'recovery' ? 'reset' : 'confirm');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function completeLink() {
      if (!hasSupabaseConfig || !supabase) {
        setStatus('error');
        setMessage('Supabase is not configured for this website.');
        return;
      }

      try {
        const errorDescription = params.get('error_description') || params.get('error');
        if (errorDescription) {
          throw new Error(errorDescription);
        }

        const code = params.get('code');
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        let session = null;

        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          session = data.session;
        } else if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
          session = data.session;
        } else {
          throw new Error('This account link is missing session details.');
        }

        if (!active) return;

        const resolvedType = params.get('type');
        const resolvedMode = requestedAction === 'reset-password' || resolvedType === 'recovery' ? 'reset' : 'confirm';
        setMode(resolvedMode);

        if (resolvedMode === 'reset') {
          if (!session?.user?.email_confirmed_at) {
            await supabase.auth.signOut();
            setStatus('error');
            setMessage('Please verify your email before resetting your MotoLinks password.');
            return;
          }

          setStatus('ready');
          setMessage('Choose a new password for your MotoLinks account.');
          return;
        }

        await supabase.auth.signOut();
        setStatus('success');
        setMessage('Your email is confirmed. You can now sign in to MotoLinks.');
      } catch (error) {
        if (!active) return;
        setStatus('error');
        setMessage(friendlyError(error));
      }
    }

    void completeLink();

    return () => {
      active = false;
    };
  }, [params, requestedAction]);

  const submitPassword = async (event) => {
    event.preventDefault();

    if (password.trim().length < 6) {
      setStatus('ready');
      setMessage('Use at least 6 characters for your new password.');
      return;
    }

    if (password !== confirmPassword) {
      setStatus('ready');
      setMessage('Enter the same password twice.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: password.trim() });
      if (error) throw error;

      await supabase.auth.signOut();
      setStatus('success');
      setMessage('Your password has been updated. Sign in with your new password in the MotoLinks app.');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setStatus('ready');
      setMessage(friendlyError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-action-screen">
      <section className="auth-action-card">
        <a className="admin-auth-brand" href="/">
          <img src="/brand/motolinks-icon.png" alt="" aria-hidden="true" />
          <span>MotoLinks</span>
        </a>

        <p className="eyebrow">{mode === 'reset' ? 'Password reset' : 'Email verification'}</p>
        <h1>{mode === 'reset' ? 'Secure your account.' : 'Email confirmed.'}</h1>
        <p className={status === 'error' ? 'auth-action-message auth-action-message--error' : 'auth-action-message'}>
          {message}
        </p>

        {status === 'loading' ? (
          <div className="auth-action-loader" aria-label="Loading" />
        ) : null}

        {status === 'ready' && mode === 'reset' ? (
          <form className="auth-action-form" onSubmit={submitPassword}>
            <label>
              <span>New password</span>
              <input
                autoComplete="new-password"
                disabled={submitting}
                minLength={6}
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>

            <label>
              <span>Confirm password</span>
              <input
                autoComplete="new-password"
                disabled={submitting}
                minLength={6}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                type="password"
                value={confirmPassword}
              />
            </label>

            <button className="button button--primary auth-action-submit" disabled={submitting} type="submit">
              {submitting ? 'Updating...' : 'Update password'}
            </button>
          </form>
        ) : null}

        {status === 'success' ? (
          <div className="auth-action-actions">
            <a className="button button--primary" href={APP_LOGIN_URL}>Open MotoLinks app</a>
            <Link className="button button--secondary" to="/">Back to website</Link>
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="auth-action-actions">
            <Link className="button button--primary" to="/contact">Contact support</Link>
            <Link className="button button--secondary" to="/">Back to website</Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
