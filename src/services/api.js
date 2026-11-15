/**
 * Campital Unified API Client
 * Manages public intake submissions, pitch deck uploads, and authenticated CRM requests.
 */

const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('campital_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  /**
   * Public: Submit intake lead / application
   */
  async submitLead(leadData) {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit application.');
    }
    return data;
  },

  /**
   * Public: Upload Pitch Deck (PDF / PPTX)
   */
  async uploadPitchDeck(file) {
    const formData = new FormData();
    formData.append('deck', file);

    const res = await fetch(`${API_BASE}/leads/upload-deck`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to upload pitch deck.');
    }
    return data;
  },

  /**
   * Public: Newsletter subscription
   */
  async subscribeNewsletter(email, source = 'homepage') {
    const res = await fetch(`${API_BASE}/subscribers/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Subscription failed.');
    }
    return data;
  },

  /**
   * Public: Event priority registration
   */
  async registerEvent(payload) {
    const res = await fetch(`${API_BASE}/events/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Event registration failed.');
    }
    return data;
  },

  // ================= ADMIN & CRM API =================

  async adminLogin(email, password) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Admin login failed.');
    }
    if (data.token) {
      localStorage.setItem('campital_admin_token', data.token);
      localStorage.setItem('campital_admin_user', JSON.stringify(data.user));
    }
    return data;
  },

  adminLogout() {
    localStorage.removeItem('campital_admin_token');
    localStorage.removeItem('campital_admin_user');
  },

  getStoredAdminUser() {
    try {
      const u = localStorage.getItem('campital_admin_user');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('campital_admin_token');
  },

  async getAdminProfile() {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Session expired.');
    return res.json();
  },

  async getAdminLeads(filters = {}) {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
    if (filters.personaType && filters.personaType !== 'ALL') params.append('personaType', filters.personaType);
    if (filters.search) params.append('search', filters.search);

    const res = await fetch(`${API_BASE}/admin/leads?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch leads.');
    return data;
  },

  async getAdminLeadById(id) {
    const res = await fetch(`${API_BASE}/admin/leads/${id}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch lead details.');
    return data;
  },

  async updateLeadStatus(id, { status, note, sendNotificationEmail, emailNote }) {
    const res = await fetch(`${API_BASE}/admin/leads/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, note, sendNotificationEmail, emailNote })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update status.');
    return data;
  },

  async addLeadNote(id, content) {
    const res = await fetch(`${API_BASE}/admin/leads/${id}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add note.');
    return data;
  },

  async getAdminAnalytics() {
    const res = await fetch(`${API_BASE}/admin/analytics`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch analytics.');
    return data;
  },

  getExportCsvUrl() {
    const token = localStorage.getItem('campital_admin_token');
    return `${API_BASE}/admin/export/csv?token=${token || ''}`;
  }
};

