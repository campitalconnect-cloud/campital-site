import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'md', isLink = true, light = false, className = '' }) => {
  // Refined modern height map for clean proportions
  const heightMap = {
    xs: '32px',
    sm: '40px',
    md: '48px',
    lg: '60px',
    xl: '76px',
  };

  const logoSrc = light ? '/images/campital_logo_dark.png' : '/images/campital_logo.png';
  const logoHeight = heightMap[size] || '48px';

  const content = (
    <div 
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: isLink ? 'pointer' : 'default',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
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
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
    <Link 
      to="/" 
      style={{ 
        textDecoration: 'none', 
        display: 'inline-flex', 
        alignItems: 'center',
        outline: 'none',
      }} 
      aria-label="Campital Home"
      className="campital-logo-link"
    >
      {content}
    </Link>
  );
};
