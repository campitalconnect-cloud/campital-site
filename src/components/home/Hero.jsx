import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { HERO_BG_DESKTOP_BASE64, HERO_BG_MOBILE_BASE64 } from '../../assets/heroBackgrounds';

export const Hero = () => {
  return (
    <section 
      className="section-hero-cinematic"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 78px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* ================= DESKTOP BACKGROUND (>= 1024px) ================= */}
      <div
        className="hero-bg-layer desktop-bg-layer"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `url('${HERO_BG_DESKTOP_BASE64}')`,
          backgroundSize: 'cover',
          backgroundPosition: '100% 45px',
          zIndex: 0,
        }}
      />

      {/* ================= MOBILE BACKGROUND (< 1024px) ================= */}
      <div
        className="hero-bg-layer mobile-bg-layer"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `url('${HERO_BG_MOBILE_BASE64}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35px',
          zIndex: 0,
        }}
      />

      {/* ================= BOTTOM SMOOTH GRADIENT FEATHER (MILD TRANSITION) ================= */}
      <div
        className="hero-bottom-feather"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '40px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.35) 60%, #FFFFFF 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.1fr)',
            gap: 'clamp(1.5rem, 3vw, 3.5rem)',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
            width: '100%',
            paddingTop: 'clamp(6.5rem, 12vh, 9.5rem)',
            paddingBottom: 'clamp(4.5rem, 8vh, 7rem)',
          }}
          className="hero-cinematic-grid"
        >
          {/* ================= LEFT CONTENT COLUMN: EDITORIAL TYPOGRAPHY ================= */}
          <div className="hero-editorial-col" style={{ maxWidth: '560px' }}>
            {/* Main High-Impact Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(2.75rem, 5.2vw, 4.6rem)',
                fontWeight: '900',
                letterSpacing: '-0.04em',
                lineHeight: 1.16,
                color: '#08152F',
                marginBottom: '1.5rem',
              }}
              className="hero-headline-title"
            >
              Campus + Capital =<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #1264FF 0%, #20C8F4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  paddingBottom: '0.18em',
                  paddingRight: '0.08em',
                }}
              >
                Campital
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(1.15rem, 1.55vw, 1.35rem)',
                lineHeight: 1.55,
                fontWeight: '500',
                color: '#475569',
                maxWidth: '540px',
                marginBottom: '2.5rem',
              }}
              className="hero-description-text"
            >
              Funding. Partners. Momentum.<br />
              For startups born on campus<br />
              — and SMEs ready to grow.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
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
                  padding: '0 2.25rem',
                  fontSize: '1.02rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  boxShadow: '0 10px 28px rgba(18, 100, 255, 0.32)',
                  border: 'none',
                }}
              >
                Get Funded
              </Button>

              <Button
                to="/partnerships"
                variant="secondary"
                size="lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  height: '56px',
                  borderRadius: '100px',
                  padding: '0 2rem',
                  fontSize: '1.02rem',
                  fontWeight: '700',
                  color: '#08152F',
                  border: '1.5px solid rgba(18, 100, 255, 0.22)',
                  boxShadow: '0 4px 14px rgba(8, 21, 47, 0.04)',
                }}
              >
                Become a Partner
              </Button>
            </motion.div>

          </div>

          {/* Right Column Spacer on Desktop */}
          <div className="hero-desktop-spacer" />
        </div>
      </Container>

      {/* ================= BOTTOM CENTER SCROLL TO EXPLORE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="hero-scroll-toggle-container"
      >
        <button
          type="button"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight - 80,
              behavior: 'smooth',
            });
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(18, 100, 255, 0.2)',
            padding: '0.45rem 1.25rem',
            borderRadius: '100px',
            boxShadow: '0 6px 22px rgba(18, 100, 255, 0.12)',
            cursor: 'pointer',
            color: '#08152F',
            fontSize: '0.82rem',
            fontWeight: '700',
            letterSpacing: '0.02em',
            outline: 'none',
            transition: 'all 0.25s ease',
          }}
          className="scroll-explore-btn"
          aria-label="Scroll to explore"
        >
          <div
            style={{
              width: '16px',
              height: '24px',
              borderRadius: '10px',
              border: '1.8px solid #1264FF',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '3.5px',
            }}
          >
            <motion.div
              animate={{ y: [0, 7, 0], opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{
                width: '3px',
                height: '4.5px',
                borderRadius: '2px',
                backgroundColor: '#1264FF',
              }}
            />
          </div>
          <span>Scroll to explore</span>
        </button>
      </motion.div>

      <style>{`
        /* Desktop Default (>= 1024px) */
        .desktop-bg-layer {
          display: block;
        }
        .mobile-bg-layer {
          display: none;
        }

        /* Mobile & Tablet (< 1024px) */
        @media (max-width: 1023px) {
          .desktop-bg-layer {
            display: none !important;
          }
          .mobile-bg-layer {
            display: block !important;
          }
          .section-hero-cinematic {
            min-height: 100vh !important;
            min-height: 880px !important;
            align-items: flex-start !important;
          }
          .hero-cinematic-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding-top: 7rem !important;
            padding-bottom: 27rem !important; /* leaves generous space for the lower artwork */
          }
          .hero-editorial-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 100% !important;
          }
          .desktop-br {
            display: inline;
          }
          .hero-headline-title {
            text-align: center !important;
            font-size: clamp(2.35rem, 9.5vw, 3.25rem) !important;
            line-height: 1.18 !important;
          }
          .hero-description-text {
            text-align: center !important;
            margin: 0 auto 2rem auto !important;
          }
          .hero-cta-button-group {
            width: 100%;
            justify-content: center;
          }
          .hero-cta-button-group a.btn {
            width: 100%;
            max-width: 340px;
          }
          .hero-micro-footer {
            display: none;
          }
          .hero-desktop-spacer {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};




