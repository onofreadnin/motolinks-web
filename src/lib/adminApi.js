import { supabase } from './supabase';

const PROFILE_COLUMNS = 'id, username, full_name, email, city, bike, suspended, is_admin';
const RIDE_COLUMNS = 'id, title, host_id, departure_at, status, visibility';

export async function getAdminMetrics() {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase.rpc('get_admin_metrics');
  if (error) throw error;
  if (!data || typeof data !== 'object') throw new Error('Admin metrics are unavailable.');

  return data;
}

export async function getProfilesByIds(ids) {
  if (!supabase || ids.length === 0) return new Map();

  const uniqueIds = [...new Set(ids.filter(Boolean))];
  if (uniqueIds.length === 0) return new Map();

  const { data, error } = await supabase
    .from('profiles')
    .select(PROFILE_COLUMNS)
    .in('id', uniqueIds);

  if (error) return new Map();

  return new Map((data ?? []).map((profile) => [profile.id, profile]));
}

export async function getRidesByIds(ids) {
  if (!supabase || ids.length === 0) return new Map();

  const uniqueIds = [...new Set(ids.filter(Boolean))];
  if (uniqueIds.length === 0) return new Map();

  const { data, error } = await supabase
    .from('rides')
    .select(RIDE_COLUMNS)
    .in('id', uniqueIds);

  if (error) return new Map();

  return new Map((data ?? []).map((ride) => [ride.id, ride]));
}

export async function getRecentRiders(limit = 8) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('profiles')
    .select(PROFILE_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getAppBugReports() {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('app_bug_reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw error;

  const reporterProfiles = await getProfilesByIds((data ?? []).map((report) => report.reporter_id));
  return (data ?? []).map((report) => ({
    ...report,
    reporter: reporterProfiles.get(report.reporter_id) ?? null,
  }));
}

export async function getModerationReports() {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw error;

  const reporterProfiles = await getProfilesByIds((data ?? []).map((report) => report.reporter_id));
  const reportedProfiles = await getProfilesByIds((data ?? []).map((report) => report.reported_user_id));
  const reportedRides = await getRidesByIds((data ?? []).map((report) => report.reported_ride_id));

  return (data ?? []).map((report) => ({
    ...report,
    reporter: reporterProfiles.get(report.reporter_id) ?? null,
    reportedUser: reportedProfiles.get(report.reported_user_id) ?? null,
    reportedRide: reportedRides.get(report.reported_ride_id) ?? null,
  }));
}

export async function updateAppBugReport(id, updates) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('app_bug_reports')
    .update({
      admin_notes: updates.adminNotes ?? null,
      status: updates.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
}

export async function updateModerationReport(id, updates) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('reports')
    .update({
      admin_notes: updates.adminNotes ?? null,
      status: updates.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
}
