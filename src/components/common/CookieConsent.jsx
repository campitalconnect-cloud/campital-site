import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from './Button';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('campital_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('campital_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('campital_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            maxWidth: '440px',
            width: 'calc(100% - 3rem)',
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(0, 102, 255, 0.22)',
            borderRadius: '18px',
            boxShadow: '0 20px 50px rgba(0, 82, 255, 0.15), 0 4px 15px rgba(15, 23, 42, 0.06)',
            padding: '1.35rem 1.5rem',
          }}
          className="cookie-consent-modal"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent notice"
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(0, 102, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066ff' }}>
                <ShieldCheck size={18} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#090d1a', margin: 0 }}>
                Privacy & Cookies
              </h4>
            </div>
            <button
              onClick={handleDecline}
              aria-label="Dismiss cookie notice"
              style={{
                color: '#94a3b8',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.2rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55, margin: '0 0 1.15rem' }}>
            We use essential cookies to deliver a fast, secure user experience and analyze platform traffic in accordance with our{' '}
            <Link to="/privacy-policy" style={{ color: '#0066ff', fontWeight: '700', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAccept}
              style={{ flex: 1, padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            >
              Accept All
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDecline}
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', borderColor: '#cbd5e1' }}
            >
              Essential Only
            </Button>
          </div>

          <style>{`
            @media (max-width: 600px) {
              .cookie-consent-modal {
                bottom: 1rem !important;
                right: 1rem !important;
                left: 1rem !important;
                width: auto !important;
                max-width: none !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
