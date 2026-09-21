import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { WHY_CAMPITAL_PILLARS } from '../../data/homeData';
import { fadeUpVariant } from '../../utils/motion';

export const WhyCampital = () => {
  return (
    <section 
      className="section"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
      }}
    >
      <Container>
        {/* Massive Bold Magenta Headline (Matching Reference Screenshot 1) */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{ marginBottom: '4rem', maxWidth: '1080px' }}
        >
          <h2
            style={{
              fontSize: 'clamp(2.3rem, 4.4vw, 3.4rem)',
              fontWeight: '800',
              color: '#0066ff',
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
            }}
          >
            We partner with Student Entrepreneurs, as their own extended team!
          </h2>
        </motion.div>

        {/* Editorial Split Rows with Clean Line Dividers (Matching Reference Screenshot 1) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Row 1 */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '2.5rem',
              paddingTop: '2.5rem',
              paddingBottom: '2.5rem',
              borderTop: '1px solid #e2e8f0',
              alignItems: 'baseline',
            }}
            className="editorial-row"
          >
            <div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0066ff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Founder-First Funding
              </h3>
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                Equity that empowers, not restricts.
              </h4>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.65', margin: 0 }}>
                We keep it simple and fast — often the first believers with an institutional introduction on student-friendly terms, moving you away from recurring grant cycles into real venture momentum.
              </p>
            </div>
          </motion.div>

          {/* Row 2 */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={1}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '2.5rem',
              paddingTop: '2.5rem',
              paddingBottom: '2.5rem',
              borderTop: '1px solid #e2e8f0',
              alignItems: 'baseline',
            }}
            className="editorial-row"
          >
            <div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0066ff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                A Network That Opens Doors
              </h3>
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                World-class access, one connection away.
              </h4>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.65', margin: 0 }}>
                Supported by the world's best entrepreneurs, industry experts, campus incubators, and corporate partners. Our evaluated founders get direct access to leaders of iconic companies when they need it most.
              </p>
            </div>
          </motion.div>

          {/* Row 3 */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={2}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '2.5rem',
              paddingTop: '2.5rem',
              paddingBottom: '2.5rem',
              borderTop: '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0',
              alignItems: 'baseline',
            }}
            className="editorial-row"
          >
            <div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0066ff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Real Capital, Not Grants
              </h3>
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                A structured funnel with real investment conviction.
              </h4>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.65', margin: 0 }}>
                Every touchpoint — from hackathon scoring to pitch evaluations — is designed to help founders build viable investment readiness, not just win novelty certificates.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 820px) {
          .editorial-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
