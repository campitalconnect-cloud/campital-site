import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Users, TrendingUp } from 'lucide-react';
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
        background: 'linear-gradient(180deg, #061129 0%, #09173A 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '3rem 0',
        position: 'relative',
        zIndex: 2,
      }}
      className="proof-strip-section"
    >
      <Container>
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Top Label */}
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#38BDF8',
            }}
          >
            Built for Founders & Incubators Across Premier University Hubs
          </div>

          {/* Hub Names Badges Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 2vw, 1.25rem)',
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
                  gap: '0.5rem',
                  padding: '0.5rem 1.2rem',
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  color: '#F1F5F9',
                  transition: 'all 0.2s ease',
                }}
              >
                <Building2 size={15} color="#38BDF8" />
                <span>{hub}</span>
              </div>
            ))}
          </div>

          {/* 3 Real Numbers / Metrics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2.5rem',
              width: '100%',
              maxWidth: '880px',
              marginTop: '0.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            className="proof-metrics-grid"
          >
            <div>
              <div style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.45rem)', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                ₹2–5 Cr
              </div>
              <div style={{ fontSize: '0.88rem', color: '#94A3B8', fontWeight: '600', marginTop: '0.25rem' }}>
                Cheque size per startup
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.45rem)', fontWeight: '900', color: '#38BDF8', letterSpacing: '-0.03em' }}>
                21 Days
              </div>
              <div style={{ fontSize: '0.88rem', color: '#94A3B8', fontWeight: '600', marginTop: '0.25rem' }}>
                Intake to term sheet review
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.45rem)', fontWeight: '900', color: '#10B981', letterSpacing: '-0.03em' }}>
                ₹0 Fees
              </div>
              <div style={{ fontSize: '0.88rem', color: '#94A3B8', fontWeight: '600', marginTop: '0.25rem' }}>
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
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
