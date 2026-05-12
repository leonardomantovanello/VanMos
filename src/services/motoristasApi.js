import { auth } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vanmosapi.onrender.com/api';

export const motoristasApi = {
  listar: async () => {
    const response = await auth.fetchWithAuth(`${API_BASE_URL}/cadastro`);
    const data = await response.json();
    return Array.isArray(data) ? data : (data.data ?? []);
  },

  adicionar: async (motorista) => {
    const response = await auth.fetchWithAuth(`${API_BASE_URL}/cadastro`, {
      method: 'POST',
      body: JSON.stringify(motorista),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensagem || 'Erro na requisição');
    return data;
  },

  ativar: async (id) => {
    const response = await auth.fetchWithAuth(`${API_BASE_URL}/cadastro/${id}/ativar`, { method: 'PUT' });
    return response.json();
  },

  inativar: async (id) => {
    const response = await auth.fetchWithAuth(`${API_BASE_URL}/cadastro/${id}/inativar`, { method: 'PUT' });
    return response.json();
  },

  editar: async (id, motorista) => {
    const response = await auth.fetchWithAuth(`${API_BASE_URL}/cadastro/${id}`, {
      method: 'PUT',
      body: JSON.stringify(motorista),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensagem || 'Erro ao editar motorista');
    return data;
  },

  deletar: async (id) => {
    const response = await auth.fetchWithAuth(`${API_BASE_URL}/cadastro/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensagem || 'Erro ao deletar motorista');
    return data;
  },
};
