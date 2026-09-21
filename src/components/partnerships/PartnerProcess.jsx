import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { PARTNER_PROCESS_STEPS } from '../../data/partnerships';

export const PartnerProcess = () => {
  return (
    <section className="section section-alt">
      <Container>
        <SectionHeading
          eyebrow="How to Partner"
          title="The 5-Step Partnership Onboarding"
          subtitle="A structured, transparent onboarding roadmap from introductory conversation to deal-flow integration."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.25rem',
          }}
          className="partner-process-grid"
        >
          {PARTNER_PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '2rem 1.35rem',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#0066ff',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.step}
                </div>

                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.5rem', lineHeight: '1.35', letterSpacing: '-0.01em' }}>
                  {step.title}
                </h4>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  {step.description}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', height: '2px', background: 'rgba(0, 102, 255, 0.15)', width: '100%', borderRadius: '2px' }} />
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .partner-process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .partner-process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
