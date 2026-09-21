import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '7rem', textAlign: 'center' }}>
      <Container narrow>
        <div
          className="card"
          style={{
            padding: '4.5rem 2rem',
            backgroundColor: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            boxShadow: '0 15px 40px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(4.5rem, 11vw, 7.5rem)',
              fontWeight: '900',
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '1.25rem',
            }}
          >
            404
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Page Not Found</h1>

          <p style={{ color: '#475569', fontSize: '1.08rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
            The page you are looking for might have been moved or does not exist in the Campital pipeline.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button to="/" variant="primary" size="lg" icon={Home} iconPosition="left">
              Return to Home
            </Button>
            <Button to="/you-are" variant="secondary" size="lg">
              Explore Pipelines
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
