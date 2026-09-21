import React from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, Building2, Briefcase, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { HERO_DATA } from '../../data/homeData';
import { fadeUpVariant, staggerContainerVariant } from '../../utils/motion';

export const Hero = () => {
  return (
    <section 
      className="section-hero"
      style={{
        position: 'relative',
        paddingTop: '8.5rem',
        paddingBottom: '5.5rem',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Floating Organic Mesh Blobs in Royal Blue & Azure */}
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '540px',
          height: '540px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.16) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 70%)',
          borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-5%',
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(0, 82, 255, 0.15) 0%, rgba(0, 180, 216, 0.1) 50%, transparent 70%)',
          borderRadius: '58% 42% 35% 65% / 55% 55% 45% 45%',
          filter: 'blur(55px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container>
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
          className="hero-grid"
        >
          {/* Left Column: Messaging & CTAs */}
          <div>
            {/* Trust Pill / Report Announcement */}
            <motion.div variants={fadeUpVariant} custom={0} style={{ marginBottom: '1.25rem' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1.15rem',
                  borderRadius: '9999px',
                  border: '1.5px solid #0066ff',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#0066ff',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  boxShadow: '0 2px 12px rgba(0, 102, 255, 0.1)',
                }}
              >
                <Sparkles size={14} />
                <span>State of Campus Entrepreneurship Pipeline is Active</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={fadeUpVariant} 
              custom={1} 
              style={{ 
                marginBottom: '1.25rem',
                fontSize: 'clamp(2.6rem, 5vw, 4.1rem)',
                fontWeight: '800',
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                color: '#090d1a',
              }}
            >
              Powering a Generation of <span style={{ color: '#0066ff' }}>Student Disruptors</span>
            </motion.h1>

            <motion.p 
              variants={fadeUpVariant} 
              custom={2} 
              style={{ 
                marginBottom: '1rem', 
                maxWidth: '680px',
                fontSize: '1.15rem',
                lineHeight: 1.65,
                color: '#334155',
                fontWeight: '400',
              }}
            >
              We believe the next big ideas don't come from boardrooms — they come from dorm rooms and campus labs. If you're a student building something real, we're here to power your journey.
            </motion.p>

            <motion.p
              variants={fadeUpVariant}
              custom={2.5}
              style={{
                fontSize: '1.1rem',
                fontWeight: '800',
                color: '#090d1a',
                marginBottom: '2rem',
                letterSpacing: '-0.01em',
              }}
            >
              Pitch your startup. Break the mold. Shape the future.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUpVariant}
              custom={3}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
              }}
            >
              <Button
                to={HERO_DATA.primaryCta.path}
                variant="primary"
                size="lg"
                icon={ArrowUpRight}
              >
                {HERO_DATA.primaryCta.label}
              </Button>
              <Button
                to={HERO_DATA.secondaryCta.path}
                variant="secondary"
                size="lg"
              >
                {HERO_DATA.secondaryCta.label}
              </Button>
            </motion.div>

            {/* Credibility / Trust Pill */}
            <motion.div
              variants={fadeUpVariant}
              custom={4}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.55rem 1.1rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                color: '#334155',
                fontWeight: '500',
              }}
            >
              <ShieldCheck size={17} color="#0066ff" />
              <span>Campus + Capital = <strong>Campital</strong> · Institutional Sourcing Pipeline</span>
            </motion.div>
          </div>

          {/* Right Column: Pipeline Architecture Visual Card */}
          <motion.div
            variants={fadeUpVariant}
            custom={2}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                maxWidth: '490px',
                padding: '2.25rem',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)' }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#090d1a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Capital Funnel Engine
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.25rem 0.65rem', borderRadius: '9999px', backgroundColor: 'rgba(0, 102, 255, 0.08)', color: '#0066ff' }}>
                  Live Sourcing
                </span>
              </div>

              {/* Sourcing Nodes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Node 1: Incubators */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.15rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(0, 102, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066ff' }}>
                      <Building2 size={19} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#090d1a' }}>Campus Incubators</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Student & Alumni Cohorts</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#0066ff', fontWeight: '700', background: '#ffffff', border: '1px solid #bfdbfe', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                    Phase 01
                  </span>
                </div>

                {/* Node 2: Direct SMEs */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.15rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(0, 180, 216, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                      <Briefcase size={19} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#090d1a' }}>Direct SMEs</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Independent Founders</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: '700', background: '#ffffff', border: '1px solid #bae6fd', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                    Phase 02
                  </span>
                </div>

                {/* Evaluation Tier */}
                <div
                  style={{
                    padding: '1.1rem',
                    backgroundColor: 'rgba(0, 102, 255, 0.04)',
                    border: '1.5px dashed rgba(0, 102, 255, 0.35)',
                    borderRadius: '10px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: '800', color: '#0066ff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                    <Zap size={13} />
                    <span>Rigorous Evaluation Funnel</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                    Hackathons · Pitch Days · Investment Committee Review
                  </div>
                </div>

                {/* Node 3: Capital Deployment */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.15rem',
                    backgroundColor: '#090d1a',
                    borderRadius: '10px',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                      <TrendingUp size={19} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>Institutional Capital</div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Compliant Investment Route</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: '700', background: '#0066ff', padding: '0.25rem 0.65rem', borderRadius: '4px' }}>
                    Outcome
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.75rem !important;
            text-align: center;
          }
          .hero-grid .eyebrow {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid > div:first-child > div {
            justify-content: center;
          }
        }
        @media (max-width: 600px) {
          .hero-grid a.btn {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
