import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Animated3DBackground } from './components/common/Animated3DBackground';

// Pages
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { YouAre } from './pages/YouAre';
import { Partnerships } from './pages/Partnerships';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { NotFound } from './pages/NotFound';

import { CookieConsent } from './components/common/CookieConsent';

export const App = () => {
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
          <Route path="/partnerships" element={<Partnerships />} />
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
