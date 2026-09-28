import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ABOUT_TEAM_DATA } from '../../data/aboutData';
import { fadeUpVariant } from '../../utils/motion';
import { ArrowUpRight } from 'lucide-react';

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);


export const TeamSection = () => {
  return (
    <section id="team" className="section" style={{ backgroundColor: '#ffffff', paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
      <Container>
        <SectionHeading
          eyebrow={ABOUT_TEAM_DATA.eyebrow}
          title={ABOUT_TEAM_DATA.headline}
          subtitle={ABOUT_TEAM_DATA.description}
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
            maxWidth: '920px',
            margin: '0 auto',
          }}
          className="team-grid"
        >
          {ABOUT_TEAM_DATA.members.map((member, idx) => (
            <motion.div
              key={idx}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                padding: '1.75rem',
                textAlign: 'left',
                border: '1.5px solid #e2e8f0',
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="founder-card"
            >
              {/* Big, Crisp Cropped Portrait Container */}
              <div
                style={{
                  width: '100%',
                  height: '320px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#090d1a',
                  marginBottom: '1.5rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(0, 82, 255, 0.08)',
                }}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      transition: 'transform 0.4s ease',
                    }}
                    className="founder-portrait"
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #0a1128 0%, #0052ff 100%)',
                      color: '#ffffff',
                      fontSize: '3rem',
                      fontWeight: '800',
                    }}
                  >
                    {member.initials}
                  </div>
                )}

                {/* Subtle gradient overlay at bottom of image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 65%, rgba(9, 13, 26, 0.6) 100%)',
                  }}
                />

                {/* Branded Role Tag */}
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 2 }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(0, 102, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Founder Header & LinkedIn Link */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: '800', margin: 0, color: '#090d1a', letterSpacing: '-0.02em' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0066ff', marginTop: '0.2rem' }}>
                    Co-Founder, Campital
                  </div>
                </div>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '9999px',
                      backgroundColor: '#0a66c2',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      boxShadow: '0 2px 10px rgba(10, 102, 194, 0.25)',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(10, 102, 194, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(10, 102, 194, 0.25)';
                    }}
                  >
                    <LinkedInIcon />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={12} />
                  </a>

                )}
              </div>

              {/* Bio Narrative */}
              <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: '1.65', margin: '0 0 1.25rem 0', flex: 1 }}>
                {member.bio}
              </p>

              {/* Focus Pillars */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                  Core Strategic Focus
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {(member.focusAreas || []).map((focus, fIdx) => (
                    <span
                      key={fIdx}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: '#f1f5f9',
                        color: '#334155',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <style>{`
        .founder-card:hover .founder-portrait {
          transform: scale(1.04);
        }
        .founder-card:hover {
          border-color: rgba(0, 102, 255, 0.35) !important;
          box-shadow: 0 18px 45px rgba(0, 82, 255, 0.1) !important;
        }
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
          }
        }
      `}</style>
    </section>
  );
};
