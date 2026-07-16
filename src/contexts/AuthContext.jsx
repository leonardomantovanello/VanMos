import React, { createContext, useContext, useState, useCallback } from 'react'

// Centraliza os dois fluxos de autenticação do app. São domínios genuinamente
// separados — hits em endpoints de backend diferentes (/api/login-admin vs
// /api/login) e emitem roles diferentes (ADMIN vs RESPONSAVEL) — então eles
// são expostos como estados/ações independentes, não forçados em um "user" só.
const AuthContext = createContext(null)

// Chaves de localStorage usadas pelo fluxo de admin (login-admin).
const ADMIN_LOGGED_KEY = 'admin_logged'
const ADMIN_USER_KEY = 'admin_user'
const ADMIN_TOKEN_KEY = 'admin_token'
const ADMIN_REFRESH_TOKEN_KEY = 'admin_refresh_token'

// Chave de localStorage usada pelo fluxo de responsável/motorista logado (login comum).
const GUARDIAN_USER_KEY = 'vanmos_logged_user'

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
  const [adminUser, setAdminUser] = useState(() => readJSON(ADMIN_USER_KEY, null))
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    () => localStorage.getItem(ADMIN_LOGGED_KEY) === 'true'
  )

  const [guardianUser, setGuardianUser] = useState(() => readJSON(GUARDIAN_USER_KEY, null))

  // --- Fluxo Admin (/api/login-admin) ---

  const loginAdmin = useCallback((loginResponse) => {
    const usuario = loginResponse?.usuario || {}
    localStorage.setItem(ADMIN_LOGGED_KEY, 'true')
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(usuario))
    if (loginResponse?.accessToken) localStorage.setItem(ADMIN_TOKEN_KEY, loginResponse.accessToken)
    if (loginResponse?.refreshToken) localStorage.setItem(ADMIN_REFRESH_TOKEN_KEY, loginResponse.refreshToken)

    setAdminUser(usuario)
    setIsAdminAuthenticated(true)
  }, [])

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem(ADMIN_LOGGED_KEY)
    localStorage.removeItem(ADMIN_USER_KEY)
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    localStorage.removeItem(ADMIN_REFRESH_TOKEN_KEY)
    setAdminUser(null)
    setIsAdminAuthenticated(false)
  }, [])

  // --- Fluxo Responsável/Motorista (/api/login) ---

  const loginGuardian = useCallback((usuario) => {
    localStorage.setItem(GUARDIAN_USER_KEY, JSON.stringify(usuario))
    setGuardianUser(usuario)
  }, [])

  const updateGuardian = useCallback((usuario) => {
    localStorage.setItem(GUARDIAN_USER_KEY, JSON.stringify(usuario))
    setGuardianUser(usuario)
  }, [])

  const logoutGuardian = useCallback(() => {
    localStorage.removeItem(GUARDIAN_USER_KEY)
    setGuardianUser(null)
  }, [])

  const value = {
    // admin
    adminUser,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    // responsável/motorista
    guardianUser,
    isGuardianAuthenticated: Boolean(guardianUser?.nome),
    loginGuardian,
    updateGuardian,
    logoutGuardian,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
