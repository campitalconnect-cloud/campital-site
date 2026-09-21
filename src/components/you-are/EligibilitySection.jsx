import React from 'react';
import { Info, Bell } from 'lucide-react';

export const EligibilitySection = ({ eligibility }) => {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <div
        className="card"
        style={{
          padding: '2rem 2.25rem',
          backgroundColor: '#ffffff',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(0, 102, 255, 0.08)',
            border: '1px solid rgba(0, 102, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0066ff',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <Bell size={20} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.01em', margin: 0 }}>
              {eligibility.title || 'Eligibility Criteria'}
            </h4>
            <span className="badge badge-warning">Notice</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.6', margin: 0 }}>
            {eligibility.message}
          </p>
        </div>
      </div>
    </div>
  );
};
