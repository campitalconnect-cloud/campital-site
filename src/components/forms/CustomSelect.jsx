import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const CustomSelect = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option...',
  error,
  disabled = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const safeOptions = Array.isArray(options) ? options : [];

  const selectedOption = safeOptions.find((opt) => {
    if (!opt) return false;
    const optVal = typeof opt === 'object' && opt !== null ? opt.value : opt;
    return optVal === value;
  });

  const displayLabel = selectedOption
    ? typeof selectedOption === 'object' && selectedOption !== null
      ? selectedOption.label
      : selectedOption
    : placeholder;

  const handleSelect = (opt) => {
    const optVal = typeof opt === 'object' && opt !== null ? opt.value : opt;
    if (typeof onChange === 'function') {
      onChange(name, optVal);
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        position: 'relative',
        width: '100%',
        userSelect: 'none',
      }}
    >
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff',
          border: error ? '1.5px solid #ef4444' : isOpen ? '1.5px solid #0066ff' : '1.5px solid #cbd5e1',
          borderRadius: '10px',
          padding: '0.85rem 1.15rem',
          fontSize: '0.94rem',
          fontFamily: 'inherit',
          color: value ? '#090d1a' : '#94a3b8',
          fontWeight: value ? '500' : '400',
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: isOpen
            ? '0 0 0 3px rgba(0, 102, 255, 0.15), 0 2px 4px rgba(0,0,0,0.04)'
            : '0 1px 2px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          textAlign: 'left',
          outline: 'none',
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '0.5rem' }}>
          {displayLabel}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: isOpen ? '#0066ff' : '#64748b',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease, color 0.2s ease',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Options Menu Popup */}
      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 12px 30px rgba(0, 50, 150, 0.14), 0 2px 8px rgba(0,0,0,0.06)',
            maxHeight: '260px',
            overflowY: 'auto',
            zIndex: 999,
            padding: '0.4rem',
            animation: 'dropdownFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {safeOptions.map((opt, index) => {
            const optVal = typeof opt === 'object' && opt !== null ? opt.value : opt;
            const optLabel = typeof opt === 'object' && opt !== null ? opt.label : opt;
            const isSelected = optVal === value;

            return (
              <div
                key={optVal || index}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected ? '#0066ff' : '#334155',
                  backgroundColor: isSelected ? 'rgba(0, 102, 255, 0.08)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease, color 0.15s ease',
                  marginBottom: '2px',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                    e.currentTarget.style.color = '#090d1a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#334155';
                  }
                }}
              >
                <span>{optLabel}</span>
                {isSelected && <Check size={16} style={{ color: '#0066ff', flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
