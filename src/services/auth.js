const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vanmosapi.onrender.com/api';

export const auth = {
  getToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),

  save: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  },

  clear: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('vanmos_logged_user');
    localStorage.removeItem('admin_logged');
    localStorage.removeItem('admin_user');
  },

  refresh: async () => {
    const refreshToken = auth.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) { auth.clear(); return null; }
      const data = await response.json();
      auth.save(data.accessToken, data.refreshToken);
      return data.accessToken;
    } catch {
      auth.clear();
      return null;
    }
  },

  fetchWithAuth: async (url, options = {}) => {
    const token = auth.getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    let response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      const newToken = await auth.refresh();
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
        response = await fetch(url, { ...options, headers });
      }
    }

    return response;
  },
};
