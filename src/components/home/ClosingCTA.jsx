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
        background: 'linear-gradient(180deg, #F8FAFC 0%, #0A173A 55%, #090D1A 100%)', 
        position: 'relative', 
        overflow: 'hidden', 
        paddingTop: '6rem', 
        paddingBottom: '6rem' 
      }}
    >
      <Container>
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="closing-cta-card"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
            borderRadius: '30px',
            overflow: 'hidden',
            backgroundColor: '#07122C',
            backgroundImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(18, 100, 255, 0.45), rgba(7, 18, 44, 0.98))',
            border: '1.5px solid rgba(56, 189, 248, 0.28)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(18, 100, 255, 0.2)',
            color: '#FFFFFF',
          }}
        >
          {/* Eyebrow Badge */}
          <div 
            style={{ 
              margin: '0 auto 1.75rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38BDF8',
              fontSize: '0.84rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Sparkles size={15} />
            <span>2026 Intake Open</span>
          </div>

          {/* Main Direct Headline */}
          <h2 
            style={{ 
              fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)', 
              fontWeight: '900', 
              marginBottom: '1.35rem', 
              letterSpacing: '-0.035em', 
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
              fontSize: 'clamp(1.08rem, 1.6vw, 1.3rem)', 
              lineHeight: '1.65', 
              fontWeight: '400' 
            }}
          >
            Apply in 5 minutes. Student startups receive ₹2–5 Cr in seed capital. Evaluation decision in 21 days. ₹0 fees.
          </p>

          {/* Proof Badges Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1rem, 3.5vw, 2.5rem)',
              flexWrap: 'wrap',
              marginBottom: '3.25rem',
              color: '#94A3B8',
              fontSize: '0.92rem',
              fontWeight: '600',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ color: '#F1F5F9' }}>₹2–5 Cr Seed Cheques</span>
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
                background: 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)',
                color: '#FFFFFF',
                height: '58px',
                padding: '0 3rem',
                borderRadius: '100px',
                fontSize: '1.1rem',
                fontWeight: '800',
                boxShadow: '0 14px 36px rgba(18, 100, 255, 0.45)',
                border: 'none',
              }}
            >
              Apply for Funding
            </Button>

            <Link
              to="/you-are?persona=incubator"
              style={{
                color: '#CBD5E1',
                fontSize: '1rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#38BDF8';
                e.currentTarget.style.transform = 'translateX(3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#CBD5E1';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span>Partner your incubator</span>
              <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
