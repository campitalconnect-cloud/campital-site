import React from 'react';
import { Mail, AlertTriangle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { FormField } from './FormField';
import { Button } from '../common/Button';
import { CopyEmailButton } from './CopyEmailButton';
import { useEmailInquiry } from '../../hooks/useEmailInquiry';
import { IS_PLACEHOLDER_EMAIL, CAMPITAL_CONTACT_EMAIL } from '../../config/emailConfig';

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
    setFormData,
  } = useEmailInquiry('partner', { requireOrg: true, requirePartnerType: true });

  // Update selected partner type if passed externally
  React.useEffect(() => {
    if (defaultPartnerType && !formData.partnerType) {
      handleChange('partnerType', defaultPartnerType);
    }
  }, [defaultPartnerType, formData.partnerType, handleChange]);

  const handleOpenDraft = (e) => {
    e.preventDefault();
    openEmailDraft('partner', 'Campital Partnership Inquiry');
  };

  const handleCopy = () => {
    return copyEmailDetails('partner', 'Campital Partnership Inquiry');
  };

  return (
    <div id={id} className="card" style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 2.75rem)' }}>
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{subtitle}</p>
      </div>

      {IS_PLACEHOLDER_EMAIL && (
        <div className="alert-box alert-warning" style={{ marginBottom: '1.5rem' }}>
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem' }}>
            <strong>Configuration Notice:</strong> In production, generated email drafts will be directed to the approved public Campital contact address.
          </div>
        </div>
      )}

      <form onSubmit={handleOpenDraft} noValidate>
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

        {/* Status notification */}
        {status === 'draft_opened' && (
          <div className="alert-box alert-success" style={{ margin: '1rem 0' }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>{statusMessage}</div>
          </div>
        )}

        {status === 'copied' && (
          <div className="alert-box alert-success" style={{ margin: '1rem 0' }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>{statusMessage}</div>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem' }} className="form-actions">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={ExternalLink}
            >
              Open Email Draft
            </Button>
            <CopyEmailButton
              onCopy={handleCopy}
              size="lg"
            />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', margin: 0 }}>
            No backend transmission. Opens a draft in your local mail client with pre-structured details.
          </p>
        </div>

        {/* Manual Copy Area fallback */}
        {showManualCopyModal && generatedDraft && (
          <div
            style={{
              marginTop: '1.75rem',
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1.5px solid #e2e8f0',
            }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.5rem', color: '#090d1a' }}>
              Manual Copy Fallback
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
              Please copy the details below and email them directly to <strong style={{ color: '#0066ff' }}>{CAMPITAL_CONTACT_EMAIL}</strong>:
            </p>
            <textarea
              readOnly
              value={generatedDraft.clipboardText}
              style={{
                width: '100%',
                minHeight: '140px',
                fontFamily: 'monospace',
                fontSize: '0.88rem',
                background: '#ffffff',
                color: '#334155',
                padding: '0.85rem',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
              }}
              onClick={(e) => e.target.select()}
            />
          </div>
        )}
      </form>

      <style>{`
        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
          .form-actions {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
