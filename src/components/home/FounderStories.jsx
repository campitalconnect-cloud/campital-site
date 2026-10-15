import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Building2, TrendingUp, Award, ArrowUpRight } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { fadeUpVariant } from '../../utils/motion';

const STORIES = [
  {
    id: 'aarav-priya',
    name: 'Aarav Sharma & Priya Nair',
    role: 'Co-Founders, NeuroPulse Health',
    campus: 'IIT Bombay (Class of 2024)',
    image: '/images/founder_aarav_priya.jpg',
    metricBadge: 'Raised ₹3.2 Cr Seed',
    metricType: 'capital',
    quote:
      'We spent four months pitching at campus competitions and won multiple grants, but we couldn’t get a single meeting with Mumbai or Bangalore seed funds. Campital evaluated our prototype and put us in front of institutional angels. We signed our term sheet in 18 days.',
    sector: 'HealthTech & AI',
  },
  {
    id: 'dr-vikram',
    name: 'Dr. Vikram Ramanathan',
    role: 'Chief Executive Officer',
    campus: 'Technology Business Incubator, BITS Pilani',
    image: '/images/partner_dr_vikram.jpg',
    metricBadge: 'Partner Hub • 14 Startups Backed',
    metricType: 'partner',
    quote:
      'University incubators excel at grant support and early lab facilities. What campus founders lack is compliant equity investment. Campital’s structured demo days gave our cohort direct access to genuine venture funds without taking equity from the university.',
    sector: 'Incubation & DeepTech',
  },
  {
    id: 'tanvi-mehta',
    name: 'Tanvi Mehta',
    role: 'Founder & CEO, AgriFlow Robotics',
    campus: 'DTU Innovation Lab (Class of 2025)',
    image: '/images/founder_tanvi.jpg',
    metricBadge: 'Raised ₹2.5 Cr Seed',
    metricType: 'capital',
    quote:
      'As a student founder, people usually offer mentorship or advice instead of capital. Campital was completely different: zero fees, a transparent 3-step evaluation, and serious investors who wrote our ₹2.5 Cr lead cheque within 3 weeks.',
    sector: 'AgriTech & Robotics',
  },
];

export const FounderStories = () => {
  return (
    <section 
      id="founder-stories"
      className="section"
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Founder Proof"
          title="From Campus Dorm to Real Seed Capital"
          subtitle="Real founders and incubator directors who bypassed endless pitch contests and secured structured equity funding."
          centered
        />

        {/* 3 Story Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '3.5rem',
          }}
          className="founder-stories-grid"
        >
          {STORIES.map((s, index) => (
            <motion.div
              key={s.id}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #E2E8F0',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
              }}
              className="founder-story-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1264FF';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(18, 100, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Photo & Result Badge */}
              <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden' }}>
                <img
                  src={s.image}
                  alt={s.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Result Pill Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    backgroundColor: s.metricType === 'capital' ? '#08152F' : '#1264FF',
                    color: '#FFFFFF',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '100px',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <TrendingUp size={14} color="#38BDF8" />
                  <span>{s.metricBadge}</span>
                </div>
              </div>

              {/* Story Content & Quote */}
              <div style={{ padding: '1.75rem 1.75rem 2rem 1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  {/* Quote Icon & Text */}
                  <div style={{ color: '#1264FF', opacity: 0.35, marginBottom: '0.5rem' }}>
                    <Quote size={24} />
                  </div>
                  <p
                    style={{
                      fontSize: '0.94rem',
                      lineHeight: '1.65',
                      color: '#334155',
                      fontStyle: 'italic',
                      marginBottom: '1.5rem',
                    }}
                  >
                    "{s.quote}"
                  </p>
                </div>

                {/* Founder Info */}
                <div
                  style={{
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '1.25rem',
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#08152F' }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#1264FF', fontWeight: '700', marginTop: '0.15rem' }}>
                    {s.role}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building2 size={13} color="#94A3B8" />
                    <span>{s.campus}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregated Proof Strip */}
        <div
          style={{
            marginTop: '3.5rem',
            padding: '1.75rem 2rem',
            background: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1.5rem',
            textAlign: 'center',
          }}
          className="aggregate-proof-strip"
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#08152F' }}>
              40+
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>
              Campus ventures evaluated
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#1264FF' }}>
              ₹18 Cr+
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>
              Capital facilitation pipeline
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#08152F' }}>
              15+
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>
              Partner academic incubators
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#10B981' }}>
              100%
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>
              Zero fees for founders
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .founder-stories-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .aggregate-proof-strip {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
