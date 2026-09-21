import React from 'react';
import { Mail, Copy, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from './FormField';
import { CopyEmailButton } from './CopyEmailButton';
import { useEmailInquiry } from '../../hooks/useEmailInquiry';
import { IS_PLACEHOLDER_EMAIL, CAMPITAL_CONTACT_EMAIL } from '../../config/emailConfig';

export const EmailInquiryModal = ({
  isOpen,
  onClose,
  inquiryType = 'startup',
  title = 'Startup Funding Application',
  subtitle = 'Prepare your structured application draft to connect with the Campital evaluation team.',
}) => {
  const {
    formData,
    errors,
    status,
    statusMessage,
    generatedDraft,
    showManualCopyModal,
    setShowManualCopyModal,
    handleChange,
    openEmailDraft,
    copyEmailDetails,
    resetForm,
  } = useEmailInquiry(inquiryType, { requireOrg: true });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleOpenDraft = () => {
    openEmailDraft(inquiryType, title);
  };

  const handleCopy = () => {
    return copyEmailDetails(inquiryType, title);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} maxWidth="620px">
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', marginTop: '-0.5rem' }}>
        {subtitle}
      </p>

      {/* Zero Backend Workflow Explanation */}
      <div className="alert-box alert-info" style={{ marginBottom: '1.25rem' }}>
        <Mail size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.85rem' }}>
          <strong>Zero-Backend Email Pipeline:</strong> Submitting prepares a pre-filled email draft in your local mail client. No data is stored or tracked.
        </div>
      </div>

      {IS_PLACEHOLDER_EMAIL && (
        <div className="alert-box alert-warning" style={{ marginBottom: '1.25rem' }}>
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem' }}>
            <strong>Configuration Notice:</strong> Contact recipient address is pending client configuration. In production, drafts will point to the verified Campital address.
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
        <FormField
          label="Your Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Saran Kumar"
          required
          error={errors.name}
        />
        <FormField
          label="Work / Academic Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="founder@university.edu"
          required
          error={errors.email}
        />
      </div>

      <FormField
        label="Organization / Startup / University Name"
        name="organization"
        value={formData.organization}
        onChange={handleChange}
        placeholder="e.g. NextGen Robotics (IIT Madras)"
        required
        error={errors.organization}
      />

      <FormField
        label="Overview & Stage of Venture"
        name="message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        placeholder="Briefly describe what you are building, team background, traction or campus affiliation..."
        required
        error={errors.message}
        rows={4}
      />

      {/* Status Notifications */}
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

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.75rem' }} className="form-actions">
          <Button
            variant="primary"
            onClick={handleOpenDraft}
            icon={ExternalLink}
          >
            Open Email Draft
          </Button>
          <CopyEmailButton onCopy={handleCopy} />
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', margin: 0 }}>
          Opening an email draft does not mean your application is sent until you hit send in your email client.
        </p>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .form-row-2, .form-actions {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Manual Copy Fallback Modal in case clipboard or mailto is blocked */}
      {showManualCopyModal && generatedDraft && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1.5px solid #e2e8f0',
          }}
        >
          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.5rem', color: '#090d1a' }}>
            Manual Copy Fallback
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem' }}>
            Copy the text below into an email addressed to <strong style={{ color: '#0066ff' }}>{CAMPITAL_CONTACT_EMAIL}</strong>:
          </p>
          <textarea
            readOnly
            value={generatedDraft.clipboardText}
            style={{
              width: '100%',
              minHeight: '130px',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
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
    </Modal>
  );
};
