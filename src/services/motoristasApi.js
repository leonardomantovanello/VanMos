import { apiRequest } from './apiClient'

const extrairListaMotoristas = (data) => {
  if (Array.isArray(data)) return data

  const listasPossiveis = [
    data?.motoristas,
    data?.cadastros,
    data?.usuarios,
    data?.dados,
    data?.data,
  ]

  return listasPossiveis.find(Array.isArray) || []
}

export const motoristasApi = {
  // Cadastros pendentes/ativos para o painel admin — exige token de ADMIN.
  listar: async () => {
    const data = await apiRequest('/cadastro', {
      auth: true,
      fallbackMessage: 'Não foi possível carregar os motoristas',
    })
    return extrairListaMotoristas(data)
  },

  // Lista pública (sem CPF/e-mail) de motoristas ativos, para a página "Nossos Motoristas".
  listarPublico: async () => {
    const data = await apiRequest('/motoristas-admin/publico', {
      fallbackMessage: 'Não foi possível carregar os motoristas',
    })
    return extrairListaMotoristas(data)
  },

  adicionar: async (motorista) =>
    apiRequest('/cadastro', {
      method: 'POST',
      body: motorista,
      fallbackMessage: 'Erro na requisição',
    }),

  ativar: async (id) => {
    return motoristasApi.alterarStatus(id, true)
  },

  inativar: async (id) => {
    return motoristasApi.alterarStatus(id, false)
  },

  alterarStatus: async (id, ativo) => {
    if (!id) {
      throw new Error('Motorista sem identificador para atualizar')
    }

    const acao = ativo ? 'ativar' : 'inativar'
    return apiRequest(`/cadastro/${id}/${acao}`, {
      method: 'PUT',
      auth: true,
      fallbackMessage: 'Nao foi possivel atualizar o status do motorista',
    })
  },

  editar: async (id, motorista) =>
    apiRequest(`/cadastro/${id}`, {
      method: 'PUT',
      body: motorista,
      auth: true,
      fallbackMessage: 'Erro ao editar motorista',
    }),

  deletar: async (id) =>
    apiRequest(`/cadastro/${id}`, {
      method: 'DELETE',
      auth: true,
      fallbackMessage: 'Erro ao deletar motorista',
    }),
}
