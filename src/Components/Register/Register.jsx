import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    cpf: '',
    email: '',
    senha: '',
    genero: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const formatCPF = (value) => {
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, '')
    
    // Aplica a máscara XXX.XXX.XXX-XX
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const handleCPFChange = (e) => {
    const formattedCPF = formatCPF(e.target.value)
    setFormData({
      ...formData,
      cpf: formattedCPF
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados do cadastro:', formData)
    // Aqui você pode adicionar a lógica de cadastro
    // Por exemplo, enviar para uma API
  }

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-circle circle-4"></div>
      </div>
      
      <button 
        type="button" 
        className="voltar-btn"
        onClick={() => navigate('/')} 
      >
        <span>←</span> Voltar
      </button>

      <div className="register-content">
        <div className="register-header">
          <h1 className="register-title">Crie sua conta</h1>
          <p className="register-subtitle">Junte-se à nossa comunidade de transporte inteligente</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="idade">Idade</label>
              <input
                type="number"
                id="idade"
                name="idade"
                placeholder="Sua idade"
                min="18"
                max="100"
                value={formData.idade}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                maxLength="14"
                value={formData.cpf}
                onChange={handleCPFChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="genero">Gênero</label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione seu gênero</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao-informar">Prefiro não informar</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu.email@exemplo.com"
              value={formData.email}
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
                placeholder="Crie uma senha segura"
                minLength="6"
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
            <div className="password-hint">
              A senha deve ter pelo menos 6 caracteres
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              Concordo com os <a href="#" className="link">Termos de Uso</a> e <a href="#" className="link">Política de Privacidade</a>
            </label>
          </div>

          <button type="submit" className="register-btn">
            Criar Conta
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <button
            type="button"
            className="login-link-btn"
            onClick={() => navigate('/login')}
          >
            Já possui uma conta? Faça login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
