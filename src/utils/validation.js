/**
 * Form Validation Utilities
 */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateInquiryForm = (formData, options = {}) => {
  const errors = {};
  const { requireOrg = true, requirePartnerType = false } = options;

  // Validate Name
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Full name is required.';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  // Validate Email
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  // Validate Organization (if required)
  if (requireOrg && (!formData.organization || !formData.organization.trim())) {
    errors.organization = 'Organization / Startup / University name is required.';
  }

  // Validate Partner Type (if required)
  if (requirePartnerType && (!formData.partnerType || !formData.partnerType.trim())) {
    errors.partnerType = 'Please select a partner category.';
  }

  // Validate Message
  if (!formData.message || !formData.message.trim()) {
    errors.message = 'Please provide details for your inquiry.';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
