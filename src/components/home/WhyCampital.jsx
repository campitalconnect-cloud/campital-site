import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Sparkles, GitMerge } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { WHY_CAMPITAL_PILLARS } from '../../data/homeData';
import { fadeUpVariant } from '../../utils/motion';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Target: Target,
  Sparkles: Sparkles,
  GitMerge: GitMerge,
};

export const WhyCampital = () => {
  return (
    <section 
      id="why-campital"
      className="section"
      style={{
        background: '#FFFFFF',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Why Campital"
          title="Built for Outcomes, Not Grant Cycles"
          subtitle="Four core principles define how Campital turns campus innovation into investable enterprise value."
          centered
        />

        {/* Panoramic 4-Principles Showcase Visual */}
        <div
          style={{
            maxWidth: '1100px',
            margin: '3rem auto 3.5rem auto',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
            backgroundColor: '#0A1128',
          }}
        >
          <img
            src="/images/why_campital_showcase.png"
            alt="Why Campital: Four core principles defining how Campital turns campus innovation into investable enterprise value"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.75rem',
            marginTop: '3.5rem',
          }}
          className="why-grid"
        >
          {WHY_CAMPITAL_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.icon] || ShieldCheck;
            return (
              <div
                key={pillar.id}
                style={{
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative',
                }}
                className="why-card"
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: '#0A1128',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      color: '#0052FF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Principle {pillar.num}
                  </div>

                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: '800',
                      color: '#0A1128',
                      marginBottom: '0.65rem',
                      letterSpacing: '-0.02em',
                      lineHeight: '1.3',
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.94rem',
                      color: '#475569',
                      lineHeight: '1.6',
                      margin: 0,
                      marginBottom: '1rem',
                    }}
                  >
                    {pillar.description}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      color: '#1E293B',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                    }}
                  >
                    <span>{pillar.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <style>{`
        .why-card:hover {
          border-color: #94A3B8 !important;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07) !important;
        }
        @media (max-width: 860px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

