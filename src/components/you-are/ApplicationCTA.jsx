import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

export const ApplicationCTA = ({ persona, onOpenInquiry }) => {
  return (
    <div
      style={{
        padding: '3.5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #0a1128 0%, #173887 50%, #0052ff 100%)',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0, 82, 255, 0.2)',
        color: '#ffffff',
      }}
    >
      <h3 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: '800', marginBottom: '0.85rem', color: '#ffffff', letterSpacing: '-0.025em' }}>
        Ready to Enter the Campital Pipeline?
      </h3>

      <p style={{ color: '#cbd5e1', fontSize: '1.08rem', maxWidth: '580px', margin: '0 auto 2.25rem', lineHeight: '1.6' }}>
        Initiate your {persona.label.toLowerCase()} inquiry. We will guide you through the discovery and evaluation stages.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="white"
          size="lg"
          onClick={onOpenInquiry}
          icon={ArrowUpRight}
        >
          {persona.cta.label}
        </Button>
      </div>

      <div style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: '#94a3b8' }}>
        Prepared via zero-backend email draft. No automated commitments or guarantees.
      </div>
    </div>
  );
};
