/**
 * Campital Unified API Client
 * Manages public intake submissions, pitch deck uploads, and authenticated CRM requests.
 * Features bulletproof resiliency, private network CORS support, and automatic localhost backend failover.
 */

function getAuthHeaders() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('campital_admin_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

/**
 * Universal resilient fetcher:
 * In local development, connects directly to the dedicated backend server on port 5001,
 * falling back to 127.0.0.1:5001 and relative /api proxy.
 * Shields against foreign servers (e.g. port clashes or unproxied dev servers returning 405/HTML).
 */
async function safeRequest(endpoint, options = {}) {
  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '0.0.0.0' ||
    window.location.hostname.endsWith('.local') ||
    Boolean(window.location.port)
  );

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // When developing locally, prioritize direct backend on port 5001
  const candidates = isLocal
    ? [
        `http://localhost:5001/api${cleanEndpoint}`,
        `http://127.0.0.1:5001/api${cleanEndpoint}`,
        `/api${cleanEndpoint}`
      ]
    : [
        `/api${cleanEndpoint}`
      ];

  let lastError = null;

  for (let i = 0; i < candidates.length; i++) {
    const url = candidates[i];
    try {
      const res = await fetch(url, options);
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      // Check if response is an unproxied HTML page
      const isHtml = text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html') || contentType.includes('text/html');

      if (isHtml) {
        if (i < candidates.length - 1) {
          continue;
        }
        throw new Error('API server returned HTML page instead of JSON. Ensure backend is running on port 5001.');
      }

      let data = {};
      if (text.trim()) {
        try {
          data = JSON.parse(text);
        } catch (jsonErr) {
          if (i < candidates.length - 1) {
            continue;
          }
          throw new Error(`Invalid response from server (${res.status}): ${text.slice(0, 100)}`);
        }
      }

      // If a candidate returns 405 (Method Not Allowed) or 404 or 502/504, failover to next candidate
      if (!res.ok) {
        if ((res.status === 405 || res.status === 404 || res.status >= 502) && i < candidates.length - 1) {
          continue;
        }
        if (res.status === 405) {
          throw new Error('Backend server is not responding on port 5001. Please make sure the backend server is running.');
        }
        throw new Error(data.error || data.message || `Server request failed with status ${res.status}`);
      }

      return data;
    } catch (err) {
      lastError = err;
      if (i < candidates.length - 1) {
        continue;
      }
    }
  }

  throw lastError || new Error('Network error: Unable to reach Campital API server.');
}

export const api = {
  /**
   * Public: Submit intake lead / application
   */
  async submitLead(leadData) {
    return safeRequest('/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
  },

  /**
   * Public: Upload Pitch Deck (PDF / PPTX)
   */
  async uploadPitchDeck(file) {
    const formData = new FormData();
    formData.append('deck', file);

    return safeRequest('/leads/upload-deck', {
      method: 'POST',
      body: formData
    });
  },

  /**
   * Public: Newsletter subscription
   */
  async subscribeNewsletter(email, source = 'homepage') {
    return safeRequest('/subscribers/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source })
    });
  },

  /**
   * Public: Event priority registration
   */
  async registerEvent(payload) {
    return safeRequest('/events/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },

  // ================= ADMIN & CRM API =================

  async adminLogin(email, password) {
    const data = await safeRequest('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (data.token && typeof localStorage !== 'undefined') {
      localStorage.setItem('campital_admin_token', data.token);
      localStorage.setItem('campital_admin_user', JSON.stringify(data.user));
    }
    return data;
  },

  adminLogout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('campital_admin_token');
      localStorage.removeItem('campital_admin_user');
    }
  },

  getStoredAdminUser() {
    try {
      const u = typeof localStorage !== 'undefined' ? localStorage.getItem('campital_admin_user') : null;
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  },

  isAuthenticated() {
    return typeof localStorage !== 'undefined' ? !!localStorage.getItem('campital_admin_token') : false;
  },

  async getAdminProfile() {
    return safeRequest('/admin/profile', {
      headers: getAuthHeaders()
    });
  },

  async getAdminLeads(filters = {}) {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
    if (filters.personaType && filters.personaType !== 'ALL') params.append('personaType', filters.personaType);
    if (filters.search) params.append('search', filters.search);

    return safeRequest(`/admin/leads?${params.toString()}`, {
      headers: getAuthHeaders()
    });
  },

  async getAdminLeadById(id) {
    return safeRequest(`/admin/leads/${id}`, {
      headers: getAuthHeaders()
    });
  },

  async updateLeadStatus(id, { status, note, sendNotificationEmail, emailNote }) {
    return safeRequest(`/admin/leads/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, note, sendNotificationEmail, emailNote })
    });
  },

  async addLeadNote(id, content) {
    return safeRequest(`/admin/leads/${id}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content })
    });
  },

  async sendLeadReply(id, { subject, message }) {
    return safeRequest(`/admin/leads/${id}/reply`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ subject, message })
    });
  },

  async getAdminAnalytics() {
    return safeRequest('/admin/analytics', {
      headers: getAuthHeaders()
    });
  },

  async getAdminSubscribers() {
    return safeRequest('/subscribers', {
      headers: getAuthHeaders()
    });
  },

  async getAdminEvents() {
    return safeRequest('/events', {
      headers: getAuthHeaders()
    });
  },

  getExportCsvUrl() {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('campital_admin_token') : '';
    const isLocal = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '0.0.0.0' ||
      Boolean(window.location.port)
    );
    const base = isLocal ? 'http://localhost:5001/api' : '/api';
    return `${base}/admin/export/csv?token=${token || ''}`;
  }
};
