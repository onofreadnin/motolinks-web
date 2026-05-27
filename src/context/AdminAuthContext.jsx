import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { hasSupabaseConfig, supabase } from '../lib/supabase';

const AdminAuthContext = createContext(null);

function mapProfile(row) {
  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    name: row.full_name || row.username || 'MotoLinks admin',
    email: row.email || '',
    isAdmin: Boolean(row.is_admin),
  };
}

async function fetchProfile(userId) {
  if (!supabase || !userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, email, is_admin')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return mapProfile(data);
}

export function AdminAuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function hydrate() {
      try {
        if (!supabase) return;

        const { data } = await supabase.auth.getSession();
        const currentSession = data.session ?? null;
        const currentProfile = currentSession?.user
          ? await fetchProfile(currentSession.user.id)
          : null;

        if (!mounted) return;
        setSession(currentSession);
        setProfile(currentProfile);

        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
          if (!mounted) return;
          setSession(nextSession ?? null);
          setAuthError('');

          if (!nextSession?.user) {
            setProfile(null);
            return;
          }

          try {
            setProfile(await fetchProfile(nextSession.user.id));
          } catch (error) {
            setProfile(null);
            setAuthError(error.message || 'Unable to load admin profile.');
          }
        });

        return () => listener.subscription.unsubscribe();
      } catch (error) {
        if (mounted) {
          setAuthError(error.message || 'Unable to restore admin session.');
        }
      } finally {
        if (mounted) setReady(true);
      }
    }

    const cleanup = hydrate();
    return () => {
      mounted = false;
      cleanup.then((teardown) => {
        if (typeof teardown === 'function') teardown();
      }).catch(() => undefined);
    };
  }, []);

  const login = async ({ email, password }) => {
    if (!supabase) {
      throw new Error('Supabase is not configured for the web dashboard.');
    }

    setAuthError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const nextProfile = await fetchProfile(data.user?.id);
    if (!nextProfile?.isAdmin) {
      await supabase.auth.signOut();
      setSession(null);
      setProfile(null);
      throw new Error('This account does not have MotoLinks admin access.');
    }

    setSession(data.session ?? null);
    setProfile(nextProfile);
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setProfile(null);
  };

  const value = useMemo(
    () => ({
      authError,
      isAdmin: Boolean(profile?.isAdmin),
      isSupabaseReady: hasSupabaseConfig,
      login,
      logout,
      profile,
      ready,
      session,
    }),
    [authError, profile, ready, session],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider.');
  }
  return context;
}
