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
        backgroundColor: '#ffffff',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Why Campital"
          title="Built for Outcomes, Not Grant Cycles"
          subtitle="Four core principles define how Campital turns campus innovation into investable enterprise value."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            marginTop: '3.5rem',
          }}
          className="why-grid"
        >
          {WHY_CAMPITAL_PILLARS.map((pillar, index) => {
            const Icon = iconMap[pillar.icon] || ShieldCheck;
            return (
              <motion.div
                key={pillar.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={index}
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                className="why-card"
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(0, 180, 216, 0.15))',
                    color: '#0066ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={26} />
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      color: '#0066ff',
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
                      color: '#090d1a',
                      marginBottom: '0.65rem',
                      letterSpacing: '-0.02em',
                      lineHeight: '1.3',
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.98rem',
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
                      color: '#0052ff',
                      backgroundColor: 'rgba(0, 102, 255, 0.06)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '8px',
                    }}
                  >
                    <span>{pillar.highlight}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      <style>{`
        .why-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 102, 255, 0.35) !important;
          box-shadow: 0 16px 36px rgba(0, 82, 255, 0.08) !important;
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

