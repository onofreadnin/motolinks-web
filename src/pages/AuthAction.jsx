import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { hasSupabaseConfig, supabase } from '../lib/supabase';

const APP_LOGIN_URL = import.meta.env.VITE_APP_LOGIN_URL ?? 'motolinks://login';
const AUTH_REQUEST_TIMEOUT_MS = 45000;

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
  if (error?.code === 'same_password') {
    return 'Choose a password that is different from your current password.';
  }

  return error?.message || 'This account link is invalid or has expired.';
}

function isInvalidOrExpiredLinkMessage(message) {
  return /invalid|expired/i.test(message || '');
}

function withTimeout(promise, message) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(message)), AUTH_REQUEST_TIMEOUT_MS);
  });

  return Promise.race([promise, timeout]).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

function clearAuthParamsFromUrl() {
  window.history.replaceState(null, document.title, window.location.pathname);
}

function resolveMode(params) {
  const requestedAction = params.get('action');
  const type = params.get('type');

  if (requestedAction === 'reset-password' || type === 'recovery') {
    return 'reset';
  }

  if (requestedAction === 'confirm-email' || type === 'signup' || type === 'email_change' || type === 'magiclink') {
    return 'confirm';
  }

  return 'account';
}

function getAuthCopy(mode, status, params, currentMessage = '') {
  const errorCode = params.get('error_code');
  const errorMessage = params.get('error_description') || params.get('error') || currentMessage;
  const expired = errorCode === 'otp_expired' || isInvalidOrExpiredLinkMessage(errorMessage);

  if (status === 'success') {
    if (mode === 'reset') {
      return {
        eyebrow: 'Password reset',
        title: 'Password updated.',
      };
    }

    if (mode === 'confirm') {
      return {
        eyebrow: 'Email verification',
        title: 'Email confirmed.',
      };
    }

    return {
      eyebrow: 'Account link',
      title: 'All set.',
    };
  }

  if (status === 'error') {
    if (expired) {
      if (mode === 'reset') {
        return {
          eyebrow: 'Password reset',
          title: 'Reset link expired.',
          message: 'For your security, password reset links can only be used for a short time. Open MotoLinks and request a fresh reset link.',
        };
      }

      if (mode === 'confirm') {
        return {
          eyebrow: 'Email verification',
          title: 'Verification link expired.',
          message: 'For your security, email verification links can only be used for a short time. Open MotoLinks and request a fresh confirmation email.',
        };
      }

      return {
        eyebrow: 'Account link',
        title: 'This link has expired.',
        message: 'For your security, account links can only be used for a short time. Open MotoLinks and request a fresh password reset or confirmation email.',
      };
    }

    if (mode === 'confirm' && isInvalidOrExpiredLinkMessage(errorMessage)) {
      return {
        eyebrow: 'Email verification',
        title: 'Verification link expired.',
        message: 'This link may have already been used. Try signing in to MotoLinks, or request a fresh confirmation email from the app.',
      };
    }

    return {
      eyebrow: mode === 'reset' ? 'Password reset' : mode === 'confirm' ? 'Email verification' : 'Account link',
      title: 'We could not open this link.',
      message: friendlyError({ message: errorMessage }),
    };
  }

  if (mode === 'reset') {
    return {
      eyebrow: 'Password reset',
      title: 'Secure your account.',
    };
  }

  if (mode === 'confirm') {
    return {
      eyebrow: 'Email verification',
      title: 'Email confirmed.',
    };
  }

  return {
    eyebrow: 'Account link',
    title: 'Finishing account link.',
  };
}

export default function AuthAction() {
  const params = useMemo(() => collectAuthParams(), []);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Finishing your secure MotoLinks account link...');
  const [mode, setMode] = useState(resolveMode(params));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const copy = getAuthCopy(mode, status, params, message);
  const displayMessage = status === 'error' ? copy.message : message;
  const passwordReady = password.trim().length >= 6;
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const statusTone = status === 'success' ? 'success' : status === 'error' ? 'error' : status === 'ready' ? 'ready' : 'loading';
  const formNotice = status === 'ready' && mode === 'reset' && message !== 'Choose a new password for your MotoLinks account.'
    ? message
    : '';

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
          const { data, error } = await withTimeout(
            supabase.auth.exchangeCodeForSession(code),
            'This password reset link took too long to open. Request a fresh reset link and try again.',
          );
          if (error) throw error;
          session = data.session;
        } else if (accessToken && refreshToken) {
          const { data, error } = await withTimeout(
            supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            }),
            'This password reset link took too long to open. Request a fresh reset link and try again.',
          );
          if (error) throw error;
          session = data.session;
        } else {
          throw new Error('This account link is missing session details.');
        }

        if (!active) return;
        clearAuthParamsFromUrl();

        const resolvedMode = resolveMode(params);
        setMode(resolvedMode);

        if (resolvedMode === 'reset') {
          if (!session?.user?.email_confirmed_at) {
            await withTimeout(
              supabase.auth.signOut(),
              'The password reset session could not be closed. Please refresh and try again.',
            );
            setStatus('error');
            setMessage('Please verify your email before resetting your MotoLinks password.');
            return;
          }

          setStatus('ready');
          setMessage('Choose a new password for your MotoLinks account.');
          return;
        }

        setStatus('success');
        setMessage('Your email is confirmed. You can now sign in to MotoLinks.');

        void supabase.auth.signOut().catch(() => undefined);
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
  }, [params]);

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
    setMessage('Updating your password...');
    try {
      const { data: sessionData, error: sessionError } = await withTimeout(
        supabase.auth.getSession(),
        'Could not confirm your reset session. Request a fresh password reset link and try again.',
      );
      if (sessionError) throw sessionError;
      if (!sessionData.session) {
        throw new Error('This reset session is no longer active. Request a fresh password reset link and try again.');
      }

      const { data: updateData, error } = await withTimeout(
        supabase.auth.updateUser({ password: password.trim() }),
        'Password update timed out. If your new password works in the app, you can sign in now. Otherwise request a fresh reset link and try again.',
      );
      if (error) throw error;
      if (!updateData?.user) {
        throw new Error('Password update was not confirmed. Request a fresh reset link and try again.');
      }

      setStatus('success');
      setMessage('Your password has been updated. Sign in with your new password in the MotoLinks app.');
      setPassword('');
      setConfirmPassword('');
      setPasswordVisible(false);

      void supabase.auth.signOut().catch(() => undefined);
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
        <div className="auth-action-brand-row">
          <a className="admin-auth-brand" href="/">
            <img src="/brand/motolinks-icon.png" alt="" aria-hidden="true" />
            <span>MotoLinks</span>
          </a>
          <span className={`auth-action-status-dot auth-action-status-dot--${statusTone}`} aria-hidden="true" />
        </div>

        <div className="auth-action-heading">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className={`auth-action-message auth-action-message--${statusTone}`}>
            {displayMessage}
          </p>
        </div>

        {status === 'loading' ? (
          <div className="auth-action-loading">
            <div className="auth-action-loader" aria-label="Loading" />
            <span>Checking your secure link</span>
          </div>
        ) : null}

        {status === 'ready' && mode === 'reset' ? (
          <form className="auth-action-form" onSubmit={submitPassword}>
            <div className="auth-action-field">
              <label htmlFor="new-password">New password</label>
              <div className="auth-action-input-wrap">
                <input
                  autoComplete="new-password"
                  disabled={submitting}
                  id="new-password"
                  minLength={6}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                />
                <button
                  className="auth-action-ghost-button"
                  disabled={submitting}
                  onClick={() => setPasswordVisible((value) => !value)}
                  type="button"
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="auth-action-field">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                autoComplete="new-password"
                disabled={submitting}
                id="confirm-password"
                minLength={6}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                type={passwordVisible ? 'text' : 'password'}
                value={confirmPassword}
              />
            </div>

            <div className="auth-action-checklist" aria-live="polite">
              <span className={passwordReady ? 'auth-action-check auth-action-check--done' : 'auth-action-check'}>
                At least 6 characters
              </span>
              <span className={passwordsMatch ? 'auth-action-check auth-action-check--done' : 'auth-action-check'}>
                Passwords match
              </span>
            </div>

            {formNotice ? (
              <p className="auth-action-inline-alert" role="alert">
                {formNotice}
              </p>
            ) : null}

            <button className="button button--primary auth-action-submit" disabled={submitting} type="submit">
              {submitting ? 'Updating...' : 'Update password'}
            </button>
          </form>
        ) : null}

        {status === 'success' ? (
          <div className="auth-action-actions">
            <a className="button button--primary" href={APP_LOGIN_URL}>Open MotoLinks app</a>
            <Link className="button button--secondary" to="/">MotoLinks website</Link>
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="auth-action-actions">
            <a className="button button--primary" href={APP_LOGIN_URL}>Open MotoLinks app</a>
            <Link className="button button--secondary" to="/contact">Contact support</Link>
          </div>
        ) : null}

        <p className="auth-action-footnote">
          MotoLinks will never ask for your current password or verification code by email.
        </p>
      </section>
    </main>
  );
}
