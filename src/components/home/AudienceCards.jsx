import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Building2, Briefcase, GraduationCap, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { fadeUpVariant } from '../../utils/motion';

const PATHWAYS = [
  {
    id: 'startup',
    badge: 'Campus Founders',
    title: 'Startup Track',
    tagline: 'Built something on campus? Get evaluated, get funded.',
    description: 'For student, alumni, and lab-born ventures ready to transition from campus prototypes to scalable, venture-backed companies.',
    highlights: ['₹2–5 Cr seed cheque size', '21-day decision timeline', '₹0 fees, no equity to pitch'],
    ctaText: 'Get Funded',
    icon: Rocket,
    personaKey: 'startup',
    color: '#1264FF',
    btnVariant: 'primary',
  },
  {
    id: 'incubator',
    badge: 'University Ecosystems',
    title: 'Campus Incubator',
    tagline: "Give your portfolio a funding path that doesn't end at grants.",
    description: 'Plugs your university innovation center into our structured evaluation engine and institutional co-investor syndicate.',
    highlights: ['Institutional equity for your cohort', 'Co-hosted demo days', 'Retain full incubation terms'],
    ctaText: 'Partner Your Incubator',
    icon: Building2,
    personaKey: 'incubator',
    color: '#08152F',
    btnVariant: 'outline',
  },
  {
    id: 'sme',
    badge: 'Direct Sourcing',
    title: 'SME Growth',
    tagline: 'Running an established SME? Apply directly, no incubator needed.',
    description: 'High-growth small and medium enterprises seeking growth capital through a bespoke, independent evaluation process.',
    highlights: ['₹5–10 Cr growth cheques', 'Independent direct evaluation', 'Validated business models'],
    ctaText: 'Apply for SME Funding',
    icon: Briefcase,
    personaKey: 'sme',
    color: '#0284C7',
    btnVariant: 'outline',
  },
  {
    id: 'faculty',
    badge: 'Lab to Venture',
    title: 'Faculty & Lab IP',
    tagline: 'Campus research with venture potential? We build the route for it.',
    description: 'A dedicated pipeline taking breakthrough academic research, patents, and deep-tier lab discoveries into investable enterprises.',
    highlights: ['IP commercialization support', 'DeepTech investor network', 'Founder-friendly spin-out'],
    ctaText: 'Commercialize Lab IP',
    icon: GraduationCap,
    personaKey: 'faculty',
    color: '#059669',
    btnVariant: 'outline',
  },
];

export const AudienceCards = () => {
  const navigate = useNavigate();

  return (
    <section 
      id="who-it-is-for"
      className="section"
      style={{
        background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 40%, #F8FAFC 100%)',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Who It Is For"
          title="Designed for Campus Founders, Incubators, SMEs & Researchers"
          subtitle="Select your pathway to explore tailored evaluation criteria, partnership benefits, and dedicated capital routes."
          centered
        />

        {/* Panoramic 4-Track Showcase Visual */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maxWidth: '1100px',
            margin: '2.5rem auto 3.5rem auto',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)',
            backgroundColor: '#090D1A',
          }}
        >
          <img
            src="/images/you_are_showcase.png"
            alt="You Are: Designed for Campus Founders, Incubators, SMEs & Researchers"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        {/* 4 Differentiated Pathway Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}
          className="audience-four-grid"
        >
          {PATHWAYS.map((p, index) => {
            const Icon = p.icon;
            const targetPath = `/you-are?persona=${p.personaKey}`;

            return (
              <motion.div
                key={p.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  border: p.id === 'startup' ? '2px solid #1264FF' : '1.5px solid #E2E8F0',
                  padding: '2.25rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: p.id === 'startup' ? '0 16px 36px rgba(18, 100, 255, 0.1)' : '0 8px 24px rgba(15, 23, 42, 0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.28s ease',
                  cursor: 'pointer',
                }}
                className="pathway-card"
                onClick={() => navigate(targetPath)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.color;
                  e.currentTarget.style.boxShadow = `0 20px 45px rgba(18, 100, 255, 0.15)`;
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = p.id === 'startup' ? '#1264FF' : '#E2E8F0';
                  e.currentTarget.style.boxShadow = p.id === 'startup' ? '0 16px 36px rgba(18, 100, 255, 0.1)' : '0 8px 24px rgba(15, 23, 42, 0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Top Accent Trim */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: p.id === 'startup' ? 'linear-gradient(90deg, #1264FF 0%, #20BFEF 100%)' : p.color,
                  }}
                />

                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: p.id === 'startup' ? 'rgba(18, 100, 255, 0.1)' : 'rgba(8, 21, 47, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: p.color,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        backgroundColor: p.id === 'startup' ? '#1264FF' : '#F1F5F9',
                        color: p.id === 'startup' ? '#FFFFFF' : '#334155',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '100px',
                      }}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: '800',
                      color: '#08152F',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.65rem',
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.94rem',
                      color: p.color,
                      fontWeight: '700',
                      marginBottom: '1rem',
                      lineHeight: '1.45',
                    }}
                  >
                    "{p.tagline}"
                  </p>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#475569',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {p.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
                    {p.highlights.map((h) => (
                      <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.84rem', color: '#1E293B', fontWeight: '600' }}>
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pathway Button - Each Unique and Tailored */}
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
                  <Button
                    to={targetPath}
                    variant={p.btnVariant}
                    block
                    size="md"
                    icon={ArrowRight}
                    style={{
                      height: '46px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      background: p.id === 'startup' ? 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)' : undefined,
                      borderColor: p.id !== 'startup' ? '#CBD5E1' : undefined,
                      color: p.id === 'startup' ? '#FFFFFF' : '#08152F',
                    }}
                  >
                    {p.ctaText}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      <style>{`
        @media (max-width: 1080px) {
          .audience-four-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .audience-four-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
