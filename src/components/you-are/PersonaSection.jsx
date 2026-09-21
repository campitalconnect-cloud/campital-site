import React from 'react';
import { motion } from 'framer-motion';
import { PersonaOverview } from './PersonaOverview';
import { EligibilitySection } from './EligibilitySection';
import { ProcessSteps } from './ProcessSteps';
import { FAQAccordion } from './FAQAccordion';
import { ApplicationCTA } from './ApplicationCTA';
import { fadeUpVariant } from '../../utils/motion';

export const PersonaSection = ({ persona, onOpenInquiry, isLast = false }) => {
  return (
    <div
      id={persona.key}
      style={{
        paddingTop: '3.5rem',
        paddingBottom: isLast ? '2rem' : '5rem',
        position: 'relative',
      }}
    >
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* 1. Audience Overview & Offerings with Image Banner */}
        <PersonaOverview persona={persona} />

        {/* 2. Eligibility Criteria */}
        <EligibilitySection eligibility={persona.eligibilityNotice} />

        {/* 3. Process Steps */}
        <ProcessSteps
          steps={persona.process}
          personaTitle={persona.label}
        />

        {/* 4. FAQs */}
        <FAQAccordion
          faqs={persona.faqs}
          title={`${persona.label} Frequently Asked Questions`}
        />

        {/* 5. Application CTA */}
        <ApplicationCTA
          persona={persona}
          onOpenInquiry={onOpenInquiry}
        />
      </motion.div>

      {/* Visual Separation Divider between Persona Tracks */}
      {!isLast && (
        <div
          style={{
            marginTop: '5rem',
            marginBottom: '1rem',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, #cbd5e1 30%, #cbd5e1 70%, transparent 100%)',
            }}
          />
          <div
            style={{
              position: 'relative',
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '9999px',
              padding: '0.35rem 1.25rem',
              color: '#64748b',
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Next Pathway
          </div>
        </div>
      )}
    </div>
  );
};
