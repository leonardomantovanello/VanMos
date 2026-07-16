import { apiRequest } from './apiClient'

const LOGIN_PATH = '/login'

export const loginApi = {
  // Fazer login. Retorna o corpo padronizado do backend
  // { sucesso, mensagem, accessToken, refreshToken, usuario } tanto em caso de
  // sucesso quanto de credenciais inválidas (401) — só lança em falha de rede/servidor.
  login: async (emailOuCpf, senha, lembrarMe = false) => {
    try {
      return await apiRequest(LOGIN_PATH, {
        method: 'POST',
        body: {
          emailOuCpf,
          senha: String(senha),
          lembrarMe: Boolean(lembrarMe),
        },
        throwOnError: false,
      })
    } catch {
      return { sucesso: false, mensagem: 'Erro de conexão com o servidor' }
    }
  },

  // Fazer logout
  logout: async () => {
    try {
      await apiRequest(`${LOGIN_PATH}/logout`, { method: 'POST', throwOnError: false })
      return { sucesso: true, mensagem: 'Logout realizado com sucesso!' }
    } catch {
      return { sucesso: false, mensagem: 'Erro ao fazer logout' }
    }
  },
}
