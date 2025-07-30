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
      <form>
        <h1>Login no sistema</h1>
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
      </form>
    </div>
  )
}

export default Login