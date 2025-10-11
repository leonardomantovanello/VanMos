const API_BASE_URL = 'https://vanmosapi.onrender.com/api'

export const motoristasApi = {
  listar: async () => {
    console.log('API: Listando motoristas...')
    const response = await fetch(`${API_BASE_URL}/cadastro`)
    const data = await response.json()
    console.log('API: Motoristas recebidos:', data)
    return Array.isArray(data) ? data : []
  },

  adicionar: async (motorista) => {
    console.log('API: Enviando dados:', motorista)
    const response = await fetch(`${API_BASE_URL}/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(motorista),
    })
    
    const data = await response.json()
    console.log('API: Resposta recebida:', data)
    
    if (!response.ok) {
      throw new Error(data.mensagem || 'Erro na requisição')
    }
    
    return data
  },

  ativar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cadastro/${id}/ativar`, {
      method: 'PUT',
    })
    return response.json()
  },

  inativar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cadastro/${id}/inativar`, {
      method: 'PUT',
    })
    return response.json()
  },

  editar: async (id, motorista) => {
    const response = await fetch(`${API_BASE_URL}/cadastro/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
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
    })
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.mensagem || 'Erro ao deletar motorista')
    }
    
    return response.json()
  },
}
