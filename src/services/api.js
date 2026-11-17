/**
 * Campital Unified API Client
 * Manages public intake submissions, pitch deck uploads, and authenticated CRM requests.
 * Features built-in resiliency, safe parsing, and seamless localhost proxy failover.
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
 * 1. Checks relative /api first.
 * 2. If running locally and relative /api returns non-JSON/HTML or network error (e.g. Vite proxy not yet restarted or port mismatch),
 *    automatically fails over to direct http://localhost:5001/api.
 * 3. Safely parses response as text first, guarding against empty body or HTML error pages.
 * 4. Yields actionable error messages rather than raw SyntaxError "Unexpected end of JSON input".
 */
async function safeRequest(endpoint, options = {}) {
  const isLocal = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Build candidate URLs: relative proxy first, direct localhost:5001 as fallback
  const candidates = [
    `/api${cleanEndpoint}`,
    ...(isLocal ? [`http://localhost:5001/api${cleanEndpoint}`] : [])
  ];

  let lastError = null;

  for (let i = 0; i < candidates.length; i++) {
    const url = candidates[i];
    try {
      const res = await fetch(url, options);
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      // Check if response is HTML (e.g. Vite SPA index.html fallback when proxy is missing)
      const isHtml = text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html') || contentType.includes('text/html');

      if (isHtml) {
        if (i < candidates.length - 1) {
          // Fall back to direct localhost:5001 backend
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
          throw new Error(`Invalid response format from server (${res.status}): ${text.slice(0, 100)}`);
        }
      }

      if (!res.ok) {
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
    const isLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const base = isLocal ? 'http://localhost:5001/api' : '/api';
    return `${base}/admin/export/csv?token=${token || ''}`;
  }
};
