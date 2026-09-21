import React from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, Building2, Briefcase, TrendingUp, Zap, ChevronRight } from 'lucide-react';
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
        paddingTop: '9.5rem',
        paddingBottom: '6rem',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% -10%, rgba(220, 238, 255, 0.7) 0%, rgba(255, 255, 255, 1) 75%)',
      }}
    >
      {/* Animated Floating Gradient Mesh Orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-8%',
          left: '-6%',
          width: '580px',
          height: '580px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.22) 0%, rgba(56, 189, 248, 0.16) 45%, transparent 70%)',
          borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
          filter: 'blur(55px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 35, -25, 0],
          scale: [1, 1.18, 0.92, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '8%',
          right: '-6%',
          width: '620px',
          height: '620px',
          background: 'radial-gradient(circle, rgba(0, 82, 255, 0.2) 0%, rgba(0, 210, 255, 0.14) 50%, transparent 70%)',
          borderRadius: '58% 42% 35% 65% / 55% 55% 45% 45%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient Center Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75%',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(0, 102, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
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
            {/* Trust Pill with Pulsing Radar Beacon */}
            <motion.div variants={fadeUpVariant} custom={0} style={{ marginBottom: '1.35rem' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  border: '1.5px solid rgba(0, 102, 255, 0.3)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 247, 255, 0.95) 100%)',
                  color: '#0052ff',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 20px rgba(0, 102, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.9, 0, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#0066ff',
                    }}
                  />
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#0066ff' }} />
                </div>
                <span>State of Campus Entrepreneurship Pipeline is Live</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>

            {/* Main Headline with Animated Multi-Tone Gradient */}
            <motion.h1 
              variants={fadeUpVariant} 
              custom={1} 
              style={{ 
                marginBottom: '1.35rem',
                fontSize: 'clamp(2.75rem, 5.2vw, 4.3rem)',
                fontWeight: '800',
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                color: '#090d1a',
              }}
            >
              Powering a Generation of{' '}
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(135deg, #0052ff 0%, #0066ff 35%, #00b4d8 70%, #0052ff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                Student Disruptors
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={fadeUpVariant} 
              custom={2} 
              style={{ 
                marginBottom: '1rem', 
                maxWidth: '680px',
                fontSize: '1.18rem',
                lineHeight: 1.68,
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
                fontSize: '1.12rem',
                fontWeight: '800',
                color: '#090d1a',
                marginBottom: '2.25rem',
                letterSpacing: '-0.01em',
              }}
            >
              Pitch your startup. Break the mold. Shape the future.
            </motion.p>

            {/* CTAs with Glow Hover Effect */}
            <motion.div
              variants={fadeUpVariant}
              custom={3}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2.75rem',
              }}
            >
              <Button
                to={HERO_DATA.primaryCta.path}
                variant="primary"
                size="lg"
                icon={ArrowUpRight}
                style={{
                  boxShadow: '0 8px 25px rgba(0, 102, 255, 0.35)',
                }}
              >
                {HERO_DATA.primaryCta.label}
              </Button>
              <Button
                to={HERO_DATA.secondaryCta.path}
                variant="secondary"
                size="lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderColor: '#cbd5e1',
                  color: '#090d1a',
                }}
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
                padding: '0.6rem 1.25rem',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: '1.5px solid rgba(0, 102, 255, 0.2)',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                color: '#334155',
                fontWeight: '500',
                boxShadow: '0 4px 15px rgba(0, 82, 255, 0.06)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ShieldCheck size={18} color="#0066ff" />
              <span>Campus + Capital = <strong>Campital</strong> · Institutional Sourcing Pipeline</span>
            </motion.div>
          </div>

          {/* Right Column: Pipeline Architecture Visual Card with Ambient Aura */}
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
            {/* Glowing Gradient Backdrop Ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '26px',
                background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.35) 0%, rgba(0, 210, 255, 0.25) 50%, rgba(59, 130, 246, 0.15) 100%)',
                filter: 'blur(20px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <motion.div
              whileHover={{ y: -6, boxShadow: '0 30px 60px rgba(0, 82, 255, 0.16)' }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '2.25rem',
                background: 'linear-gradient(180deg, #ffffff 0%, #f9fbff 100%)',
                borderRadius: '20px',
                border: '1.5px solid rgba(0, 102, 255, 0.22)',
                boxShadow: '0 25px 50px rgba(0, 82, 255, 0.1), 0 4px 15px rgba(15, 23, 42, 0.04)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid #eef4fc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px rgba(16, 185, 129, 0.7)' }}
                  />
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#090d1a', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    Capital Funnel Engine
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', padding: '0.3rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(0, 102, 255, 0.1)', color: '#0066ff', border: '1px solid rgba(0, 102, 255, 0.2)' }}>
                  Live Sourcing
                </span>
              </div>

              {/* Sourcing Nodes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Node 1: Incubators */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.05rem 1.2rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 102, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066ff' }}>
                      <Building2 size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.94rem', fontWeight: '800', color: '#090d1a' }}>Campus Incubators</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Student & Alumni Cohorts</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#0066ff', fontWeight: '800', background: 'rgba(0, 102, 255, 0.08)', border: '1px solid #bfdbfe', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                    Phase 01
                  </span>
                </motion.div>

                {/* Node 2: Direct SMEs */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.05rem 1.2rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 180, 216, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.94rem', fontWeight: '800', color: '#090d1a' }}>Direct SMEs</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Independent Operating Founders</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: '800', background: 'rgba(0, 180, 216, 0.08)', border: '1px solid #bae6fd', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                    Phase 02
                  </span>
                </motion.div>

                {/* Evaluation Tier */}
                <div
                  style={{
                    padding: '1.15rem',
                    background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.06) 0%, rgba(0, 180, 216, 0.06) 100%)',
                    border: '1.5px dashed rgba(0, 102, 255, 0.4)',
                    borderRadius: '12px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', fontWeight: '800', color: '#0066ff', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>
                    <Zap size={14} />
                    <span>Rigorous Velocity Evaluation</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.4, fontWeight: '500' }}>
                    Hackathons · Term-Sheet Pitch Days · IC Review
                  </div>
                </div>

                {/* Node 3: Capital Deployment */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.05rem 1.2rem',
                    background: 'linear-gradient(135deg, #090d1a 0%, #151e36 100%)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    boxShadow: '0 8px 20px rgba(9, 13, 26, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.94rem', fontWeight: '800', color: '#ffffff' }}>Institutional Capital</div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Compliant Investment Conduit</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: '800', background: 'linear-gradient(135deg, #0052ff, #00b4d8)', padding: '0.3rem 0.75rem', borderRadius: '6px' }}>
                    Outcome
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
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
