import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { fadeUpVariant } from '../../utils/motion';

export const ClosingCTA = () => {
  return (
    <section 
      className="section-closing-cta" 
      style={{ 
        background: '#FFFFFF', 
        position: 'relative', 
        paddingTop: '5.5rem', 
        paddingBottom: '5.5rem' 
      }}
    >
      <Container>
        <div
          className="closing-cta-card"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
            borderRadius: '16px',
            backgroundColor: '#0A1128',
            border: '1.5px solid #1E293B',
            boxShadow: '0 12px 36px rgba(10, 17, 40, 0.15)',
            color: '#FFFFFF',
          }}
        >
          {/* Eyebrow Label */}
          <div 
            style={{ 
              margin: '0 auto 1.25rem', 
              fontSize: '0.78rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#38BDF8',
            }}
          >
            2026 Intake Open
          </div>

          {/* Main Direct Headline */}
          <h2 
            style={{ 
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', 
              fontWeight: '800', 
              marginBottom: '1.25rem', 
              letterSpacing: '-0.03em', 
              color: '#FFFFFF', 
              lineHeight: 1.15,
              maxWidth: '820px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Ready to get your campus startup funded?
          </h2>

          {/* Direct Plain Subheadline with Numbers */}
          <p 
            style={{ 
              maxWidth: '680px', 
              margin: '0 auto 2.5rem', 
              color: '#CBD5E1', 
              fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', 
              lineHeight: '1.65', 
              fontWeight: '400' 
            }}
          >
            Apply in 5 minutes. Student startups receive ₹2 Cr to ₹5 Cr in seed capital. Evaluation decision in 21 days. ₹0 fees.
          </p>

          {/* Proof Badges Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1rem, 3vw, 2.5rem)',
              flexWrap: 'wrap',
              marginBottom: '3rem',
              color: '#94A3B8',
              fontSize: '0.92rem',
              fontWeight: '600',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ color: '#F1F5F9' }}>₹2 Cr to ₹5 Cr Seed Cheques</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ color: '#F1F5F9' }}>21-Day Decision Timeline</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ color: '#F1F5F9' }}>Zero Founder Fees</span>
            </div>
          </div>

          {/* ONE Clear Primary Button + Secondary Partner Link */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <Button
              to="/you-are?persona=startup"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              style={{
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                height: '52px',
                padding: '0 2.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '700',
                border: 'none',
              }}
            >
              Apply for Funding
            </Button>

            <Link
              to="/you-are?persona=incubator"
              style={{
                color: '#CBD5E1',
                fontSize: '0.95rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#CBD5E1';
              }}
            >
              <span>Partner your incubator</span>
              <span style={{ fontSize: '1.1rem' }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
