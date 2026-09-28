import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Sparkles, 
  Code, 
  Presentation, 
  Trophy, 
  Bell, 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Briefcase,
  Layers,
  Users
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { CustomSelect } from '../components/forms/CustomSelect';
import { CAMPITAL_CONTACT_EMAIL } from '../config/emailConfig';
import { fadeUpVariant } from '../utils/motion';
import {
  PROGRAMS_HERO_BASE64,
  PROGRAMS_HACKATHONS_BASE64,
  PROGRAMS_DEMODAYS_BASE64,
  PROGRAMS_PITCH_BASE64,
  PROGRAMS_CALENDAR_BASE64,
  PROGRAMS_HOST_SPONSOR_BASE64
} from '../assets/programsImages';

const EVENT_FORMATS = [
  {
    id: 'hackathons',
    title: 'Hackathons',
    badge: '36–48 Hour Build',
    icon: Code,
    image: PROGRAMS_HACKATHONS_BASE64,
    description: 'Intensive 36-to-48 hour builds focused on turning campus research and raw ideas into working prototypes. Industry-partnered briefs, mentor-driven, with direct qualification for Campital evaluation.',
    features: [
      'Problem statements co-authored with enterprise partners',
      'Hands-on mentorship from seasoned engineers and VCs',
      'Automatic fast-track screening for top 3 teams'
    ],
    color: '#1264FF'
  },
  {
    id: 'demo-days',
    title: 'Demo Days',
    badge: 'Cohort Showcase',
    icon: Presentation,
    image: PROGRAMS_DEMODAYS_BASE64,
    description: 'Cohort-style pitch showcases where the strongest campus startups present directly to angel syndicates, seed funds, and corporate partners. No pay-to-pitch. Merit only.',
    features: [
      'Strictly curated founder cohorts (Top 5–8% acceptance)',
      'Direct exposure to institutional angels and seed funds',
      'Standardized term-sheet discussions initiated on-site'
    ],
    color: '#20BFEF'
  },
  {
    id: 'pitch-competitions',
    title: 'Pitch Competitions',
    badge: 'Merit Arena',
    icon: Trophy,
    image: PROGRAMS_PITCH_BASE64,
    description: 'Competitive stage events with structured judging, investor panels, and non-dilutive prize pools alongside fast-track entry into our ₹2–5Cr seed evaluation pipeline.',
    features: [
      'Institutional venture panel judging & live investor feedback',
      'Non-dilutive milestone grant distributions',
      'Fast-track entry into the ₹2–5Cr Seed evaluation pipeline'
    ],
    color: '#1264FF'
  }
];

const ROLE_OPTIONS = [
  { value: 'student_founder', label: 'Student Founder / Team' },
  { value: 'incubator_manager', label: 'Incubator / Campus Lead' },
  { value: 'investor', label: 'Angel / Seed Investor' },
  { value: 'corporate_sponsor', label: 'Corporate Sponsor / Partner' }
];

export const ProgramsEvents = () => {
  const [notifyForm, setNotifyForm] = useState({
    name: '',
    email: '',
    role: 'student_founder',
    organization: ''
  });
  const [notifyStatus, setNotifyStatus] = useState('idle');

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!notifyForm.name.trim() || !notifyForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notifyForm.email)) {
      setNotifyStatus('error');
      return;
    }

    const roleLabel = ROLE_OPTIONS.find(r => r.value === notifyForm.role)?.label || notifyForm.role;
    const subject = encodeURIComponent(`[Programs & Events Alert] Calendar Notification Request - ${notifyForm.name}`);
    const body = encodeURIComponent(
      `Hello Campital Events Team,\n\nPlease add me to the notification list for the 2026 Programs & Events calendar.\n\n` +
      `Full Name: ${notifyForm.name}\n` +
      `Email Address: ${notifyForm.email}\n` +
      `Role: ${roleLabel}\n` +
      `Institution / Company: ${notifyForm.organization || 'Not provided'}\n\n` +
      `Sent via Campital Programs & Events Registration.`
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
      console.warn('Mailto error:', err);
    }

    setNotifyStatus('success');
  };

  const handleDirectEmail = (type) => {
    let subject = '';
    let body = '';
    if (type === 'host') {
      subject = encodeURIComponent('[Host Partnership] Campus Hackathon / Demo Day Proposal');
      body = encodeURIComponent(
        `Hello Campital Team,\n\nWe are interested in co-designing and hosting a Campital Hackathon / Demo Day at our campus incubator.\n\n` +
        `Institution / Incubator Name: \n` +
        `Location / City: \n` +
        `Target Cohort Size / Departments: \n` +
        `Contact Person: \n` +
        `Phone Number: \n\n` +
        `Looking forward to partnering.`
      );
    } else {
      subject = encodeURIComponent('[Sponsorship Inquiry] Corporate Challenge Track / Event Sponsorship');
      body = encodeURIComponent(
        `Hello Campital Team,\n\nWe are interested in exploring challenge sponsorship and brand partnerships for upcoming Campital events.\n\n` +
        `Company / Brand Name: \n` +
        `Industry / Focus Areas: \n` +
        `Contact Person: \n` +
        `Work Email: \n` +
        `Budget / Objectives: \n\n` +
        `Looking forward to discussing opportunities.`
      );
    }

    const mailtoUrl = `mailto:${CAMPITAL_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_top';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="programs-events-page" style={{ paddingTop: '84px', backgroundColor: '#FFFFFF' }}>
      {/* ================= 1. HERO SECTION: CAMPUS INNOVATION ARENA ================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: '#08152F',
          borderBottom: '1px solid rgba(18, 100, 255, 0.12)',
        }}
        className="programs-hero-section"
      >
        {/* Full-width Background Image Layer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${PROGRAMS_HERO_BASE64}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            opacity: 0.96,
            zIndex: 0,
          }}
        />

        {/* Soft Ambient Left Gradient Overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '58%',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 45%, rgba(255, 255, 255, 0.45) 75%, rgba(255, 255, 255, 0) 100%)',
            zIndex: 1,
          }}
          className="hero-left-overlay"
        />

        <Container>
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '560px',
              paddingTop: '3.5rem',
              paddingBottom: '3.5rem',
            }}
            className="programs-hero-content"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '1rem' }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.84rem',
                  fontWeight: '800',
                  color: '#1264FF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                <span style={{ width: '18px', height: '2px', backgroundColor: '#1264FF', borderRadius: '1px' }} />
                <span>Campus Innovation Arena</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                fontWeight: '900',
                letterSpacing: '-0.04em',
                lineHeight: 1.06,
                color: '#08152F',
                marginBottom: '1rem',
              }}
            >
              Programs & Events
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              style={{
                fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)',
                fontWeight: '700',
                color: '#1264FF',
                lineHeight: 1.4,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Where Campus Innovation Meets Real Capital
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              style={{
                fontSize: '1.02rem',
                color: '#475569',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              We design and run competitive programs that give student founders real-world pressure-testing, investor visibility, and a direct line to seed funding.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 }}
            >
              <Button
                variant="primary"
                href="#notify-form"
                icon={Bell}
                style={{
                  background: 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)',
                  height: '52px',
                  borderRadius: '100px',
                  padding: '0 2rem',
                  fontWeight: '700',
                  boxShadow: '0 8px 24px rgba(18, 100, 255, 0.28)',
                  border: 'none',
                }}
              >
                Notify Me for 2026 Open Calls
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ================= 2. THREE PROVEN EVENT FORMATS ================= */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '5.5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.84rem',
                fontWeight: '800',
                color: '#1264FF',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
              }}
            >
              <Layers size={15} />
              <span>Event Formats</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: '900',
                color: '#08152F',
                letterSpacing: '-0.03em',
                marginBottom: '0.85rem',
              }}
            >
              Three Proven Event Formats
            </h2>
            <p style={{ fontSize: '1.08rem', color: '#64748b', lineHeight: '1.6' }}>
              From rapid prototype hackathons to high-stakes investor pitch arenas.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
            }}
            className="formats-grid"
          >
            {EVENT_FORMATS.map((format, idx) => {
              const IconComponent = format.icon;
              return (
                <motion.div
                  key={format.id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(18, 100, 255, 0.14)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 30px rgba(8, 21, 47, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="format-card"
                >
                  {/* Card Visual Header Image */}
                  <div
                    style={{
                      height: '210px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#08152F',
                    }}
                  >
                    <img
                      src={format.image}
                      alt={format.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.5s ease',
                      }}
                      className="card-img-zoom"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        backgroundColor: 'rgba(8, 21, 47, 0.85)',
                        backdropFilter: 'blur(10px)',
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        fontSize: '0.74rem',
                        fontWeight: '800',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '100px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {format.badge}
                    </div>
                  </div>

                  <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, rgba(18, 100, 255, 0.12) 0%, rgba(32, 200, 244, 0.14) 100%)',
                          color: '#1264FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComponent size={22} strokeWidth={2.2} />
                      </div>
                      <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#08152F', margin: 0 }}>
                        {format.title}
                      </h3>
                    </div>

                    <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: '1.65', marginBottom: '1.75rem' }}>
                      {format.description}
                    </p>

                    <div style={{ marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#08152F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                        Program Highlights
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {format.features.map((feat, fIdx) => (
                          <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.88rem', color: '#334155', lineHeight: '1.45' }}>
                            <CheckCircle2 size={16} style={{ color: '#1264FF', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ================= 3. 2026 CALENDAR ROLLOUT & UPCOMING EVENTS ================= */}
      <section
        id="notify-form"
        style={{
          backgroundColor: '#F8FAFC',
          padding: '6rem 0',
          borderTop: '1px solid rgba(18, 100, 255, 0.08)',
          borderBottom: '1px solid rgba(18, 100, 255, 0.08)'
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}
            className="calendar-section-grid"
          >
            {/* Left: Visual Calendar & Workspace Preview Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(8, 21, 47, 0.08)',
                border: '1px solid rgba(18, 100, 255, 0.14)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <img
                src={PROGRAMS_CALENDAR_BASE64}
                alt="Campital 2026 Programs & Events Calendar Workspace"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </motion.div>

            {/* Right: Registration & Notification Form */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(18, 100, 255, 0.14)',
                borderRadius: '24px',
                padding: '3rem 2.5rem',
                boxShadow: '0 12px 36px rgba(18, 100, 255, 0.06)'
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.35rem 0.95rem',
                    borderRadius: '100px',
                    backgroundColor: 'rgba(18, 100, 255, 0.08)',
                    border: '1px solid rgba(18, 100, 255, 0.2)',
                    color: '#1264FF',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.85rem',
                  }}
                >
                  <Sparkles size={14} />
                  <span>2026 Calendar Rollout</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.2rem)', fontWeight: '900', color: '#08152F', marginBottom: '0.65rem', letterSpacing: '-0.03em' }}>
                  Upcoming Programs & Events
                </h2>
                <p style={{ fontSize: '0.98rem', color: '#64748b', lineHeight: '1.6' }}>
                  Our 2026 event calendar is being finalized in partnership with top university incubators. Be the first to know when registrations open.
                </p>
              </div>

              {notifyStatus === 'success' ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '2.5rem 1.5rem',
                    backgroundColor: '#ecfdf5',
                    border: '1.5px solid #a7f3d0',
                    borderRadius: '16px',
                    color: '#065f46'
                  }}
                >
                  <CheckCircle2 size={36} style={{ color: '#059669', margin: '0 auto 0.75rem' }} />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                    Notification Request Prepared!
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#047857', maxWidth: '500px', margin: '0 auto' }}>
                    Your email client has been prepared with your calendar alert details. Send the pre-filled message to confirm your priority access.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.15rem' }} className="form-double-col">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', color: '#08152F', marginBottom: '0.4rem' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arun Ramanathan"
                        value={notifyForm.name}
                        onChange={(e) => setNotifyForm({ ...notifyForm, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.94rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', color: '#08152F', marginBottom: '0.4rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@university.edu"
                        value={notifyForm.email}
                        onChange={(e) => setNotifyForm({ ...notifyForm, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.94rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.15rem' }} className="form-double-col">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', color: '#08152F', marginBottom: '0.4rem' }}>
                        Your Persona / Role
                      </label>
                      <CustomSelect
                        value={notifyForm.role}
                        onChange={(val) => setNotifyForm({ ...notifyForm, role: val })}
                        options={ROLE_OPTIONS}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '700', color: '#08152F', marginBottom: '0.4rem' }}>
                        Institution / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. IIT Madras, Startup, Fund"
                        value={notifyForm.organization}
                        onChange={(e) => setNotifyForm({ ...notifyForm, organization: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.94rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {notifyStatus === 'error' && (
                    <div style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: '600' }}>
                      Please provide your name and a valid email address.
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    icon={Send}
                    style={{
                      background: 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)',
                      height: '50px',
                      borderRadius: '100px',
                      fontWeight: '700',
                      justifyContent: 'center',
                      marginTop: '0.35rem',
                      border: 'none',
                    }}
                  >
                    Notify Me for Registrations
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= 4. HOST OR SPONSOR AN EVENT ================= */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '6rem 0' }}>
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr',
              gap: '3.5rem',
              alignItems: 'center',
            }}
            className="sponsor-section-grid"
          >
            {/* Left: Campus Partnership Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(8, 21, 47, 0.08)',
                border: '1px solid rgba(18, 100, 255, 0.14)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <img
                src={PROGRAMS_HOST_SPONSOR_BASE64}
                alt="Campital Campus and Industry Innovation Partnerships"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </motion.div>

            {/* Right: Host / Sponsor Action Cards */}
            <div>
              <div style={{ marginBottom: '2.5rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.84rem',
                    fontWeight: '800',
                    color: '#1264FF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.65rem',
                  }}
                >
                  <Users size={15} />
                  <span>Ecosystem Collaboration</span>
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                    fontWeight: '900',
                    color: '#08152F',
                    letterSpacing: '-0.03em',
                    marginBottom: '0.75rem',
                  }}
                >
                  Host or Sponsor an Event
                </h2>
                <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.6' }}>
                  Partner with Campital to bring high-conviction venture events directly to your campus or corporate ecosystem.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Option 1: Incubators & Universities */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(18, 100, 255, 0.18)',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 8px 24px rgba(18, 100, 255, 0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <GraduationCap size={22} color="#1264FF" />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#08152F', margin: 0 }}>
                      Bring Campital to Your Campus
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    Want to bring a Campital Demo Day or Hackathon to your campus? We co-design, evaluate, and bring our investor network to your cohort.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => handleDirectEmail('host')}
                    icon={ArrowRight}
                    style={{
                      background: 'linear-gradient(135deg, #1264FF 0%, #20BFEF 100%)',
                      borderRadius: '100px',
                      fontWeight: '700',
                      border: 'none',
                    }}
                  >
                    Talk to Us About Hosting
                  </Button>
                </div>

                {/* Option 2: Corporates & Brands */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(32, 200, 244, 0.25)',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 8px 24px rgba(8, 21, 47, 0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <Briefcase size={22} color="#1264FF" />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#08152F', margin: 0 }}>
                      Sponsor a Challenge Track
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    Sponsor a challenge track, mentor top campus talent, and get early access to high-potential student ventures before they hit the market.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => handleDirectEmail('sponsor')}
                    icon={ArrowRight}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid rgba(18, 100, 255, 0.25)',
                      color: '#08152F',
                      borderRadius: '100px',
                      fontWeight: '700',
                    }}
                  >
                    Explore Sponsorship
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <style>{`
        .format-card:hover {
          transform: translateY(-6px);
          border-color: rgba(18, 100, 255, 0.35) !important;
          box-shadow: 0 20px 48px rgba(18, 100, 255, 0.12) !important;
        }
        .format-card:hover .card-img-zoom {
          transform: scale(1.05);
        }
        @media (max-width: 1024px) {
          .formats-grid {
            grid-template-columns: 1fr !important;
            max-width: 580px;
            margin: 0 auto;
          }
          .calendar-section-grid {
            grid-template-columns: 1fr !important;
          }
          .sponsor-section-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-left-overlay {
            width: 100% !important;
            background: rgba(255, 255, 255, 0.92) !important;
          }
          .programs-hero-content {
            max-width: 100% !important;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        @media (max-width: 600px) {
          .form-double-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
