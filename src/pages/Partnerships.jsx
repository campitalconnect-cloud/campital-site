import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/common/PageHeader';
import { PartnerCategories } from '../components/partnerships/PartnerCategories';
import { PartnerProcess } from '../components/partnerships/PartnerProcess';
import { PartnerCaseStudy } from '../components/partnerships/PartnerCaseStudy';
import { EmailInquiryForm } from '../components/forms/EmailInquiryForm';
import { PARTNERSHIPS_HERO } from '../data/partnerships';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { ArrowDown, Sparkles } from 'lucide-react';
import { fadeUpVariant } from '../utils/motion';

export const Partnerships = () => {
  const [selectedPartnerCategory, setSelectedPartnerCategory] = useState('');

  const handleSelectCategory = (categoryValue) => {
    setSelectedPartnerCategory(categoryValue);
    const formElement = document.getElementById('inquiry');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInquiry = () => {
    const formElement = document.getElementById('inquiry');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="partnerships-page">
      {/* A. Hero */}
      <PageHeader
        eyebrow={PARTNERSHIPS_HERO.eyebrow}
        title={PARTNERSHIPS_HERO.headline}
        subtitle={PARTNERSHIPS_HERO.supportingCopy}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToInquiry}
            icon={ArrowDown}
          >
            {PARTNERSHIPS_HERO.cta.label}
          </Button>
        </div>
      </PageHeader>

      {/* Alliance Visual Showcase Banner */}
      <section style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <Container>
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-lg), 0 0 35px rgba(59, 130, 246, 0.2)',
              position: 'relative',
              maxHeight: '340px',
            }}
          >
            <img
              src="/images/capital_bridge.jpg"
              alt="Campus to Capital Bridge Alliance"
              style={{
                width: '100%',
                height: '340px',
                objectFit: 'cover',
                filter: 'brightness(0.85) contrast(1.05)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(5, 8, 17, 0.95) 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem 2.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="badge badge-primary">Institutional Synergy</span>
                <span style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: '600' }}>
                  Uniting university research pipelines with institutional venture syndicates
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* B. Partner Categories */}
      <PartnerCategories onSelectCategory={handleSelectCategory} />

      {/* Sponsor a Challenge Track Spotlight */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '4rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <Container>
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              backgroundColor: 'linear-gradient(135deg, #090d1a 0%, #0052ff 100%)',
              background: 'linear-gradient(135deg, #0a1128 0%, #173887 60%, #0052ff 100%)',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap',
              boxShadow: '0 20px 40px rgba(0, 82, 255, 0.2)',
            }}
          >
            <div style={{ maxWidth: '560px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#38bdf8',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '1rem',
                }}
              >
                <Sparkles size={14} />
                <span>Enterprise Innovation</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '800', color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                Sponsor a Challenge Track
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                Define industry-specific problem briefs, mentor top student engineering teams across our partner campus network, and secure first-look rights to high-potential spin-offs.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => handleSelectCategory('Corporate-Ecosystem')}
              style={{
                backgroundColor: '#ffffff',
                color: '#0052ff',
                borderColor: '#ffffff',
                fontWeight: '800',
                padding: '0.85rem 1.75rem',
                whiteSpace: 'nowrap',
              }}
            >
              Sponsor a Track
            </Button>
          </div>
        </Container>
      </section>

      {/* C. Partner Case Study / Placeholder */}
      <PartnerCaseStudy />

      {/* E. How to Partner (5 Steps) */}
      <PartnerProcess />


      {/* F. Partnership Inquiry Form */}
      <section className="section" id="inquiry-section">
        <Container>
          <EmailInquiryForm
            id="inquiry"
            defaultPartnerType={selectedPartnerCategory}
            title="Partnership Inquiry Form"
            subtitle="Connect with our institutional and capital partnerships team to align on deal-flow and collaboration models."
          />
        </Container>
      </section>
    </div>
  );
};
