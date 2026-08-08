import { apiRequest } from './apiClient'

export const passageirosApi = {
  // POST /api/passageiros/cadastrar-motorista — exige o motorista logado
  // (token guardado no login, ver AuthContext). Cria a conta do responsável
  // (senha gerada pelo backend e enviada por e-mail) E o Aluno vinculado ao
  // motorista logado — é o Aluno que aparece no dashboard do app.
  cadastrarPeloMotorista: async ({
    nomeResponsavel, cpfResponsavel, emailResponsavel, idadeResponsavel, generoResponsavel,
    nomeAluno, telefoneResponsavel, enderecoEmbarque, enderecoDesembarque, escola, turno, valor,
  }) =>
    apiRequest('/passageiros/cadastrar-motorista', {
      method: 'POST',
      body: {
        nomeResponsavel, cpfResponsavel, emailResponsavel, idadeResponsavel, generoResponsavel,
        nomeAluno, telefoneResponsavel, enderecoEmbarque, enderecoDesembarque, escola, turno, valor,
      },
      guardianAuth: true,
      fallbackMessage: 'Erro ao cadastrar passageiro',
    }),

  // PUT /api/passageiros/{id}/senha — exige a senha atual; o backend confere
  // com BCrypt antes de trocar (ver PassageiroService.alterarSenha).
  alterarSenha: async (id, senhaAtual, novaSenha) =>
    apiRequest(`/passageiros/${id}/senha`, {
      method: 'PUT',
      body: { senhaAtual, novaSenha },
      guardianAuth: true,
      fallbackMessage: 'Erro ao alterar senha',
    }),

  // POST /api/passageiros/esqueci-senha — rota pública ("esqueci minha
  // senha"), etapa 1: envia um link de redefinição por e-mail. Sempre
  // responde com a mesma mensagem genérica, exista ou não o e-mail (o
  // backend evita confirmar cadastro de terceiros de propósito).
  esqueciSenha: async (email) =>
    apiRequest('/passageiros/esqueci-senha', {
      method: 'POST',
      body: { email },
      fallbackMessage: 'Não foi possível processar o pedido. Tente novamente.',
    }),

  // POST /api/passageiros/redefinir-senha — etapa 2: troca a senha usando o
  // token recebido no link do e-mail. Token inválido/expirado/já usado
  // volta como erro (ver ValidationException no backend → HTTP 422).
  redefinirSenhaComToken: async (token, novaSenha) =>
    apiRequest('/passageiros/redefinir-senha', {
      method: 'POST',
      body: { token, novaSenha },
      fallbackMessage: 'Não foi possível redefinir a senha. O link pode ter expirado.',
    }),
}
