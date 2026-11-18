import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Building2, 
  Loader2,
  RefreshCw,
  Database,
  CheckCircle2,
  AlertCircle,
  Inbox,
  Trash2,
  X
} from 'lucide-react';
import { api } from '../../services/api';
import { AdminLeadDrawer } from './AdminLeadDrawer';

export const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [personaFilter, setPersonaFilter] = useState('ALL');
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, personaFilter, search]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await api.deleteLead(deleteTarget.id);
      setFeedbackMessage({
        type: 'success',
        text: `✓ Dossier #CAMP-${deleteTarget.leadNumber || 'NEW'} (${deleteTarget.organizationName}) has been deleted.`
      });
      setDeleteTarget(null);
      fetchLeads(true);
    } catch (err) {
      setFeedbackMessage({
        type: 'error',
        text: err.message || 'Failed to delete lead dossier.'
      });
    } finally {
      setIsDeleting(false);
      setTimeout(() => setFeedbackMessage(null), 5000);
    }
  };

  const fetchLeads = async (manual = false) => {
    if (manual) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setFetchError(null);

    try {
      const res = await api.getAdminLeads({
        status: statusFilter,
        personaType: personaFilter,
        search: search
      });
      setLeads(res.leads || []);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Failed to fetch leads:', err);
      setFetchError(err.message || 'Unable to connect to database server.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'NEW': return '#38BDF8';
      case 'UNDER_REVIEW': return '#818CF8';
      case 'SHORTLISTED': return '#34D399';
      case 'EVALUATION_SCHEDULED': return '#60A5FA';
      case 'CLOSED_FUNDED': return '#10B981';
      case 'ARCHIVED_REJECTED': return '#64748B';
      default: return '#FBBF24';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Title & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.03em', margin: 0 }}>
            All Venture & Partner Inquiries
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '0.35rem' }}>
            Comprehensive database of applicants, campus originations, and partnership dossiers.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Manual Refresh Button */}
          <button
            onClick={() => fetchLeads(true)}
            disabled={loading || isRefreshing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              color: '#94A3B8',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: loading || isRefreshing ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading && !isRefreshing) {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#475569';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.borderColor = '#334155';
            }}
          >
            <RefreshCw size={14} className={loading || isRefreshing ? 'animate-spin' : ''} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          {/* Export CSV */}
          <a
            href={api.getExportCsvUrl()}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              backgroundColor: '#0052FF',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)'
            }}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Real-time Status / Feedback Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '0.75rem 1.25rem',
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          borderRadius: '10px',
          fontSize: '0.82rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {loading || isRefreshing ? (
            <>
              <Loader2 size={15} className="animate-spin" color="#38BDF8" />
              <span style={{ color: '#38BDF8', fontWeight: '600' }}>
                Connecting to Neon DB & synchronizing dossiers...
              </span>
            </>
          ) : fetchError ? (
            <>
              <AlertCircle size={15} color="#EF4444" />
              <span style={{ color: '#EF4444', fontWeight: '600' }}>
                {fetchError}
              </span>
            </>
          ) : (
            <>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }} />
              <span style={{ color: '#E2E8F0', fontWeight: '600' }}>
                Neon PostgreSQL Synced
              </span>
              <span style={{ color: '#64748B' }}>•</span>
              <span style={{ color: '#94A3B8' }}>
                <strong style={{ color: '#FFFFFF' }}>{leads.length}</strong> active inquiry dossiers
              </span>
            </>
          )}
        </div>

        {lastUpdated && !loading && !fetchError && (
          <div style={{ color: '#64748B', fontSize: '0.78rem' }}>
            Last updated at {lastUpdated}
          </div>
        )}
      </div>

      {/* Action Feedback Banner */}
      {feedbackMessage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            backgroundColor: feedbackMessage.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            border: `1px solid ${feedbackMessage.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: feedbackMessage.type === 'success' ? '#34D399' : '#F87171',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {feedbackMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{feedbackMessage.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMessage(null)}
            style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0 4px' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          padding: '1rem'
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}
          />
          <input
            type="text"
            placeholder="Search by founder, venture, campus, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.5rem',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Persona Track Filter */}
        <select
          value={personaFilter}
          onChange={(e) => setPersonaFilter(e.target.value)}
          style={{
            padding: '0.65rem 1rem',
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="ALL">All Tracks</option>
          <option value="STARTUP">Startups</option>
          <option value="INCUBATOR">Incubators</option>
          <option value="SME">SMEs</option>
          <option value="FACULTY">Faculty & Lab IP</option>
          <option value="CAPITAL">Capital Partners</option>
          <option value="CORPORATE">Corporate Partners</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.65rem 1rem',
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="ALL">All Statuses</option>
          <option value="NEW">New Intake</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="MORE_INFO_REQUESTED">More Info Requested</option>
          <option value="SHORTLISTED">Shortlisted for Memo</option>
          <option value="EVALUATION_SCHEDULED">Evaluation Scheduled</option>
          <option value="DUE_DILIGENCE">Due Diligence</option>
          <option value="CLOSED_FUNDED">Closed / Funded</option>
          <option value="ARCHIVED_REJECTED">Archived</option>
        </select>
      </div>

      {/* Leads Table Container */}
      <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', overflow: 'hidden' }}>
        {loading ? (
          /* Animated Skeleton Table with Shimmer */
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', color: '#94A3B8' }}>
              <Loader2 size={24} className="animate-spin" color="#0052FF" />
              <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>Fetching active lead dossiers from database...</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1rem',
                    backgroundColor: '#162032',
                    borderRadius: '8px',
                    opacity: 1 - idx * 0.12,
                    animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                >
                  <div style={{ width: '80px', height: '18px', backgroundColor: '#1E293B', borderRadius: '4px' }} />
                  <div style={{ flex: '2', height: '18px', backgroundColor: '#1E293B', borderRadius: '4px' }} />
                  <div style={{ flex: '2', height: '18px', backgroundColor: '#1E293B', borderRadius: '4px' }} />
                  <div style={{ width: '90px', height: '18px', backgroundColor: '#1E293B', borderRadius: '4px' }} />
                  <div style={{ width: '100px', height: '18px', backgroundColor: '#1E293B', borderRadius: '4px' }} />
                </div>
              ))}
            </div>
          </div>
        ) : fetchError ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#EF4444' }}>
            <AlertCircle size={40} style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Database Connection Failed
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', maxWidth: '450px', margin: '0 auto 1.5rem' }}>
              {fetchError}
            </p>
            <button
              onClick={() => fetchLeads(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} />
              <span>Retry Connection</span>
            </button>
          </div>
        ) : leads.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E293B', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase', backgroundColor: '#0B1120' }}>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Ref ID</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Venture Name</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Founder / Email</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Track</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Stage / Cheque</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Status</th>
                  <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    style={{
                      borderBottom: '1px solid #162032',
                      cursor: 'pointer',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#162032'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '1rem 1.25rem', fontWeight: '800', color: '#38BDF8' }}>
                      #CAMP-{lead.leadNumber || 'NEW'}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: '700', color: '#FFFFFF' }}>
                      {lead.organizationName}
                      {lead.campusAffiliation && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#64748B', marginTop: '0.15rem' }}>
                          <GraduationCap size={12} color="#0052FF" />
                          <span>{lead.campusAffiliation}</span>
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#CBD5E1' }}>
                      {lead.fullName}
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                        {lead.email}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span
                        style={{
                          backgroundColor: '#1E293B',
                          color: '#E2E8F0',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '700'
                        }}
                      >
                        {lead.personaType}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#FBBF24', fontSize: '0.82rem', fontWeight: '700' }}>
                      {lead.targetCheque || lead.ventureStage || '—'}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span
                        style={{
                          color: getStatusColor(lead.status),
                          fontSize: '0.82rem',
                          fontWeight: '800'
                        }}
                      >
                        ● {lead.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLeadId(lead.id);
                          }}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: '6px',
                            backgroundColor: '#1E293B',
                            border: '1px solid #334155',
                            color: '#38BDF8',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0052FF'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#334155'}
                        >
                          Open Dossier
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(lead);
                          }}
                          title="Delete Lead Dossier"
                          style={{
                            padding: '0.4rem 0.55rem',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            color: '#F87171',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.25)';
                            e.currentTarget.style.borderColor = '#EF4444';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4.5rem 2rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: '#1E293B',
                color: '#64748B',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            >
              <Inbox size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFFFFF', margin: '0 0 0.5rem 0' }}>
              No Inquiries Found
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: '1.5' }}>
              {search || statusFilter !== 'ALL' || personaFilter !== 'ALL'
                ? 'No dossiers match your current search query or filter selection. Try clearing filters to view all entries.'
                : 'No startup or partnership applications have been received yet. Incoming screening submissions will appear here automatically.'}
            </p>
            {(search || statusFilter !== 'ALL' || personaFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('ALL');
                  setPersonaFilter('ALL');
                }}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: '#38BDF8',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Slide-out Lead Drawer */}
      <AdminLeadDrawer
        leadId={selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
        onLeadUpdated={fetchLeads}
      />

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem'
          }}
          onClick={() => !isDeleting && setDeleteTarget(null)}
        >
          <div
            style={{
              backgroundColor: '#0F172A',
              border: '1px solid #1E293B',
              borderRadius: '16px',
              maxWidth: '460px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trash2 size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  Permanently Delete Dossier?
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                  Action cannot be undone
                </div>
              </div>
            </div>

            <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
              Are you sure you want to delete <strong style={{ color: '#FFFFFF' }}>{deleteTarget.organizationName}</strong> (<span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>#CAMP-{deleteTarget.leadNumber || 'NEW'}</span>)? All associated screening notes and audit logs will be permanently removed.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                style={{
                  padding: '0.65rem 1.15rem',
                  borderRadius: '8px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: '#E2E8F0',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: isDeleting ? 'not-allowed' : 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  backgroundColor: '#DC2626',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.35)'
                }}
              >
                {isDeleting && <Loader2 size={15} className="animate-spin" />}
                <span>{isDeleting ? 'Deleting...' : 'Yes, Delete Dossier'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
