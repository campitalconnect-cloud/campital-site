import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from './FormField';
import { CustomSelect } from './CustomSelect';
import { api } from '../../services/api';

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
  inquiryType,
  personaKey,
  title = 'Startup Funding Application',
  subtitle = 'Submit your venture details directly to the Campital evaluation pipeline.',
}) => {
  const effectiveInquiryType = inquiryType || personaKey || 'startup';
  const isStartupTrack = effectiveInquiryType === 'startup';
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    campusAffiliation: '',
    message: '',
    oneSentencePitch: '',
    stage: '',
    productStatus: '',
    problemAndCustomer: '',
    traction: '',
    foundersBackground: '',
    targetRaiseAndUse: '',
    priorFunding: '',
    whyNow: '',
  });

  const [deckFile, setDeckFile] = useState(null);
  const [deckUploading, setDeckUploading] = useState(false);
  const [pitchDeckUrl, setPitchDeckUrl] = useState('');

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 26214400) {
      setFieldErrors((prev) => ({ ...prev, deck: 'File size must be less than 25MB.' }));
      return;
    }

    setDeckFile(file);
    setDeckUploading(true);
    setFieldErrors((prev) => {
      const n = { ...prev };
      delete n.deck;
      return n;
    });

    try {
      const res = await api.uploadPitchDeck(file);
      if (res && res.fileUrl) {
        setPitchDeckUrl(res.fileUrl);
      }
    } catch (err) {
      console.warn('Pitch deck upload warning:', err);
    } finally {
      setDeckUploading(false);
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
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.organization || !formData.organization.trim()) {
      errs.organization = isStartupTrack ? 'Startup / Venture name is required.' : 'Organization name is required.';
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    if (!validateStep1()) return;

    setCurrentStep(2);
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        organizationName: formData.organization,
        campusAffiliation: formData.campusAffiliation,
        personaType: effectiveInquiryType.toUpperCase(),
        generalMessage: formData.message,
        pitchHeadline: formData.oneSentencePitch,
        ventureStage: formData.stage,
        productStatus: formData.productStatus,
        problemCustomer: formData.problemAndCustomer,
        tractionMetrics: formData.traction,
        founderBackground: formData.foundersBackground,
        targetCheque: formData.targetRaiseAndUse,
        priorFunding: formData.priorFunding,
        whyNow: formData.whyNow,
        pitchDeckUrl: pitchDeckUrl || null
      };

      const result = await api.submitLead(payload);
      setSubmissionResult(result);
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'Failed to submit application. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSubmitSuccess(false);
    setSubmissionResult(null);
    setSubmitError('');
    if (typeof onClose === 'function') onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        submitSuccess
          ? 'Application Received'
          : isStartupTrack
          ? currentStep === 1
            ? 'Startup Application (Step 1 of 2)'
            : 'Startup Screening (Step 2 of 2)'
          : title
      }
      maxWidth={isStartupTrack && currentStep === 2 && !submitSuccess ? '720px' : '620px'}
    >
      {/* ========================================================= */}
      {/* SUCCESS CONFIRMATION STATE */}
      {/* ========================================================= */}
      {submitSuccess ? (
        <div style={{ textAlign: 'center', padding: '1rem 0.5rem 0.5rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              border: '2px solid #a7f3d0',
              color: '#059669',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
            Application Submitted Successfully!
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            A confirmation email has been sent to <strong>{formData.email}</strong>. Our investment committee evaluates applications weekly.
          </p>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '1.75rem',
              fontSize: '0.9rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Reference ID:</span>
              <strong style={{ color: '#0052FF' }}>{submissionResult?.leadReference || '#CAMP-NEW'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Venture Name:</span>
              <strong style={{ color: '#0f172a' }}>{formData.organization}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Status:</span>
              <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', fontSize: '0.8rem' }}>
                UNDER EVALUATION
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleClose}
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
          >
            Done
          </Button>
        </div>
      ) : (
        <>
          {/* Subtitle */}
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem', marginTop: '-0.5rem', lineHeight: '1.5' }}>
            {isStartupTrack
              ? currentStep === 1
                ? 'Step 1 of 2: Enter founder contact details and campus affiliation.'
                : 'Step 2 of 2: Complete the screening questions for the evaluation committee.'
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
                  Screening & Deck
                </span>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 1: CONTACT DETAILS */}
          {/* ========================================================= */}
          {(!isStartupTrack || currentStep === 1) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <FormField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleFieldChange}
                placeholder="e.g. Saran Kumar"
                required
                error={fieldErrors.name}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="form-double-col">
                <FormField
                  label="Work / Academic Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                  placeholder="founder@university.edu"
                  required
                  error={fieldErrors.email}
                />
                <FormField
                  label="Phone / WhatsApp"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFieldChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="form-double-col">
                <FormField
                  label={isStartupTrack ? 'Startup / Venture Name' : 'Organization Name'}
                  name="organization"
                  value={formData.organization}
                  onChange={handleFieldChange}
                  placeholder={isStartupTrack ? 'e.g. QuantumPulse Labs' : 'e.g. NextGen Incubator'}
                  required
                  error={fieldErrors.organization}
                />
                <FormField
                  label="Campus Affiliation / College"
                  name="campusAffiliation"
                  value={formData.campusAffiliation}
                  onChange={handleFieldChange}
                  placeholder="e.g. IIT Madras, BITS, NIT"
                />
              </div>

              {!isStartupTrack && (
                <FormField
                  label="Message / Goals"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleFieldChange}
                  placeholder="Briefly describe your venture or partnership intent..."
                  rows={3}
                />
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 2: SCREENING QUESTIONS & PITCH DECK UPLOAD */}
          {/* ========================================================= */}
          {isStartupTrack && currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              <div className="screening-card">
                <FormField
                  label="1. What does your company do, in one sentence?"
                  name="oneSentencePitch"
                  value={formData.oneSentencePitch}
                  onChange={handleFieldChange}
                  placeholder="e.g. We build autonomous robotics to eliminate defect sorting in textile plants."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="form-double-col">
                <div className="form-group">
                  <label className="form-label">2. Venture Stage</label>
                  <CustomSelect
                    name="stage"
                    value={formData.stage}
                    onChange={handleFieldChange}
                    options={STAGE_OPTIONS}
                    placeholder="Select venture stage..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">3. Product Status</label>
                  <CustomSelect
                    name="productStatus"
                    value={formData.productStatus}
                    onChange={handleFieldChange}
                    options={PRODUCT_STATUS_OPTIONS}
                    placeholder="Select product status..."
                  />
                </div>
              </div>

              <div className="screening-card">
                <FormField
                  label="4. Problem & Target Customer"
                  name="problemAndCustomer"
                  type="textarea"
                  value={formData.problemAndCustomer}
                  onChange={handleFieldChange}
                  placeholder="Who has this urgent pain point, and how do they solve it today?"
                  rows={2}
                />
              </div>

              <div className="screening-card">
                <FormField
                  label="5. Current Traction (Revenue, Pilots, Waitlist, LOIs)"
                  name="traction"
                  type="textarea"
                  value={formData.traction}
                  onChange={handleFieldChange}
                  placeholder="Share concrete numbers: users, pilots, revenue, or customer feedback."
                  rows={2}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="form-double-col">
                <FormField
                  label="6. Target Raise & Cheque Size"
                  name="targetRaiseAndUse"
                  value={formData.targetRaiseAndUse}
                  onChange={handleFieldChange}
                  placeholder="e.g. ₹2.5 Cr for 18-month runway"
                />
                <div className="form-group">
                  <label className="form-label">7. Prior Capital</label>
                  <CustomSelect
                    name="priorFunding"
                    value={formData.priorFunding}
                    onChange={handleFieldChange}
                    options={PRIOR_FUNDING_OPTIONS}
                    placeholder="Select prior funding..."
                  />
                </div>
              </div>

              {/* Pitch Deck Upload Card */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center'
                }}
              >
                <UploadCloud size={28} style={{ color: '#0052FF', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>
                  Upload Pitch Deck / Deal Memo (Optional)
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  Accepted formats: PDF, PPTX (Max 25MB). Stored securely.
                </div>

                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: '600',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf,.pptx,.ppt,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  {deckUploading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Uploading deck...</span>
                    </>
                  ) : deckFile ? (
                    <>
                      <FileText size={14} color="#059669" />
                      <span>{deckFile.name} (Ready)</span>
                    </>
                  ) : (
                    <span>Choose Pitch Deck File</span>
                  )}
                </label>
                {fieldErrors.deck && (
                  <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.4rem' }}>
                    {fieldErrors.deck}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submission Error Banner */}
          {submitError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                color: '#b91c1c',
                fontSize: '0.85rem',
                marginTop: '1rem'
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <div>{submitError}</div>
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
                Continue to Screening & Pitch Deck (Step 2/2)
              </Button>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isStartupTrack ? 'auto 1fr' : '1fr',
                  gap: '0.75rem',
                }}
              >
                {isStartupTrack && (
                  <Button
                    variant="secondary"
                    onClick={handlePrevStep}
                    icon={ArrowLeft}
                    disabled={isSubmitting}
                    style={{ whiteSpace: 'nowrap', padding: '0.75rem 1.25rem' }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting || deckUploading}
                  style={{ justifyContent: 'center', padding: '0.85rem 1.5rem', fontWeight: '800' }}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application Directly'}
                </Button>
              </div>
            )}

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
              }}
            >
              <ShieldCheck size={13} style={{ color: '#0052FF', flexShrink: 0 }} />
              <span>Your submission is securely received and reviewed by accredited investment partners under strict confidentiality.</span>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 580px) {
          .form-double-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Modal>
  );
};
