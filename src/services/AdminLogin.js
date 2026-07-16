// services/adminApi.js
import { apiRequest } from './apiClient'

export const adminApi = {
  login: async (emailOuCpf, senha) => {
    // throwOnError: false — credenciais inválidas são um resultado de negócio normal
    // (HTTP 401 com { sucesso: false, mensagem: 'Credenciais inválidas' }), não uma falha.
    return apiRequest('/login-admin', {
      method: 'POST',
      body: { email_ou_cpf: emailOuCpf, senha },
      throwOnError: false,
    })
  },

  logout: async () => {
    return apiRequest('/login-admin/logout', {
      method: 'POST',
      throwOnError: false,
    })
  },
}
