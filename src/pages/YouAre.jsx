import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { PageHeader } from '../components/common/PageHeader';
import { PersonaSwitcher } from '../components/you-are/PersonaSwitcher';
import { PersonaSection } from '../components/you-are/PersonaSection';
import { EmailInquiryModal } from '../components/forms/EmailInquiryModal';
import { PERSONAS_DATA } from '../data/personas';

const PERSONA_KEYS = ['startup', 'incubator', 'sme', 'faculty'];

export const YouAre = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const personaParam = searchParams.get('persona')?.toLowerCase();

  const [activePersonaKey, setActivePersonaKey] = useState(
    PERSONA_KEYS.includes(personaParam) ? personaParam : 'startup'
  );

  const [activeModalPersona, setActiveModalPersona] = useState(null);

  // Auto-scroll on initial load if persona query param or hash exists
  useEffect(() => {
    const targetKey = PERSONA_KEYS.includes(personaParam)
      ? personaParam
      : location.hash
      ? location.hash.replace('#', '')
      : null;

    if (targetKey && PERSONA_KEYS.includes(targetKey)) {
      setActivePersonaKey(targetKey);
      setTimeout(() => {
        const elem = document.getElementById(targetKey);
        if (elem) {
          const yOffset = -100;
          const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  }, [personaParam, location.hash]);

  // ScrollSpy to update activePersonaKey as user scrolls through the 4 tracks
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const key of PERSONA_KEYS) {
        const elem = document.getElementById(key);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActivePersonaKey(key);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectPersona = (key) => {
    setActivePersonaKey(key);
    setSearchParams({ persona: key }, { replace: true });
  };

  return (
    <div className="you-are-page">
      <PageHeader
        eyebrow="Interactive Persona Guide"
        title="Find Your Place in Campital"
        subtitle="Explore all 4 structured pathways: whether you are building a campus venture, cultivating deal flow in an incubator, operating an SME, or commercializing academic lab research."
      >
        <div style={{ display: 'flex', justifyContent: 'center', position: 'sticky', top: '90px', zIndex: 10 }}>
          <PersonaSwitcher
            activePersona={activePersonaKey}
            onSelectPersona={handleSelectPersona}
          />
        </div>
      </PageHeader>

      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <Container>
          {/* List All 4 Personas In-Line with Full Contents and Separations */}
          {PERSONA_KEYS.map((key, index) => {
            const persona = PERSONAS_DATA[key];
            return (
              <PersonaSection
                key={persona.key}
                persona={persona}
                isLast={index === PERSONA_KEYS.length - 1}
                onOpenInquiry={() => setActiveModalPersona(persona)}
              />
            );
          })}
        </Container>
      </section>

      {/* Structured Zero-Backend Inquiry Modal */}
      {activeModalPersona && (
        <EmailInquiryModal
          isOpen={!!activeModalPersona}
          onClose={() => setActiveModalPersona(null)}
          inquiryType={activeModalPersona.cta.inquiryType}
          title={
            activeModalPersona.key === 'startup'
              ? 'Startup Funding Application'
              : activeModalPersona.key === 'incubator'
              ? 'Campus Incubator Partnership Inquiry'
              : activeModalPersona.key === 'faculty'
              ? 'Faculty & Lab IP Commercialization'
              : 'SME Funding Application'
          }
          subtitle={
            activeModalPersona.key === 'startup'
              ? 'Prepare your startup application details to connect with the evaluation pipeline.'
              : activeModalPersona.key === 'incubator'
              ? 'Initiate a partnership scoping discussion for your campus incubator portfolio.'
              : activeModalPersona.key === 'faculty'
              ? 'Register your research area and spin-off interest for early pilot cohorts.'
              : 'Prepare your SME growth funding application for independent review.'
          }
        />
      )}
    </div>
  );
};

