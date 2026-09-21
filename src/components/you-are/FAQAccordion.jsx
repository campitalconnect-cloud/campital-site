import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQAccordion = ({ faqs = [], title = 'Frequently Asked Questions' }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#090d1a', letterSpacing: '-0.02em' }}>
          <HelpCircle size={22} color="#0066ff" />
          <span>{title}</span>
        </h3>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Clarifications on requirements, process, and platform participation.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="card"
              style={{
                padding: 0,
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: isOpen ? '1.5px solid #0066ff' : '1.5px solid #e2e8f0',
                boxShadow: isOpen ? '0 8px 25px rgba(0, 102, 255, 0.08)' : '0 2px 8px rgba(15, 23, 42, 0.02)',
                transition: 'all 0.25s ease',
              }}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                style={{
                  width: '100%',
                  padding: '1.35rem 1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  background: 'none',
                  color: isOpen ? '#0066ff' : '#090d1a',
                  fontWeight: '700',
                  fontSize: '1.02rem',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{
                    color: '#0066ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '1rem',
                  }}
                >
                  <ChevronDown size={19} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: '0 1.6rem 1.35rem',
                        color: '#475569',
                        fontSize: '0.96rem',
                        lineHeight: '1.68',
                        borderTop: '1px solid #f1f5f9',
                        paddingTop: '1rem',
                      }}
                    >
                      "{faq.answer}"
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
