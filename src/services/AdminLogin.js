import { auth } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vanmosapi.onrender.com/api';

export const adminApi = {
  login: async (emailOuCpf, senha) => {
    const response = await fetch(`${API_BASE_URL}/login-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_ou_cpf: emailOuCpf, senha }),
    });

    const data = await response.json();

    if (data.sucesso && data.accessToken) {
      auth.save(data.accessToken, data.refreshToken);
      localStorage.setItem('admin_logged', 'true');
      if (data.usuario) localStorage.setItem('admin_user', JSON.stringify(data.usuario));
    }

    return data;
  },

  logout: () => {
    auth.clear();
  },
};
