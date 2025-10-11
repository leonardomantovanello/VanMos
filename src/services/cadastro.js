const API_BASE_URL = 'https://vanmosapi.onrender.com/api/cadastro';

export const cadastroApi = {
  // Criar novo cadastro
  criar: async (cadastro) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cadastro)
    });
    return response.json();
  },

  // Listar todos
  listar: async () => {
    const response = await fetch(API_BASE_URL);
    return response.json();
  },

  // Buscar por ID
  buscarPorId: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return response.json();
  },

  // Atualizar
  atualizar: async (id, cadastro) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cadastro)
    });
    return response.json();
  },

  // Deletar
  deletar: async (id) => {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
  }
};

export async function cadastrarUsuario(dadosCadastro) {
  try {
    const response = await fetch('https://vanmosapi.onrender.com/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosCadastro)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { sucesso: true, data };
    } else {
      return { sucesso: false, mensagem: data || 'Erro ao cadastrar usuário' };
    }
  } catch (error) {
    return { sucesso: false, mensagem: 'Erro de conexão com o servidor' };
  }
}
