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
    const data = await apiRequest('/motoristas/publico', {
      fallbackMessage: 'Não foi possível carregar os motoristas',
    })
    return extrairListaMotoristas(data)
  },

  // POST /api/motoristas — autocadastro público, dispara o fluxo de
  // aprovação por e-mail (ver MotoristaAprovacaoController no backend).
  criar: async (cadastro) =>
    apiRequest('/motoristas', { method: 'POST', body: cadastro, throwOnError: false }),

  // PUT /api/motoristas/{id}/senha — exige a senha atual; o backend confere
  // com BCrypt antes de trocar (ver MotoristaService.alterarSenha).
  alterarSenha: async (id, senhaAtual, novaSenha) =>
    apiRequest(`/motoristas/${id}/senha`, {
      method: 'PUT',
      body: { senhaAtual, novaSenha },
      guardianAuth: true,
      fallbackMessage: 'Erro ao alterar senha',
    }),

  // GET /api/motoristas/{id} — perfil completo do motorista logado. Preciso
  // disso porque o login (POST /api/login) só devolve id/nome/email/tipo,
  // não o resto do cadastro (cpf, telefone, cnh, van etc.). Backend responde
  // no envelope ApiResponse ({ sucesso, dados, ... }) — apiRequest não
  // desembrulha sozinho, então extrai .dados aqui.
  buscarPerfil: async (id) => {
    const data = await apiRequest(`/motoristas/${id}`, {
      guardianAuth: true,
      fallbackMessage: 'Não foi possível carregar seu perfil',
    })
    return data?.dados ?? null
  },

  // PUT /api/motoristas/{id} — edição parcial de perfil (nome, telefone,
  // idade, gênero, e-mail, cpf, cnh, rg, modelo/placa da van). Campos vazios
  // são ignorados pelo backend (ver MotoristaService.update), então só
  // persiste o que veio de fato preenchido — não apaga o resto. Mesma coisa,
  // desembrulha .dados do envelope de resposta.
  atualizarPerfil: async (id, dados) => {
    const data = await apiRequest(`/motoristas/${id}`, {
      method: 'PUT',
      body: dados,
      guardianAuth: true,
      fallbackMessage: 'Erro ao atualizar perfil',
    })
    return data?.dados ?? null
  },
}
