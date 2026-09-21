import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Campital — Campus + Capital = Campital | Student Startup Funding Pipeline',
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
    
    // Dynamic Persona Sub-Title
    if (pathname === '/you-are') {
      const params = new URLSearchParams(search);
      const persona = params.get('persona');
      if (persona === 'startup') {
        title = 'For Startup Founders — Get Evaluated, Get Funded | Campital';
      } else if (persona === 'incubator') {
        title = 'For Campus Incubators — University Portfolio Capital Bridge | Campital';
      } else if (persona === 'sme') {
        title = 'For SMEs — Direct Growth Capital Conduit | Campital';
      }
    }

    document.title = title;
  }, [pathname, search, hash]);

  return null;
};
