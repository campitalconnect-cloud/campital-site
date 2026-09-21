import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ABOUT_VALUES_DATA } from '../../data/aboutData';
import { CheckCircle2, RefreshCw, Shield, Globe } from 'lucide-react';

const iconMap = {
  CheckCircle2: CheckCircle2,
  RefreshCw: RefreshCw,
  Shield: Shield,
  Globe: Globe,
};

export const ValuesSection = () => {
  return (
    <section className="section" style={{ backgroundColor: '#f8fafc', paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
      <Container>
        <SectionHeading
          eyebrow="Our Principles"
          title="Values That Guide the Pipeline"
          subtitle="How Campital evaluates startups, partners with universities, and maintains institutional trust."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            maxWidth: '1020px',
            margin: '0 auto',
          }}
          className="values-grid"
        >
          {ABOUT_VALUES_DATA.map((value, idx) => {
            const Icon = iconMap[value.icon] || CheckCircle2;
            return (
              <div
                key={idx}
                style={{
                  padding: '2.25rem',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  gap: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(0, 102, 255, 0.08)',
                    border: '1px solid rgba(0, 102, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0066ff',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.6rem', color: '#090d1a', letterSpacing: '-0.02em' }}>
                    {value.title}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                    "{value.description}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
