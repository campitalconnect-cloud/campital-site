import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  FileText, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { api } from '../../services/api';
import { AdminLeadDrawer } from './AdminLeadDrawer';

const COLUMNS = [
  { id: 'NEW', title: 'New Intake', color: '#38BDF8' },
  { id: 'UNDER_REVIEW', title: 'Under Review', color: '#818CF8' },
  { id: 'MORE_INFO_REQUESTED', title: 'Info Requested', color: '#FBBF24' },
  { id: 'SHORTLISTED', title: 'Shortlisted Memo', color: '#34D399' },
  { id: 'EVALUATION_SCHEDULED', title: 'Pitch / Demo Day', color: '#60A5FA' },
  { id: 'DUE_DILIGENCE', title: 'Due Diligence', color: '#A78BFA' },
  { id: 'CLOSED_FUNDED', title: 'Funded / Closed', color: '#10B981' },
];

export const AdminPipeline = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    loadPipeline();
  }, []);

  const loadPipeline = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminLeads();
      setLeads(res.leads);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdvance = async (e, leadId, currentStatus) => {
    e.stopPropagation();
    const statusOrder = ['NEW', 'UNDER_REVIEW', 'SHORTLISTED', 'EVALUATION_SCHEDULED', 'DUE_DILIGENCE', 'CLOSED_FUNDED'];
    const currentIdx = statusOrder.indexOf(currentStatus);
    if (currentIdx !== -1 && currentIdx < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIdx + 1];
      try {
        await api.updateLeadStatus(leadId, {
          status: nextStatus,
          note: `Quick pipeline advance from ${currentStatus} to ${nextStatus}`
        });
        loadPipeline();
      } catch (err) {
        alert('Advance failed: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0', color: '#64748B' }}>
        <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#0052FF' }} />
        <div>Loading Deal Pipeline Kanban...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 'calc(100vh - 120px)' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.03em', margin: 0 }}>
          Deal Pipeline Kanban
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '0.35rem' }}>
          Move ventures through structured evaluation stages from initial sourcing to accredited capital close.
        </p>
      </div>

      {/* Horizontal Kanban Scroll Container */}
      <div
        style={{
          display: 'flex',
          gap: '1.25rem',
          overflowX: 'auto',
          paddingBottom: '2rem',
          flex: 1
        }}
      >
        {COLUMNS.map((col) => {
          const columnLeads = leads.filter((l) => l.status === col.id);
          return (
            <div
              key={col.id}
              style={{
                width: '320px',
                minWidth: '320px',
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 200px)'
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  padding: '1.25rem',
                  borderBottom: '1px solid #1E293B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: col.color }} />
                  <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#FFFFFF' }}>{col.title}</span>
                </div>
                <span
                  style={{
                    backgroundColor: '#1E293B',
                    color: '#94A3B8',
                    padding: '2px 8px',
                    borderRadius: '100px',
                    fontSize: '0.78rem',
                    fontWeight: '800'
                  }}
                >
                  {columnLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div
                style={{
                  padding: '1rem',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  flex: 1
                }}
              >
                {columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    style={{
                      backgroundColor: '#162032',
                      border: '1px solid #1E293B',
                      borderRadius: '12px',
                      padding: '1.15rem',
                      cursor: 'pointer',
                      transition: 'transform 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#38BDF8';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#1E293B';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38BDF8' }}>
                        #CAMP-{lead.leadNumber || 'NEW'}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          backgroundColor: '#1E293B',
                          color: '#94A3B8',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {lead.personaType}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.2rem' }}>
                      {lead.organizationName}
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.5rem' }}>
                      {lead.fullName}
                    </div>

                    {lead.pitchHeadline && (
                      <p style={{ fontSize: '0.78rem', color: '#94A3B8', fontStyle: 'italic', margin: '0 0 0.65rem 0', lineHeight: '1.4' }}>
                        "{lead.pitchHeadline.slice(0, 90)}..."
                      </p>
                    )}

                    {lead.campusAffiliation && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.5rem' }}>
                        <GraduationCap size={13} color="#0052FF" />
                        <span>{lead.campusAffiliation}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px solid #1E293B' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#FBBF24' }}>
                        {lead.targetCheque || lead.ventureStage || 'Seed Stage'}
                      </span>

                      {col.id !== 'CLOSED_FUNDED' && (
                        <button
                          onClick={(e) => handleQuickAdvance(e, lead.id, lead.status)}
                          title="Advance to Next Stage"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            backgroundColor: '#1E293B',
                            border: '1px solid #334155',
                            color: '#38BDF8',
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          <span>Advance</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {columnLeads.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#475569', fontSize: '0.82rem' }}>
                    No deals in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out Lead Drawer */}
      <AdminLeadDrawer
        leadId={selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
        onLeadUpdated={loadPipeline}
      />
    </div>
  );
};

