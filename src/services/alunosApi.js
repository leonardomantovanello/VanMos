import { apiRequest } from './apiClient'

// Alunos são os "passageiros" que aparecem no dashboard do motorista —
// cada aluno tem um responsável (Passageiro) e um motorista dono
// (ver AlunoController no backend: GET já filtra por motoristaId a partir
// do token, então aqui só precisamos mandar o guardianAuth).
export const alunosApi = {
  listar: async () => {
    const data = await apiRequest('/alunos', {
      guardianAuth: true,
      fallbackMessage: 'Não foi possível carregar os passageiros',
    })
    return Array.isArray(data?.dados) ? data.dados : []
  },

  editar: async (id, aluno) =>
    apiRequest(`/alunos/${id}`, {
      method: 'PUT',
      body: aluno,
      guardianAuth: true,
      fallbackMessage: 'Erro ao editar passageiro',
    }),

  deletar: async (id) =>
    apiRequest(`/alunos/${id}`, {
      method: 'DELETE',
      guardianAuth: true,
      fallbackMessage: 'Erro ao remover passageiro',
    }),
}
