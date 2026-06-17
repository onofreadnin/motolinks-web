import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteData from './pages/DeleteData';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import ChildSafety from './pages/ChildSafety';
import CookiesPolicy from './pages/CookiesPolicy';
import PartnerWithUs from './pages/PartnerWithUs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminBugReports from './pages/AdminBugReports';
import AdminModerationReports from './pages/AdminModerationReports';
import AuthAction from './pages/AuthAction';

function PublicPage({ children }) {
  return <Layout>{children}</Layout>;
}

function AuthRootRedirect({ children }) {
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const hasAuthParams =
    params.has('code') ||
    params.has('type') ||
    params.has('error') ||
    hashParams.has('access_token') ||
    hashParams.has('refresh_token') ||
    hashParams.has('type') ||
    hashParams.has('error');

  if (hasAuthParams) {
    return <Navigate to={`/auth/action${window.location.search}${window.location.hash}`} replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/" element={<AuthRootRedirect><PublicPage><Home /></PublicPage></AuthRootRedirect>} />
          <Route path="/privacy-policy" element={<PublicPage><PrivacyPolicy /></PublicPage>} />
          <Route path="/delete-data" element={<PublicPage><DeleteData /></PublicPage>} />
          <Route path="/data-deletion" element={<PublicPage><DeleteData /></PublicPage>} />
          <Route path="/terms" element={<PublicPage><Terms /></PublicPage>} />
          <Route path="/contact" element={<PublicPage><Contact /></PublicPage>} />
          <Route path="/child-safety" element={<PublicPage><ChildSafety /></PublicPage>} />
          <Route path="/cookies-policy" element={<PublicPage><CookiesPolicy /></PublicPage>} />
          <Route path="/partner-with-us" element={<PublicPage><PartnerWithUs /></PublicPage>} />
          <Route path="/auth/action" element={<AuthAction />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="bugs" element={<AdminBugReports />} />
            <Route path="reports" element={<AdminModerationReports />} />
          </Route>
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
