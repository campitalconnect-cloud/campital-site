import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, CheckCircle2, Zap, Rocket, Award, ShieldCheck } from 'lucide-react';
import { Container } from '../common/Container';
import { fadeUpVariant } from '../../utils/motion';

const STAGES = [
  {
    step: '01',
    title: 'Campus Idea',
    description: 'You have a team and a prototype, inside a partner incubator or on your own.',
    icon: Compass,
    badge: 'Stage 1',
  },
  {
    step: '02',
    title: 'Demo-Day Ready',
    description: "You've pitched through a Campital hackathon, demo day or pitch competition.",
    icon: Zap,
    badge: 'Stage 2',
  },
  {
    step: '03',
    title: 'Investment Ready',
    description: "You're on the shortlist, with evaluation feedback and a clear raise.",
    icon: Award,
    badge: 'Stage 3',
  },
  {
    step: '04',
    title: 'Funded',
    description: "You've closed through Campital's compliant capital route.",
    icon: Rocket,
    badge: 'Stage 4',
  },
];

export const FounderJourney = () => {
  return (
    <section
      id="founder-journey"
      className="section"
      style={{
        backgroundColor: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Container>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(0, 102, 255, 0.08)',
              border: '1px solid rgba(0, 102, 255, 0.2)',
              color: '#0066ff',
              fontSize: '0.82rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}
          >
            <Compass size={14} />
            <span>Your Path</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: '800',
              color: '#090d1a',
              letterSpacing: '-0.03em',
              lineHeight: '1.2',
              marginBottom: '1.25rem',
            }}
          >
            Wherever you are, <br className="hidden-mobile" />
            <span
              style={{
                background: 'linear-gradient(135deg, #0052ff 0%, #00b4d8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              there's a next step.
            </span>
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.65', maxWidth: '680px', margin: '0 auto' }}>
            We provide a clear progression model from the initial campus prototype to institutional investment readiness.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
          className="journey-grid"
        >
          {STAGES.map((stage, index) => {
            const IconComponent = stage.icon;
            return (
              <motion.div
                key={stage.step}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '2rem 1.6rem',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="journey-card"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(0, 180, 216, 0.15))',
                      color: '#0066ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      color: '#0066ff',
                      backgroundColor: 'rgba(0, 102, 255, 0.08)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {stage.badge}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '0.35rem',
                  }}
                >
                  Step {stage.step}
                </div>

                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: '800',
                    color: '#090d1a',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stage.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#64748b',
                    lineHeight: '1.6',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {stage.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Link to How We Fund */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/how-we-fund"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#0066ff',
              fontWeight: '700',
              fontSize: '1.05rem',
              textDecoration: 'none',
              padding: '0.65rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              border: '1.5px solid rgba(0, 102, 255, 0.25)',
              boxShadow: '0 2px 10px rgba(0, 102, 255, 0.08)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = '#0066ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.25)';
            }}
          >
            <span>See how we fund</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </Container>

      <style>{`
        .journey-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 102, 255, 0.4) !important;
          box-shadow: 0 16px 36px rgba(0, 82, 255, 0.1) !important;
        }
        @media (max-width: 992px) {
          .journey-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .journey-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
