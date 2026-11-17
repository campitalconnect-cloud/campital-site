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

// Admin CRM Pages (Obfuscated Desk Route)
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminSubscribers } from './pages/admin/AdminSubscribers';
import { AdminEvents } from './pages/admin/AdminEvents';

export const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/portal-desk-92');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/portal-desk-92/login" element={<AdminLogin />} />
        <Route path="/portal-desk-92" element={<AdminLayout />}>
          <Route index element={<AdminLeads />} />
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
