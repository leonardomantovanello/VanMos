import { apiRequest } from './apiClient'

export const contatoApi = {
  // POST /api/contato — formulário público "Contate-nos", sem autenticação.
  enviar: async ({ nome, email, telefone, assunto, mensagem }) =>
    apiRequest('/contato', {
      method: 'POST',
      body: { nome, email, telefone, assunto, mensagem },
      fallbackMessage: 'Erro ao enviar mensagem. Tente novamente.',
    }),
}
