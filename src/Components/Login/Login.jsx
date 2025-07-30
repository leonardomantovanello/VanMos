import React, { useState } from 'react'
import './Login.css' 
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="container">
    <button 
      type="button" 
      className="voltar-btn"
      onClick={() => navigate('/')} 
    >
      Voltar
    </button>
    <h1 className="login-title">Login no sistema</h1>

<form>
  <input type="text" placeholder="E-mail ou Cpf" />
  <div className="password-field">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Senha"
    />
    <button
      type="button"
      className="show-password-btn"
      onClick={() => setShowPassword((v) => !v)}
    >
      {showPassword ? "Ocultar" : "Mostrar"}
    </button>
  </div>
  <button type="submit">Entrar</button>
  <button
    type="button"
    className="register-btn"
    onClick={() => navigate('/register')}
    style={{ marginTop: '16px' }}
  >
    Ainda não é registrado? Clique aqui
  </button>
</form>
  </div>
)
}

export default Login