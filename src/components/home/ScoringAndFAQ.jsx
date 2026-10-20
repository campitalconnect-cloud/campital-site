import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, Award, Users, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { fadeUpVariant } from '../../utils/motion';

const CRITERIA = [
  {
    weight: '30%',
    title: 'Founder Grit & Team',
    desc: 'Technical competence, domain insight, and speed of execution. We back relentless builders who want to create category-defining companies.',
    icon: Users,
    image: '/images/criteria_founder_grit.jpg',
    tag: 'Execution & Hunger',
  },
  {
    weight: '25%',
    title: 'Built Prototype / MVP',
    desc: 'Functional software, hardware bench model, or lab-tested proof of concept. We fund builders who make real things, not just PowerPoint decks.',
    icon: Layers,
    image: '/images/criteria_prototype_mvp.jpg',
    tag: 'Working Product',
  },
  {
    weight: '25%',
    title: 'Market Opportunity',
    desc: 'Clear addressable market (₹1,000 Cr+ TAM) with defensible economics. Must have potential for venture-scale growth over 5 to 7 years.',
    icon: Target,
    image: '/images/criteria_market_opportunity.jpg',
    tag: '₹1,000 Cr+ TAM',
  },
  {
    weight: '20%',
    title: 'Early Signal / Traction',
    desc: 'Pilot deployments, user testing metrics, waitlists, customer feedback, or early revenue demonstrating real customer demand.',
    icon: Award,
    image: '/images/criteria_early_traction.jpg',
    tag: 'Pilot & User Signal',
  },
];

const FAQS = [
  {
    q: 'How much funding does a campus startup receive?',
    a: 'We facilitate ₹2 Cr to ₹5 Cr in institutional equity seed capital per venture. For growth-stage SMEs applying via our direct track, cheque sizes range from ₹5 Cr to ₹10 Cr.',
  },
  {
    q: 'Do you charge founders any fees to apply or pitch?',
    a: 'No. Zero fees. Neither Campital nor our investor network charges application fees, event fees, mentoring fees, or upfront equity. Founders keep 100% of their equity until a formal investment round closes.',
  },
  {
    q: 'How long does the evaluation process take?',
    a: 'From application submission to term sheet discussion takes 21 days maximum. Our investment team conducts an initial review within 48 hours of submission, and shortlisted founders pitch in a structured demo session within 2 weeks.',
  },
  {
    q: 'Do we have to be incubated at a partner university incubator to apply?',
    a: 'No. While incubated startups from our partner hubs (such as IITs, BITS, IIMs, and DTU) receive fast-track review, any student, recent graduate, or campus researcher across India is eligible to apply directly.',
  },
  {
    q: 'What stage does our venture need to be at?',
    a: 'You need at least a working prototype or MVP (functional code, hardware unit, or lab test validation) and a committed founding team. We welcome pre-revenue startups with strong technical foundations.',
  },
  {
    q: 'How does Campital work with University Incubators?',
    a: 'We partner directly with university incubation centers and E-Cells. Incubators retain their full incubation equity and governance, while we bridge their portfolio directly into structured seed capital with institutional co-investors.',
  },
];

export const ScoringAndFAQ = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <section 
      id="criteria-and-faq"
      className="section"
      style={{
        background: '#F8FAFC',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Selection & Clarity"
          title="Public Scoring Criteria & Plain Answers"
          subtitle="No hidden requirements. Here is exactly how our investment committee evaluates campus ventures."
          centered
        />

        {/* Section 1: Public Scoring Criteria (4 Transparent Pillars with Relevant Visuals) */}
        <div style={{ maxWidth: '1180px', margin: '3.5rem auto 4.5rem auto' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.45rem',
                fontWeight: '800',
                color: '#0A1128',
                letterSpacing: '-0.02em',
              }}
            >
              How Our Investment Committee Scores Applications
            </h3>
            <p style={{ fontSize: '0.96rem', color: '#64748B', marginTop: '0.35rem' }}>
              Every application is objectively evaluated against four published parameters:
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.75rem',
            }}
            className="criteria-grid"
          >
            {CRITERIA.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1.5px solid #E2E8F0',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  className="criteria-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#94A3B8';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.07)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.03)';
                  }}
                >
                  {/* Top Image Showcase */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '180px',
                      overflow: 'hidden',
                      backgroundColor: '#0A1128',
                    }}
                  >
                    <img
                      src={c.image}
                      alt={c.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      className="criteria-img"
                    />

                    {/* Gradient overlay for contrast */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(10, 17, 40, 0.2) 0%, rgba(10, 17, 40, 0.75) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Top Weight Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        left: '0.85rem',
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        padding: '0.3rem 0.7rem',
                        borderRadius: '6px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {c.weight}
                    </div>

                    {/* Top Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        left: '0.85rem',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '0.74rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        backgroundColor: 'rgba(10, 17, 40, 0.88)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {c.tag}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      padding: '1.5rem 1.4rem 1.6rem 1.4rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.65rem',
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            backgroundColor: '#F1F5F9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0A1128',
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} />
                        </div>
                        <h4
                          style={{
                            fontSize: '1.15rem',
                            fontWeight: '800',
                            color: '#0A1128',
                            letterSpacing: '-0.02em',
                            margin: 0,
                          }}
                        >
                          {c.title}
                        </h4>
                      </div>

                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: '#475569',
                          lineHeight: '1.65',
                          margin: 0,
                        }}
                      >
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Plain-Language FAQ Accordion */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0052FF',
                marginBottom: '0.5rem',
              }}
            >
              Key Questions Answered
            </div>
            <h3
              style={{
                fontSize: '1.55rem',
                fontWeight: '800',
                color: '#0A1128',
                letterSpacing: '-0.02em',
              }}
            >
              Frequently Asked Questions
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: isOpen ? '1.5px solid #0052FF' : '1px solid #E2E8F0',
                    boxShadow: isOpen ? '0 4px 16px rgba(0, 82, 255, 0.06)' : '0 2px 6px rgba(15, 23, 42, 0.02)',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: isOpen ? '#0052FF' : '#0A1128',
                      }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      color={isOpen ? '#0052FF' : '#64748B'}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                        marginLeft: '1rem',
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          style={{
                            padding: '0 1.5rem 1.35rem 1.5rem',
                            fontSize: '0.94rem',
                            color: '#475569',
                            lineHeight: '1.65',
                            borderTop: '1px solid #F1F5F9',
                            paddingTop: '1rem',
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 1040px) {
          .criteria-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .criteria-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
