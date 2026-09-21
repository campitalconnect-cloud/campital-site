import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#f8fafc',
          color: '#090d1a',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '560px',
            padding: '3rem 2.5rem',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)'
          }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: '800', marginBottom: '1rem', color: '#090d1a', letterSpacing: '-0.02em' }}>
              Campital Application Notice
            </h2>
            <p style={{ color: '#475569', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
              An unexpected render issue occurred. Click the button below to reload the platform.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #0052ff 0%, #0066ff 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 102, 255, 0.3)'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
