import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { fadeUpVariant } from '../../utils/motion';
import { Sparkles, ArrowDown } from 'lucide-react';

const PROCESS_STEPS = [
  {
    id: 'ep',
    num: '01',
    title: 'Elevator Pitch & Sourcing',
    days: 'Days 1–5',
    color: '#0a1128',
    desc: 'Campus incubators and student founders submit concise decks and traction data through our standardized portal.',
    width: '100%',
  },
  {
    id: 'fm',
    num: '02',
    title: 'First Evaluation & Screening',
    days: 'Days 6–10',
    color: '#173887',
    desc: 'Our investment associates review founder problem statements, technical defensibility, and market timing.',
    width: '90%',
  },
  {
    id: 'sm',
    num: '03',
    title: 'Deep Dive & Diligence',
    days: 'Days 11–16',
    color: '#0052ff',
    desc: 'Structured evaluation sessions examining IP clarity, cap table structure, and initial user validation.',
    width: '80%',
  },
  {
    id: 'ic',
    num: '04',
    title: 'Investment Committee (IC)',
    days: 'Days 17–21',
    color: '#0066ff',
    desc: 'High-conviction founders present directly to the committee for term sheet structuring and allocation.',
    width: '70%',
  },
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section 
      className="section"
      style={{
        backgroundColor: '#f8fafc',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="Quick, Transparent, Objective 4-Step Process"
          subtitle="A predictable, founder-friendly evaluation funnel designed to take promising campus ideas from application to institutional investment readiness in record time."
          centered
        />

        {/* Funnel Layout Grid (Inspired by Reference Screenshot 5) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            marginTop: '3.5rem',
          }}
          className="process-funnel-grid"
        >
          {/* Left Column: Visual Inverted Funnel Graphic */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2.5rem 2rem',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 15px 35px rgba(15, 23, 42, 0.05)',
            }}
          >
            {/* 21 Days Callout Badge (Matching Reference Screenshot 5) */}
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                zIndex: 2,
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                Velocity
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0066ff', letterSpacing: '-0.02em' }}>
                EP to IC in 21 Days ↓
              </span>
            </div>

            {/* Funnel Layers with Connecting Progress Arrows */}
            <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', marginTop: '3.5rem' }}>
              {PROCESS_STEPS.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveStep(idx)}
                    style={{
                      width: step.width,
                      backgroundColor: step.color,
                      color: '#ffffff',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      boxShadow: activeStep === idx ? '0 8px 24px rgba(0, 102, 255, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
                      border: activeStep === idx ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '0.92rem', fontWeight: '700', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {step.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.95, fontWeight: '700', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.55rem', borderRadius: '6px', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                      {step.days}
                    </span>
                  </motion.div>

                  {/* Downward Progress Arrow between steps */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 102, 255, 0.08)',
                        border: '1px solid rgba(0, 102, 255, 0.2)',
                        color: '#0066ff',
                        margin: '0.15rem 0',
                        zIndex: 1,
                      }}
                    >
                      <ArrowDown size={12} strokeWidth={2.5} />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}

              {/* Progress Arrow before Invested Cone */}
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 180, 216, 0.12)',
                  border: '1px solid rgba(0, 180, 216, 0.3)',
                  color: '#00b4d8',
                  margin: '0.15rem 0',
                  zIndex: 1,
                }}
              >
                <ArrowDown size={12} strokeWidth={2.5} />
              </motion.div>

              {/* Bottom Invested Cone */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  width: '48%',
                  backgroundColor: '#00b4d8',
                  color: '#ffffff',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  fontWeight: '800',
                  fontSize: '0.98rem',
                  boxShadow: '0 8px 24px rgba(0, 180, 216, 0.35)',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Sparkles size={16} />
                <span>Invested</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Step Breakdown & Details */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={1}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '14px',
                    backgroundColor: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                    border: isActive ? '1.5px solid #0066ff' : '1px solid #e2e8f0',
                    boxShadow: isActive ? '0 10px 25px rgba(0, 102, 255, 0.08)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span 
                        style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '6px', 
                          backgroundColor: isActive ? '#0066ff' : '#f1f5f9', 
                          color: isActive ? '#ffffff' : '#64748b', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: '800', 
                          fontSize: '0.8rem' 
                        }}
                      >
                        {step.num}
                      </span>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.02em', margin: 0 }}>
                        {step.title}
                      </h4>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: isActive ? '#0066ff' : '#64748b', backgroundColor: isActive ? 'rgba(0, 102, 255, 0.08)' : '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                      {step.days}
                    </span>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: '1.55', margin: 0, paddingLeft: '2.5rem' }}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .process-funnel-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
