import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Mail, 
  Building2, 
  GraduationCap, 
  Calendar, 
  Clock, 
  FileText, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Tag,
  MessageSquare,
  ShieldCheck,
  Loader2,
  Trash2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { api } from '../../services/api';

const STATUS_LIST = [
  { value: 'NEW', label: 'New Intake', color: '#38BDF8' },
  { value: 'UNDER_REVIEW', label: 'Under Review', color: '#818CF8' },
  { value: 'MORE_INFO_REQUESTED', label: 'More Info Requested', color: '#FBBF24' },
  { value: 'SHORTLISTED', label: 'Shortlisted for Demo', color: '#34D399' },
  { value: 'EVALUATION_SCHEDULED', label: 'Evaluation Scheduled', color: '#60A5FA' },
  { value: 'CLOSED_FUNDED', label: 'Closed / Funded', color: '#10B981' },
  { value: 'ARCHIVED_REJECTED', label: 'Archived / Passed', color: '#64748B' },
];

export const AdminLeadDrawer = ({ leadId, onClose, onLeadUpdated }) => {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Status State
  const [newStatus, setNewStatus] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Direct Reply Email State
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replySuccess, setReplySuccess] = useState('');
  const [replyError, setReplyError] = useState('');

  // Internal Note State
  const [noteContent, setNoteContent] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!leadId) return;
    loadLeadDetails();
  }, [leadId]);

  const loadLeadDetails = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminLeadById(leadId);
      setLead(data.lead);
      setNewStatus(data.lead.status);
      setReplySubject(`[Campital] In response to your application: ${data.lead.organizationName} (#CAMP-${data.lead.leadNumber})`);
    } catch (err) {
      setError(err.message || 'Failed to load lead details.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    if (!newStatus) return;

    setUpdatingStatus(true);
    setStatusMessage('');

    try {
      await api.updateLeadStatus(leadId, {
        status: newStatus,
        note: `Status updated to ${newStatus}`,
        sendNotificationEmail: false // Automated state change email deferred to next phase
      });
      setStatusMessage('Status updated successfully.');
      loadLeadDetails();
      if (onLeadUpdated) onLeadUpdated();
    } catch (err) {
      alert(err.message || 'Status update failed.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      setReplyError('Please write your reply message before sending.');
      return;
    }

    setSendingReply(true);
    setReplySuccess('');
    setReplyError('');

    try {
      const res = await api.sendLeadReply(leadId, {
        subject: replySubject,
        message: replyMessage.trim()
      });
      setReplySuccess(res.message || `Reply dispatched to ${lead.email}.`);
      setReplyMessage('');
      loadLeadDetails();
      if (onLeadUpdated) onLeadUpdated();
    } catch (err) {
      setReplyError(err.message || 'Failed to dispatch reply email.');
    } finally {
      setSendingReply(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    setAddingNote(true);
    try {
      await api.addLeadNote(leadId, noteContent.trim());
      setNoteContent('');
      loadLeadDetails();
    } catch (err) {
      alert(err.message || 'Failed to add note.');
    } finally {
      setAddingNote(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!window.confirm(`Permanently delete dossier #CAMP-${lead?.leadNumber || 'NEW'} (${lead?.organizationName})? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.deleteLead(leadId);
      if (onLeadUpdated) onLeadUpdated();
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to delete dossier.');
      setIsDeleting(false);
    }
  };

  if (!leadId) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          height: '100%',
          backgroundColor: '#0B132B',
          borderLeft: '1px solid #1E293B',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid #1E293B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: '#0B132B',
            zIndex: 10
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  color: '#0052FF',
                  backgroundColor: 'rgba(0, 82, 255, 0.12)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}
              >
                #CAMP-{lead?.leadNumber || 'NEW'}
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                {lead?.organizationName || 'Lead Dossier'}
              </h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.25rem' }}>
              Track: <strong style={{ color: '#94A3B8' }}>{lead?.personaType}</strong> • Submitted{' '}
              {lead?.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={handleDeleteLead}
              disabled={isDeleting}
              title="Delete this dossier"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '8px',
                padding: '0.5rem 0.85rem',
                color: '#F87171',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.22)';
                  e.currentTarget.style.borderColor = '#EF4444';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
              }}
            >
              <Trash2 size={14} />
              <span>{isDeleting ? 'Deleting...' : 'Delete Dossier'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: '#1E293B',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                color: '#94A3B8',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748B' }}>
              <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#0052FF' }} />
              <div>Loading venture dossier...</div>
            </div>
          ) : error ? (
            <div style={{ color: '#EF4444', textAlign: 'center', padding: '2rem' }}>{error}</div>
          ) : (
            <>
              {/* Contact Information Card */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.25rem',
                  backgroundColor: '#162032',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  border: '1px solid #1E293B'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '800' }}>
                    Founder / Contact
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#FFFFFF', marginTop: '0.25rem' }}>
                    {lead.fullName}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#38BDF8', marginTop: '0.2rem' }}>
                    <a href={`mailto:${lead.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {lead.email}
                    </a>
                  </div>
                  {lead.phone && (
                    <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                      {lead.phone}
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '800' }}>
                    Campus & Organization
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#FFFFFF', marginTop: '0.25rem' }}>
                    {lead.organizationName}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                    {lead.campusAffiliation || 'No Campus Specified'}
                  </div>
                  <div style={{ marginTop: '0.4rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: STATUS_LIST.find((s) => s.value === lead.status)?.color || '#38BDF8',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {STATUS_LIST.find((s) => s.value === lead.status)?.label || lead.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pitch Deck Banner (if uploaded) */}
              {lead.pitchDeckUrl && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    backgroundColor: 'rgba(0, 82, 255, 0.08)',
                    border: '1px solid rgba(0, 82, 255, 0.25)',
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileText size={20} style={{ color: '#0052FF' }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#FFFFFF' }}>
                        Pitch Deck Attached
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>PDF / Presentation Document</div>
                    </div>
                  </div>
                  <a
                    href={lead.pitchDeckUrl.startsWith('http') ? lead.pitchDeckUrl : `http://localhost:5001${lead.pitchDeckUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: '#FFFFFF',
                      backgroundColor: '#0052FF',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '6px',
                      textDecoration: 'none'
                    }}
                  >
                    <span>View Deck</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              {/* Startup Deep Dive Screening Responses */}
              {lead.personaType === 'STARTUP' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#FFFFFF' }}>
                    Evaluation Questionnaire
                  </div>

                  {lead.pitchHeadline && (
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>1. Pitch Headline</span>
                      <p style={{ margin: '0.35rem 0 0 0', color: '#FFFFFF', fontSize: '0.92rem', fontWeight: '600' }}>
                        {lead.pitchHeadline}
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{ backgroundColor: '#162032', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>Venture Stage</span>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#38BDF8', marginTop: '0.2rem' }}>
                        {lead.ventureStage || 'Not specified'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#162032', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>Product Readiness</span>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#34D399', marginTop: '0.2rem' }}>
                        {lead.productStatus || 'Not specified'}
                      </div>
                    </div>
                  </div>

                  {lead.problemCustomer && (
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>2. Problem & Target Customer</span>
                      <p style={{ margin: '0.35rem 0 0 0', color: '#CBD5E1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                        {lead.problemCustomer}
                      </p>
                    </div>
                  )}

                  {lead.tractionMetrics && (
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>3. Traction, Pilots & Metrics</span>
                      <p style={{ margin: '0.35rem 0 0 0', color: '#CBD5E1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                        {lead.tractionMetrics}
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{ backgroundColor: '#162032', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>Target Raise</span>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#FBBF24', marginTop: '0.2rem' }}>
                        {lead.targetCheque || 'Not specified'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#162032', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>Prior Funding</span>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#A78BFA', marginTop: '0.2rem' }}>
                        {lead.priorFunding || 'Bootstrapped'}
                      </div>
                    </div>
                  </div>

                  {lead.whyNow && (
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>4. Why Now? Defensibility</span>
                      <p style={{ margin: '0.35rem 0 0 0', color: '#CBD5E1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                        {lead.whyNow}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* General / Partner Message */}
              {lead.generalMessage && (
                <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>Inquiry Message</span>
                  <p style={{ margin: '0.35rem 0 0 0', color: '#CBD5E1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {lead.generalMessage}
                  </p>
                </div>
              )}

              {/* Status Update (Minimal) */}
              <div
                style={{
                  backgroundColor: '#162032',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid #1E293B'
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  Update Lead Status
                </div>

                <form onSubmit={handleStatusChange} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.85rem',
                      backgroundColor: '#1E293B',
                      border: '1.5px solid #334155',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem'
                    }}
                  >
                    {STATUS_LIST.map((st) => (
                      <option key={st.value} value={st.value}>
                        {st.label}
                      </option>
                    ))}
                  </select>

                  <Button type="submit" variant="secondary" disabled={updatingStatus} style={{ padding: '0.65rem 1.25rem' }}>
                    {updatingStatus ? 'Saving...' : 'Save'}
                  </Button>
                </form>

                {statusMessage && (
                  <div style={{ color: '#34D399', fontSize: '0.8rem', fontWeight: '600', marginTop: '0.5rem' }}>
                    ✓ {statusMessage}
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* SEND DIRECT EMAIL REPLY (CLIENT FEATURE) */}
              {/* ======================================================== */}
              <div
                style={{
                  backgroundColor: '#162032',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #2563EB',
                  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Mail size={18} style={{ color: '#38BDF8' }} />
                  <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#FFFFFF' }}>
                    Send Direct Reply to Founder
                  </div>
                </div>
                <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: '0 0 1rem 0' }}>
                  Sends an official email to <strong>{lead.email}</strong> via verified domain <strong>team@campital.in</strong>.
                </p>

                <form onSubmit={handleSendReply} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', marginBottom: '0.25rem' }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        backgroundColor: '#1E293B',
                        border: '1.5px solid #334155',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', marginBottom: '0.25rem' }}>
                      Message Content
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Hi, thanks for reaching out. We reviewed your submission for..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1E293B',
                        border: '1.5px solid #334155',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        lineHeight: '1.6'
                      }}
                    />
                  </div>

                  {replySuccess && (
                    <div style={{ color: '#34D399', fontSize: '0.82rem', fontWeight: '600' }}>
                      ✓ {replySuccess}
                    </div>
                  )}
                  {replyError && (
                    <div style={{ color: '#F87171', fontSize: '0.82rem', fontWeight: '600' }}>
                      ⚠ {replyError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={sendingReply}
                    style={{ justifyContent: 'center', padding: '0.75rem' }}
                  >
                    {sendingReply ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending via Resend...</span>
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Send size={15} />
                        <span>Dispatch Reply Email</span>
                      </span>
                    )}
                  </Button>
                </form>
              </div>

              {/* Internal Notes History */}
              <div
                style={{
                  backgroundColor: '#162032',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid #1E293B'
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  Internal Notes & Communication Logs
                </div>

                {lead.notes && lead.notes.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                    {lead.notes.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          backgroundColor: '#1E293B',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid #334155'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                          <span style={{ fontWeight: '700', color: '#38BDF8' }}>{n.author?.name || 'Desk Team'}</span>
                          <span>{new Date(n.createdAt).toLocaleString()}</span>
                        </div>
                        <p style={{ margin: '0.35rem 0 0 0', color: '#E2E8F0', fontSize: '0.84rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                          {n.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '0.85rem' }}>
                    No internal notes yet.
                  </div>
                )}

                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Add an internal reviewer note..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.85rem',
                      backgroundColor: '#1E293B',
                      border: '1.5px solid #334155',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.85rem'
                    }}
                  />
                  <Button type="submit" variant="secondary" disabled={addingNote} style={{ padding: '0.65rem 1rem' }}>
                    Add
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
