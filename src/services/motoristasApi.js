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
  // Lista pública (sem CPF/e-mail) de motoristas ativos, para a página "Nossos Motoristas".
  listarPublico: async () => {
    const data = await apiRequest('/motoristas-admin/publico', {
      fallbackMessage: 'Não foi possível carregar os motoristas',
    })
    return extrairListaMotoristas(data)
  },
}
