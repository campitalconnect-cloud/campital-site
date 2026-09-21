import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ABOUT_MISSION_DATA } from '../../data/aboutData';
import { AlertCircle, Target, CheckCircle2 } from 'lucide-react';
import { fadeUpVariant } from '../../utils/motion';

export const MissionSection = () => {
  return (
    <section className="section" style={{ backgroundColor: '#ffffff', paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
      <Container>
        {/* Showcase Image Banner */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            marginBottom: '4.5rem',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)',
            position: 'relative',
            maxHeight: '380px',
          }}
        >
          <img
            src="/images/campus_incubator.jpg"
            alt="Campus Incubator Venture Lab"
            style={{
              width: '100%',
              height: '380px',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 35%, rgba(9, 13, 26, 0.9) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '2rem 2.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#0066ff', color: '#ffffff', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Ecosystem Reality
              </span>
              <span style={{ fontSize: '1rem', color: '#ffffff', fontWeight: '700' }}>
                Where high-velocity student founders build tomorrow's breakout companies
              </span>
            </div>
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="mission-grid"
        >
          {/* Left: The Mission Narrative */}
          <div>
            <SectionHeading
              eyebrow={ABOUT_MISSION_DATA.eyebrow}
              title={ABOUT_MISSION_DATA.headline}
              subtitle={ABOUT_MISSION_DATA.lead}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {ABOUT_MISSION_DATA.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.7',
                    color: idx === ABOUT_MISSION_DATA.paragraphs.length - 1 ? '#090d1a' : '#475569',
                    fontWeight: idx === ABOUT_MISSION_DATA.paragraphs.length - 1 ? '700' : '400',
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right: The 3 Disconnects and the Campital Solution */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                borderLeft: '4px solid #ef4444',
                padding: '1.5rem',
                backgroundColor: '#fef2f2',
                borderRadius: '12px',
                border: '1px solid #fee2e2',
                borderLeftWidth: '4px',
                borderLeftColor: '#ef4444',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                <AlertCircle size={18} />
                <span>The Disconnect #1: Grant Traps</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#991b1b', lineHeight: 1.55 }}>
                Campuses produce brilliant prototypes, but founders get trapped in endless non-dilutive grant cycles without ever reaching commercial venture investment.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              style={{
                borderLeft: '4px solid #f59e0b',
                padding: '1.5rem',
                backgroundColor: '#fffbeb',
                borderRadius: '12px',
                border: '1px solid #fef3c7',
                borderLeftWidth: '4px',
                borderLeftColor: '#f59e0b',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d97706', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                <Target size={18} />
                <span>The Disconnect #2: Sourcing Friction</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#92400e', lineHeight: 1.55 }}>
                Angel syndicates and VC funds lack the specialized infrastructure required to systematically filter thousands of campus hackathon entries down to investable teams.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              style={{
                borderLeft: '4px solid #0066ff',
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1.5px solid #0066ff',
                boxShadow: '0 10px 25px rgba(0, 102, 255, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0066ff', fontWeight: '800', fontSize: '1rem', marginBottom: '0.4rem' }}>
                <CheckCircle2 size={19} />
                <span>The Campital Solution</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.94rem', color: '#090d1a', fontWeight: '600', lineHeight: 1.55 }}>
                A standardized, high-conviction pipeline that provides objective scoring, milestone evaluation, and direct introduction to compliant investment vehicles.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .mission-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
