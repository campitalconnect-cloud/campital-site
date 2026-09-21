import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../config/navigation';
import { SITE_CONFIG } from '../../config/siteConfig';
import { Logo } from './Logo';
import { Container } from './Container';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

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
      style={{
        backgroundColor: '#11141c',
        color: '#ffffff',
        borderTop: '1px solid #1e2433',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr 1.1fr 1.4fr',
            gap: '3rem',
            marginBottom: '4rem',
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand & Positioning */}
          <div>
            <Logo size="lg" light />
            <p style={{ marginTop: '1.5rem', marginBottom: '1.25rem', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.65', maxWidth: '330px' }}>
              Campital connects campus-born startups, campus incubators, and SMEs to structured, compliant institutional capital pipelines.
            </p>
            <p style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
              Fueling Tomorrow's Founders, Today.
            </p>
          </div>

          {/* Column 2: Sitemap */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#38bdf8', marginBottom: '1.35rem', letterSpacing: '-0.01em' }}>
              Sitemap
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: '#cbd5e1', fontSize: '0.92rem', fontWeight: '500', transition: 'color 0.2s ease', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/you-are?persona=startup"
                  style={{ color: '#cbd5e1', fontSize: '0.92rem', fontWeight: '500', transition: 'color 0.2s ease', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                >
                  For Startups
                </Link>
              </li>
              <li>
                <Link
                  to="/you-are?persona=incubator"
                  style={{ color: '#cbd5e1', fontSize: '0.92rem', fontWeight: '500', transition: 'color 0.2s ease', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                >
                  For Incubators
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Office & Hub */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#38bdf8', marginBottom: '1.35rem', letterSpacing: '-0.01em' }}>
              Office
            </h4>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.7' }}>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>Campital Innovation Hub</strong>
              Campus Ecosystem & Capital Bridge<br />
              Koramangala 4th Block,<br />
              Bengaluru, Karnataka 560034<br />
              India
            </div>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#38bdf8', marginBottom: '1.35rem', letterSpacing: '-0.01em' }}>
              Subscribe to our newsletter
            </h4>

            {isSubscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '9999px', color: '#34d399', fontSize: '0.875rem' }}>
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ marginBottom: '1.5rem' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#1c2233',
                    border: '1px solid #2d374d',
                    borderRadius: '9999px',
                    padding: '0.3rem 0.35rem 0.3rem 1.1rem',
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                      width: '100%',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#272f44',
                      color: '#ffffff',
                      border: '1px solid #3e4c6d',
                      borderRadius: '9999px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0066ff';
                      e.currentTarget.style.borderColor = '#0066ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#272f44';
                      e.currentTarget.style.borderColor = '#3e4c6d';
                    }}
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              <Mail size={15} color="#38bdf8" />
              <a href="mailto:team@campital.in" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>
                team@campital.in
              </a>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Campital operates compliant institutional pipeline introductions with accredited angel networks and funds.
            </p>
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
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            All rights reserved — {currentYear} © Campital Platform
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};
