import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  disabled = false,
  type = 'button',
  block = false,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const blockClass = block ? 'btn-block' : '';
  const classes = `btn btn-${variant} ${sizeClass} ${blockClass} ${className}`.trim();

  const iconElement = Icon ? (
    <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="btn-icon" />
  ) : null;

  const content = (
    <>
      {Icon && iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && iconElement}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
