import React, { useState } from 'react';
import { Mail, Check, Send, Sparkles } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { CAMPITAL_CONTACT_EMAIL } from '../../config/emailConfig';

export const NewsletterStrip = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }

    // Zero-backend: Prepare mailto subscription draft
    const subject = encodeURIComponent('[The Campital Brief] Newsletter Subscription');
    const body = encodeURIComponent(
      `Hello Campital Team,\n\nPlease add ${email} to The Campital Brief monthly newsletter for open calls, demo days, and founder announcements.\n\nSubscriber Email: ${email}`
    );
    const mailtoUrl = `mailto:${CAMPITAL_CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_top';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Mailto trigger error:', err);
    }

    setStatus('success');
  };

  return (
    <section
      id="newsletter"
      style={{
        background: 'linear-gradient(135deg, #0a1128 0%, #173887 50%, #0052ff 100%)',
        color: '#ffffff',
        padding: '4.5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#38bdf8',
              fontSize: '0.82rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={14} />
            <span>The Campital Brief</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '-0.025em',
              marginBottom: '0.85rem',
            }}
          >
            Open calls, upcoming demo days & founders who got funded.
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#cbd5e1',
              marginBottom: '2rem',
              lineHeight: '1.6',
            }}
          >
            Monthly intelligence on campus venture deals, hackathon schedules, and seed velocity. No spam.
          </p>

          {status === 'success' ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(5, 150, 105, 0.2)',
                border: '1.5px solid #10b981',
                borderRadius: '12px',
                padding: '0.85rem 1.5rem',
                color: '#6ee7b7',
                fontWeight: '700',
                fontSize: '0.95rem',
              }}
            >
              <Check size={18} />
              <span>Subscription draft ready! Check your email client to confirm.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              style={{
                display: 'flex',
                maxWidth: '520px',
                margin: '0 auto',
                gap: '0.65rem',
              }}
              className="newsletter-form"
            >
              <input
                type="email"
                placeholder="Enter your work / campus email..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                style={{
                  flex: 1,
                  padding: '0.85rem 1.25rem',
                  borderRadius: '12px',
                  border: status === 'error' ? '1.5px solid #ef4444' : '1.5px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#090d1a',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              <Button
                type="submit"
                variant="primary"
                icon={Send}
                style={{
                  backgroundColor: '#0066ff',
                  borderColor: '#0066ff',
                  whiteSpace: 'nowrap',
                  padding: '0.85rem 1.65rem',
                }}
              >
                Subscribe
              </Button>
            </form>
          )}

          {status === 'error' && (
            <div style={{ color: '#fca5a5', fontSize: '0.82rem', marginTop: '0.5rem', fontWeight: '600' }}>
              Please enter a valid email address.
            </div>
          )}
        </div>
      </Container>

      <style>{`
        @media (max-width: 580px) {
          .newsletter-form {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
};
