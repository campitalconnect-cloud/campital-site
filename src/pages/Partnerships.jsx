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
