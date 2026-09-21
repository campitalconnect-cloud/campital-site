import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'md', isLink = true, light = false, className = '' }) => {
  // Height map based on size
  const heightMap = {
    sm: '40px',
    md: '54px',
    lg: '68px',
    xl: '84px',
  };

  const logoSrc = light ? '/images/campital_logo_dark.png' : '/images/campital_logo.png';
  const logoHeight = heightMap[size] || '54px';

  const content = (
    <div 
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: isLink ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
      }}
    >
      <img
        src={logoSrc}
        alt="Campital — Campus + Capital = Campital"
        style={{
          height: logoHeight,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          filter: light ? 'drop-shadow(0 2px 10px rgba(0, 102, 255, 0.2))' : 'none',
        }}
        onError={(e) => {
          // Fallback to light logo if dark version has any issue
          if (light && e.currentTarget.src.includes('campital_logo_dark.png')) {
            e.currentTarget.src = '/images/campital_logo.png';
          }
        }}
      />
    </div>
  );

  if (!isLink) return content;

  return (
    <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} aria-label="Campital Home">
      {content}
    </Link>
  );
};
