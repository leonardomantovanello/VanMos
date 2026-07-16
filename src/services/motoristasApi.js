const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vanmosapi.onrender.com/api'

const extrairListaMotoristas = (data) => {
  if (Array.isArray(data)) return data

  const listasPossiveis = [
    data?.motoristas,
    data?.cadastros,
    data?.usuarios,
    data?.data,
    data?.dados,
  ]

  return listasPossiveis.find(Array.isArray) || []
}

const authHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export const motoristasApi = {
  // Cadastros pendentes/ativos para o painel admin — exige token de ADMIN.
  listar: async () => {
    const response = await fetch(`${API_BASE_URL}/cadastro`, { headers: authHeaders() })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.mensagem || data?.message || 'Não foi possível carregar os motoristas')
    }

    return extrairListaMotoristas(data)
  },

  // Lista pública (sem CPF/e-mail) de motoristas ativos, para a página "Nossos Motoristas".
  listarPublico: async () => {
    const response = await fetch(`${API_BASE_URL}/motoristas-admin/publico`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.mensagem || data?.message || 'Não foi possível carregar os motoristas')
    }

    return extrairListaMotoristas(data)
  },

  adicionar: async (motorista) => {
    const response = await fetch(`${API_BASE_URL}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(motorista),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.mensagem || 'Erro na requisição')
    }

    return data
  },

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
    const response = await fetch(`${API_BASE_URL}/cadastro/${id}/${acao}`, {
      method: 'PUT',
      headers: authHeaders(),
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.mensagem || data?.message || 'Nao foi possivel atualizar o status do motorista')
    }

    return data
  },

  editar: async (id, motorista) => {
    const response = await fetch(`${API_BASE_URL}/cadastro/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(motorista),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.mensagem || 'Erro ao editar motorista')
    }

    return response.json()
  },

  deletar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cadastro/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.mensagem || 'Erro ao deletar motorista')
    }

    return response.json()
  },
}
