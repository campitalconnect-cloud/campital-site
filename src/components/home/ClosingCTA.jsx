import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { CLOSING_CTA } from '../../data/homeData';
import { fadeUpVariant } from '../../utils/motion';

export const ClosingCTA = ({
  headline = CLOSING_CTA.headline,
  subheadline = CLOSING_CTA.subheadline,
  eyebrow = CLOSING_CTA.eyebrow,
  primaryCta = CLOSING_CTA.primaryCta,
  secondaryCta = CLOSING_CTA.secondaryCta,
}) => {
  return (
    <section className="section" style={{ backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '6rem' }}>
      {/* Background glow animation */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '420px',
          background: 'radial-gradient(ellipse, rgba(0, 102, 255, 0.18) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container narrow>
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="closing-cta-box"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)',
            background: 'linear-gradient(135deg, #0a1128 0%, #173887 50%, #0052ff 100%)',
            borderRadius: '24px',
            boxShadow: '0 25px 60px rgba(0, 82, 255, 0.25)',
            color: '#ffffff',
          }}
        >
          {eyebrow && (
            <div 
              style={{ 
                margin: '0 auto 1.5rem', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#38bdf8',
                fontSize: '0.82rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              <Sparkles size={13} />
              <span>{eyebrow}</span>
            </div>
          )}

          <h2 style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: '800', marginBottom: '1.25rem', letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.15 }}>
            {headline}
          </h2>

          <p style={{ maxWidth: '580px', margin: '0 auto 2.5rem', color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6' }}>
            {subheadline}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {primaryCta && (
              <Button
                to={primaryCta.path}
                variant="white"
                size="lg"
                icon={ArrowUpRight}
              >
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                to={secondaryCta.path}
                variant="secondary"
                size="lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  border: '1.5px solid rgba(255, 255, 255, 0.35)',
                }}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </motion.div>
      </Container>

      <style>{`
        @media (max-width: 600px) {
          .closing-cta-box {
            padding: 2.75rem 1.25rem !important;
            border-radius: 18px !important;
          }
          .closing-cta-box .btn {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
