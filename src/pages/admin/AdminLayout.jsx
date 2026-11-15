import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Kanban, 
  Users, 
  Mail, 
  Calendar, 
  Download, 
  LogOut, 
  ExternalLink,
  Shield,
  Layers,
  ChevronRight
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    const user = api.getStoredAdminUser();
    setAdminUser(user);
  }, [navigate]);

  const handleLogout = () => {
    api.adminLogout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Pipeline Kanban', path: '/admin/pipeline', icon: Kanban },
    { label: 'All Leads', path: '/admin/leads', icon: Users },
    { label: 'Subscribers', path: '/admin/subscribers', icon: Mail },
    { label: 'Event RSVPs', path: '/admin/events', icon: Calendar },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#070D1E', color: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#0F172A',
          borderRight: '1px solid #1E293B',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 40
        }}
      >
        {/* Brand */}
        <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid #1E293B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#0052FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '1rem'
              }}
            >
              C
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                Campital <span style={{ color: '#38BDF8', fontSize: '0.78rem', fontWeight: '700' }}>CRM</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Deal Discovery & Sourcing</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '1.25rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  backgroundColor: isActive ? '#0052FF' : 'transparent',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={18} style={{ color: isActive ? '#FFFFFF' : '#64748B' }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick CSV Export Button */}
        <div style={{ padding: '0 1rem 1rem' }}>
          <a
            href={api.getExportCsvUrl()}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.65rem',
              borderRadius: '8px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              color: '#38BDF8',
              fontSize: '0.82rem',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'background 0.15s'
            }}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </a>
        </div>

        {/* User Card & Logout */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #1E293B', backgroundColor: '#0B1120' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {adminUser?.name || 'Deal Partner'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {adminUser?.email || 'admin@campital.in'}
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: '6px'
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header
          style={{
            height: '64px',
            backgroundColor: '#0F172A',
            borderBottom: '1px solid #1E293B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#64748B' }}>
            <span>Campital CRM</span>
            <ChevronRight size={14} />
            <span style={{ color: '#F8FAFC', fontWeight: '600' }}>
              {navItems.find(i => i.path === location.pathname)?.label || 'Console'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              to="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                color: '#94A3B8',
                textDecoration: 'none',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #334155'
              }}
            >
              <span>View Public Site</span>
              <ExternalLink size={13} />
            </Link>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '100px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#34D399',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span>Live Engine</span>
            </div>
          </div>
        </header>

        {/* Nested Route View */}
        <main style={{ padding: '2rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

