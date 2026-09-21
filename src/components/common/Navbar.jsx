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
    <div
      style={{
        position: 'fixed',
        top: '0.75rem',
        left: 0,
        right: 0,
        zIndex: 'var(--z-header)',
        padding: '0 1.25rem',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
      }}
      className="navbar-wrapper"
    >
      <header
        style={{
          width: '100%',
          maxWidth: '1420px',
          pointerEvents: 'auto',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled
            ? 'linear-gradient(135deg, rgba(228, 242, 255, 0.96) 0%, rgba(214, 235, 255, 0.92) 100%)'
            : 'linear-gradient(135deg, rgba(236, 246, 255, 0.92) 0%, rgba(222, 240, 255, 0.86) 100%)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1.5px solid rgba(0, 102, 255, 0.22)',
          borderRadius: isMobileMenuOpen ? '20px 20px 0 0' : '20px',
          boxShadow: isScrolled
            ? '0 14px 40px rgba(0, 82, 255, 0.14), 0 2px 10px rgba(15, 23, 42, 0.05)'
            : '0 8px 30px rgba(0, 82, 255, 0.08), 0 2px 8px rgba(15, 23, 42, 0.03)',
          padding: isScrolled ? '0.65rem 1.75rem' : '0.85rem 2rem',
          position: 'relative',
        }}
        className="navbar-inner"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    fontWeight: isActive ? '800' : '600',
                    fontSize: '0.95rem',
                    position: 'relative',
                    padding: '0.45rem 0',
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
                        background: 'linear-gradient(90deg, #0052ff, #0066ff, #00b4d8)',
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
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderColor: 'rgba(0, 102, 255, 0.25)',
                color: '#0052ff',
                fontWeight: '700',
              }}
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
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1.5px solid rgba(0, 102, 255, 0.25)',
              color: '#0066ff',
              padding: '0.5rem',
              borderRadius: '8px',
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
                left: '-1.5px',
                right: '-1.5px',
                backgroundColor: 'rgba(235, 245, 255, 0.98)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: '1.5px solid rgba(0, 102, 255, 0.22)',
                borderTop: '1px solid rgba(0, 102, 255, 0.12)',
                borderRadius: '0 0 20px 20px',
                padding: '1.5rem 1.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                boxShadow: '0 25px 50px rgba(0, 82, 255, 0.15)',
                maxHeight: 'calc(100vh - 95px)',
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
                        backgroundColor: isActive ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(0, 102, 255, 0.15)' }}>
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
                  style={{ backgroundColor: '#ffffff', borderColor: 'rgba(0, 102, 255, 0.3)' }}
                >
                  {CTA_ACTIONS.BECOME_PARTNER.label}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav, .desktop-ctas {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .navbar-wrapper {
            padding: 0 0.75rem !important;
            top: 0.5rem !important;
          }
          .navbar-inner {
            padding: 0.65rem 1.15rem !important;
          }
        }
      `}</style>
    </div>
  );
};
