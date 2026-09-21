import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GraduationCap, Building, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { fadeUpVariant, staggerContainerVariant } from '../../utils/motion';

export const CampusShowcase = () => {
  const highlights = [
    {
      icon: GraduationCap,
      badge: 'Campus Origination',
      title: 'Dorm Labs to Series Ready',
      desc: 'Direct pipeline into cutting-edge technical prototypes, student-led patents, and collegiate research ventures.',
    },
    {
      icon: Zap,
      badge: 'Velocity Sourcing',
      title: '21-Day Evaluation Funnel',
      desc: 'Rapid milestone assessment, mentor-vetted validation, and institutional term-sheet readiness in under 3 weeks.',
    },
    {
      icon: ShieldCheck,
      badge: 'Institutional Trust',
      title: 'Structured & Compliant',
      desc: 'Transparent diligence dossiers, standardized documentation, and verified cap-table advisory for institutional syndicates.',
    },
    {
      icon: Layers,
      badge: 'Ecosystem Splicing',
      title: '40+ Incubator Network',
      desc: 'Deep institutional integration with premier university incubation cells, research parks, and regional innovation hubs.',
    },
  ];

  return (
    <section
      className="section"
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#f8fafc',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Gradient Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(0, 102, 255, 0.08) 0%, rgba(56, 189, 248, 0.04) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem', position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(0, 102, 255, 0.08)',
              border: '1.5px solid rgba(0, 102, 255, 0.25)',
              color: '#0066ff',
              fontSize: '0.85rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: '1.25rem',
            }}
          >
            <Sparkles size={15} />
            <span>The Campus-to-Capital Nexus</span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: '800',
              color: '#090d1a',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            Where Academic Innovation Meets <span style={{ background: 'linear-gradient(135deg, #0052ff 0%, #0066ff 50%, #00b4d8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Institutional Velocity</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontSize: '1.15rem',
              color: '#475569',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            Campital unifies campus incubators, ambitious student innovators, and accredited institutional investors through a structured, compliant gateway engineered for hyper-growth.
          </motion.p>
        </div>

        {/* Master Panoramic Image Showcase Banner */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 82, 255, 0.12), 0 10px 25px rgba(15, 23, 42, 0.06)',
            border: '2px solid rgba(0, 102, 255, 0.18)',
            marginBottom: '4rem',
            backgroundColor: '#090d1a',
          }}
        >
          {/* Background Image with Cinematic Gradient Overlays */}
          <div style={{ position: 'relative', height: 'clamp(360px, 50vw, 520px)', width: '100%', overflow: 'hidden' }}>
            <img
              src="/images/hero_campus_capital_bg.jpg"
              alt="Campital Campus to Capital Innovation Bridge"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'brightness(0.92) contrast(1.05)',
                transition: 'transform 0.8s ease',
              }}
              className="showcase-img"
            />
            {/* Rich Gradient Overlays for High Legibility & Brand Aesthetics */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(9, 13, 26, 0.3) 0%, rgba(9, 13, 26, 0.6) 50%, rgba(9, 13, 26, 0.92) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(0, 82, 255, 0.35) 0%, transparent 60%, rgba(0, 180, 216, 0.25) 100%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* In-Image Floating Trust Badges */}
            <div
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                left: '2.5rem',
                right: '2.5rem',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
                zIndex: 2,
              }}
              className="showcase-caption"
            >
              <div style={{ maxWidth: '640px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.35rem 0.9rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(0, 102, 255, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '0.75rem',
                  }}
                >
                  <Building size={13} />
                  <span>Institutional Sourcing Engine</span>
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: '800',
                    color: '#ffffff',
                    lineHeight: 1.2,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  Fueling Tomorrow's Founders Right From The Campus
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.5, margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                  A structured gateway transforming student innovations into high-conviction institutional investments.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <Button to="/you-are?persona=startup" variant="primary" size="md" icon={ArrowUpRight}>
                  Apply for Funding
                </Button>
                <Button to="/partnerships" variant="secondary" size="md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#090d1a', borderColor: '#ffffff' }}>
                  Institutional Track
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar at Bottom of Showcase */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              backgroundColor: '#0c1222',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            className="showcase-stats"
          >
            {[
              { label: 'Campus Incubators', value: '40+', note: 'Premier Technical Hubs' },
              { label: 'Pipeline Velocity', value: '21 Days', note: 'Pitch to Diligence Complete' },
              { label: 'Institutional Capital', value: '₹25Cr+', note: 'Syndicate Network Allocation' },
              { label: 'Compliance Level', value: '100%', note: 'Standardized Legal & Cap-Table' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem 1.75rem',
                  borderRight: i < 3 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#ffffff' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4 Feature & Trust Pillars Grid */}
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
          className="showcase-pillars-grid"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                custom={idx}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0, 82, 255, 0.12)' }}
                transition={{ duration: 0.25 }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '2rem 1.75rem',
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle top gradient accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3.5px',
                    background: 'linear-gradient(90deg, #0052ff, #0066ff, #00b4d8)',
                  }}
                />

                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 102, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0066ff',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon size={22} />
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    color: '#0066ff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '0.4rem',
                  }}
                >
                  {item.badge}
                </div>

                <h4
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: '800',
                    color: '#090d1a',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.65rem',
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h4>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>

      <style>{`
        @media (max-width: 1024px) {
          .showcase-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .showcase-stats > div {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
          .showcase-pillars-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 680px) {
          .showcase-caption {
            bottom: 1.5rem !important;
            left: 1.25rem !important;
            right: 1.25rem !important;
          }
          .showcase-stats {
            grid-template-columns: 1fr !important;
          }
          .showcase-pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
