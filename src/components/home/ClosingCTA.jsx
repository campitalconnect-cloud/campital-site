import React from 'react';
import { ArrowUpRight, Sparkles, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { CLOSING_CTA } from '../../data/homeData';
import { fadeUpVariant } from '../../utils/motion';
import { CAMPITAL_CONTACT_EMAIL } from '../../config/emailConfig';

export const ClosingCTA = ({
  headline = CLOSING_CTA.headline,
  subheadline = CLOSING_CTA.subheadline,
  eyebrow = CLOSING_CTA.eyebrow,
  primaryCta = CLOSING_CTA.primaryCta,
  secondaryCta = CLOSING_CTA.secondaryCta,
}) => {
  return (
    <section 
      className="section-closing-cta" 
      style={{ 
        backgroundColor: '#ffffff', 
        position: 'relative', 
        overflow: 'hidden', 
        paddingTop: '4rem', 
        paddingBottom: '5.5rem' 
      }}
    >
      <Container>
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
            padding: 'clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 4rem)',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 30, 90, 0.22)',
            color: '#ffffff',
            backgroundImage: `linear-gradient(180deg, rgba(8, 21, 47, 0.72) 0%, rgba(8, 21, 47, 0.92) 100%), url('/images/closing_cta_panorama.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          {eyebrow && (
            <div 
              style={{ 
                margin: '0 auto 1.5rem', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.45rem',
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#38bdf8',
                fontSize: '0.82rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <Sparkles size={14} />
              <span>{eyebrow}</span>
            </div>
          )}

          <h2 style={{ fontSize: 'clamp(2.15rem, 4.8vw, 3.4rem)', fontWeight: '900', marginBottom: '1.25rem', letterSpacing: '-0.035em', color: '#ffffff', lineHeight: 1.15 }}>
            {headline}
          </h2>

          <p style={{ maxWidth: '640px', margin: '0 auto 2.25rem', color: '#e2e8f0', fontSize: 'clamp(1.05rem, 1.6vw, 1.22rem)', lineHeight: '1.6', fontWeight: '400' }}>
            {subheadline}
          </p>

          {/* Interactive Question & Track Helper */}
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto 2.5rem auto',
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.88rem', fontWeight: '700', marginBottom: '0.85rem' }}>
              <HelpCircle size={16} />
              <span>Where do you fit in the Campital pipeline?</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                flexWrap: 'wrap',
              }}
            >
              <Button
                to="/you-are?persona=startup"
                variant="ghost"
                size="sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  padding: '0.35rem 0.95rem',
                }}
              >
                🎓 Campus Founder
              </Button>
              <Button
                to="/you-are?persona=incubator"
                variant="ghost"
                size="sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  padding: '0.35rem 0.95rem',
                }}
              >
                🏛️ Campus Incubator
              </Button>
              <Button
                to="/you-are?persona=sme"
                variant="ghost"
                size="sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  padding: '0.35rem 0.95rem',
                }}
              >
                💼 SME Growth
              </Button>
              <a
                href={`mailto:${CAMPITAL_CONTACT_EMAIL}?subject=Campital%20Inquiry`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(32, 191, 239, 0.2)',
                  color: '#38bdf8',
                  border: '1px solid rgba(32, 191, 239, 0.4)',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  padding: '0.35rem 0.95rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <MessageSquare size={13} />
                <span>Ask a Question</span>
              </a>
            </div>
          </div>

          {/* Primary Action Buttons */}
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
                style={{
                  height: '54px',
                  borderRadius: '100px',
                  padding: '0 2.25rem',
                  fontWeight: '700',
                  fontSize: '1.02rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                }}
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
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  height: '54px',
                  borderRadius: '100px',
                  padding: '0 2rem',
                  fontWeight: '700',
                  fontSize: '1.02rem',
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
            border-radius: 20px !important;
          }
          .closing-cta-box .btn {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
