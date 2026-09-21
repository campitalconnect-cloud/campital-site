import React from 'react';
import { Container } from './Container';

export const PageHeader = ({
  eyebrow,
  bannerText,
  title,
  subtitle,
  children,
  centered = false,
  className = '',
}) => {
  return (
    <section className={`page-header ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Panoramic Electric Cobalt Blue Mesh Banner (Matching Reference Screenshot 3) */}
      <div
        style={{
          width: '100%',
          minHeight: '220px',
          paddingTop: '6.5rem',
          paddingBottom: '3.5rem',
          background: 'linear-gradient(135deg, #0b1536 0%, #173887 45%, #2563eb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 -10px 30px rgba(0,0,0,0.15)',
        }}
      >
        {/* Subtle decorative wave curves */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.18) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(0, 180, 216, 0.25) 0%, transparent 45%)',
            pointerEvents: 'none',
          }}
        />

        <Container>
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: '800',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              margin: 0,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            {bannerText || title}
          </h2>
        </Container>
      </div>

      {/* Editorial Content Below Banner (Matching Reference Screenshot 3) */}
      <div style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }} className="page-header-body">
        <Container narrow={centered}>
          {eyebrow && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                fontWeight: '800',
                color: '#090d1a',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}
            >
              <span>{eyebrow}</span>
              <span style={{ width: '40px', height: '2px', backgroundColor: '#cbd5e1' }} />
            </div>
          )}

          <h1 
            style={{ 
              marginBottom: '1.25rem',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              color: '#090d1a',
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p 
              style={{
                fontSize: '1.15rem',
                lineHeight: '1.65',
                color: '#475569',
                maxWidth: centered ? '720px' : '820px',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}

          {children && <div style={{ marginTop: '2rem' }}>{children}</div>}
        </Container>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .page-header-body {
            padding-top: 2.5rem !important;
            padding-bottom: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
