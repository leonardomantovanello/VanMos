// Armazenamento local (mock) das contas de aluno criadas pelo motorista.
// Isso NÃO é uma API real — é um recurso apenas de demonstração no cliente.
// Centralizado aqui porque Motorista.jsx (cria contas) e ForgotPassword.jsx
// (recupera/altera senha) liam e escreviam a mesma chave de localStorage
// de forma duplicada e um pouco divergente.
const MOCK_USERS_KEY = 'vanmos_users'

export const getMockUsers = () => {
  try {
    const raw = localStorage.getItem(MOCK_USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const saveMockUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

export const addMockUser = (user) => {
  const users = getMockUsers()
  users.push(user)
  saveMockUsers(users)
  return users
}

export const findMockUserByEmail = (email) => getMockUsers().find((u) => u.email === email)

export const updateMockUserPassword = (email, newPassword) => {
  const users = getMockUsers().map((u) => (u.email === email ? { ...u, senha: newPassword } : u))
  saveMockUsers(users)
  return users
}
