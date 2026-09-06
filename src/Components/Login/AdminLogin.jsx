import React, { useState } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'
import { adminApi } from '../../services/AdminLogin'
import { useAuth } from '../../contexts/AuthContext'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { loginAdmin } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [formData, setFormData] = useState({ email_ou_cpf: '', senha: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (erro) setErro('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      const data = await adminApi.login(formData.email_ou_cpf.trim(), formData.senha)
      if (data?.sucesso) {
        loginAdmin(data)
        navigate('/admin-panel')
      } else {
        setErro(data?.mensagem || 'E-mail ou senha incorretos.')
      }
    } catch {
      setErro('Erro ao conectar com o servidor. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-aurora" aria-hidden="true">
        <span className="aurora-blob blob-1" />
        <span className="aurora-blob blob-2" />
        <span className="aurora-blob blob-3" />
        <div className="admin-login-grid" />
      </div>

      <button
        type="button"
        className="admin-login-back"
        onClick={() => navigate('/login')}
      >
        <span aria-hidden="true">←</span> Voltar
      </button>

      <div className="admin-login-card">
        <div className="admin-login-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l7 3v5c0 4.5-2.9 7.9-7 9-4.1-1.1-7-4.5-7-9V6l7-3z" />
            <path d="M9.5 12.5l1.8 1.8 3.5-3.6" />
          </svg>
        </div>

        <div className="admin-login-heading">
          <h1>Painel Administrativo</h1>
          <p>Área restrita — entre com suas credenciais de administrador</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label className="admin-field">
            <span className="admin-field-label">E-mail</span>
            <span className="admin-field-control">
              <svg className="admin-field-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <input
                type="text"
                name="email_ou_cpf"
                autoComplete="username"
                placeholder="admin@vanmos.com"
                value={formData.email_ou_cpf}
                onChange={handleInputChange}
                required
              />
            </span>
          </label>

          <label className="admin-field">
            <span className="admin-field-label">Senha</span>
            <span className="admin-field-control">
              <svg className="admin-field-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                name="senha"
                autoComplete="current-password"
                placeholder="Sua senha"
                value={formData.senha}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="admin-field-toggle"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </span>
          </label>

          {erro && <p className="admin-login-erro" role="alert">{erro}</p>}

          <button type="submit" className="admin-login-submit" disabled={enviando}>
            {enviando ? 'Entrando...' : 'Acessar painel'}
            {!enviando && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <p className="admin-login-note">
          <span className="admin-login-dot" aria-hidden="true" />
          Acesso monitorado e registrado
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
