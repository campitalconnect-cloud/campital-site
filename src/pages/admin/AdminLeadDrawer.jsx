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
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { api } from '../../services/api';

const STATUS_LIST = [
  { value: 'NEW', label: 'New Intake', color: '#38BDF8' },
  { value: 'UNDER_REVIEW', label: 'Under Review', color: '#818CF8' },
  { value: 'MORE_INFO_REQUESTED', label: 'More Info Requested', color: '#FBBF24' },
  { value: 'SHORTLISTED', label: 'Shortlisted for Memo', color: '#34D399' },
  { value: 'EVALUATION_SCHEDULED', label: 'Evaluation / Demo Day', color: '#60A5FA' },
  { value: 'DUE_DILIGENCE', label: 'Due Diligence', color: '#A78BFA' },
  { value: 'TERM_SHEET_ISSUED', label: 'Term Sheet Issued', color: '#F472B6' },
  { value: 'CLOSED_FUNDED', label: 'Closed / Funded', color: '#10B981' },
  { value: 'ARCHIVED_REJECTED', label: 'Archived / Not a fit', color: '#64748B' },
];

export const AdminLeadDrawer = ({ leadId, onClose, onLeadUpdated }) => {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Status Update State
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [emailNote, setEmailNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');

  // Internal Note State
  const [noteContent, setNoteContent] = useState('');
  const [addingNote, setAddingNote] = useState(false);

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
    setStatusUpdateMessage('');

    try {
      await api.updateLeadStatus(leadId, {
        status: newStatus,
        note: statusNote,
        sendNotificationEmail: sendEmail,
        emailNote: emailNote
      });
      setStatusUpdateMessage('Status updated successfully.');
      loadLeadDetails();
      if (onLeadUpdated) onLeadUpdated();
    } catch (err) {
      alert(err.message || 'Status update failed.');
    } finally {
      setUpdatingStatus(false);
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

  if (!leadId) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          height: '100vh',
          backgroundColor: '#0F172A',
          borderLeft: '1px solid #1E293B',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
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
            backgroundColor: '#0F172A',
            zIndex: 10
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFFFFF' }}>
                {lead?.organizationName || 'Venture Dossier'}
              </span>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  backgroundColor: '#1E293B',
                  color: '#38BDF8'
                }}
              >
                #CAMP-{lead?.leadNumber || 'NEW'}
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.2rem' }}>
              Track: <strong style={{ color: '#94A3B8' }}>{lead?.personaType}</strong> • Submitted{' '}
              {lead?.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}
            </div>
          </div>

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
              {/* Top Contact Information Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  backgroundColor: '#1E293B',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  border: '1px solid #334155'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>
                    Founder / Lead Contact
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFFFFF', marginTop: '0.2rem' }}>
                    {lead.fullName}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#38BDF8', marginTop: '0.15rem' }}>
                    <a href={`mailto:${lead.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {lead.email}
                    </a>
                  </div>
                  {lead.phone && (
                    <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.15rem' }}>
                      {lead.phone}
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>
                    Campus & Organization
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFFFFF', marginTop: '0.2rem' }}>
                    {lead.organizationName}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#94A3B8', marginTop: '0.15rem' }}>
                    {lead.campusAffiliation || 'No Campus Specified'}
                  </div>
                </div>
              </div>

              {/* Pitch Deck Banner (if available) */}
              {lead.pitchDeckUrl && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    backgroundColor: 'rgba(0, 82, 255, 0.1)',
                    border: '1px solid rgba(0, 82, 255, 0.3)',
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <FileText size={20} color="#38BDF8" />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFFFFF' }}>
                        Pitch Deck Uploaded
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                        PDF / Presentation document attached to application
                      </div>
                    </div>
                  </div>
                  <a
                    href={lead.pitchDeckUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      backgroundColor: '#0052FF',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}
                  >
                    <span>View / Download Deck</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* 10-Question Screening Dossier (For Startup Persona) */}
              {lead.personaType === 'STARTUP' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                    Screening & Evaluation Responses
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>Venture Stage</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#38BDF8', marginTop: '0.2rem' }}>
                        {lead.ventureStage || 'Not specified'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>Product Status</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#34D399', marginTop: '0.2rem' }}>
                        {lead.productStatus || 'Not specified'}
                      </div>
                    </div>
                  </div>

                  {lead.pitchHeadline && (
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>1. One-Sentence Pitch</span>
                      <p style={{ margin: '0.4rem 0 0 0', color: '#E2E8F0', fontSize: '0.92rem', fontStyle: 'italic', lineHeight: '1.5' }}>
                        "{lead.pitchHeadline}"
                      </p>
                    </div>
                  )}

                  {lead.problemCustomer && (
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>2. Problem & Target Customer</span>
                      <p style={{ margin: '0.4rem 0 0 0', color: '#CBD5E1', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {lead.problemCustomer}
                      </p>
                    </div>
                  )}

                  {lead.tractionMetrics && (
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>3. Traction, Pilots & Metrics</span>
                      <p style={{ margin: '0.4rem 0 0 0', color: '#CBD5E1', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {lead.tractionMetrics}
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>Target Raise</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#FBBF24', marginTop: '0.2rem' }}>
                        {lead.targetCheque || 'Not specified'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>Prior Funding</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#A78BFA', marginTop: '0.2rem' }}>
                        {lead.priorFunding || 'Bootstrapped'}
                      </div>
                    </div>
                  </div>

                  {lead.whyNow && (
                    <div style={{ backgroundColor: '#162032', padding: '1rem', borderRadius: '10px', border: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>Why Now?</span>
                      <p style={{ margin: '0.4rem 0 0 0', color: '#CBD5E1', fontSize: '0.9rem', lineHeight: '1.6' }}>
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
                  <p style={{ margin: '0.4rem 0 0 0', color: '#CBD5E1', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {lead.generalMessage}
                  </p>
                </div>
              )}

              {/* Pipeline Stage Management Form */}
              <div
                style={{
                  backgroundColor: '#162032',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #1E293B'
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1rem' }}>
                  Pipeline Stage Transition
                </div>

                <form onSubmit={handleStatusChange} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', fontWeight: '700', marginBottom: '0.3rem' }}>
                      Target Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1E293B',
                        border: '1.5px solid #334155',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    >
                      {STATUS_LIST.map((st) => (
                        <option key={st.value} value={st.value}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#94A3B8', fontWeight: '700', marginBottom: '0.3rem' }}>
                      Internal Transition Reason (Audit Log)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cleared committee screening, invited to Demo Day cohort..."
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1E293B',
                        border: '1.5px solid #334155',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <input
                      type="checkbox"
                      id="notifyEmail"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#0052FF' }}
                    />
                    <label htmlFor="notifyEmail" style={{ fontSize: '0.82rem', color: '#CBD5E1', cursor: 'pointer' }}>
                      Dispatch automated notification email to founder ({lead.email})
                    </label>
                  </div>

                  {sendEmail && (
                    <textarea
                      placeholder="Optional personalized message included in the status notification email..."
                      rows={2}
                      value={emailNote}
                      onChange={(e) => setEmailNote(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1E293B',
                        border: '1.5px solid #334155',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.85rem'
                      }}
                    />
                  )}

                  {statusUpdateMessage && (
                    <div style={{ color: '#34D399', fontSize: '0.82rem', fontWeight: '600' }}>
                      ✓ {statusUpdateMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={updatingStatus}
                    style={{ justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem' }}
                  >
                    {updatingStatus ? 'Updating Pipeline...' : 'Update Lead Stage'}
                  </Button>
                </form>
              </div>

              {/* Internal Notes Section */}
              <div
                style={{
                  backgroundColor: '#162032',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #1E293B'
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  Deal Reviewer Notes
                </div>

                {lead.notes && lead.notes.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    {lead.notes.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          backgroundColor: '#1E293B',
                          padding: '0.85rem',
                          borderRadius: '8px',
                          border: '1px solid #334155'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8' }}>
                          <span style={{ fontWeight: '700', color: '#38BDF8' }}>{n.author?.name || 'Deal Partner'}</span>
                          <span>{new Date(n.createdAt).toLocaleString()}</span>
                        </div>
                        <p style={{ margin: '0.4rem 0 0 0', color: '#E2E8F0', fontSize: '0.88rem', lineHeight: '1.5' }}>
                          {n.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1rem' }}>
                    No internal reviewer notes yet.
                  </div>
                )}

                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Add an internal evaluation note..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: '#1E293B',
                      border: '1.5px solid #334155',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem'
                    }}
                  />
                  <Button type="submit" variant="secondary" disabled={addingNote} style={{ padding: '0.75rem 1.25rem' }}>
                    Add
                  </Button>
                </form>
              </div>

              {/* Audit History & Dispatched Emails */}
              <div
                style={{
                  backgroundColor: '#162032',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid #1E293B'
                }}
              >
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#94A3B8', marginBottom: '0.5rem' }}>
                  Activity Audit Trail
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {lead.statusHistory && lead.statusHistory.map((h) => (
                    <div key={h.id} style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      • {new Date(h.createdAt).toLocaleString()} — Moved from <strong style={{ color: '#94A3B8' }}>{h.fromStatus}</strong> to <strong style={{ color: '#38BDF8' }}>{h.toStatus}</strong>
                      {h.note && ` (${h.note})`}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

