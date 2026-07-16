import { apiRequest } from './apiClient'

const CADASTRO_PATH = '/cadastro'

export const cadastroApi = {
  // Cria um novo cadastro de responsável (fica pendente de ativação por um admin).
  criar: async (cadastro) =>
    apiRequest(CADASTRO_PATH, { method: 'POST', body: cadastro, throwOnError: false }),

  // ATENÇÃO: GET /api/cadastro agora exige ROLE_ADMIN no backend (ver CadastroController).
  // Não é usado por nenhum componente hoje — o painel admin usa motoristasApi.listar(),
  // que já envia o token de admin. Mantido aqui por compatibilidade do service.
  listar: async () => apiRequest(CADASTRO_PATH, { throwOnError: false }),

  // ATENÇÃO: exige ser o dono do cadastro (ownership validation no backend), não ROLE_ADMIN.
  buscarPorId: async (id) => apiRequest(`${CADASTRO_PATH}/${id}`, { throwOnError: false }),

  // ATENÇÃO: exige ser o dono do cadastro (ownership validation no backend), não ROLE_ADMIN.
  atualizar: async (id, cadastro) =>
    apiRequest(`${CADASTRO_PATH}/${id}`, { method: 'PUT', body: cadastro, throwOnError: false }),

  // ATENÇÃO: exige ser o dono do cadastro (ownership validation no backend), não ROLE_ADMIN.
  deletar: async (id) => apiRequest(`${CADASTRO_PATH}/${id}`, { method: 'DELETE', throwOnError: false }),
}
