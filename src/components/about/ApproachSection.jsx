import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ABOUT_APPROACH_DATA } from '../../data/aboutData';
import { ArrowDown, Check, Zap, ShieldCheck, Building2, Briefcase } from 'lucide-react';
import { fadeUpVariant } from '../../utils/motion';

export const ApproachSection = () => {
  const funnelData = ABOUT_APPROACH_DATA.funnel || ABOUT_APPROACH_DATA.funnelLayer || {
    title: 'Discovery & Evaluation Layer',
    description: 'Hackathons, demo days, and pitch competitions produce a shortlist of genuinely investment-ready companies.',
    activities: ['Hackathons', 'Demo Days', 'Pitch Competitions', 'Readiness Scoring'],
  };

  const destinationData = ABOUT_APPROACH_DATA.destination || ABOUT_APPROACH_DATA.outcomeLayer || {
    title: 'Compliant Capital Route',
    description: 'Structured introductions to accredited investors, seed funds, and angel syndicates ending in term sheets.',
  };

  return (
    <section className="section" style={{ backgroundColor: '#f8fafc', paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
      <Container>
        <SectionHeading
          eyebrow={ABOUT_APPROACH_DATA.eyebrow}
          title={ABOUT_APPROACH_DATA.headline}
          subtitle={ABOUT_APPROACH_DATA.description}
          centered
        />

        {/* Visual Converging Pipeline Architecture */}
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
          {/* Top Layer: Two Sourcing Pipelines */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.75rem',
              marginBottom: '1.5rem',
            }}
            className="pipelines-row"
          >
            {ABOUT_APPROACH_DATA.pipelines?.map((pipe, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                style={{
                  padding: '2.25rem',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: idx === 0 ? '#0066ff' : '#0284c7', backgroundColor: idx === 0 ? 'rgba(0, 102, 255, 0.08)' : 'rgba(2, 132, 199, 0.08)', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                      {pipe.sourceTag}
                    </span>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: idx === 0 ? 'rgba(0, 102, 255, 0.1)' : 'rgba(2, 132, 199, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: idx === 0 ? '#0066ff' : '#0284c7' }}>
                      {idx === 0 ? <Building2 size={18} /> : <Briefcase size={18} />}
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.75rem', color: '#090d1a', letterSpacing: '-0.02em' }}>{pipe.title}</h3>
                  <p style={{ fontSize: '0.94rem', color: '#475569', margin: 0, lineHeight: '1.6' }}>
                    {pipe.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Converging Signals */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8rem', margin: '0.75rem 0' }}>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: '#0066ff' }}
            >
              <ArrowDown size={24} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              style={{ color: '#0284c7' }}
            >
              <ArrowDown size={24} />
            </motion.div>
          </div>

          {/* Middle Layer: Discovery & Evaluation Funnel */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              padding: '2.5rem 2rem',
              textAlign: 'center',
              border: '1.5px solid #0066ff',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              marginBottom: '1.5rem',
              boxShadow: '0 15px 35px rgba(0, 102, 255, 0.08)',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#0066ff', fontWeight: '800', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              <Zap size={15} />
              <span>Campital Unified Evaluation Gateway</span>
            </div>
            <h3 style={{ fontSize: '1.55rem', fontWeight: '800', marginBottom: '0.85rem', color: '#090d1a', letterSpacing: '-0.02em' }}>
              {funnelData.title}
            </h3>
            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '680px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
              {funnelData.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              {funnelData.activities?.map((act, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: '#090d1a', fontWeight: '700', padding: '0.4rem 0.85rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <Check size={14} color="#0066ff" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Downward Connector Arrow */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.75rem 0' }}>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: '#10b981' }}
            >
              <ArrowDown size={24} />
            </motion.div>
          </div>

          {/* Bottom Destination: Compliant Investment Route */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              padding: '2rem 2.25rem',
              backgroundColor: '#090d1a',
              borderRadius: '16px',
              color: '#ffffff',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
            className="destination-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                <ShieldCheck size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>
                  {destinationData.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: 0, lineHeight: '1.5' }}>
                  {destinationData.description}
                </p>
              </div>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', backgroundColor: '#0066ff', color: '#ffffff', padding: '0.4rem 0.95rem', borderRadius: '6px', whiteSpace: 'nowrap' }}>
              Target Capital Pipeline
            </span>
          </motion.div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .pipelines-row {
            grid-template-columns: 1fr !important;
          }
          .destination-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};
