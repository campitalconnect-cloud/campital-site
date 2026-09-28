import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown, Rocket, Building2, Briefcase, GraduationCap, Handshake, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CTA_ACTIONS } from '../../config/navigation';
import { Logo } from './Logo';
import { Button } from './Button';

const NAV_STRUCTURE = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  {
    label: 'Pathways',
    path: '/you-are',
    dropdown: [
      {
        label: 'Startups',
        desc: 'Campus-born ventures seeking seed equity & mentorship',
        path: '/you-are?persona=startup',
        icon: Rocket,
      },
      {
        label: 'Campus Incubators',
        desc: 'Partner hubs connecting student cohorts to capital',
        path: '/you-are?persona=incubator',
        icon: Building2,
      },
      {
        label: 'SME Growth',
        desc: 'Established enterprises ready for expansion funding',
        path: '/you-are?persona=sme',
        icon: Briefcase,
      },
      {
        label: 'Faculty & Lab IP',
        desc: 'Commercializing university research & patents',
        path: '/you-are?persona=faculty',
        icon: GraduationCap,
      },
    ],
  },
  { label: 'How We Fund', path: '/how-we-fund' },
  { label: 'Programs & Events', path: '/programs-events' },
  {
    label: 'Resources',
    path: '/insights',
    dropdown: [
      {
        label: 'Partnerships',
        desc: 'Capital partners, sponsors, and ecosystem allies',
        path: '/partnerships',
        icon: Handshake,
      },
      {
        label: 'Insights & Research',
        desc: 'Reports, articles, and campus venture benchmarks',
        path: '/insights',
        icon: BookOpen,
      },
    ],
  },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (label) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '84px',
        zIndex: 'var(--z-header, 9999)',
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.94)'
          : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(18, 100, 255, 0.08)',
        boxShadow: isScrolled
          ? '0 6px 24px rgba(18, 100, 255, 0.08)'
          : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
      }}
      className="global-navbar"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Left: Campital Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Logo size="md" />
        </div>

        {/* Center: Navigation Links with Modern Dropdowns */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
          className="desktop-nav"
          aria-label="Main Navigation"
        >
          {NAV_STRUCTURE.map((item) => {
            const hasDropdown = Boolean(item.dropdown);
            const isCurrentSection = hasDropdown 
              ? item.dropdown.some(sub => location.pathname === sub.path || location.pathname.startsWith(sub.path + '/'))
              : location.pathname === item.path;

            return (
              <div
                key={item.label}
                onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                style={{ position: 'relative' }}
                className="nav-item-wrapper"
              >
                {hasDropdown ? (
                  <button
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: isCurrentSection || activeDropdown === item.label ? '#1264FF' : '#08152F',
                      fontWeight: isCurrentSection ? '700' : '600',
                      fontSize: '0.94rem',
                      background: 'none',
                      border: 'none',
                      padding: '0.5rem 0.2rem',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    className="nav-dropdown-trigger"
                    aria-expanded={activeDropdown === item.label}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={15}
                      style={{
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    style={{
                      color: isCurrentSection ? '#1264FF' : '#08152F',
                      fontWeight: isCurrentSection ? '700' : '600',
                      fontSize: '0.94rem',
                      position: 'relative',
                      padding: '0.5rem 0.2rem',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      transition: 'color 0.18s ease',
                    }}
                    className="nav-link-item"
                  >
                    <span>{item.label}</span>
                    {isCurrentSection && (
                      <motion.div
                        layoutId="nav-active-line"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2.5px',
                          borderRadius: '2px',
                          backgroundColor: '#1264FF',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )}

                {/* Modern Dropdown Popover */}
                {hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '-20px',
                          paddingTop: '0.75rem',
                          zIndex: 100,
                          minWidth: '290px',
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(255, 255, 255, 0.96)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            borderRadius: '18px',
                            border: '1px solid rgba(18, 100, 255, 0.14)',
                            boxShadow: '0 20px 48px rgba(8, 21, 47, 0.12), 0 4px 16px rgba(18, 100, 255, 0.08)',
                            padding: '0.65rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                          }}
                        >
                          {item.dropdown.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => setActiveDropdown(null)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '0.85rem',
                                  padding: '0.75rem 0.85rem',
                                  borderRadius: '12px',
                                  textDecoration: 'none',
                                  transition: 'background-color 0.18s ease, transform 0.18s ease',
                                }}
                                className="dropdown-link-item"
                              >
                                <div
                                  style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, rgba(18, 100, 255, 0.10) 0%, rgba(32, 200, 244, 0.12) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#1264FF',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                  }}
                                >
                                  <SubIcon size={18} strokeWidth={2.2} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#08152F' }}>
                                    {subItem.label}
                                  </span>
                                  <span style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.35, marginTop: '2px' }}>
                                    {subItem.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Desktop Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }} className="desktop-ctas">
          <Button
            to={CTA_ACTIONS.BECOME_PARTNER.path}
            variant="secondary"
            size="sm"
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid rgba(18, 100, 255, 0.22)',
              color: '#08152F',
              fontWeight: '700',
              borderRadius: '100px',
              padding: '0.55rem 1.15rem',
              fontSize: '0.88rem',
              transition: 'all 0.2s ease',
            }}
          >
            {CTA_ACTIONS.BECOME_PARTNER.label}
          </Button>

          <Button
            to={CTA_ACTIONS.GET_FUNDED.path}
            variant="primary"
            size="sm"
            icon={ArrowUpRight}
            style={{
              background: 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)',
              color: '#ffffff',
              fontWeight: '700',
              borderRadius: '100px',
              padding: '0.55rem 1.25rem',
              fontSize: '0.88rem',
              boxShadow: '0 4px 14px rgba(18, 100, 255, 0.25)',
              border: 'none',
            }}
          >
            {CTA_ACTIONS.GET_FUNDED.label}
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-toggle"
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isMobileMenuOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#1264FF',
            padding: '0.4rem',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay Drawer */}
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
              top: '84px',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(18, 100, 255, 0.12)',
              padding: '1.5rem 1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              maxHeight: 'calc(100vh - 84px)',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(18, 100, 255, 0.12)',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }} aria-label="Mobile Navigation">
              {NAV_STRUCTURE.map((item) => {
                if (item.dropdown) {
                  const isExpanded = mobileExpandedSection === item.label;
                  return (
                    <div key={item.label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <button
                        type="button"
                        onClick={() => setMobileExpandedSection(isExpanded ? null : item.label)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.85rem 0.5rem',
                          background: 'none',
                          border: 'none',
                          fontSize: '1.05rem',
                          fontWeight: '700',
                          color: '#08152F',
                          cursor: 'pointer',
                        }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          style={{
                            transition: 'transform 0.2s ease',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            color: '#1264FF',
                          }}
                        />
                      </button>
                      {isExpanded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.25rem 0.75rem 0.75rem 0.75rem' }}>
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                textDecoration: 'none',
                                padding: '0.5rem 0',
                              }}
                            >
                              <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1264FF' }}>
                                {sub.label}
                              </span>
                              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                                {sub.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      color: isActive ? '#1264FF' : '#08152F',
                      fontWeight: isActive ? '800' : '600',
                      fontSize: '1.05rem',
                      padding: '0.85rem 0.5rem',
                      textDecoration: 'none',
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Button
                to={CTA_ACTIONS.GET_FUNDED.path}
                variant="primary"
                block
                size="md"
                onClick={() => setIsMobileMenuOpen(false)}
                icon={ArrowUpRight}
                style={{
                  background: 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)',
                  height: '52px',
                  borderRadius: '100px',
                  fontWeight: '700',
                }}
              >
                {CTA_ACTIONS.GET_FUNDED.label}
              </Button>
              <Button
                to={CTA_ACTIONS.BECOME_PARTNER.path}
                variant="secondary"
                block
                size="md"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid rgba(18, 100, 255, 0.25)',
                  color: '#08152F',
                  height: '52px',
                  borderRadius: '100px',
                  fontWeight: '700',
                }}
              >
                {CTA_ACTIONS.BECOME_PARTNER.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link-item:hover, .nav-dropdown-trigger:hover {
          color: #1264FF !important;
        }
        .dropdown-link-item:hover {
          background-color: rgba(18, 100, 255, 0.05);
          transform: translateX(3px);
        }
        @media (max-width: 990px) {
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
