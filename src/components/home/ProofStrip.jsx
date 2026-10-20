import React from 'react';
import { Building2 } from 'lucide-react';
import { Container } from '../common/Container';

export const ProofStrip = () => {
  const hubs = [
    'IIT Bombay E-Cell',
    'IIT Madras Research Park',
    'BITS Pilani TBI',
    'IIM Ahmedabad CIIE',
    'IISc SID Bangalore',
    'DTU Innovation Hub',
  ];

  return (
    <section 
      style={{
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        padding: '2.5rem 0',
      }}
      className="proof-strip-section"
    >
      <Container>
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Top Label - Understated, No Pill Badge */}
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#64748B',
            }}
          >
            Built for Founders and Incubators Across Premier University Hubs
          </div>

          {/* Hub Names Badges Strip - Solid Architectural Cards, No Glassmorphism */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
            className="hubs-badge-strip"
          >
            {hubs.map((hub) => (
              <div
                key={hub}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 1rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                  fontSize: '0.86rem',
                  fontWeight: '600',
                  color: '#1E293B',
                }}
              >
                <Building2 size={14} color="#0052FF" />
                <span>{hub}</span>
              </div>
            ))}
          </div>

          {/* 3 Real Numbers Strip - Clear High Contrast, No Neon Glow */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              width: '100%',
              maxWidth: '840px',
              marginTop: '0.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid #E2E8F0',
            }}
            className="proof-metrics-grid"
          >
            <div>
              <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: '800', color: '#0A1128', letterSpacing: '-0.03em' }}>
                ₹2–5 Cr
              </div>
              <div style={{ fontSize: '0.86rem', color: '#475569', fontWeight: '500', marginTop: '0.2rem' }}>
                Seed cheque size per startup
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: '800', color: '#0052FF', letterSpacing: '-0.03em' }}>
                21 Days
              </div>
              <div style={{ fontSize: '0.86rem', color: '#475569', fontWeight: '500', marginTop: '0.2rem' }}>
                Submission to term sheet review
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: '800', color: '#0A1128', letterSpacing: '-0.03em' }}>
                ₹0 Fees
              </div>
              <div style={{ fontSize: '0.86rem', color: '#475569', fontWeight: '500', marginTop: '0.2rem' }}>
                Zero cost for founders to apply or pitch
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 640px) {
          .proof-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
