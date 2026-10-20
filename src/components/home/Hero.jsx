import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import GradientWaves from '../ui/GradientWaves';

export const Hero = () => {
  return (
    <section 
      id="hero"
      className="section-hero-institutional"
      style={{
        position: 'relative',
        backgroundColor: '#070D1E',
        borderBottom: '1px solid #1E293B',
        paddingTop: '7.5rem',
        paddingBottom: '5.5rem',
        overflow: 'hidden',
      }}
    >
      {/* 3D WebGL GradientWaves Interactive Background from React Bits */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <GradientWaves
          horizonColor="#1e3a8a"
          waveColor="#38bdf8"
          crestColor="#e0f2fe"
          speed={0.5}
          amplitude={1.8}
          relief={1}
          lightAngle={150}
          mouseInteraction
          swellOnClick
          waveScale={0.9}
          swell={25}
          turbulence={28}
        />
        {/* Soft Vignette Overlay for Crisp Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(7, 13, 30, 0.84) 0%, rgba(7, 13, 30, 0.6) 45%, rgba(7, 13, 30, 0.35) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.95fr)',
            gap: '3.5rem',
            alignItems: 'center',
            width: '100%',
          }}
          className="hero-main-grid"
        >
          {/* ================= LEFT COLUMN: CONFIDENT, PLAIN-ENGLISH EDITORIAL ================= */}
          <div className="hero-editorial-col" style={{ maxWidth: '640px' }}>
            {/* Direct Headline - Crisp High-Contrast White */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 4.8vw, 3.85rem)',
                fontWeight: '800',
                letterSpacing: '-0.035em',
                lineHeight: 1.12,
                color: '#FFFFFF',
                marginBottom: '1.5rem',
              }}
              className="hero-headline-title"
            >
              Get your campus startup its first investor meeting.
            </h1>

            {/* Direct Subheadline - Concrete Numbers, Plain Language */}
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)',
                lineHeight: 1.65,
                fontWeight: '400',
                color: '#CBD5E1',
                marginBottom: '2.25rem',
              }}
              className="hero-description-text"
            >
              Campital connects student founders and university incubators to real institutional capital.
              Student startups receive ₹2 to 5 Crore in seed funding. Apply in three steps. Zero upfront fees, and no equity taken to pitch.
            </p>

            {/* CTA Buttons - Solid Tactile Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
              }}
              className="hero-cta-button-group"
            >
              <Button
                to="/you-are?persona=startup"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                style={{
                  backgroundColor: '#0052FF',
                  height: '52px',
                  borderRadius: '8px',
                  padding: '0 2rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  border: '1px solid #0052FF',
                  boxShadow: '0 2px 8px rgba(0, 82, 255, 0.35)',
                }}
              >
                Apply for Funding
              </Button>

              <Link
                to="/you-are?persona=incubator"
                style={{
                  color: '#FFFFFF',
                  fontSize: '0.98rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1.15rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}
                className="hero-secondary-link"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                <span>Partner your incubator</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Factual Value Checklist - Clean and Clear */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                flexWrap: 'wrap',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#CBD5E1',
                fontSize: '0.88rem',
                fontWeight: '600',
              }}
              className="hero-proof-chips"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#38BDF8" />
                <span>₹2 to ₹5 Cr Seed Capital</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#38BDF8" />
                <span>21-Day Decision Timeline</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#38BDF8" />
                <span>₹0 Application Fees</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SOLID INSTITUTIONAL DEAL CARD ================= */}
          <div className="hero-deal-card-wrap">
            <div
              style={{
                backgroundColor: 'rgba(10, 17, 40, 0.94)',
                borderRadius: '16px',
                padding: '2.25rem 2rem',
                color: '#FFFFFF',
                border: '1.5px solid rgba(56, 189, 248, 0.22)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
              className="hero-deal-card"
            >
              {/* Card Header */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '1.5rem', 
                  borderBottom: '1px solid #1E293B', 
                  paddingBottom: '1.25rem' 
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8' }}>
                    Standard Terms
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#FFFFFF', marginTop: '0.2rem' }}>
                    Campus Seed Pathway
                  </h3>
                </div>
                <div style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', backgroundColor: '#064E3B', color: '#6EE7B7', fontSize: '0.75rem', fontWeight: '700' }}>
                  2026 Intake Active
                </div>
              </div>

              {/* Core Numbers - Solid High Contrast */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#111C3A', padding: '1rem 1.15rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Cheque Size
                  </div>
                  <div style={{ fontSize: '1.55rem', fontWeight: '800', color: '#FFFFFF', marginTop: '0.25rem' }}>
                    ₹2 to 5 Cr
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                    Equity Seed Capital
                  </div>
                </div>

                <div style={{ backgroundColor: '#111C3A', padding: '1rem 1.15rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Timeline
                  </div>
                  <div style={{ fontSize: '1.55rem', fontWeight: '800', color: '#FFFFFF', marginTop: '0.25rem' }}>
                    21 Days
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                    Submission to Decision
                  </div>
                </div>
              </div>

              {/* Factual Specification Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={16} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.45 }}>
                    <strong style={{ color: '#FFFFFF' }}>Eligibility:</strong> Student, alumni, or faculty teams with a functional prototype or pilot users.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={16} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.45 }}>
                    <strong style={{ color: '#FFFFFF' }}>Structure:</strong> 20-minute pitch sessions with accredited angel syndicates and venture fund partners.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={16} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.45 }}>
                    <strong style={{ color: '#FFFFFF' }}>Founder Costs:</strong> Zero fees to apply, participate, or pitch. Founders keep 100% equity until closing.
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                to="/you-are?persona=startup"
                variant="white"
                block
                size="md"
                style={{
                  fontWeight: '700',
                  borderRadius: '8px',
                  height: '46px',
                  backgroundColor: '#FFFFFF',
                  color: '#0A1128',
                  fontSize: '0.92rem',
                }}
              >
                Start Application &rarr;
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 960px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-editorial-col {
            max-width: 100% !important;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};
