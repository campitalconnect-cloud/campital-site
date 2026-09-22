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
    // Startup deep-dive screening questions
    oneSentencePitch: '',
    stage: '',
    campusAffiliation: '',
    foundersBackground: '',
    problemAndCustomer: '',
    traction: '',
    targetRaiseAndUse: '',
    priorFunding: '',
    productStatus: '',
    whyNow: '',
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
    const body = buildEmailBody(inquiryTypeLabel || inquiryTypeKey, { ...formData, inquiryType: inquiryTypeKey });
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

    // Trigger user email client via hidden anchor to prevent page reload interruptions
    try {
      const link = document.createElement('a');
      link.href = draft.mailtoUrl;
      link.target = '_top';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setStatus('draft_opened');
      setStatusMessage('Email draft opened in your mail app. Review and hit send!');
      return true;
    } catch (err) {
      console.warn('Could not launch mailto automatically:', err);
      // Fallback to clipboard & modal
      setShowManualCopyModal(true);
      return false;
    }
  }, [defaultType, prepareDraft]);

  const copyEmailDetails = useCallback(async (inquiryTypeKey = defaultType, inquiryTypeLabel = '') => {
    const draft = prepareDraft(inquiryTypeKey, inquiryTypeLabel);
    if (!draft) return false;

    let copied = false;
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(draft.clipboardText);
        copied = true;
      }
    } catch (err) {
      console.warn('navigator.clipboard failed, attempting execCommand fallback:', err);
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = draft.clipboardText;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (e) {
        console.warn('execCommand fallback failed too:', e);
      }
    }

    if (copied) {
      setStatus('copied');
      setStatusMessage('✓ Application details copied to clipboard! Paste directly into your email.');
      return true;
    } else {
      setShowManualCopyModal(true);
      setStatus('copied');
      setStatusMessage('Please copy the details from the box below.');
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
      oneSentencePitch: '',
      stage: '',
      campusAffiliation: '',
      foundersBackground: '',
      problemAndCustomer: '',
      traction: '',
      targetRaiseAndUse: '',
      priorFunding: '',
      productStatus: '',
      whyNow: '',
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
