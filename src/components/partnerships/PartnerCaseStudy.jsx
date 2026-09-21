import React from 'react';
import { Container } from '../common/Container';
import { CASE_STUDY_CONFIG } from '../../data/partnerships';
import { Sparkles, FileText } from 'lucide-react';

export const PartnerCaseStudy = () => {
  return (
    <section className="section" style={{ paddingTop: '2rem', paddingBottom: '3.5rem' }}>
      <Container narrow>
        <div
          className="card"
          style={{
            padding: '2.5rem 2.5rem',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            border: '1.5px dashed #cbd5e1',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(0, 102, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0066ff',
              margin: '0 auto 1.25rem',
            }}
          >
            <FileText size={22} />
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            {CASE_STUDY_CONFIG.placeholderTitle}
          </h3>

          <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: '1.6', margin: 0, maxWidth: '580px', marginLeft: 'auto', marginRight: 'auto' }}>
            {CASE_STUDY_CONFIG.placeholderNotice}
          </p>
        </div>
      </Container>
    </section>
  );
};
