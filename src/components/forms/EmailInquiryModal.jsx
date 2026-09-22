import React, { useState } from 'react';
import { Mail, Copy, CheckCircle2, ExternalLink, ArrowRight, ArrowLeft, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from './FormField';
import { CustomSelect } from './CustomSelect';
import { CopyEmailButton } from './CopyEmailButton';
import { useEmailInquiry } from '../../hooks/useEmailInquiry';
import { CAMPITAL_CONTACT_EMAIL } from '../../config/emailConfig';

const STAGE_OPTIONS = [
  { value: 'Idea Stage', label: 'Idea Stage — Concept & research phase' },
  { value: 'MVP / Prototype', label: 'MVP / Prototype — Alpha/lab testing & working demo' },
  { value: 'Early Revenue / Pilots', label: 'Early Revenue / Pilots — Paying customers, pilots, or signed LOIs' },
  { value: 'Scaling & Growth', label: 'Scaling & Growth — Repeatable growth & market expansion' },
];

const PRODUCT_STATUS_OPTIONS = [
  { value: 'Live in Production', label: 'Live in Production — Deployed with active users' },
  { value: 'Functional MVP / Beta', label: 'Functional MVP / Beta — Private testing with pilot users' },
  { value: 'Hardware / Software Prototype', label: 'Hardware / Software Prototype — Working bench test model' },
  { value: 'Concept / Deck Phase', label: 'Concept / Pitch Deck — Design & architecture only' },
];

const PRIOR_FUNDING_OPTIONS = [
  { value: '100% Bootstrapped', label: '100% Bootstrapped / Founder Funded' },
  { value: 'Government / University Grants', label: 'Government / University Grants (NIDHI EIR / BIRAC / DST)' },
  { value: 'Angel / Friends & Family', label: 'Angel / Friends & Family Round' },
  { value: 'Pre-Seed / Seed Institutional', label: 'Prior Institutional Round (Pre-Seed / Seed VC)' },
];

export const EmailInquiryModal = ({
  isOpen,
  onClose,
  inquiryType = 'startup',
  title = 'Startup Funding Application',
  subtitle = 'Prepare your structured application draft to connect with the Campital evaluation team.',
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fieldErrors, setFieldErrors] = useState({});
  const isStartupTrack = inquiryType === 'startup';

  const {
    formData,
    errors,
    status,
    statusMessage,
    generatedDraft,
    showManualCopyModal,
    handleChange,
    openEmailDraft,
    copyEmailDetails,
    resetForm,
  } = useEmailInquiry(inquiryType, { requireOrg: true, requireMessage: false });

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleClose = () => {
    resetForm();
    setCurrentStep(1);
    setFieldErrors({});
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleFieldChange = (field, value) => {
    handleChange(field, value);
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.name || !formData.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email || !formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. founder@university.edu).';
    }

    if (!formData.organization || !formData.organization.trim()) {
      errs.organization = isStartupTrack ? 'Startup / Venture name is required.' : 'Organization name is required.';
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    if (!validateStep1()) {
      return;
    }

    setCurrentStep(2);

    // Scroll modal content to top
    setTimeout(() => {
      const modalBox = document.querySelector('.modal-content');
      if (modalBox) modalBox.scrollTop = 0;
    }, 50);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    setTimeout(() => {
      const modalBox = document.querySelector('.modal-content');
      if (modalBox) modalBox.scrollTop = 0;
    }, 50);
  };

  const handleOpenDraft = () => {
    openEmailDraft(inquiryType, title);
  };

  const handleCopy = () => {
    return copyEmailDetails(inquiryType, title);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isStartupTrack ? (currentStep === 1 ? 'Startup Application (1/2)' : 'Startup Screening (2/2)') : title}
      maxWidth={isStartupTrack && currentStep === 2 ? '720px' : '600px'}
    >
      {/* Subtitle */}
      <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem', marginTop: '-0.5rem', lineHeight: '1.5' }}>
        {isStartupTrack
          ? (currentStep === 1
              ? 'Step 1 of 2: Enter founder and venture contact details.'
              : 'Step 2 of 2: Complete the 10 screening questions for our evaluation committee.')
          : subtitle}
      </p>

      {/* Multi-Step Progress Indicator for Startup Persona */}
      {isStartupTrack && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: '12px',
            padding: '0.65rem 1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: currentStep === 1 ? '#0066ff' : '#10b981',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: '700',
              }}
            >
              {currentStep > 1 ? <Check size={13} /> : '1'}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: currentStep === 1 ? '700' : '500', color: currentStep === 1 ? '#0066ff' : '#475569' }}>
              Basics
            </span>
          </div>

          <div style={{ height: '2px', flex: '1', margin: '0 0.75rem', background: currentStep === 2 ? '#0066ff' : '#cbd5e1' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: currentStep === 2 ? '#0066ff' : '#e2e8f0',
                color: currentStep === 2 ? '#ffffff' : '#64748b',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: '700',
              }}
            >
              2
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: currentStep === 2 ? '700' : '500', color: currentStep === 2 ? '#0066ff' : '#94a3b8' }}>
              10 Screening Questions
            </span>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 1: BASIC DETAILS (ONE BY ONE) */}
      {/* ========================================================= */}
      {(!isStartupTrack || currentStep === 1) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <FormField
            label="Your Full Name"
            name="name"
            value={formData.name}
            onChange={handleFieldChange}
            placeholder="e.g. Saran Kumar"
            required
            error={fieldErrors.name || errors.name}
          />

          <FormField
            label="Work / Academic Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFieldChange}
            placeholder="founder@university.edu"
            required
            error={fieldErrors.email || errors.email}
            helper={
              formData.email && !fieldErrors.email && EMAIL_REGEX.test(formData.email) ? (
                <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
                  ✓ Valid email address
                </span>
              ) : null
            }
          />

          <FormField
            label={isStartupTrack ? 'Startup / Venture Name' : 'Organization / University Name'}
            name="organization"
            value={formData.organization}
            onChange={handleFieldChange}
            placeholder={isStartupTrack ? 'e.g. QuantumPulse Labs' : 'e.g. NextGen Robotics'}
            required
            error={fieldErrors.organization || errors.organization}
          />

          <FormField
            label={isStartupTrack ? 'Initial Summary / Note (Optional)' : 'Overview & Stage of Venture'}
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleFieldChange}
            placeholder="Briefly introduce your venture or goals..."
            rows={3}
            error={errors.message}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: 10 STARTUP SCREENING QUESTIONS (STRICTLY ONE BY ONE) */}
      {/* ========================================================= */}
      {isStartupTrack && currentStep === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Question 1 */}
          <div className="screening-card">
            <FormField
              label="1. What does your company do, in one sentence?"
              name="oneSentencePitch"
              value={formData.oneSentencePitch}
              onChange={handleChange}
              placeholder="e.g. We build autonomous robotics to eliminate defect sorting in textile plants."
              helper="Keep it clear, concise, and focused on what you do."
            />
          </div>

          {/* Question 2 */}
          <div className="screening-card">
            <div className="form-group">
              <label className="form-label">
                2. What stage are you at — idea, MVP, early revenue, or scaling?
              </label>
              <CustomSelect
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                options={STAGE_OPTIONS}
                placeholder="Select your venture stage..."
              />
            </div>
          </div>

          {/* Question 3 */}
          <div className="screening-card">
            <FormField
              label="3. Are you affiliated with a campus incubator? If so, which one?"
              name="campusAffiliation"
              value={formData.campusAffiliation}
              onChange={handleChange}
              placeholder="e.g. IIT Madras Research Park / NSRCEL IIMB / Independent (None)"
              helper="Mention university incubator or type Independent if not affiliated."
            />
          </div>

          {/* Question 4 */}
          <div className="screening-card">
            <FormField
              label="4. Who are the founders, and what's each person's role/background?"
              name="foundersBackground"
              type="textarea"
              value={formData.foundersBackground}
              onChange={handleChange}
              placeholder="e.g. Founder 1: CEO (Final year CS, IITB) - tech lead; Founder 2: COO (Alum, 2 yrs at Ather) - ops."
              rows={2}
            />
          </div>

          {/* Question 5 */}
          <div className="screening-card">
            <FormField
              label="5. What problem are you solving, and for whom?"
              name="problemAndCustomer"
              type="textarea"
              value={formData.problemAndCustomer}
              onChange={handleChange}
              placeholder="Describe the exact pain point and your target customer segment..."
              rows={2}
            />
          </div>

          {/* Question 6 */}
          <div className="screening-card">
            <FormField
              label="6. What traction do you have so far?"
              name="traction"
              type="textarea"
              value={formData.traction}
              onChange={handleChange}
              placeholder="e.g. 2 signed pilots (₹3.5L ARR), 1,200 waitlist users, 15 letters of intent..."
              helper="Users, revenue, pilots, LOIs, waitlist — whatever is real."
              rows={2}
            />
          </div>

          {/* Question 7 */}
          <div className="screening-card">
            <FormField
              label="7. How much are you raising, and what will it fund?"
              name="targetRaiseAndUse"
              value={formData.targetRaiseAndUse}
              onChange={handleChange}
              placeholder="e.g. Raising ₹50 Lakhs for 2 engineers, compute infrastructure & 5 pilots"
            />
          </div>

          {/* Question 8 */}
          <div className="screening-card">
            <div className="form-group">
              <label className="form-label">
                8. Have you raised before — grants, angel money, a prior round?
              </label>
              <CustomSelect
                name="priorFunding"
                value={formData.priorFunding}
                onChange={handleChange}
                options={PRIOR_FUNDING_OPTIONS}
                placeholder="Select prior funding history..."
              />
            </div>
          </div>

          {/* Question 9 */}
          <div className="screening-card">
            <div className="form-group">
              <label className="form-label">
                9. Do you have a working product, or is this still a deck/concept?
              </label>
              <CustomSelect
                name="productStatus"
                value={formData.productStatus}
                onChange={handleChange}
                options={PRODUCT_STATUS_OPTIONS}
                placeholder="Select product status..."
              />
            </div>
          </div>

          {/* Question 10 */}
          <div className="screening-card">
            <FormField
              label="10. Why now — what's changed that makes this the right time for this company to exist?"
              name="whyNow"
              type="textarea"
              value={formData.whyNow}
              onChange={handleChange}
              placeholder="e.g. New 2026 industrial regulation, 10x drop in sensor hardware cost, or rapid AI capability..."
              rows={2}
            />
          </div>
        </div>
      )}

      {/* Status Notifications */}
      {status === 'draft_opened' && (
        <div className="alert-box alert-success" style={{ margin: '1rem 0', padding: '0.75rem 1rem' }}>
          <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem' }}>{statusMessage}</div>
        </div>
      )}

      {status === 'copied' && (
        <div className="alert-box alert-success" style={{ margin: '1rem 0', padding: '0.75rem 1rem' }}>
          <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem' }}>{statusMessage}</div>
        </div>
      )}

      {/* Action Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        {isStartupTrack && currentStep === 1 ? (
          <Button
            variant="primary"
            size="lg"
            onClick={handleNextStep}
            icon={ArrowRight}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Continue to 10 Screening Questions (Step 2/2)
          </Button>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isStartupTrack ? 'auto 1.3fr 1fr' : '1.3fr 1fr',
              gap: '0.65rem',
            }}
            className="form-actions"
          >
            {isStartupTrack && (
              <Button
                variant="secondary"
                onClick={handlePrevStep}
                icon={ArrowLeft}
                style={{ whiteSpace: 'nowrap', padding: '0.75rem 1rem' }}
              >
                Back
              </Button>
            )}
            <Button
              variant="primary"
              onClick={handleOpenDraft}
              icon={ExternalLink}
              style={{ justifyContent: 'center', padding: '0.75rem 1rem' }}
            >
              Open Email Draft
            </Button>
            <CopyEmailButton onCopy={handleCopy} style={{ padding: '0.75rem 1rem' }} />
          </div>
        )}

        {/* Discreet, Small Zero-Backend & Privacy Notice */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            fontSize: '0.74rem',
            color: '#94a3b8',
            textAlign: 'center',
            marginTop: '0.25rem',
            lineHeight: '1.4',
          }}
        >
          <ShieldCheck size={13} style={{ color: '#0066ff', flexShrink: 0 }} />
          <span>Zero-backend privacy: All details prepare directly in your local email client. No data is stored on external servers.</span>
        </div>
      </div>

      {/* Manual Copy Fallback Modal */}
      {showManualCopyModal && generatedDraft && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1.5px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#090d1a' }}>
              Application Text Draft
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              To: {CAMPITAL_CONTACT_EMAIL}
            </span>
          </div>
          <textarea
            readOnly
            value={generatedDraft.clipboardText}
            style={{
              width: '100%',
              minHeight: '150px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              background: '#ffffff',
              color: '#334155',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
            }}
            onClick={(e) => e.target.select()}
          />
        </div>
      )}

      <style>{`
        .screening-card {
          padding-bottom: 0.25rem;
        }
        @media (max-width: 580px) {
          .form-actions {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Modal>
  );
};


