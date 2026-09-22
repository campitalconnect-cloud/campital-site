import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Campital — Official Website | Campus + Capital = Campital | Student Startup Funding Pipeline',
  '/you-are': 'Explore Pathways (Startups, Incubators, SMEs) | Campital',
  '/partnerships': 'Strategic Institutional Partnerships | Campital',
  '/about-us': 'About Us & Mission | Campital Platform',
  '/about': 'About Us & Mission | Campital Platform',
  '/team': 'Leadership & Advisory | Campital Platform',
  '/privacy-policy': 'Privacy Policy | Campital',
  '/privacy': 'Privacy Policy | Campital',
  '/terms-of-service': 'Terms of Service | Campital',
  '/terms': 'Terms of Service | Campital',
};

const PAGE_DESCRIPTIONS = {
  '/': "Campital (campital.in) is India's dedicated campus-to-capital startup funding pipeline. We evaluate student founders, university incubator cohorts, and SMEs for institutional venture capital.",
  '/you-are': "Explore Campital's 3 structured capital pathways for campus startups, university incubators, and independent growing SMEs.",
  '/partnerships': "Strategic institutional partnerships with university incubators, corporate innovation tracks, and angel syndicates.",
  '/about-us': "Learn about Campital's mission, leadership team, and thesis of powering campus-born startup founders into institutional investment.",
  '/privacy-policy': "Privacy policy, data protection terms, and regulatory compliance standards for Campital applicants.",
  '/terms-of-service': "Terms of service, platform rules, and investment conduit disclaimer for Campital.",
};

export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // 1. Scroll Handling
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // 2. Dynamic SEO Document Title Management
    let title = PAGE_TITLES[pathname] || 'Campital — Campus + Capital = Campital';
    let description = PAGE_DESCRIPTIONS[pathname] || PAGE_DESCRIPTIONS['/'];
    
    // Dynamic Persona Sub-Title
    if (pathname === '/you-are') {
      const params = new URLSearchParams(search);
      const persona = params.get('persona');
      if (persona === 'startup') {
        title = 'For Startup Founders — Get Evaluated, Get Funded | Campital';
        description = 'Built something on campus? Get evaluated through our 21-day velocity funnel and connect directly with institutional seed capital.';
      } else if (persona === 'incubator') {
        title = 'For Campus Incubators — University Portfolio Capital Bridge | Campital';
        description = 'Connect your university incubator cohort to a structured discovery funnel and an accredited investor network beyond grants.';
      } else if (persona === 'sme') {
        title = 'For SMEs — Direct Growth Capital Conduit | Campital';
        description = 'Independent small and medium enterprises seeking growth capital through a direct evaluation process without campus affiliation.';
      }
    }

    document.title = title;

    // 3. Dynamic Meta Description Tag
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }
  }, [pathname, search, hash]);

  return null;
};
