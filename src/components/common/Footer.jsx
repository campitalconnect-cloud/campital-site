import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../config/navigation';
import { SITE_CONFIG } from '../../config/siteConfig';
import { Logo } from './Logo';
import { Container } from './Container';
import { Mail, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

const SocialIcon = ({ type }) => {
  if (type === 'linkedin') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    );
  }
  if (type === 'twitter') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    );
  }
  if (type === 'youtube') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  return null;
};

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer
      className="footer-root"
      style={{
        backgroundColor: '#090d1a',
        color: '#ffffff',
        borderTop: '1px solid #1e293b',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr 1fr 0.9fr 1.3fr',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand & Positioning */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo-wrap">
              <Logo size="lg" light />
            </div>
            <p className="footer-brand-desc" style={{ marginTop: '1.25rem', marginBottom: '1.25rem', color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.65', maxWidth: '300px' }}>
              Campital closes the campus capital gap — connecting student ventures, incubators, and SMEs to structured institutional funding.
            </p>
            <div className="footer-badge-wrap">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.3rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(0, 102, 255, 0.15)', border: '1px solid rgba(0, 102, 255, 0.3)', color: '#38bdf8', fontSize: '0.78rem', fontWeight: '700' }}>
                <span>Campus + Capital = Campital</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="footer-col">
            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Platform
            </h4>
            <ul className="footer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s ease', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pathways */}
          <div className="footer-col">
            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Pathways
            </h4>
            <ul className="footer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {FOOTER_LINKS.pathways.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s ease', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="footer-col">
            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Company
            </h4>
            <ul className="footer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s ease', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Office & Brief */}
          <div className="footer-col footer-col-location">
            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Innovation Hub
            </h4>
            <div style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: '1.6', marginBottom: '0.85rem' }}>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.2rem' }}>Campital Innovation Hub</strong>
              Bhive, Ground Floor, JBR Tech Park,<br />
              Whitefield, Bengaluru 560066, India
            </div>

            {/* Find us on Map Link */}
            <div style={{ marginBottom: '1.15rem' }}>
              <a
                href="https://share.google/wSi3xfFpx3vEyw4Li"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#38bdf8',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#38bdf8')}
              >
                <MapPin size={15} />
                <span>Find us on Google Maps ↗</span>
              </a>
            </div>

            <div className="footer-email-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Mail size={15} color="#38bdf8" />
              <a href="mailto:team@campital.in" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '700' }}>
                team@campital.in
              </a>
            </div>

            {isSubscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem 0.85rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '10px', color: '#34d399', fontSize: '0.82rem' }}>
                <CheckCircle2 size={15} />
                <span>Subscribed to The Brief!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ maxWidth: '320px', width: '100%', margin: '0 auto' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#161f38',
                    border: '1px solid #293556',
                    borderRadius: '10px',
                    padding: '0.25rem 0.3rem 0.25rem 0.85rem',
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Work email for Brief..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      outline: 'none',
                      width: '100%',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#0066ff',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>Join</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>


        {/* Bottom Bar: Copyright, Legal & Socials */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid #1e2433',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
          className="footer-bottom"
        >
          <div className="footer-legal-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              All rights reserved — {currentYear} © Campital Platform
            </span>
            <Link to="/privacy-policy" style={{ fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" style={{ fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </div>

          {/* Social Icons */}
          <div className="footer-social-links" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {[
              { type: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
              { type: 'twitter', href: 'https://twitter.com', label: 'X (Twitter)' },
              { type: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
              { type: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
            ].map((social) => {
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#1c2233',
                    border: '1px solid #2d374d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0066ff';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#0066ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1c2233';
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.borderColor = '#2d374d';
                  }}
                >
                  <SocialIcon type={social.type} />
                </a>
              );
            })}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.25rem !important;
          }
          .footer-col-brand {
            grid-column: span 2;
            text-align: center;
          }
          .footer-brand-desc {
            margin: 1rem auto !important;
          }
          .footer-logo-wrap {
            display: flex;
            justify-content: center;
          }
          .footer-badge-wrap {
            display: flex;
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .footer-root {
            padding-top: 3.25rem !important;
            padding-bottom: 2rem !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center !important;
          }
          .footer-col-brand {
            grid-column: span 1;
            text-align: center !important;
          }
          .footer-logo-wrap {
            display: flex;
            justify-content: center;
          }
          .footer-brand-desc {
            margin: 0.85rem auto !important;
            max-width: 100% !important;
          }
          .footer-badge-wrap {
            display: flex;
            justify-content: center;
          }
          .footer-links-list {
            align-items: center !important;
            gap: 0.65rem !important;
          }
          .footer-email-row {
            justify-content: center !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 1.25rem !important;
          }
          .footer-legal-links {
            flex-direction: column !important;
            align-items: center !important;
            gap: 0.65rem !important;
          }
          .footer-social-links {
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  );
};
