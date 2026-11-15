import React, { useEffect, useState } from 'react';
import { Mail, CheckCircle2, Loader2, Download } from 'lucide-react';

export const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('campital_admin_token');
      const res = await fetch('/api/subscribers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch (err) {
      console.error('Failed to fetch subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.03em', margin: 0 }}>
          The Campital Brief Newsletter Audience
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '0.35rem' }}>
          Subscribers receiving monthly campus deal-flow reports, research, and demo call announcements.
        </p>
      </div>

      <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748B' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#0052FF' }} />
            <div>Loading subscriber list...</div>
          </div>
        ) : subscribers.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E293B', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase', backgroundColor: '#0B1120' }}>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Subscriber Email</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Opt-In Source</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Date Joined</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid #162032' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: '700', color: '#FFFFFF' }}>
                      {sub.email}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#38BDF8' }}>
                      {sub.source || 'homepage'}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#94A3B8' }}>
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ color: '#34D399', fontWeight: '700', fontSize: '0.8rem' }}>
                        ● Active Reader
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
            No newsletter subscribers yet. Readers subscribing via the footer or newsletter strip will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

