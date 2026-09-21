import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CTA_ACTIONS } from '../../config/navigation';
import { Logo } from './Logo';
import { Button } from './Button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-header)',
        transition: 'background-color 0.25s ease, border-color 0.25s ease, padding 0.25s ease, box-shadow 0.25s ease',
        backgroundColor: isScrolled ? 'rgba(238, 245, 255, 0.95)' : 'rgba(242, 247, 255, 0.88)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderBottom: isScrolled ? '1px solid rgba(0, 102, 255, 0.18)' : '1px solid rgba(0, 102, 255, 0.1)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 82, 255, 0.08)' : '0 4px 20px rgba(0, 82, 255, 0.03)',
        padding: isScrolled ? '0.75rem 0' : '1.1rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="desktop-nav"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = link.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive ? '#0066ff' : '#090d1a',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.95rem',
                  position: 'relative',
                  padding: '0.5rem 0',
                  transition: 'color 0.15s ease',
                  textDecoration: 'none',
                }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      background: '#0066ff',
                      borderRadius: '2px',
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }} className="desktop-ctas">
          <Button
            to={CTA_ACTIONS.BECOME_PARTNER.path}
            variant="secondary"
            size="sm"
          >
            {CTA_ACTIONS.BECOME_PARTNER.label}
          </Button>
          <Button
            to={CTA_ACTIONS.GET_FUNDED.path}
            variant="primary"
            size="sm"
            icon={ArrowUpRight}
          >
            {CTA_ACTIONS.GET_FUNDED.label}
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-toggle"
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isMobileMenuOpen}
          style={{
            display: 'none',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            color: '#090d1a',
            padding: '0.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#f1f6fe',
              borderBottom: '1px solid rgba(0, 102, 255, 0.18)',
              padding: '1.5rem var(--container-padding) 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '0 20px 45px rgba(0, 82, 255, 0.12)',
              maxHeight: 'calc(100vh - 75px)',
              overflowY: 'auto',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = link.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      color: isActive ? '#0066ff' : '#090d1a',
                      fontWeight: isActive ? '800' : '600',
                      fontSize: '1.05rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: isActive ? 'rgba(0, 102, 255, 0.08)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <Button
                to={CTA_ACTIONS.GET_FUNDED.path}
                variant="primary"
                block
                size="md"
                onClick={() => setIsMobileMenuOpen(false)}
                icon={ArrowUpRight}
              >
                {CTA_ACTIONS.GET_FUNDED.label}
              </Button>
              <Button
                to={CTA_ACTIONS.BECOME_PARTNER.path}
                variant="secondary"
                block
                size="md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {CTA_ACTIONS.BECOME_PARTNER.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav, .desktop-ctas {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
