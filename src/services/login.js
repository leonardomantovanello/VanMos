import { auth } from './auth';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'https://vanmosapi.onrender.com/api'}/login`;

export async function fazerLogin(emailOuCpf, senha, lembrarMe = false) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOuCpf, senha, lembrarMe }),
    });

    const data = await response.json();

    if (data.sucesso && data.accessToken) {
      auth.save(data.accessToken, data.refreshToken);
      if (data.usuario) localStorage.setItem('vanmos_logged_user', JSON.stringify(data.usuario));
    }

    return {
      sucesso: data.sucesso || false,
      mensagem: data.mensagem || 'Erro desconhecido',
      usuario: data.usuario || null,
    };
  } catch {
    return { sucesso: false, mensagem: 'Erro de conexão com o servidor' };
  }
}
