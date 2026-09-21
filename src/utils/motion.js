/**
 * Framer Motion Reusable Animation Variants & Tokens
 * Centralized easing, durations, and container stagger configs.
 */

export const TRANSITION_EASE = [0.16, 1, 0.3, 1]; // Smooth custom cubic bezier
export const SPRING_GENTLE = { type: 'spring', stiffness: 300, damping: 28 };
export const SPRING_SNAPPY = { type: 'spring', stiffness: 450, damping: 30 };

// Fade in with slight upward translation
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: TRANSITION_EASE,
      delay: custom * 0.1,
    },
  }),
};

// Subtle fade in
export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: TRANSITION_EASE,
      delay: custom * 0.08,
    },
  }),
};

// Staggered child container
export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Scale in for modals, badges, or accent marks
export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: TRANSITION_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};

// Persona tab crossfade transition
export const tabContentVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: TRANSITION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Card hover micro-interaction
export const cardHoverProps = {
  whileHover: {
    y: -4,
    transition: { duration: 0.25, ease: TRANSITION_EASE },
  },
  whileTap: {
    scale: 0.99,
  },
};
