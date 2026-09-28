import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Clock, 
  TrendingUp,
  Award
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { EmailInquiryModal } from '../components/forms/EmailInquiryModal';
import { fadeUpVariant } from '../utils/motion';

const FUNDING_ROUTES = [
  {
    id: 'startup-seed',
    badge: 'Route 01',
    title: 'Startup Seed Route',
    cheque: '₹2 – 5 Cr',
    stage: 'MVP to Early Revenue',
    target: 'Campus-born and early-stage founders with working prototypes or initial traction.',
    process: [
      'Structured Evaluation & Metric Scoring',
      'Curated Campital Shortlist Selection',
      'Demo Day / Direct Institutional Investor Review',
      'Standardized Founder-Friendly Term Sheet'
    ],
    icon: Rocket,
    highlightColor: '#0066ff',
    personaKey: 'startup'
  },
  {
    id: 'sme-growth',
    badge: 'Route 02',
    title: 'SME Growth Route',
    cheque: '₹5 – 10 Cr',
    stage: 'Established Revenue',
    target: 'Growing businesses with proven unit economics seeking expansion capital.',
    process: [
      'In-Depth Financial & Unit Economics Assessment',
      'Growth Syndicate Shortlist Presentation',
      'Syndicate Lead & Institutional Review',
      'Compliant Capital Term Sheet & Disbursement'
    ],
    icon: Building2,
    highlightColor: '#059669',
    personaKey: 'sme'
  },
  {
    id: 'incubator-portfolio',
    badge: 'Route 03',
    title: 'Incubator Portfolio Route',
    cheque: '₹2 – 5 Cr per team',
    stage: 'Pre-Seed to Seed',
    target: 'Incubator cohorts graduating from partner institutions.',
    process: [
      'Comprehensive Cohort Evaluation Matrix',
      'Joint Campus Showcase & Demo Day',
      'Curated Syndicate Review for Top Teams',
      'Accelerated Follow-On Funding Pathway'
    ],
    icon: GraduationCap,
    highlightColor: '#7c3aed',
    personaKey: 'incubator'
  }
];

const SHARED_STANDARDS = [
  {
    title: 'Independent Rigorous Evaluation',
    description: 'Every applicant is scored on team capability, market depth, defensibility, and traction clarity before touching an investor pipeline.',
    icon: Award
  },
  {
    title: 'Feedback for Every Team',
    description: 'Whether funded or not, shortlisted applicants receive constructive evaluation notes to sharpen their metrics and readiness.',
    icon: FileText
  },
  {
    title: 'Investor-Grade Deal Memo',
    description: 'We structure and package deal data into standardized, high-conviction memos so investors can make quick, informed decisions.',
    icon: Layers
  },
  {
    title: 'Zero Upfront Founder Fees',
    description: 'We align completely with founders and legitimate enterprise growth. We never charge founders to pitch or be evaluated.',
    icon: ShieldCheck
  }
];

const WHAT_WE_DONT_DO = [
  'We do not take upfront application fees, pitch fees, or screening charges from founders.',
  'We do not fund unvalidated theoretical ideas without an active team, working prototype, or market evidence.',
  'We do not blast generic uncurated pitch decks to random angel lists without institutional evaluation.',
  'We do not promise guaranteed checks before completion of rigorous deal due diligence.',
  'We do not take exploitative equity stakes or founder-unfriendly liquidation preferences.'
];

export const HowWeFund = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('startup');

  const handleOpenModal = (personaKey = 'startup') => {
    setSelectedPersona(personaKey);
    setModalOpen(true);
  };

  return (
    <div className="how-we-fund-page" style={{ paddingTop: '5.5rem' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
          padding: '4rem 0 3.5rem',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Container>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0, 102, 255, 0.08)',
                border: '1px solid rgba(0, 102, 255, 0.2)',
                color: '#0066ff',
                fontSize: '0.82rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              <span>Disciplined Capital Pipeline</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
                fontWeight: '800',
                color: '#090d1a',
                letterSpacing: '-0.03em',
                lineHeight: '1.18',
                marginBottom: '1.25rem',
              }}
            >
              How We Fund: <br className="hidden-mobile" />
              <span
                style={{
                  background: 'linear-gradient(135deg, #0052ff 0%, #00b4d8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Three clear routes. One standard of readiness.
              </span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: '#475569',
                lineHeight: '1.7',
                maxWidth: '740px',
                margin: '0 auto 2rem',
              }}
            >
              We don't do spray-and-pray. Every startup, SME, or incubator cohort that enters our pipeline goes through the same rigorous evaluation before reaching capital.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                onClick={() => handleOpenModal('startup')}
                icon={ArrowRight}
                style={{ backgroundColor: '#0066ff' }}
              >
                Apply for Funding
              </Button>
              <Button
                variant="secondary"
                href="#what-we-dont-do"
                style={{ borderColor: '#cbd5e1' }}
              >
                Our Standards
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 Routes Section */}
      <section className="section" style={{ backgroundColor: '#ffffff', padding: '5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                fontWeight: '800',
                color: '#090d1a',
                letterSpacing: '-0.025em',
                marginBottom: '0.75rem',
              }}
            >
              Tailored Pathways for Every Growth Profile
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.6' }}>
              Select the route matching your entity structure and current operating traction.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              alignItems: 'stretch'
            }}
            className="routes-grid"
          >
            {FUNDING_ROUTES.map((route, idx) => {
              const IconComp = route.icon;
              return (
                <motion.div
                  key={route.id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '24px',
                    padding: '2.25rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="route-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '14px',
                        backgroundColor: `${route.highlightColor}15`,
                        color: route.highlightColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={26} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        color: route.highlightColor,
                        backgroundColor: `${route.highlightColor}10`,
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {route.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.5rem' }}>
                    {route.title}
                  </h3>

                  <div style={{ margin: '1rem 0 1.25rem', padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Target Cheque Size
                    </div>
                    <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0052ff', marginTop: '0.2rem' }}>
                      {route.cheque}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Stage: <strong style={{ color: '#090d1a' }}>{route.stage}</strong>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {route.target}
                  </p>

                  <div style={{ marginBottom: '2rem', flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#090d1a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
                      Evaluation & Deal Process
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {route.process.map((step, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.86rem', color: '#334155', lineHeight: '1.45' }}>
                          <CheckCircle2 size={16} style={{ color: route.highlightColor, flexShrink: 0, marginTop: '2px' }} />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => handleOpenModal(route.personaKey)}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      backgroundColor: route.highlightColor,
                      borderColor: route.highlightColor
                    }}
                    icon={ArrowRight}
                  >
                    Enter This Route
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Shared Standards Section */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '5rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0, 102, 255, 0.08)',
                border: '1px solid rgba(0, 102, 255, 0.2)',
                color: '#0066ff',
                fontSize: '0.82rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}
            >
              <ShieldCheck size={14} />
              <span>Universal Quality Code</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                fontWeight: '800',
                color: '#090d1a',
                letterSpacing: '-0.025em',
                marginBottom: '0.75rem',
              }}
            >
              What Every Route Has in Common
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.6' }}>
              Regardless of your company size or entry point, all deals on Campital share these four institutional commitments.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
            className="standards-grid"
          >
            {SHARED_STANDARDS.map((std, idx) => {
              const IconC = std.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '20px',
                    padding: '2rem',
                    display: 'flex',
                    gap: '1.25rem',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0, 102, 255, 0.1)',
                      color: '#0066ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconC size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.45rem' }}>
                      {std.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                      {std.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* What We Don't Do Section */}
      <section id="what-we-dont-do" className="section" style={{ backgroundColor: '#ffffff', padding: '5rem 0' }}>
        <Container>
          <div
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              backgroundColor: '#fff1f2',
              border: '1.5px solid #fecdd3',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#e11d48', marginBottom: '1rem' }}>
              <XCircle size={24} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#9f1239', margin: 0 }}>
                What We Don't Do
              </h2>
            </div>
            <p style={{ fontSize: '1rem', color: '#881337', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              Campital is built on transparency and founder trust. Here is our absolute code of conduct regarding what we will never do:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {WHAT_WE_DONT_DO.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#e11d48',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    ✕
                  </div>
                  <span style={{ fontSize: '0.95rem', color: '#4c0519', lineHeight: '1.5', fontWeight: '500' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Closing Callout */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0a1128 0%, #173887 50%, #0052ff 100%)',
          color: '#ffffff',
          padding: '5rem 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.65rem)',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
                lineHeight: '1.25'
              }}
            >
              Ready to submit your venture for evaluation?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '2rem' }}>
              Fill our zero-backend intake screening to prepare an investor-ready brief directly into your email client.
            </p>
            <Button
              variant="white"
              onClick={() => handleOpenModal('startup')}
              icon={ArrowRight}
              style={{ padding: '0.85rem 2rem', fontWeight: '800' }}
            >
              Start Your Evaluation
            </Button>
          </div>
        </Container>
      </section>


      {/* Intake Modal */}
      <EmailInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        personaKey={selectedPersona}
      />

      <style>{`
        .route-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 82, 255, 0.12) !important;
          border-color: rgba(0, 102, 255, 0.4) !important;
        }
        @media (max-width: 992px) {
          .routes-grid {
            grid-template-columns: 1fr !important;
            max-width: 580px;
            margin: 0 auto;
          }
          .standards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
