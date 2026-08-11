import React, { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Chaves de localStorage usadas pelo fluxo de responsável/motorista logado (login comum).
const GUARDIAN_USER_KEY = 'vanmos_logged_user'
const GUARDIAN_TOKEN_KEY = 'vanmos_guardian_token'
const GUARDIAN_REFRESH_TOKEN_KEY = 'vanmos_guardian_refresh_token'

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

// eslint-disable-next-line react-refresh/only-export-components -- hook lives alongside its provider
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [guardianUser, setGuardianUser] = useState(() => readJSON(GUARDIAN_USER_KEY, null))

  // --- Fluxo Responsável/Motorista (/api/login) ---

  // tokens é opcional pra não quebrar chamadas existentes que só atualizam o
  // usuário (ex: updateGuardian), mas o login em si deve sempre passar
  // { accessToken, refreshToken } — sem isso, nenhuma chamada autenticada
  // como motorista (ex: cadastrar passageiro) funciona.
  const loginGuardian = useCallback((usuario, tokens) => {
    localStorage.setItem(GUARDIAN_USER_KEY, JSON.stringify(usuario))
    if (tokens?.accessToken) localStorage.setItem(GUARDIAN_TOKEN_KEY, tokens.accessToken)
    if (tokens?.refreshToken) localStorage.setItem(GUARDIAN_REFRESH_TOKEN_KEY, tokens.refreshToken)
    setGuardianUser(usuario)
  }, [])

  const updateGuardian = useCallback((usuario) => {
    localStorage.setItem(GUARDIAN_USER_KEY, JSON.stringify(usuario))
    setGuardianUser(usuario)
  }, [])

  const logoutGuardian = useCallback(() => {
    localStorage.removeItem(GUARDIAN_USER_KEY)
    localStorage.removeItem(GUARDIAN_TOKEN_KEY)
    localStorage.removeItem(GUARDIAN_REFRESH_TOKEN_KEY)
    setGuardianUser(null)
  }, [])

  const value = {
    // responsável/motorista
    guardianUser,
    isGuardianAuthenticated: Boolean(guardianUser?.nome),
    loginGuardian,
    updateGuardian,
    logoutGuardian,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
