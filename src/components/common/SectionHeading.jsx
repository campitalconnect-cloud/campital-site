import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = '',
  titleGradient = false,
}) => {
  return (
    <div className={`section-header ${centered ? 'text-center' : ''} ${className}`.trim()}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {title && (
        <h2>
          {titleGradient ? <span className="text-gradient">{title}</span> : title}
        </h2>
      )}
      {subtitle && <p className="text-lead">{subtitle}</p>}
    </div>
  );
};
