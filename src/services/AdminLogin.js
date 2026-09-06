// services/AdminLogin.js — cliente do fluxo de login de administrador
// (POST /api/login-admin). O backend responde com um Map cru
// { sucesso, mensagem, accessToken, refreshToken, usuario } — NÃO o envelope
// ApiResponse — então os campos são lidos direto da resposta.
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
