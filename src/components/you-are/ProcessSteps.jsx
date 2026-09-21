import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ProcessSteps = ({ steps = [], personaTitle = '' }) => {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Step-by-Step Pathway
        </h3>
        <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
          How qualified {personaTitle.toLowerCase()} applicants and partners navigate the pipeline from discovery to term sheet.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length > 4 ? 5 : steps.length}, 1fr)`,
          gap: '1.25rem',
        }}
        className="process-grid"
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              padding: '2rem 1.35rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
              position: 'relative',
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
                  marginBottom: '0.85rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {step.step}
              </div>

              {step.title && (
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.5rem', lineHeight: '1.35', letterSpacing: '-0.01em' }}>
                  {step.title}
                </h4>
              )}

              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                {step.description}
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%', height: '2px', background: 'rgba(0, 102, 255, 0.15)', borderRadius: '2px' }} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 990px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
