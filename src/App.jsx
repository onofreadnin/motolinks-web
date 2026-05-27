import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteData from './pages/DeleteData';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import ChildSafety from './pages/ChildSafety';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminBugReports from './pages/AdminBugReports';
import AdminModerationReports from './pages/AdminModerationReports';

function PublicPage({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/" element={<PublicPage><Home /></PublicPage>} />
          <Route path="/privacy-policy" element={<PublicPage><PrivacyPolicy /></PublicPage>} />
          <Route path="/delete-data" element={<PublicPage><DeleteData /></PublicPage>} />
          <Route path="/data-deletion" element={<PublicPage><DeleteData /></PublicPage>} />
          <Route path="/terms" element={<PublicPage><Terms /></PublicPage>} />
          <Route path="/contact" element={<PublicPage><Contact /></PublicPage>} />
          <Route path="/child-safety" element={<PublicPage><ChildSafety /></PublicPage>} />
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
