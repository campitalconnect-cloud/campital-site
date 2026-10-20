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
    accentColor: '#0052FF',
  },
  {
    step: '02',
    timing: 'Days 2 to 14',
    title: 'Pitch & Fast-Track Evaluation',
    headline: 'Fast review and structured pitch sessions',
    description:
      'Our investment committee reviews applications within 48 hours. Shortlisted founders are invited to pitch directly to institutional angel syndicates and venture fund partners.',
    highlights: ['48-hour initial review', 'Direct investor pitch room', 'Actionable feedback for all teams'],
    accentColor: '#0052FF',
  },
  {
    step: '03',
    timing: 'Days 15 to 21',
    title: 'Term Sheet & Funding',
    headline: 'Real equity capital, not another grant',
    description:
      'Finalist companies receive structured term sheets between ₹2 Cr and ₹5 Cr from institutional co-investors. Close your round quickly and secure real runway to hire and scale.',
    highlights: ['₹2 Cr to ₹5 Cr cheque size', 'Clean founder-friendly terms', 'No equity taken just to pitch'],
    accentColor: '#059669',
  },
];

export const HowItWorks = () => {
  return (
    <section 
      id="how-it-works"
      className="section"
      style={{
        background: '#F8FAFC',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="The 21-Day Pipeline"
          title="How It Works: 3 Steps from Application to Term Sheet"
          subtitle="A transparent, fast-moving evaluation process designed to get student founders in front of institutional capital without red tape."
          centered
        />

        {/* Timing Notice Banner */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 3rem auto',
            background: '#FFFFFF',
            border: '1.5px solid #CBD5E1',
            borderRadius: '10px',
            padding: '0.85rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            textAlign: 'center',
          }}
        >
          <Clock size={18} color="#0052FF" />
          <span style={{ fontSize: '0.94rem', color: '#1E293B', fontWeight: '600' }}>
            Total timeline: <strong style={{ color: '#0052FF' }}>21 days from submission to investment decision</strong>. No endless waiting.
          </span>
        </div>

        {/* Panoramic Three Rigorous Steps Showcase Visual */}
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto 3.5rem auto',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
            backgroundColor: '#0A1128',
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
        </div>

        {/* 3 Steps Shown ONCE in a Clear Horizontal Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            alignItems: 'stretch',
          }}
          className="how-it-works-steps-grid"
        >
          {STEPS.map((s) => (
            <div
              key={s.step}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #E2E8F0',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                position: 'relative',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              className="step-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#94A3B8';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.07)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.03)';
              }}
            >
              <div>
                {/* Step Top Bar: Number & Timing */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '900',
                      letterSpacing: '-0.04em',
                      color: '#0A1128',
                      lineHeight: 1,
                    }}
                  >
                    {s.step}
                  </span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: '#F1F5F9',
                      color: '#0A1128',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {s.timing}
                  </span>
                </div>

                {/* Step Title */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: '800',
                    color: '#0A1128',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.65rem',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.96rem',
                    color: '#0052FF',
                    fontWeight: '700',
                    marginBottom: '0.85rem',
                  }}
                >
                  {s.headline}
                </p>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#475569',
                    lineHeight: '1.65',
                    marginBottom: '1.5rem',
                  }}
                >
                  {s.description}
                </p>
              </div>

              {/* Highlights Checklist */}
              <div
                style={{
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                {s.highlights.map((h) => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.86rem', color: '#1E293B', fontWeight: '600' }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Single Call to Action Button Below 3 Steps */}
        <div
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.85rem',
          }}
        >
          <Button
            to="/you-are?persona=startup"
            variant="primary"
            size="lg"
            icon={ArrowRight}
            style={{
              backgroundColor: '#0052FF',
              color: '#FFFFFF',
              height: '52px',
              padding: '0 2.25rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '700',
              border: 'none',
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
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
