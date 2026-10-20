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
    highlights: ['₹2 Cr to ₹5 Cr seed cheque size', '21-day decision timeline', '₹0 fees, no equity to pitch'],
    ctaText: 'Get Funded',
    icon: Rocket,
    personaKey: 'startup',
    color: '#0052FF',
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
    color: '#0A1128',
    btnVariant: 'outline',
  },
  {
    id: 'sme',
    badge: 'Direct Sourcing',
    title: 'SME Growth',
    tagline: 'Running an established SME? Apply directly, no incubator needed.',
    description: 'High-growth small and medium enterprises seeking growth capital through a bespoke, independent evaluation process.',
    highlights: ['₹5 Cr to ₹10 Cr growth cheques', 'Independent direct evaluation', 'Validated business models'],
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
        background: '#FFFFFF',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative',
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
        <div
          style={{
            maxWidth: '1100px',
            margin: '2.5rem auto 3.5rem auto',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
            backgroundColor: '#0A1128',
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
        </div>

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
          {PATHWAYS.map((p) => {
            const Icon = p.icon;
            const targetPath = `/you-are?persona=${p.personaKey}`;

            return (
              <div
                key={p.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: p.id === 'startup' ? '2px solid #0052FF' : '1.5px solid #E2E8F0',
                  padding: '2.25rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: p.id === 'startup' ? '0 8px 24px rgba(0, 82, 255, 0.08)' : '0 4px 16px rgba(15, 23, 42, 0.03)',
                  position: 'relative',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                }}
                className="pathway-card"
                onClick={() => navigate(targetPath)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#94A3B8';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = p.id === 'startup' ? '#0052FF' : '#E2E8F0';
                  e.currentTarget.style.boxShadow = p.id === 'startup' ? '0 8px 24px rgba(0, 82, 255, 0.08)' : '0 4px 16px rgba(15, 23, 42, 0.03)';
                }}
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        backgroundColor: '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: p.color,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        backgroundColor: p.id === 'startup' ? '#0052FF' : '#F1F5F9',
                        color: p.id === 'startup' ? '#FFFFFF' : '#334155',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '6px',
                      }}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: '800',
                      color: '#0A1128',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: p.id === 'startup' ? '#0052FF' : '#334155',
                      fontWeight: '700',
                      marginBottom: '0.85rem',
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
                        <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0 }} />
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
                      height: '44px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      backgroundColor: p.id === 'startup' ? '#0052FF' : undefined,
                      borderColor: p.id !== 'startup' ? '#CBD5E1' : undefined,
                      color: p.id === 'startup' ? '#FFFFFF' : '#0A1128',
                    }}
                  >
                    {p.ctaText}
                  </Button>
                </div>
              </div>
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
