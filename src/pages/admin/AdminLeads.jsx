import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Building2, 
  Loader2 
} from 'lucide-react';
import { api } from '../../services/api';
import { AdminLeadDrawer } from './AdminLeadDrawer';

export const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [personaFilter, setPersonaFilter] = useState('ALL');
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, personaFilter, search]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminLeads({
        status: statusFilter,
        personaType: personaFilter,
        search: search
      });
      setLeads(res.leads);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
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
            textDecoration: 'none'
          }}
        >
          <Download size={15} />
          <span>Export CSV</span>
        </a>
      </div>

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
            outline: 'none'
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
            outline: 'none'
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
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748B' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#0052FF' }} />
            <div>Filtering leads database...</div>
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
                          cursor: 'pointer'
                        }}
                      >
                        Open Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
            No inquiries match the current search or filter criteria.
          </div>
        )}
      </div>

      {/* Slide-out Lead Drawer */}
      <AdminLeadDrawer
        leadId={selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
        onLeadUpdated={fetchLeads}
      />
    </div>
  );
};

