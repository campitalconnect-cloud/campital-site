import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Send, Users, Sparkles } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { fadeUpVariant } from '../../utils/motion';

const STEPS = [
  {
    step: '01',
    timing: 'Day 1',
    title: 'Apply in 5 Minutes',
    headline: 'Submit your deck and what you are building',
    description:
      'Fill out our simple application form with your pitch deck, prototype link, and team background. Open to student, alumni, or faculty-led ventures. No long essays, no application fees.',
    highlights: ['Takes under 5 minutes', 'Accepts working prototypes or traction', '₹0 application fees'],
    accentColor: '#1264FF',
  },
  {
    step: '02',
    timing: 'Days 2–14',
    title: 'Pitch & Fast-Track Evaluation',
    headline: 'Fast review and structured pitch sessions',
    description:
      'Our investment committee reviews applications within 48 hours. Shortlisted founders are invited to pitch directly to institutional angel syndicates and venture fund partners.',
    highlights: ['48-hour initial review', 'Direct investor pitch room', 'Actionable feedback for all teams'],
    accentColor: '#20BFEF',
  },
  {
    step: '03',
    timing: 'Days 15–21',
    title: 'Term Sheet & Funding',
    headline: 'Real equity capital, not another grant',
    description:
      'Finalist companies receive structured term sheets between ₹2 Cr and ₹5 Cr from institutional co-investors. Close your round quickly and secure real runway to hire and scale.',
    highlights: ['₹2–5 Cr cheque size', 'Clean founder-friendly terms', 'No equity taken just to pitch'],
    accentColor: '#10B981',
  },
];

export const HowItWorks = () => {
  return (
    <section 
      id="how-it-works"
      className="section"
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        borderBottom: '1px solid #E2E8F0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18, 100, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(32, 191, 239, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container>
        <SectionHeading
          eyebrow="The 21-Day Pipeline"
          title="How It Works: 3 Steps from Application to Term Sheet"
          subtitle="A transparent, fast-moving evaluation process designed to get student founders in front of institutional capital without red tape."
          centered
        />

        {/* Timing Pill Banner with Gradient Glow */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 3.5rem auto',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(239, 246, 255, 0.9) 100%)',
            border: '1.5px solid rgba(18, 100, 255, 0.25)',
            boxShadow: '0 8px 24px rgba(18, 100, 255, 0.08)',
            borderRadius: '100px',
            padding: '0.75rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            textAlign: 'center',
          }}
        >
          <Clock size={18} color="#1264FF" />
          <span style={{ fontSize: '0.94rem', color: '#1E293B', fontWeight: '600' }}>
            Total timeline: <strong style={{ color: '#1264FF' }}>21 days from submission to investment decision</strong>. No endless waiting.
          </span>
        </div>

        {/* Panoramic Three Rigorous Steps Showcase Visual */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maxWidth: '1100px',
            margin: '0 auto 3.5rem auto',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)',
            backgroundColor: '#090D1A',
          }}
        >
          <img
            src="/images/how_it_works_showcase.png"
            alt="How the Pipeline Works: 01 Source -> 02 Evaluate -> 03 Fund"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        {/* 3 Steps Shown ONCE in a Clear Horizontal Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2.25rem',
            alignItems: 'stretch',
          }}
          className="how-it-works-steps-grid"
        >
          {STEPS.map((s, index) => (
            <motion.div
              key={s.step}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid #E2E8F0',
                padding: '2.5rem 2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.28s ease',
              }}
              className="step-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = s.accentColor;
                e.currentTarget.style.boxShadow = `0 20px 45px rgba(18, 100, 255, 0.16)`;
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top Accent Gradient Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${s.accentColor} 0%, #20BFEF 100%)`,
                }}
              />

              <div>
                {/* Step Top Bar: Number & Timing */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.75rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '2.75rem',
                      fontWeight: '900',
                      letterSpacing: '-0.04em',
                      color: '#E2E8F0',
                      lineHeight: 1,
                    }}
                  >
                    {s.step}
                  </span>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: 'rgba(18, 100, 255, 0.08)',
                      color: '#1264FF',
                      padding: '0.4rem 0.95rem',
                      borderRadius: '100px',
                      border: '1px solid rgba(18, 100, 255, 0.22)',
                    }}
                  >
                    {s.timing}
                  </span>
                </div>

                {/* Step Title */}
                <h3
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: '800',
                    color: '#08152F',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontSize: '1.02rem',
                    color: '#1264FF',
                    fontWeight: '700',
                    marginBottom: '1rem',
                  }}
                >
                  {s.headline}
                </p>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#475569',
                    lineHeight: '1.65',
                    marginBottom: '1.75rem',
                  }}
                >
                  {s.description}
                </p>
              </div>

              {/* Highlights Checklist */}
              <div
                style={{
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {s.highlights.map((h) => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem', color: '#1E293B', fontWeight: '600' }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Single Call to Action Button Below 3 Steps */}
        <div
          style={{
            marginTop: '3.75rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Button
            to="/you-are?persona=startup"
            variant="primary"
            size="lg"
            icon={ArrowRight}
            style={{
              background: 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)',
              height: '56px',
              padding: '0 2.5rem',
              borderRadius: '100px',
              fontSize: '1.02rem',
              fontWeight: '700',
              boxShadow: '0 12px 32px rgba(18, 100, 255, 0.35)',
            }}
          >
            Apply for Funding (Cohort 2026)
          </Button>
          <span style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: '500' }}>
            Applications are reviewed on a rolling basis. 100% free for student founders.
          </span>
        </div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .how-it-works-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};
