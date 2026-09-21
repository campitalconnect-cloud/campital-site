import React from 'react';
import { TrendingUp, Landmark, Network, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { PARTNER_CATEGORIES } from '../../data/partnerships';
import { Button } from '../common/Button';
import { fadeUpVariant } from '../../utils/motion';

const iconMap = {
  TrendingUp: TrendingUp,
  Landmark: Landmark,
  Network: Network,
};

export const PartnerCategories = ({ onSelectCategory }) => {
  return (
    <section className="section" id="categories">
      <Container>
        <SectionHeading
          eyebrow="Partner Ecosystem"
          title="Three Strategic Partnership Tracks"
          subtitle="Whether deploying capital, cultivating campus deal flow, or providing enterprise mentorship, there is a dedicated track for your organization."
          centered
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
          className="partner-categories-grid"
        >
          {PARTNER_CATEGORIES.map((cat, index) => {
            const Icon = iconMap[cat.icon] || TrendingUp;

            return (
              <motion.div
                key={cat.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={index}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2.5rem 2rem',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '13px',
                      background: 'rgba(0, 102, 255, 0.08)',
                      border: '1px solid rgba(0, 102, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0066ff',
                      marginBottom: '1.5rem',
                      boxShadow: '0 4px 16px rgba(0, 102, 255, 0.1)',
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0066ff' }}>
                    {cat.tagline}
                  </span>

                  <h3 style={{ fontSize: '1.55rem', fontWeight: '800', marginTop: '0.35rem', marginBottom: '0.85rem', color: '#090d1a', letterSpacing: '-0.02em' }}>
                    {cat.name}
                  </h3>

                  <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                    "{cat.description}"
                  </p>

                  <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.85rem', letterSpacing: '0.04em' }}>
                      Key Partnership Pillars:
                    </div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {cat.benefits.map((benefit, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.92rem', color: '#334155' }}>
                          <CheckCircle2 size={16} color="#0066ff" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: '2.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                  <Button
                    variant="primary"
                    block
                    onClick={() => onSelectCategory(cat.typeValue)}
                    icon={ArrowRight}
                  >
                    Inquire as {cat.name.split(' ')[0]}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .partner-categories-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
