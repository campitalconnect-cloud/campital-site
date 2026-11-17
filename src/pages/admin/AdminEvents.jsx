import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Loader2, GraduationCap, Building2 } from 'lucide-react';
import { api } from '../../services/api';

export const AdminEvents = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminEvents();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.03em', margin: 0 }}>
          Programs & Events Registration Feed
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '0.35rem' }}>
          Campuses, founders, and sponsors registered for 2026 hackathons, demo days, and track rollouts.
        </p>
      </div>

      <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748B' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#0052FF' }} />
            <div>Loading event registrations...</div>
          </div>
        ) : registrations.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E293B', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase', backgroundColor: '#0B1120' }}>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Participant Name</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Email</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Institution / Org</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Track Interest</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Date Registered</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} style={{ borderBottom: '1px solid #162032' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: '700', color: '#FFFFFF' }}>
                      {reg.fullName}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#38BDF8' }}>
                      {reg.email}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#CBD5E1' }}>
                      {reg.organization}
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
                        {reg.trackInterest || 'All Formats'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#94A3B8' }}>
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
            No event registrations yet.
          </div>
        )}
      </div>
    </div>
  );
};

