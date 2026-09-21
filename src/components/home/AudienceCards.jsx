import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Building2, Briefcase, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { AUDIENCE_CARDS } from '../../data/homeData';
import { fadeUpVariant } from '../../utils/motion';

const iconMap = {
  Rocket: Rocket,
  Building2: Building2,
  Briefcase: Briefcase,
};

export const AudienceCards = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="section"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="You Are"
          title="Designed for Campus Founders, Incubators, and SMEs"
          subtitle="Select your track to explore tailored evaluation criteria, partnership benefits, and funding pipelines."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '3.5rem',
          }}
          className="audience-grid"
        >
          {AUDIENCE_CARDS.map((card, index) => {
            const Icon = iconMap[card.icon] || Rocket;
            const targetPath = `/you-are?persona=${card.personaKey}`;

            return (
              <motion.div
                key={card.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={index}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => navigate(targetPath)}
                className="card card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2.5rem 2rem',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0066ff';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.04)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(0, 102, 255, 0.08)',
                        border: '1px solid rgba(0, 102, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0066ff',
                      }}
                    >
                      <Icon size={23} />
                    </div>
                    <Badge variant="primary">{card.badge}</Badge>
                  </div>

                  <h3 style={{ fontSize: '1.55rem', fontWeight: '800', marginBottom: '0.75rem', color: '#090d1a', letterSpacing: '-0.02em' }}>
                    {card.title}
                  </h3>

                  <p style={{ color: '#090d1a', fontWeight: '700', fontSize: '1.02rem', marginBottom: '0.85rem', lineHeight: '1.45' }}>
                    "{card.tagline}"
                  </p>

                  <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
                    {card.description}
                  </p>
                </div>

                <div style={{ marginTop: '2.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                  <Button
                    to={targetPath}
                    variant="primary"
                    block
                    icon={ArrowUpRight}
                    size="sm"
                  >
                    {card.ctaText}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .audience-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
