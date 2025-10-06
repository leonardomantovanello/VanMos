const API_BASE_URL = 'http://localhost:8080/api'

export const motoristasApi = {
  listar: async () => {
    console.log('API: Listando motoristas...')
    const response = await fetch(`${API_BASE_URL}/motoristas-admin`)
    const data = await response.json()
    console.log('API: Motoristas recebidos:', data)
    return data
  },

  adicionar: async (motorista) => {
    console.log('API: Enviando dados:', motorista)
    const response = await fetch(`${API_BASE_URL}/motoristas-admin`, {
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
    const response = await fetch(`${API_BASE_URL}/motoristas-admin/${id}/ativar`, {
      method: 'PUT',
    })
    return response.json()
  },

  inativar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/motoristas-admin/${id}/inativar`, {
      method: 'PUT',
    })
    return response.json()
  },
}
