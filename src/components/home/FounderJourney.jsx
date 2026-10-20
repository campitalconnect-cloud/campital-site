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
    description: "You've closed through Campital's structured equity capital route.",
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
        background: '#F8FAFC',
        position: 'relative',
        borderBottom: '1px solid #E2E8F0',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
      }}
    >
      <Container>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0052FF',
              marginBottom: '0.75rem',
            }}
          >
            Your Path
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: '800',
              color: '#0A1128',
              letterSpacing: '-0.03em',
              lineHeight: '1.2',
              marginBottom: '1.25rem',
            }}
          >
            Wherever you are, <br className="hidden-mobile" />
            <span style={{ color: '#0052FF' }}>
              there's a next step.
            </span>
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.65', maxWidth: '680px', margin: '0 auto' }}>
            We provide a clear progression model from the initial campus prototype to institutional investment readiness.
          </p>
        </div>

        {/* Panoramic Mountain Trail Progression Visual */}
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto 3rem auto',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
            backgroundColor: '#0A1128',
          }}
        >
          <img
            src="/images/founder_journey_trail.png"
            alt="Your Path: Progression model from Campus Idea to Demo-Day Ready to Investment Ready to Funded"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
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
          {STAGES.map((stage) => {
            const IconComponent = stage.icon;
            return (
              <div
                key={stage.step}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '2rem 1.6rem',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
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
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: '#F1F5F9',
                      color: '#0A1128',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#334155',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                    }}
                  >
                    {stage.badge}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    color: '#94A3B8',
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
                    color: '#0A1128',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stage.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#64748B',
                    lineHeight: '1.6',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {stage.description}
                </p>
              </div>
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
              color: '#0A1128',
              fontWeight: '700',
              fontSize: '0.98rem',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
              transition: 'border-color 0.2s ease, background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0052FF';
              e.currentTarget.style.color = '#0052FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.color = '#0A1128';
            }}
          >
            <span>See how we fund</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>

      <style>{`
        .journey-card:hover {
          border-color: #94A3B8 !important;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07) !important;
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
