import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { fazerLogin } from '../../services/login'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email_ou_cpf: '',
    senha: '',
    lembrar_me: false
  })

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '')
    if (cpf.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cpf)) return false
    
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.charAt(9))) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    return remainder === parseInt(cpf.charAt(10))
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailOuCpf = /^\d/.test(formData.email_ou_cpf) ? formData.email_ou_cpf.replace(/\D/g, '') : formData.email_ou_cpf;
    const resultado = await fazerLogin(emailOuCpf, formData.senha, formData.lembrar_me);
      if (resultado.sucesso) {
        // Salva o usuário logado no localStorage
        // Ajuste conforme o retorno da sua API (resultado.usuario, resultado.dados, etc)
        localStorage.setItem('vanmos_logged_user', JSON.stringify(resultado.usuario || { nome: formData.email_ou_cpf }));
        alert('Login realizado com sucesso!');
        navigate('/motorista');
      } else {
        alert(resultado.mensagem);
    }
  }
  

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="bg-circle circle-1" style={{background: 'linear-gradient(135deg, #9300d3, #ff1493)'}}></div>
        <div className="bg-circle circle-2" style={{background: 'linear-gradient(135deg, #9300d3, #ff1493)'}}></div>
        <div className="bg-circle circle-3" style={{background: 'linear-gradient(135deg, #9300d3, #ff1493)'}}></div>
      </div>
      
      <button 
        type="button" 
        className="voltar-btn"
        onClick={() => navigate('/')} 
      >
        <span>←</span> Voltar
      </button>

      <div className="login-content">
        <div className="login-header">
          <h1 className="login-title">Bem-vindo de volta!</h1>
          <p className="login-subtitle">Faça login para continuar sua jornada</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email_ou_cpf">E-mail ou CPF</label>
            <input
              type="text"
              id="email_ou_cpf"
              name="email_ou_cpf"
              placeholder="Digite seu e-mail ou CPF"
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
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="lembrar_me"
                checked={formData.lembrar_me}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Lembrar-me
            </label>
            <button 
              type="button"
              className="forgot-password"
              onClick={() => navigate('/forgot-password')}
            >
              Esqueceu a senha?
            </button>
          </div>
        
          <button type="submit" className="login-btn">
            Entrar na plataforma
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <button
            type="button"
            className="register-btn"
            onClick={() => navigate('/register')}
          >
            Criar nova conta
          </button>
        </form>

        <div className="login-footer">
          <p>Ao continuar, você concorda com nossos <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login