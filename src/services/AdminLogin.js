// services/adminApi.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vanmosapi.onrender.com/api';

export const adminApi = {
  login: async (emailOuCpf, senha) => {
    const response = await fetch(`${API_BASE_URL}/login-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_ou_cpf: emailOuCpf, senha }),
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/login-admin/logout`, {
      method: 'POST',
    });
    return response.json();
  },
};
