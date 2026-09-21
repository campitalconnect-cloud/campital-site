import React from 'react';
import { Container } from '../common/Container';
import { TRACTION_METRICS } from '../../data/homeData';
import { Clock } from 'lucide-react';

export const Traction = () => {
  return (
    <section className="section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      <Container>
        <div
          className="card"
          style={{
            padding: '2.75rem 2.25rem',
            backgroundColor: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
                Pipeline Activity & Metrics
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#64748b', margin: 0 }}>
                {TRACTION_METRICS.placeholderNotice}
              </p>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: '#d97706',
                background: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                padding: '0.4rem 0.95rem',
                borderRadius: '9999px',
              }}
            >
              <Clock size={14} />
              <span>Inaugural Cohort In Progress</span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.75rem',
            }}
            className="traction-grid"
          >
            {TRACTION_METRICS.metrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: 'center',
                  padding: '1.75rem 1.25rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '14px',
                  border: '1.5px solid #e2e8f0',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: '800',
                    color: '#0066ff',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.4rem',
                  }}
                >
                  {TRACTION_METRICS.isVerified && metric.value ? metric.value : metric.placeholderText}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#334155', fontWeight: '700' }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .traction-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
