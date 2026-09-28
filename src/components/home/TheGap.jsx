import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldAlert, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';
import { Container } from '../common/Container';
import { fadeUpVariant } from '../../utils/motion';

export const TheGap = () => {
  return (
    <section
      id="the-gap"
      className="section"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Container>
        <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
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
            <span>The Campus Capital Gap</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.85rem)',
              fontWeight: '800',
              color: '#090d1a',
              letterSpacing: '-0.03em',
              lineHeight: '1.2',
              marginBottom: '1.25rem',
            }}
          >
            Great campus ideas stall between <br className="hidden-mobile" />
            <span
              style={{
                background: 'linear-gradient(135deg, #0052ff 0%, #00b4d8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              the grant and the cheque.
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.12rem',
              color: '#475569',
              lineHeight: '1.7',
              maxWidth: '780px',
              margin: '0 auto',
            }}
          >
            Incubators back ideas with grants. Investors back companies that are ready. In between is a gap where most student startups quietly run out of runway and most SMEs never get seen at all. <strong>Campital is built to close it.</strong>
          </p>
        </div>

        {/* Panoramic The Gap Infographic Visual */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maxWidth: '1100px',
            margin: '0 auto 3rem auto',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)',
            backgroundColor: '#090d1a',
          }}
        >
          <img
            src="/images/the_gap_infographic.png"
            alt="The Campus Capital Gap: Where Campuses Begin to Where Growth Begins"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        {/* Visual The Gap Breakdown Graphic */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '1.5rem',
            alignItems: 'center',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
          className="the-gap-grid"
        >
          {/* Card 1: The Grant Stage */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#64748b',
                fontSize: '0.78rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.75rem',
              }}
            >
              <ShieldAlert size={14} style={{ color: '#d97706' }} />
              <span>Where Campuses Begin</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.5rem' }}>
              The Grant Cycle
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              University incubators offer early micro-grants, hackathon prizes, and lab space. But grants expire, leaving high-potential teams without runway.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#d97706' }}>•</span> Limited non-dilutive grant caps
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#d97706' }}>•</span> No direct institutional equity conduit
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#d97706' }}>•</span> Founders lose momentum after graduation
              </div>
            </div>
          </motion.div>

          {/* Center Conduit Connector */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem 1rem',
              background: 'linear-gradient(135deg, #0a1128 0%, #0052ff 100%)',
              borderRadius: '20px',
              color: '#ffffff',
              boxShadow: '0 12px 30px rgba(0, 82, 255, 0.25)',
              textAlign: 'center',
              minWidth: '220px',
              zIndex: 2,
            }}
            className="conduit-box"
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.65rem',
              }}
            >
              <TrendingUp size={20} style={{ color: '#38bdf8' }} />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8', marginBottom: '0.2rem' }}>
              The Pipeline
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.35rem' }}>
              Campital
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4' }}>
              Evaluation &bull; Shortlist &bull; Compliant Route
            </div>
          </div>

          {/* Card 2: The Cheque Stage */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#059669',
                fontSize: '0.78rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.75rem',
              }}
            >
              <CheckCircle2 size={14} />
              <span>Where Growth Begins</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.5rem' }}>
              The Investment Cheque
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Accredited investors and seed funds ready to write real equity cheques once teams prove deal readiness, unit economics, and market demand.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#059669' }}>✓</span> ₹2Cr – ₹10Cr real equity investment
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#059669' }}>✓</span> Standardized investor terms & governance
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#059669' }}>✓</span> Long-term scaling runway and syndicates
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 860px) {
          .the-gap-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .conduit-box {
            order: 2;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
