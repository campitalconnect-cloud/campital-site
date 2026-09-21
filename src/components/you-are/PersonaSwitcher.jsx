import React from 'react';
import { Rocket, Building2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const PERSONA_TABS = [
  { key: 'startup', label: 'For Startups', icon: Rocket },
  { key: 'incubator', label: 'For Campus Incubators', icon: Building2 },
  { key: 'sme', label: 'For SMEs', icon: Briefcase },
];

export const PersonaSwitcher = ({ activePersona, onSelectPersona }) => {
  const handleScrollTo = (key) => {
    onSelectPersona(key);
    const element = document.getElementById(key);
    if (element) {
      const yOffset = -100; // Account for fixed header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.4rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1.5px solid rgba(0, 102, 255, 0.2)',
        borderRadius: '9999px',
        gap: '0.35rem',
        maxWidth: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        boxShadow: '0 8px 30px rgba(0, 82, 255, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)',
        position: 'relative',
        scrollbarWidth: 'none',
      }}
      className="persona-switcher-bar"
      role="navigation"
      aria-label="Jump to persona track"
    >
      {PERSONA_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activePersona === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleScrollTo(tab.key)}
            className="persona-tab-btn"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.7rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.92rem',
              fontWeight: isActive ? '800' : '600',
              color: isActive ? '#ffffff' : '#090d1a',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              zIndex: 1,
              transition: 'color 0.2s ease',
            }}
          >
            {/* Animated active pill background */}
            {isActive && (
              <motion.div
                layoutId="activePersonaPill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #0052ff 0%, #0066ff 50%, #00b4d8 100%)',
                  boxShadow: '0 4px 16px rgba(0, 102, 255, 0.35)',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <Icon size={17} color={isActive ? '#ffffff' : '#0066ff'} />
            <span>{tab.label}</span>
          </button>
        );
      })}

      <style>{`
        .persona-switcher-bar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 680px) {
          .persona-tab-btn {
            padding: 0.55rem 0.95rem !important;
            font-size: 0.82rem !important;
            gap: 0.35rem !important;
          }
        }
      `}</style>
    </div>
  );
};
