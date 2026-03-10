import React, { useState } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email_ou_cpf: '',
    senha: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:8080/api/login-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email_ou_cpf: formData.email_ou_cpf, 
          senha: formData.senha 
        }),
      })
      
      const data = await response.json()
      
      if (data.sucesso) {
        localStorage.setItem('admin_logged', 'true')
        localStorage.setItem('admin_user', JSON.stringify(data.usuario || {}))
        navigate('/admin-panel')
      } else {
        alert(data.mensagem || 'Email ou senha incorretos')
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor')
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-background">
        <div className="tech-line line-1"></div>
        <div className="tech-line line-2"></div>
        <div className="tech-line line-3"></div>
        <div className="tech-line line-4"></div>
      </div>
      
      <button 
        type="button" 
        className="voltar-btn"
        onClick={() => navigate('/login')} 
      >
        <span>←</span> Voltar
      </button>

      <div className="admin-login-content">
        <div className="admin-login-header">
          <h1 className="admin-login-title">Acesso Administrativo</h1>
          <p className="admin-login-subtitle">Área restrita para administradores</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email_ou_cpf">E-mail</label>
            <input
              type="text"
              id="email_ou_cpf"
              name="email_ou_cpf"
              placeholder="Digite seu e-mail"
              value={formData.email_ou_cpf}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
        
          <button type="submit" className="admin-login-btn">
            Acessar Painel Administrativo
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Acesso monitorado e registrado</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
