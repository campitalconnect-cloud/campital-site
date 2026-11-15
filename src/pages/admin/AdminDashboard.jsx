import React, { useEffect, useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Calendar, 
  ArrowUpRight, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Loader2 
} from 'lucide-react';
import { api } from '../../services/api';
import { AdminLeadDrawer } from './AdminLeadDrawer';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, leadsRes] = await Promise.all([
        api.getAdminAnalytics(),
        api.getAdminLeads()
      ]);
      setAnalytics(analyticsRes.analytics);
      setRecentLeads(leadsRes.leads.slice(0, 8));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0', color: '#64748B' }}>
        <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#0052FF' }} />
        <div>Loading Deal Desk metrics...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Title & Slogan */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.03em', margin: 0 }}>
          Venture Discovery & Deal Flow Console
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '0.35rem' }}>
          Real-time pipeline analytics, applicant screening dossiers, and campus partner engagement.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '700' }}>Total Inquiries</span>
            <Users size={18} color="#0052FF" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFFFFF', marginTop: '0.65rem' }}>
            {analytics?.totalLeads || 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#34D399', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ArrowUpRight size={14} />
            <span>Active Campus Pipeline</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '700' }}>In Active Evaluation</span>
            <TrendingUp size={18} color="#10B981" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFFFFF', marginTop: '0.65rem' }}>
            {analytics?.activePipeline || 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.35rem' }}>
            Deals moving through due diligence
          </div>
        </div>

        <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '700' }}>Newsletter Subscribers</span>
            <Mail size={18} color="#38BDF8" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFFFFF', marginTop: '0.65rem' }}>
            {analytics?.totalSubscribers || 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.35rem' }}>
            The Campital Brief readership
          </div>
        </div>

        <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '700' }}>Calendar RSVPs</span>
            <Calendar size={18} color="#FBBF24" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFFFFF', marginTop: '0.65rem' }}>
            {analytics?.totalEventRegistrations || 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.35rem' }}>
            2026 Programs & Events list
          </div>
        </div>
      </div>

      {/* Sourcing Breakdown Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* By Track */}
        <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Pipeline Distribution by Persona Track
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {analytics?.byPersona && Object.keys(analytics.byPersona).length > 0 ? (
              Object.entries(analytics.byPersona).map(([persona, count]) => (
                <div key={persona} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.88rem', color: '#CBD5E1', fontWeight: '600' }}>{persona}</span>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      backgroundColor: '#1E293B',
                      padding: '2px 10px',
                      borderRadius: '100px',
                      color: '#38BDF8'
                    }}
                  >
                    {count}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748B', fontSize: '0.85rem' }}>No submissions yet.</div>
            )}
          </div>
        </div>

        {/* Top Campuses */}
        <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Top Campus Sourcing Hubs
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {analytics?.topCampuses && analytics.topCampuses.length > 0 ? (
              analytics.topCampuses.map((c) => (
                <div key={c.campus} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CBD5E1', fontSize: '0.88rem' }}>
                    <GraduationCap size={16} color="#0052FF" />
                    <span>{c.campus}</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#34D399' }}>
                    {c.count} ventures
                  </span>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748B', fontSize: '0.85rem' }}>No campus affiliations reported yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Incoming Leads Table */}
      <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>Recent Intake Stream</div>
            <div style={{ fontSize: '0.82rem', color: '#64748B' }}>Latest submitted startup and partner dossiers</div>
          </div>
        </div>

        {recentLeads.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E293B', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Ref ID</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Venture / Org</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Founder</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Track</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    style={{
                      borderBottom: '1px solid #162032',
                      cursor: 'pointer',
                      transition: 'background 0.15s'
                    }}
                    onClick={() => setSelectedLeadId(lead.id)}
                  >
                    <td style={{ padding: '1rem', fontWeight: '700', color: '#38BDF8' }}>
                      #CAMP-{lead.leadNumber || 'NEW'}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '700', color: '#FFFFFF' }}>
                      {lead.organizationName}
                      {lead.campusAffiliation && (
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', fontWeight: '400' }}>
                          {lead.campusAffiliation}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', color: '#CBD5E1' }}>
                      {lead.fullName}
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                        {lead.email}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
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
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          color: getStatusColor(lead.status),
                          fontSize: '0.8rem',
                          fontWeight: '800'
                        }}
                      >
                        ● {lead.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
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
                          color: '#FFFFFF',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
            No leads received yet. Submit a test application via the frontend modal to view it live here!
          </div>
        )}
      </div>

      {/* Slide-out Lead Drawer */}
      <AdminLeadDrawer
        leadId={selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
        onLeadUpdated={loadData}
      />
    </div>
  );
};

