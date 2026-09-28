import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  Tag, 
  ArrowRight, 
  Share2, 
  ChevronRight,
  TrendingUp,
  GraduationCap,
  Building2,
  X,
  CheckCircle2,
  Bookmark,
  Quote,
  Flame,
  FileText
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { NewsletterStrip } from '../components/home/NewsletterStrip';
import { fadeUpVariant } from '../utils/motion';

const ARTICLES = [
  {
    id: 'campus-capital-gap',
    title: 'The Campus Capital Gap: Why Great Student Startups Stall After the Grant',
    category: 'Ecosystem Analysis',
    categoryColor: '#0066ff',
    readTime: '5 min read',
    date: 'Sep 2026',
    featured: true,
    coverImage: '/images/insights_campus_gap.jpg',
    excerpt: 'University incubators are great at giving students ₹5–10L grants to build a prototype. But what happens when that money runs out? We analyze the structural missing link between academic incubation and seed-stage institutional capital.',
    author: {
      name: 'Campital Research Desk',
      role: 'Venture & Campus Strategy',
      avatar: 'CR'
    },
    sections: [
      {
        heading: 'The Non-Dilutive Grant Paradox',
        content: `Across top Indian engineering and management campuses, innovation cells and government-backed incubators have made prototype grants widely accessible. A student team with a credible idea can routinely secure ₹5–10 Lakhs in non-dilutive grant capital.

However, once that initial grant is spent on server credits, basic component tooling, and lab prototypes, the founders hit a structural wall:`
      },
      {
        heading: 'Three Structural Bottlenecks',
        listItems: [
          {
            title: 'The Graduation Runway Cliff',
            text: 'Student founders complete their degrees and face immediate societal and financial pressure to take corporate employment when early equity runway is absent.'
          },
          {
            title: 'The Institutional Seed Mismatch',
            text: 'Traditional VC seed funds manage large pools and rarely spend partner bandwidth evaluating campus projects without institutional deal memos and verified traction.'
          },
          {
            title: 'The Governance Vacuum',
            text: 'Many student teams lack structured cap tables, clean university IP assignment agreements, and compliance hygiene needed to pass institutional due diligence.'
          }
        ]
      },
      {
        heading: 'Closing the Middle Ground',
        content: `Campital exists to standardize this exact transition. By subjecting campus-born ventures to institutional screening metrics before they exit university, we provide investors with deal-ready memos and founders with legitimate seed runways of ₹2–5 Crore.`,
        callout: 'A grant builds a proof-of-concept; only compliant equity capital builds an enduring enterprise.'
      }
    ]
  },
  {
    id: 'investor-signals-campus-founders',
    title: 'What Investors Actually Look for in a Campus Founder',
    category: 'Founder Advisory',
    categoryColor: '#059669',
    readTime: '4 min read',
    date: 'Sep 2026',
    featured: false,
    coverImage: '/images/insights_investor_signals.jpg',
    excerpt: "It's rarely the technology alone. The three signals that separate an interesting academic demo from a scalable, investable company.",
    author: {
      name: 'Campital Deal Committee',
      role: 'Investment Evaluation',
      avatar: 'CD'
    },
    sections: [
      {
        heading: 'Beyond the Tech Demo',
        content: `When evaluating campus startups, most investors assume technology is rarely the sole differentiator. In deep-tech or consumer software, a well-built GitHub repository or hardware prototype is table stakes.`
      },
      {
        heading: 'The Three Decisive Signals',
        listItems: [
          {
            title: 'Velocity of Customer Feedback',
            text: 'Did the founders talk to 50 real potential buyers, or did they only test inside their dorm wing? Evidence of real pilots, LOIs, or customer obsession outweighs raw feature count.'
          },
          {
            title: 'Founder Complementarity & Grit',
            text: 'Has the team survived a technical pivot, disagreement, or budget constraint? Investors back founding teams that demonstrate relentless execution outside the classroom.'
          },
          {
            title: 'Distribution & Unit Economics Clarity',
            text: 'A clear understanding of how customers will be acquired profitably at scale, rather than generic TAM (Total Addressable Market) assumptions.'
          }
        ]
      },
      {
        heading: 'The Takeaway for Campus Teams',
        content: `Start measuring your startup by external commercial commitments rather than campus accolades. The fastest way to stand out to an institutional investor is proof of real market demand.`,
        callout: 'Trophies validate effort; customer commitments and signed pilots validate investability.'
      }
    ]
  },
  {
    id: 'smes-growth-capital-playbook',
    title: 'SMEs Are Not Just Smaller Startups — How Growth Capital Needs to Change',
    category: 'SME Strategy',
    categoryColor: '#7c3aed',
    readTime: '6 min read',
    date: 'Sep 2026',
    featured: false,
    coverImage: '/images/insights_sme_growth.jpg',
    excerpt: 'Why applying venture-capital hyper-burn playbooks to profitable, revenue-first SMEs usually fails, and what a compliant capital route looks like.',
    author: {
      name: 'Campital Syndicate Desk',
      role: 'Growth Capital & Structuring',
      avatar: 'CS'
    },
    sections: [
      {
        heading: 'The Venture Capital Fallacy',
        content: `Traditional Silicon Valley-style venture capital relies on power-law returns where 9 out of 10 portfolio companies may fail if 1 becomes a 100x unicorn.

For profitable, revenue-generating Small and Medium Enterprises (SMEs), this high-burn model is fundamentally misaligned.`
      },
      {
        heading: 'What SMEs Actually Require',
        listItems: [
          {
            title: 'Prudent Growth Capital (₹5–10 Cr)',
            text: 'To expand manufacturing capacity, open regional distribution channels, or modernize digital operations.'
          },
          {
            title: 'Cash Flow Alignment',
            text: 'Deal structures that respect predictable gross margins and EBITDA positive fundamentals rather than vanity GMV metrics.'
          },
          {
            title: 'Compliant Syndicate Access',
            text: 'Structured debt, hybrid instruments, or growth equity from accredited syndicates without predatory liquidation preferences.'
          }
        ]
      },
      {
        heading: 'Building Sustainable Enterprise Value',
        content: `Campital’s SME Growth Route is tailored specifically around unit economics and sustainable enterprise value, offering dedicated syndicates who value predictability and operational excellence.`,
        callout: 'Sustainable profitability is not a fallback plan; it is the ultimate enterprise defense.'
      }
    ]
  }
];

export const Insights = () => {
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    if (activeArticle) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeArticle]);

  const handleShare = (art) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/insights#' + art.id);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const featuredArticle = ARTICLES.find(a => a.featured) || ARTICLES[0];
  const regularArticles = ARTICLES.filter(a => a.id !== featuredArticle.id);

  return (
    <div className="insights-page" style={{ paddingTop: '5.5rem' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
          padding: '4rem 0 3rem',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Container>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0, 102, 255, 0.08)',
                border: '1px solid rgba(0, 102, 255, 0.2)',
                color: '#0066ff',
                fontSize: '0.82rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}
            >
              <BookOpen size={14} />
              <span>Campital Intelligence & Research</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
                fontWeight: '800',
                color: '#090d1a',
                letterSpacing: '-0.03em',
                lineHeight: '1.2',
                marginBottom: '1.25rem',
              }}
            >
              Insights: <br className="hidden-mobile" />
              <span
                style={{
                  background: 'linear-gradient(135deg, #0052ff 0%, #00b4d8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Perspectives on Campus Venturing, SME Growth & Venture Capital
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              style={{
                fontSize: '1.15rem',
                color: '#475569',
                lineHeight: '1.7',
                maxWidth: '740px',
                margin: '0 auto',
              }}
            >
              Field notes, data, and honest commentary from the intersection of university innovation and institutional capital.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Featured Editorial Spotlight */}
      <section className="section" style={{ backgroundColor: '#ffffff', padding: '4rem 0 2rem' }}>
        <Container>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={18} style={{ color: '#0066ff' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#090d1a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Featured Intelligence
            </span>
          </div>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveArticle(featuredArticle)}
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1.15fr 1fr',
              boxShadow: '0 12px 36px rgba(0, 82, 255, 0.06)',
              cursor: 'pointer',
            }}
            className="featured-article-card"
          >
            {/* Left Cover Image */}
            <div style={{ position: 'relative', minHeight: '340px', overflow: 'hidden', backgroundColor: '#090d1a' }}>
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                className="featured-cover-img"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(9, 13, 26, 0.7) 100%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                <span
                  style={{
                    backgroundColor: '#0066ff',
                    color: '#ffffff',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Featured Essay
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div style={{ padding: 'clamp(2rem, 3.5vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      color: featuredArticle.categoryColor,
                      backgroundColor: `${featuredArticle.categoryColor}12`,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {featuredArticle.category}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 1.95rem)',
                    fontWeight: '800',
                    color: '#090d1a',
                    lineHeight: '1.3',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {featuredArticle.title}
                </h2>

                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.65', marginBottom: '1.75rem' }}>
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 102, 255, 0.1)',
                      color: '#0066ff',
                      fontWeight: '800',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {featuredArticle.author.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#090d1a' }}>
                      {featuredArticle.author.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {featuredArticle.author.role}
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  icon={ArrowRight}
                  style={{ backgroundColor: '#0066ff', padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
                >
                  Read Essay
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Grid of Other Articles */}
      <section className="section" style={{ backgroundColor: '#ffffff', padding: '3rem 0 5rem' }}>
        <Container>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#090d1a', letterSpacing: '-0.02em' }}>
              All Research & Analyses
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2.5rem',
              alignItems: 'stretch',
            }}
            className="insights-grid"
          >
            {regularArticles.map((art, idx) => {
              return (
                <motion.article
                  key={art.id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ y: -5 }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                  }}
                  className="article-card"
                  onClick={() => setActiveArticle(art)}
                >
                  {/* Article Thumbnail */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#090d1a' }}>
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      className="card-cover-img"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 40%, rgba(9, 13, 26, 0.6) 100%)',
                      }}
                    />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                      <span
                        style={{
                          fontSize: '0.76rem',
                          fontWeight: '800',
                          color: '#ffffff',
                          backgroundColor: art.categoryColor,
                          padding: '0.3rem 0.75rem',
                          borderRadius: '9999px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                        <Clock size={13} color="#94a3b8" />
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                          {art.readTime} &bull; {art.date}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontSize: '1.35rem',
                          fontWeight: '800',
                          color: '#090d1a',
                          lineHeight: '1.35',
                          marginBottom: '0.85rem',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {art.title}
                      </h2>

                      <p
                        style={{
                          fontSize: '0.94rem',
                          color: '#64748b',
                          lineHeight: '1.65',
                          marginBottom: '1.5rem',
                        }}
                      >
                        {art.excerpt}
                      </p>
                    </div>

                    <div
                      style={{
                        borderTop: '1px solid #f1f5f9',
                        paddingTop: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>
                        By {art.author.name}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.88rem', fontWeight: '800', color: art.categoryColor }}>
                        Read Essay <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Structured & Formatted Reading Experience Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(9, 13, 26, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(5rem, 9vh, 6.5rem) clamp(1rem, 3vw, 2.5rem) 2rem clamp(1rem, 3vw, 2.5rem)',
              overflowY: 'auto',
            }}
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                maxWidth: '820px',
                width: '100%',
                maxHeight: '100%',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Banner inside Modal */}
              <div style={{ position: 'relative', height: 'clamp(200px, 28vw, 280px)', overflow: 'hidden', backgroundColor: '#090d1a' }}>
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(9,13,26,0.2) 0%, rgba(9,13,26,0.85) 100%)',
                  }}
                />

                {/* Close Button - High Contrast Floating Pill */}
                <button
                  onClick={() => setActiveArticle(null)}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '9999px',
                    padding: '0.45rem 0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer',
                    color: '#090d1a',
                    fontWeight: '800',
                    fontSize: '0.82rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                    zIndex: 20,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                  aria-label="Close reading view"
                >
                  <X size={16} style={{ strokeWidth: 3 }} />
                  <span>Close</span>
                </button>


                {/* Top Category Badge */}
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      color: '#ffffff',
                      backgroundColor: activeArticle.categoryColor,
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {activeArticle.category}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: '600' }}>
                    {activeArticle.readTime} &bull; {activeArticle.date}
                  </span>
                </div>
              </div>

              {/* Reader Article Body */}
              <div style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
                <h1
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.35rem)',
                    fontWeight: '800',
                    color: '#090d1a',
                    lineHeight: '1.25',
                    marginBottom: '1.25rem',
                    letterSpacing: '-0.025em',
                  }}
                >
                  {activeArticle.title}
                </h1>

                {/* Author Metadata Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2.5rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 102, 255, 0.1)',
                        color: '#0066ff',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {activeArticle.author.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#090d1a' }}>
                        {activeArticle.author.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        {activeArticle.author.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleShare(activeArticle)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 0.95rem',
                      borderRadius: '9999px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      color: '#334155',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {copiedLink ? <CheckCircle2 size={14} color="#059669" /> : <Share2 size={14} />}
                    <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
                  </button>
                </div>

                {/* Structured Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {activeArticle.sections.map((sec, sIdx) => (
                    <div key={sIdx}>
                      {sec.heading && (
                        <h3
                          style={{
                            fontSize: '1.35rem',
                            fontWeight: '800',
                            color: '#090d1a',
                            marginBottom: '0.85rem',
                            letterSpacing: '-0.02em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{
                              width: '4px',
                              height: '18px',
                              backgroundColor: activeArticle.categoryColor,
                              borderRadius: '4px',
                              display: 'inline-block',
                            }}
                          />
                          <span>{sec.heading}</span>
                        </h3>
                      )}

                      {sec.content && (
                        <div
                          style={{
                            fontSize: '1.05rem',
                            lineHeight: '1.8',
                            color: '#334155',
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {sec.content}
                        </div>
                      )}

                      {sec.listItems && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                          {sec.listItems.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              style={{
                                backgroundColor: '#f8fafc',
                                border: '1.5px solid #e2e8f0',
                                borderRadius: '16px',
                                padding: '1.25rem 1.5rem',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem',
                              }}
                            >
                              <div
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  backgroundColor: activeArticle.categoryColor,
                                  color: '#ffffff',
                                  fontSize: '0.82rem',
                                  fontWeight: '800',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  marginTop: '2px',
                                }}
                              >
                                {iIdx + 1}
                              </div>
                              <div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#090d1a', marginBottom: '0.35rem' }}>
                                  {item.title}
                                </h4>
                                <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                                  {item.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {sec.callout && (
                        <div
                          style={{
                            marginTop: '1.5rem',
                            backgroundColor: 'rgba(0, 102, 255, 0.06)',
                            borderLeft: `4px solid ${activeArticle.categoryColor}`,
                            borderRadius: '0 14px 14px 0',
                            padding: '1.25rem 1.5rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                          }}
                        >
                          <Quote size={22} style={{ color: activeArticle.categoryColor, flexShrink: 0, marginTop: '2px' }} />
                          <p style={{ fontSize: '1.05rem', fontStyle: 'italic', fontWeight: '600', color: '#090d1a', lineHeight: '1.6', margin: 0 }}>
                            {sec.callout}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer Modal Actions */}
                <div
                  style={{
                    marginTop: '3rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <Button variant="secondary" onClick={() => setActiveArticle(null)}>
                    Close Reading View
                  </Button>
                  <Button
                    variant="primary"
                    to="/how-we-fund"
                    icon={ArrowRight}
                    style={{ backgroundColor: '#0066ff' }}
                  >
                    Explore How We Fund
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Strip */}
      <NewsletterStrip />

      <style>{`
        .featured-article-card:hover .featured-cover-img {
          transform: scale(1.04);
        }
        .article-card:hover .card-cover-img {
          transform: scale(1.05);
        }
        @media (max-width: 992px) {
          .featured-article-card {
            grid-template-columns: 1fr !important;
          }
          .insights-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
