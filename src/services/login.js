const API_BASE_URL = 'http://localhost:8080/api/login';

export const loginApi = {
  // Fazer login
  login: async (emailOuCpf, senha, lembrarMe = false) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOuCpf: emailOuCpf,
          senha: String(senha),
          lembrarMe: Boolean(lembrarMe)
        })
      });
      
      const data = await response.json();
      
      return {
        sucesso: data.sucesso || false,
        mensagem: data.mensagem || 'Erro desconhecido'
      };
    } catch (error) {
      return { sucesso: false, mensagem: 'Erro de conexão com o servidor' };
    }
  },

  // Fazer logout
  logout: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST'
      });
      return { sucesso: true, mensagem: 'Logout realizado com sucesso!' };
    } catch (error) {
      return { sucesso: false, mensagem: 'Erro ao fazer logout' };
    }
  }
};

// Função principal para usar no componente
export async function fazerLogin(emailOuCpf, senha, lembrarMe = false) {
  return await loginApi.login(emailOuCpf, senha, lembrarMe);
}