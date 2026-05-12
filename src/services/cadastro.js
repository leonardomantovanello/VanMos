import { auth } from './auth';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'https://vanmosapi.onrender.com/api'}/cadastro`;

export async function cadastrarUsuario(dadosCadastro) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosCadastro),
    });
    const data = await response.json();
    return response.ok
      ? { sucesso: true, data }
      : { sucesso: false, mensagem: data.mensagem || 'Erro ao cadastrar usuário' };
  } catch {
    return { sucesso: false, mensagem: 'Erro de conexão com o servidor' };
  }
}

export const cadastroApi = {
  buscarPorId: async (id) => {
    const response = await auth.fetchWithAuth(`${API_BASE_URL}/${id}`);
    return response.json();
  },

  atualizar: async (id, cadastro) => {
    const response = await auth.fetchWithAuth(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cadastro),
    });
    return response.json();
  },
};
