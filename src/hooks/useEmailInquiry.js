import { useState, useCallback } from 'react';
import { CAMPITAL_CONTACT_EMAIL } from '../config/emailConfig';
import { validateInquiryForm } from '../utils/validation';
import { buildEmailSubject, buildEmailBody, generateMailtoUrl, buildClipboardSummary } from '../utils/emailTemplates';

export const useEmailInquiry = (defaultType = 'general', validationOptions = {}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    partnerType: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'draft_opened' | 'copied' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [showManualCopyModal, setShowManualCopyModal] = useState(false);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
    // Reset notification on new input
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  }, [status]);

  const prepareDraft = useCallback((inquiryTypeKey = defaultType, inquiryTypeLabel = '') => {
    const { isValid, errors: validationErrors } = validateInquiryForm(formData, validationOptions);
    
    if (!isValid) {
      setErrors(validationErrors);
      setStatus('error');
      setStatusMessage('Please fix the errors indicated above.');
      return null;
    }

    const subject = buildEmailSubject(inquiryTypeKey, formData);
    const body = buildEmailBody(inquiryTypeLabel || inquiryTypeKey, formData);
    const mailtoUrl = generateMailtoUrl({ recipient: CAMPITAL_CONTACT_EMAIL, subject, body });
    const clipboardText = buildClipboardSummary({ recipient: CAMPITAL_CONTACT_EMAIL, subject, body });

    const draft = {
      recipient: CAMPITAL_CONTACT_EMAIL,
      subject,
      body,
      mailtoUrl,
      clipboardText
    };

    setGeneratedDraft(draft);
    return draft;
  }, [formData, defaultType, validationOptions]);

  const openEmailDraft = useCallback((inquiryTypeKey = defaultType, inquiryTypeLabel = '') => {
    const draft = prepareDraft(inquiryTypeKey, inquiryTypeLabel);
    if (!draft) return false;

    // Trigger user email client
    try {
      window.location.href = draft.mailtoUrl;
      setStatus('draft_opened');
      setStatusMessage('Your email draft is ready. Please review and send it from your email application.');
      return true;
    } catch (err) {
      console.warn('Could not launch mailto automatically:', err);
      setShowManualCopyModal(true);
      return false;
    }
  }, [defaultType, prepareDraft]);

  const copyEmailDetails = useCallback(async (inquiryTypeKey = defaultType, inquiryTypeLabel = '') => {
    const draft = prepareDraft(inquiryTypeKey, inquiryTypeLabel);
    if (!draft) return false;

    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(draft.clipboardText);
        setStatus('copied');
        setStatusMessage('Email details copied. Paste them into your preferred email application and send.');
        return true;
      } else {
        setShowManualCopyModal(true);
        return false;
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      setShowManualCopyModal(true);
      return false;
    }
  }, [defaultType, prepareDraft]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      partnerType: '',
      message: '',
    });
    setErrors({});
    setStatus('idle');
    setStatusMessage('');
    setGeneratedDraft(null);
    setShowManualCopyModal(false);
  }, []);

  return {
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
    setFormData,
  };
};
