import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Campital — Campus + Capital = Campital | Student Startup & SME Funding Pipeline',
  '/you-are': 'Find Your Place in Campital (Startups, Incubators, SMEs, Researchers) | Campital',
  '/how-we-fund': 'How We Fund — Funding Mechanics & Compliant Capital Routes | Campital',
  '/programs-events': 'Programs & Events — Hackathons, Demo Days & Pitch Competitions | Campital',
  '/partnerships': 'Strategic Institutional & Ecosystem Partnerships | Campital',
  '/about-us': 'About Us — Sector-Agnostic Venture Pipeline | Campital',
  '/about': 'About Us — Sector-Agnostic Venture Pipeline | Campital',
  '/team': 'Leadership & Advisory | Campital',
  '/insights': 'Insights & The Campital Brief — Campus to Capital | Campital',
  '/privacy-policy': 'Privacy Policy | Campital',
  '/privacy': 'Privacy Policy | Campital',
  '/terms-of-service': 'Terms of Service | Campital',
  '/terms': 'Terms of Service | Campital',
};

const PAGE_DESCRIPTIONS = {
  '/': 'Campital is a campus-to-capital funding pipeline. We discover and evaluate startups from campus incubators, and SMEs directly, then connect investment-ready companies to a compliant route to capital.',
  '/you-are': 'Explore Campital’s 4 structured pathways: Campus Startups, University Incubators, SMEs, and Faculty/Researchers.',
  '/how-we-fund': 'One pipeline with the right route for each founder: Startup Seed Route (₹2-5 Cr), SME Growth Route (₹5-10 Cr), and Incubator Portfolio Route.',
  '/programs-events': 'Where the pipeline starts. Hackathons, Demo Days, and Pitch Competitions built to end in an investment shortlist, not just a stage.',
  '/partnerships': 'Strategic partnerships with capital partners, campus incubators, and corporate sponsors.',
  '/about-us': 'Sector-agnostic by design. We don’t bet on industries — we build the pipeline that finds the companies ready for capital.',
  '/insights': 'Straight talk on getting from campus to capital. Open calls, upcoming demo days, and founder playbooks.',
  '/privacy-policy': 'Privacy policy, data protection terms, and regulatory compliance standards for Campital applicants.',
  '/terms-of-service': 'Terms of service, platform rules, and investment conduit disclaimer for Campital.',
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
        description = 'Built something on campus? Get evaluated through our discovery funnel and connect directly with compliant seed capital.';
      } else if (persona === 'incubator') {
        title = 'For Campus Incubators — University Portfolio Capital Bridge | Campital';
        description = 'Give your portfolio a path that doesn’t end at grants. Connect your innovation center to an accredited investor network.';
      } else if (persona === 'sme') {
        title = 'For SMEs — Direct Growth Capital Conduit | Campital';
        description = 'Running an SME? Apply directly, no incubator needed. Investment capital tailored for growing enterprises.';
      } else if (persona === 'faculty') {
        title = 'For Faculty & Researchers — Lab-to-Market Spinout Route | Campital';
        description = 'Research with startup potential? Register interest for our dedicated lab-to-market spinout evaluation pipeline.';
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
