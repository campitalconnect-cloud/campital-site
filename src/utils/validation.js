/**
 * Form Validation Utilities
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateInquiryForm = (formData, options = {}) => {
  const errors = {};
  const { requireOrg = true, requirePartnerType = false, requireMessage = false } = options;

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
    errors.organization = 'Startup / Venture / Organization name is required.';
  }

  // Validate Partner Type (if required)
  if (requirePartnerType && (!formData.partnerType || !formData.partnerType.trim())) {
    errors.partnerType = 'Please select a partner category.';
  }

  // Validate Message (only if explicitly required)
  if (requireMessage) {
    if (!formData.message || !formData.message.trim()) {
      errors.message = 'Please provide brief details.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

