import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { FormField } from './FormField';
import { Button } from '../common/Button';
import { api } from '../../services/api';

const PARTNER_TYPE_OPTIONS = [
  { value: 'Capital', label: 'Capital Partner (Investor / VC / Angel)' },
  { value: 'Institutional', label: 'Institutional Partner (University / Incubator)' },
  { value: 'Corporate-Ecosystem', label: 'Corporate-Ecosystem Partner (Enterprise / Mentor)' },
];

export const EmailInquiryForm = ({
  defaultPartnerType = '',
  id = 'inquiry',
  title = 'Partnership Inquiry',
  subtitle = 'Initiate a scoping inquiry with Campital’s partnership team.',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    partnerType: defaultPartnerType || '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Update selected partner type if passed externally
  React.useEffect(() => {
    if (defaultPartnerType && !formData.partnerType) {
      setFormData(prev => ({ ...prev, partnerType: defaultPartnerType }));
    }
  }, [defaultPartnerType, formData.partnerType]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name || !formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email || !formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid work email is required.';
    if (!formData.organization || !formData.organization.trim()) errs.organization = 'Organization name is required.';
    if (!formData.partnerType) errs.partnerType = 'Please select a partner track.';
    if (!formData.message || !formData.message.trim()) errs.message = 'Please provide details on your inquiry.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        organizationName: formData.organization,
        personaType: formData.partnerType === 'Capital' ? 'CAPITAL' : 'CORPORATE',
        partnerCategory: formData.partnerType,
        generalMessage: formData.message
      };

      const res = await api.submitLead(payload);
      setReferenceId(res.leadReference || '#CAMP-PARTNER');
      setIsSuccess(true);
    } catch (err) {
      console.error('Partner inquiry error:', err);
      setSubmitError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={id} className="card" style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 2.75rem)' }}>
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{subtitle}</p>
      </div>

      {isSuccess ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
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
            <CheckCircle2 size={34} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
            Partnership Scoping Initiated
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Thank you, <strong>{formData.name}</strong>. A confirmation has been dispatched to <strong>{formData.email}</strong>. Our partnerships desk will connect with you within 24–48 hours.
          </p>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1rem',
              maxWidth: '360px',
              margin: '0 auto 1.5rem',
              fontSize: '0.88rem'
            }}
          >
            <span style={{ color: '#64748b' }}>Reference ID: </span>
            <strong style={{ color: '#0052FF' }}>{referenceId}</strong>
          </div>

          <Button
            variant="secondary"
            onClick={() => {
              setIsSuccess(false);
              setFormData({ name: '', email: '', organization: '', partnerType: defaultPartnerType || '', message: '' });
            }}
          >
            Submit Another Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row-2">
            <FormField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              required
              error={errors.name}
            />
            <FormField
              label="Work Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@organization.com"
              required
              error={errors.email}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem' }} className="form-row-2">
            <FormField
              label="Organization Name"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. Stanford Venture Lab / Apex Ventures"
              required
              error={errors.organization}
            />
            <FormField
              label="Partner Track"
              name="partnerType"
              type="select"
              value={formData.partnerType}
              onChange={handleChange}
              options={PARTNER_TYPE_OPTIONS}
              placeholder="Select Partner Track..."
              required
              error={errors.partnerType}
            />
          </div>

          <FormField
            label="Inquiry Scope & Collaboration Goals"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your deal-flow interests, campus incubator portfolio size, or capital focus..."
            required
            error={errors.message}
            rows={4}
          />

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
                marginBottom: '1rem'
              }}
            >
              <AlertCircle size={16} />
              <div>{submitError}</div>
            </div>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span style={{ marginLeft: '0.5rem' }}>Submitting Partnership Inquiry...</span>
                </>
              ) : (
                'Submit Partnership Inquiry'
              )}
            </Button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              fontSize: '0.74rem',
              color: '#94a3b8',
              textAlign: 'center',
              marginTop: '1rem',
            }}
          >
            <ShieldCheck size={13} style={{ color: '#0052FF', flexShrink: 0 }} />
            <span>Structured institutional pipeline: Your inquiry is reviewed under NDA and strict partner confidentiality.</span>
          </div>
        </form>
      )}
    </div>
  );
};
