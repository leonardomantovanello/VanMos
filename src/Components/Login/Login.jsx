import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../../services/login'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { loginGuardian } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email_ou_cpf: '',
    senha: '',
    lembrar_me: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailOuCpf = /^\d/.test(formData.email_ou_cpf) ? formData.email_ou_cpf.replace(/\D/g, '') : formData.email_ou_cpf;
    const resultado = await loginApi.login(emailOuCpf, formData.senha, formData.lembrar_me);
    if (resultado.sucesso) {
      // POST /api/login é unificado (autentica responsável/passageiro E
      // motorista, ver LoginController) — mas este site é exclusivo do
      // painel de motorista. Sem esse filtro, um responsável com senha
      // válida conseguia logar aqui e cair direto no dashboard do
      // motorista (que só existe pra quem tem role MOTORISTA de verdade).
      if (resultado.usuario?.tipo !== 'MOTORISTA') {
        alert('Esta área é exclusiva para motoristas. Se você é responsável/passageiro, use o aplicativo VanMos.')
        return
      }
      loginGuardian(resultado.usuario, {
        accessToken: resultado.accessToken,
        refreshToken: resultado.refreshToken,
      })
      alert('Login realizado com sucesso!');
      navigate('/motorista');
    } else {
      alert(resultado.mensagem);
    }
  }


  return (
    <div className="login-container">

      
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