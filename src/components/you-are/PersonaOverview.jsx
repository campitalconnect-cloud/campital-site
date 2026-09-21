import React from 'react';
import { Badge } from '../common/Badge';
import { Target, Gift, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../../utils/motion';

export const PersonaOverview = ({ persona }) => {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      {/* Title & Eyebrow */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 2.5rem' }}>
        <Badge variant="primary" style={{ marginBottom: '1rem', padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}>
          {persona.badge}
        </Badge>
        <h2 style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.03em', lineHeight: 1.18, marginBottom: '1rem' }}>
          {persona.headline}
        </h2>
        <p className="text-lead" style={{ color: '#475569', fontSize: '1.12rem', lineHeight: '1.65' }}>
          {persona.subheadline}
        </p>
      </div>

      {/* Track Featured Imagery Card */}
      {persona.image && (
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '2.5rem',
            boxShadow: '0 20px 45px rgba(0, 82, 255, 0.08), 0 4px 15px rgba(15, 23, 42, 0.04)',
            border: '1.5px solid #e2e8f0',
            position: 'relative',
            height: 'clamp(240px, 32vw, 380px)',
            backgroundColor: '#090d1a',
          }}
        >
          <img
            src={persona.image}
            alt={persona.imageAlt || persona.headline}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.92) contrast(1.05)',
            }}
          />
          {/* Subtle gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(9, 13, 26, 0.1) 0%, rgba(9, 13, 26, 0.4) 60%, rgba(9, 13, 26, 0.85) 100%)',
            }}
          />
          {/* Image Tag / Description Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.75rem',
              right: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0, 102, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              <Sparkles size={13} />
              <span>{persona.imageTag || 'Track Focus'}</span>
            </div>
            <span style={{ color: '#f8fafc', fontSize: '0.92rem', fontWeight: '600', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
              {persona.label} Pathway · Campital Sourcing
            </span>
          </div>
        </motion.div>
      )}

      {/* Who It's For & What We Offer Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}
        className="overview-cards"
      >
        <div
          className="card"
          style={{
            padding: '2.5rem 2.25rem',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 102, 255, 0.08)', border: '1px solid rgba(0, 102, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066ff' }}>
              <Target size={20} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.02em', margin: 0 }}>Who It’s For</h3>
          </div>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.68', color: '#475569', margin: 0 }}>
            {persona.whoItsFor}
          </p>
        </div>

        <div
          className="card"
          style={{
            padding: '2.5rem 2.25rem',
            border: '1.5px solid #bfdbfe',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 30px rgba(0, 102, 255, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 82, 255, 0.1)', border: '1px solid rgba(0, 82, 255, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0052ff' }}>
              <Gift size={20} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.02em', margin: 0 }}>What Campital Offers</h3>
          </div>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.68', color: '#475569', margin: 0 }}>
            {persona.whatWeOffer}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .overview-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
