import { apiRequest } from './apiClient'

export const passageirosApi = {
  // POST /api/passageiros/cadastrar-motorista — exige o motorista logado
  // (token guardado no login, ver AuthContext). Cria a conta do responsável
  // (senha gerada pelo backend e enviada por e-mail) E o Aluno vinculado ao
  // motorista logado — é o Aluno que aparece no dashboard do app.
  cadastrarPeloMotorista: async ({
    nomeResponsavel, cpfResponsavel, emailResponsavel, idadeResponsavel, generoResponsavel,
    nomeAluno, telefoneResponsavel, enderecoEmbarque, enderecoDesembarque, escola, turno,
  }) =>
    apiRequest('/passageiros/cadastrar-motorista', {
      method: 'POST',
      body: {
        nomeResponsavel, cpfResponsavel, emailResponsavel, idadeResponsavel, generoResponsavel,
        nomeAluno, telefoneResponsavel, enderecoEmbarque, enderecoDesembarque, escola, turno,
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
}
