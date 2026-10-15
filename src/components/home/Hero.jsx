import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Building2, TrendingUp, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

export const Hero = () => {
  return (
    <section 
      className="section-hero-cinematic"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(145deg, #050E24 0%, #0A1C44 42%, #0E2866 75%, #081636 100%)',
        overflow: 'hidden',
        paddingTop: '7rem',
        paddingBottom: '5.5rem',
      }}
    >
      {/* ================= AMBIENT LUMINOUS GRADIENT MESH ACCENTS ================= */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18, 100, 255, 0.28) 0%, rgba(18, 100, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(40px)',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '0%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(32, 191, 239, 0.22) 0%, rgba(32, 191, 239, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(50px)',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          right: '35%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle Grid Canvas Pattern Overlay for Tech Depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.6,
        }}
      />

      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.95fr)',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
            width: '100%',
          }}
          className="hero-main-grid"
        >
          {/* ================= LEFT EDITORIAL COLUMN: HIGH-IMPACT MESSAGING ================= */}
          <div className="hero-editorial-col" style={{ maxWidth: '640px' }}>
            {/* Status Pill / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '100px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38BDF8',
                fontSize: '0.84rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                marginBottom: '1.75rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              }}
            >
              <span 
                style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#10B981', 
                  boxShadow: '0 0 10px #10B981' 
                }} 
              />
              <span>2026 INTAKE OPEN &bull; CAMPUS SEED COHORT</span>
            </motion.div>

            {/* High-Contrast Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.1rem)',
                fontWeight: '900',
                letterSpacing: '-0.035em',
                lineHeight: 1.14,
                color: '#FFFFFF',
                marginBottom: '1.45rem',
              }}
              className="hero-headline-title"
            >
              Get your campus startup its{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #60A5FA 50%, #20BFEF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                first investor meeting.
              </span>
            </motion.h1>

            {/* Plain Subheadline with Numbers */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              style={{
                fontSize: 'clamp(1.1rem, 1.45vw, 1.3rem)',
                lineHeight: 1.65,
                fontWeight: '400',
                color: '#CBD5E1',
                marginBottom: '2.5rem',
              }}
              className="hero-description-text"
            >
              We connect student founders and university incubators to real venture capital.{' '}
              <strong style={{ color: '#FFFFFF', fontWeight: '700' }}>Student startups: ₹2–5 Cr seed funding.</strong>{' '}
              Apply in 3 simple steps. No upfront fees, no equity to pitch.
            </motion.p>

            {/* CTA Buttons: Primary Apply Button + Partner Incubator Link */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
              }}
              className="hero-cta-button-group"
            >
              <Button
                to="/you-are?persona=startup"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                style={{
                  background: 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)',
                  height: '56px',
                  borderRadius: '100px',
                  padding: '0 2.4rem',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  boxShadow: '0 12px 32px rgba(18, 100, 255, 0.45)',
                  border: 'none',
                }}
              >
                Apply for Funding
              </Button>

              <Link
                to="/you-are?persona=incubator"
                style={{
                  color: '#E2E8F0',
                  fontSize: '1.02rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
                className="hero-secondary-link"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#38BDF8';
                  e.currentTarget.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span>Partner your incubator</span>
                <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
              </Link>
            </motion.div>

            {/* Quick Proof Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                flexWrap: 'wrap',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#CBD5E1',
                fontSize: '0.9rem',
                fontWeight: '600',
              }}
              className="hero-proof-chips"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={17} color="#10B981" />
                <span>₹2–5 Cr Cheques</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={17} color="#10B981" />
                <span>21-Day Decision Timeline</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={17} color="#10B981" />
                <span>Zero Upfront Fees</span>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: GLASSMORPHIC STANDARD DEAL TERMS CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-deal-card-wrap"
          >
            <div
              style={{
                background: 'rgba(9, 21, 48, 0.72)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '26px',
                padding: '2.5rem 2.25rem',
                color: '#FFFFFF',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(56, 189, 248, 0.25)',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="hero-deal-card"
            >
              {/* Subtle Card Ambient Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-30%',
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(18, 100, 255, 0.25) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '1.35rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38BDF8' }}>
                    Standard Deal Terms
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFFFFF', marginTop: '0.2rem' }}>
                    Campus Seed Route
                  </h3>
                </div>
                <div style={{ padding: '0.35rem 0.9rem', borderRadius: '100px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#34D399', fontSize: '0.8rem', fontWeight: '800' }}>
                  Intake Active
                </div>
              </div>

              {/* Core Numbers & Facts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '1.1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Cheque Size
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: '900', color: '#38BDF8', marginTop: '0.25rem' }}>
                    ₹2–5 Cr
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#CBD5E1', marginTop: '0.2rem' }}>
                    Equity Seed Capital
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '1.1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Timeline
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: '900', color: '#FFFFFF', marginTop: '0.25rem' }}>
                    21 Days
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#CBD5E1', marginTop: '0.2rem' }}>
                    Intake to Term Sheet
                  </div>
                </div>
              </div>

              {/* What Happens Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.45 }}>
                    <strong style={{ color: '#FFFFFF' }}>Who can apply:</strong> Student, alumni, and lab founders with a working prototype or early users.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.45 }}>
                    <strong style={{ color: '#FFFFFF' }}>How you pitch:</strong> Structured demo days with institutional angels and seed syndicates.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.45 }}>
                    <strong style={{ color: '#FFFFFF' }}>Cost to founders:</strong> ₹0 application or pitch fees. Ever.
                  </span>
                </div>
              </div>

              {/* Direct Card Action */}
              <Button
                to="/you-are?persona=startup"
                variant="white"
                block
                size="md"
                style={{
                  fontWeight: '800',
                  borderRadius: '12px',
                  height: '50px',
                  fontSize: '0.96rem',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                }}
              >
                Start Founder Application &rarr;
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ================= BOTTOM FEATHER MILD TRANSITION ================= */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60px',
          background: 'linear-gradient(180deg, rgba(8, 22, 54, 0) 0%, rgba(8, 22, 54, 0.4) 50%, #061129 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <style>{`
        @media (max-width: 960px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-editorial-col {
            max-width: 100% !important;
            text-align: center;
          }
          .hero-headline-title {
            text-align: center !important;
          }
          .hero-description-text {
            text-align: center !important;
          }
          .hero-cta-button-group {
            justify-content: center !important;
          }
          .hero-proof-chips {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
