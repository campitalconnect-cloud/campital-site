import React from 'react';
import { Container } from '../common/Container';
import { PARTNER_LOGOS_CONFIG } from '../../data/homeData';
import { Shield } from 'lucide-react';

export const PartnerLogos = () => {
  if (!PARTNER_LOGOS_CONFIG.showSection) return null;

  return (
    <section className="section" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <Container>
        <div
          style={{
            textAlign: 'center',
            padding: '2.25rem 1.75rem',
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0066ff',
              marginBottom: '0.75rem',
            }}
          >
            <Shield size={16} />
            <span>{PARTNER_LOGOS_CONFIG.placeholderTitle}</span>
          </div>
          <p style={{ fontSize: '0.94rem', color: '#475569', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            {PARTNER_LOGOS_CONFIG.placeholderDescription}
          </p>

          {PARTNER_LOGOS_CONFIG.isPubliclyPopulated && PARTNER_LOGOS_CONFIG.logos.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3rem',
                flexWrap: 'wrap',
                marginTop: '1.5rem',
              }}
            >
              {PARTNER_LOGOS_CONFIG.logos.map((logo, i) => (
                <div key={i} style={{ opacity: 0.8 }}>
                  <img src={logo.src} alt={logo.name} style={{ height: '32px' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
