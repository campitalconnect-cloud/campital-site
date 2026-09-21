import React from 'react';
import { Container } from '../common/Container';
import { PageHeader } from '../common/PageHeader';
import { AlertTriangle, Clock } from 'lucide-react';

export const LegalLayout = ({
  title,
  lastUpdated = 'September 2024 (Draft)',
  summary,
  children,
}) => {
  return (
    <div>
      <PageHeader
        eyebrow="Legal Information"
        title={title}
        subtitle={summary}
      />

      <section className="section">
        <Container narrow>
          {/* Draft Notice Banner */}
          <div className="alert-box alert-warning" style={{ marginBottom: '2.5rem' }}>
            <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Draft Document Notice:</strong> This document is an initial operational draft describing current platform architecture and frontend data practices. It is pending final corporate and regulatory legal counsel review.
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
              lineHeight: '1.75',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: '#64748b',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <Clock size={15} />
              <span>Last Updated: {lastUpdated}</span>
            </div>

            <div className="legal-content">
              {children}
            </div>
          </div>
        </Container>
      </section>

      <style>{`
        .legal-content h3 {
          font-size: 1.35rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 0.85rem;
          color: #090d1a;
          letter-spacing: -0.02em;
        }
        .legal-content h4 {
          font-size: 1.1rem;
          font-weight: 800;
          margin-top: 1.5rem;
          margin-bottom: 0.6rem;
          color: #0066ff;
        }
        .legal-content p {
          font-size: 0.98rem;
          color: #334155;
          margin-bottom: 1.25rem;
          line-height: 1.7;
        }
        .legal-content ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: #334155;
        }
        .legal-content li {
          margin-bottom: 0.5rem;
          font-size: 0.98rem;
        }
      `}</style>
    </div>
  );
};
