# Campital — Campus-to-Capital Startup Platform

> **"Campus + Capital = Campital"**  
> *Funding. Partners. Momentum. For startups born on campus.*

---

## 📌 Project Overview

**Campital** connects campus-born startups, campus incubators, SMEs, and capital providers through a structured sourcing, evaluation, and investment pipeline.

This codebase delivers **Phase 1: Complete Website Development**, implemented from scratch as a high-performance, accessible, responsive Single Page Application (SPA) with a **zero-backend mailto email workflow**.

---

## 🚀 Key Features

- **Scalable Architecture**: Strict separation of concerns across `config/`, `data/`, `components/`, `pages/`, `hooks/`, and `utils/`.
- **Zero-Backend Email Pipeline**: Structured `mailto:` URL builder + seamless clipboard fallback. No servers, no databases, no API keys, and no persistent client-side tracking.
- **Interactive 3-Way Persona Switcher**: Seamless switching between *Startup*, *Campus Incubator*, and *SME* tracks on `/you-are` with synchronized URL query parameters (`?persona=...`) and browser history back/forward support.
- **Brand Identity & Design System**: Midnight navy surface layers, vivid indigo/electric blue accents, crisp typography (Plus Jakarta Sans & Inter), and glassmorphism.
- **Compliant Placeholder Governance**: Transparent placeholder states for unverified traction, partner logos, case studies, and legal documents. Zero fabricated metrics or affiliations.
- **Full Responsive Coverage**: Custom breakpoints tested across mobile (320px, 390px), tablet (768px), and desktop (1024px, 1440px+).

---

## 🛠️ Technology Stack

- **Framework**: React 19 (ES6+ JavaScript)
- **Bundler & Tooling**: Vite 6
- **Routing**: React Router DOM v7
- **Iconography**: Lucide React
- **Styling**: Vanilla CSS Design Tokens (`variables.css`, `typography.css`, `global.css`, `components.css`)
- **Hosting Target**: Deployable as a static SPA on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 📂 File Architecture

```
Campital/
├── index.html                 # App entry point, meta tags, Google Fonts
├── package.json               # Dependencies and build scripts
├── vite.config.js             # Vite configuration with React plugin
├── public/
│   ├── favicon.svg            # Custom SVG geometric mark
│   ├── robots.txt             # Search crawler directives
│   └── _redirects             # SPA routing fallback for static hosts
├── src/
│   ├── main.jsx               # React DOM root mounting
│   ├── App.jsx                # Global router and layout structure
│   ├── styles/
│   │   ├── variables.css      # CSS variables (colors, spacing, shadows, radii)
│   │   ├── typography.css     # Font sizes, hierarchy, lead, eyebrow styles
│   │   ├── global.css         # Reset, background glows, layout containers
│   │   └── components.css     # Buttons, cards, form inputs, modal styles
│   ├── config/
│   │   ├── siteConfig.js      # Brand constants, disclaimers, metadata
│   │   ├── navigation.js      # Header/Footer links and CTA routing mapping
│   │   └── emailConfig.js     # Configurable contact email & subject templates
│   ├── data/
│   │   ├── homeData.js        # 3-stage process, audience cards, pillars, traction
│   │   ├── aboutData.js       # Mission, converging pipelines, story, team, values
│   │   ├── personas.js        # Startup, Incubator, SME workflows & FAQs
│   │   ├── partnerships.js    # 3 partner tracks, benefits, 5-step onboarding
│   │   └── faqs.js            # General platform FAQs
│   ├── utils/
│   │   ├── emailTemplates.js  # Safe URL encoding and plain-text body formatting
│   │   └── validation.js      # Form input validation rules
│   ├── hooks/
│   │   └── useEmailInquiry.js # Reusable form state, validation, mailto & clipboard hook
│   ├── components/
│   │   ├── common/            # Navbar, Footer, Button, Container, Logo, Modal, etc.
│   │   ├── home/              # Hero, HowItWorks, AudienceCards, WhyCampital, Traction, etc.
│   │   ├── about/             # Mission, Dual Approach, Story, Team, Values
│   │   ├── you-are/           # PersonaSwitcher, PersonaOverview, ProcessSteps, FAQs
│   │   ├── partnerships/      # PartnerCategories, Process, CaseStudy placeholder
│   │   ├── forms/             # EmailInquiryForm, EmailInquiryModal, FormField, CopyButton
│   │   └── legal/             # LegalLayout reusable wrapper
│   └── pages/
│       ├── Home.jsx           # Route: /
│       ├── AboutUs.jsx        # Route: /about-us
│       ├── YouAre.jsx         # Route: /you-are?persona={startup|incubator|sme}
│       ├── Partnerships.jsx   # Route: /partnerships
│       ├── PrivacyPolicy.jsx  # Route: /privacy-policy (Draft)
│       ├── TermsOfService.jsx # Route: /terms-of-service (Draft)
│       └── NotFound.jsx       # Route: * (404 Error Page)
```

---

## ⚡ Getting Started Locally

### 1. Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### 2. Installation
```bash
# Navigate to project directory
cd /path/to/Campital

# Install dependencies
npm install
```

### 3. Running Local Development Server
```bash
npm run dev
```
The site will run at `http://localhost:3000` with instant Hot Module Replacement (HMR).

### 4. Creating Production Build
```bash
npm run build
```
The production bundle will be output to the `dist/` directory, ready for immediate static deployment.

---

## 🌐 Deployment Instructions

### Vercel / Netlify
1. Connect the Git repository to Vercel or Netlify.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. The included `public/_redirects` file automatically handles client-side SPA routing (`/* -> /index.html 200`).

---

## 📋 Outstanding Client Inputs (For Future Phase)

To transition from Phase 1 to full public launch, the following inputs will need to be provided and configured in their respective files:

1. **Approved Public Contact Email**: Update `CAMPITAL_CONTACT_EMAIL` in `src/config/emailConfig.js`.
2. **Verified Traction Figures**: Update `TRACTION_METRICS` in `src/data/homeData.js` once the inaugural cohort completes.
3. **Authorized Partner Logos**: Add official university incubator and investor SVGs to `PARTNER_LOGOS_CONFIG` in `src/data/homeData.js`.
4. **Founding Team Headshots & Extended Bios**: Update `ABOUT_TEAM_DATA` in `src/data/aboutData.js`.
5. **Finalized Eligibility Criteria**: Update `eligibilityNotice` objects in `src/data/personas.js`.
6. **Formal Legal & Privacy Counsel Review**: Finalize texts in `src/pages/PrivacyPolicy.jsx` and `src/pages/TermsOfService.jsx`.
