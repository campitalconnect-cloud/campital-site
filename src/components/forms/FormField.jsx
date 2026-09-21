import React from 'react';
import { AlertCircle } from 'lucide-react';

export const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helper,
  options = [], // For select dropdowns
  rows = 4,
  disabled = false,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`form-select ${error ? 'has-error' : ''}`}
          disabled={disabled}
        >
          <option value="">{placeholder || 'Select an option...'}</option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`form-textarea ${error ? 'has-error' : ''}`}
          disabled={disabled}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={`form-input ${error ? 'has-error' : ''}`}
          disabled={disabled}
        />
      )}

      {error && (
        <div className="form-error" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {helper && !error && <div className="form-helper">{helper}</div>}
    </div>
  );
};
