import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Animated3DBackground } from './components/common/Animated3DBackground';

// Public Pages
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { YouAre } from './pages/YouAre';
import { HowWeFund } from './pages/HowWeFund';
import { ProgramsEvents } from './pages/ProgramsEvents';
import { Partnerships } from './pages/Partnerships';
import { Insights } from './pages/Insights';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { NotFound } from './pages/NotFound';
import { CookieConsent } from './components/common/CookieConsent';

// Admin CRM Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPipeline } from './pages/admin/AdminPipeline';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminSubscribers } from './pages/admin/AdminSubscribers';
import { AdminEvents } from './pages/admin/AdminEvents';

export const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pipeline" element={<AdminPipeline />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="subscribers" element={<AdminSubscribers />} />
          <Route path="events" element={<AdminEvents />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Animated3DBackground />
      <ScrollToTop />
      <Navbar />
      <main className="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/team" element={<AboutUs />} />
          <Route path="/you-are" element={<YouAre />} />
          <Route path="/how-we-fund" element={<HowWeFund />} />
          <Route path="/programs-events" element={<ProgramsEvents />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};
