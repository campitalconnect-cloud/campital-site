import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { ABOUT_STORY_DATA } from '../../data/aboutData';
import { Quote } from 'lucide-react';
import { fadeUpVariant } from '../../utils/motion';

export const FoundingStory = () => {
  return (
    <section className="section" style={{ backgroundColor: '#ffffff', paddingTop: '5.5rem', paddingBottom: '5.5rem', position: 'relative' }}>
      <Container narrow>
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            backgroundColor: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2.5rem',
              opacity: 0.08,
              color: '#0066ff',
            }}
          >
            <Quote size={80} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.82rem',
              fontWeight: '800',
              color: '#0066ff',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1.25rem',
            }}
          >
            {ABOUT_STORY_DATA.eyebrow}
          </div>

          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: '800', marginBottom: '1.75rem', lineHeight: 1.25, color: '#090d1a', letterSpacing: '-0.025em' }}>
            {ABOUT_STORY_DATA.headline}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
            {ABOUT_STORY_DATA.content.map((paragraph, idx) => (
              <p key={idx} style={{ fontSize: '1.1rem', lineHeight: '1.75', color: idx === ABOUT_STORY_DATA.content.length - 1 ? '#090d1a' : '#475569', fontWeight: idx === ABOUT_STORY_DATA.content.length - 1 ? '700' : '400', margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div
            style={{
              marginTop: '2.25rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#0066ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.9rem',
              }}
            >
              C
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#090d1a' }}>Campital Leadership</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Dedicated to campus-born startup capital</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
