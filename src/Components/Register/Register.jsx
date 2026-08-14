import React, { useState } from 'react'
import { motoristasApi } from '../../services/motoristasApi'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { formatCPF, isValidCPF, isValidEmail, isValidPassword } from '../../utils/validators'
import { fileToBase64 } from '../../utils/fileToBase64'

const TAMANHO_MAXIMO_DOCUMENTO = 5 * 1024 * 1024 // 5MB — tudo vira base64 no banco, sem storage externo

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    cpf: '',
    email: '',
    senha: '',
    genero: '',
    telefone: '',
    rg: '',
    cnh: '',
    rgDocumentoBase64: '',
    cnhDocumentoBase64: '',
    aceitouTermos: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleCPFChange = (e) => {
    const formattedCPF = formatCPF(e.target.value)
    setFormData({
      ...formData,
      cpf: formattedCPF
    })
  }

  const handleDocumentoChange = async (campo, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > TAMANHO_MAXIMO_DOCUMENTO) {
      alert('O arquivo deve ter no máximo 5MB')
      e.target.value = ''
      return
    }
    const base64 = await fileToBase64(file)
    setFormData((prev) => ({ ...prev, [campo]: base64 }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidCPF(formData.cpf)) {
      alert('Por favor, insira um CPF válido')
      return
    }
    if (!isValidEmail(formData.email)) {
      alert('Por favor, insira um e-mail válido')
      return
    }
    if (!isValidPassword(formData.senha)) {
      alert('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número')
      return
    }
    if (!formData.telefone.trim() || !formData.rg.trim() || !formData.cnh.trim()) {
      alert('Telefone, RG e CNH são obrigatórios para o cadastro de motorista')
      return
    }
    if (!formData.rgDocumentoBase64 || !formData.cnhDocumentoBase64) {
      alert('Envie a foto/scan do RG e da CNH para concluir o cadastro')
      return
    }
    // Remove máscara do CPF antes de enviar. Este formulário só é usado pelo
    // fluxo de motorista do site (leva ao dashboard /motorista após o
    // cadastro) — a tabela `motorista` (ver Motorista.java no backend) é
    // exclusiva desse papel, por isso não precisa mais de um campo "tipo".
    // Motorista passa por aprovação manual do suporte por e-mail antes de
    // poder logar (ver MotoristaAprovacaoController no backend) — por isso
    // exige RG/CNH/telefone/documentos.
    const cadastro = {
      nome: formData.nome,
      idade: formData.idade,
      cpf: formData.cpf.replace(/\D/g, ''),
      genero: formData.genero,
      email: formData.email,
      senha: formData.senha,
      telefone: formData.telefone,
      rg: formData.rg,
      cnh: formData.cnh,
      rgDocumentoBase64: formData.rgDocumentoBase64,
      cnhDocumentoBase64: formData.cnhDocumentoBase64,
      aceitoTermos: formData.aceitouTermos,
    }
    setEnviando(true)
    try {
      const response = await motoristasApi.criar(cadastro)
      if (response?.sucesso) {
        alert(response?.mensagem || 'Cadastro enviado! Aguarde a aprovação do nosso time.')
        navigate('/login')
      } else {
        alert(response?.mensagem || 'Erro ao cadastrar usuário')
      }
    } catch {
      alert('Erro ao conectar com o servidor de cadastro')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="bg-circle circle-1" style={{background: 'linear-gradient(135deg, #9300d3, #ff1493)'}}></div>
        <div className="bg-circle circle-2" style={{background: 'linear-gradient(135deg, #9300d3, #ff1493)'}}></div>
        <div className="bg-circle circle-3" style={{background: 'linear-gradient(135deg, #9300d3, #ff1493)'}}></div>
        <div className="bg-circle circle-4" style={{background: 'linear-gradient(135deg, #9300d3, #ff1493)'}}></div>
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

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="rg">RG</label>
              <input
                type="text"
                id="rg"
                name="rg"
                placeholder="00.000.000-0"
                value={formData.rg}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="cnh">CNH</label>
            <input
              type="text"
              id="cnh"
              name="cnh"
              placeholder="Número da CNH"
              value={formData.cnh}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="rgDocumento">Foto/scan do RG</label>
              <input
                type="file"
                id="rgDocumento"
                accept="image/*"
                onChange={(e) => handleDocumentoChange('rgDocumentoBase64', e)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="cnhDocumento">Foto/scan da CNH</label>
              <input
                type="file"
                id="cnhDocumento"
                accept="image/*"
                onChange={(e) => handleDocumentoChange('cnhDocumentoBase64', e)}
                required
              />
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
              <input
                type="checkbox"
                name="aceitouTermos"
                checked={formData.aceitouTermos}
                onChange={handleInputChange}
                required
              />
              <span className="checkmark"></span>
              Concordo com os <a href="#" className="link">Termos de Uso</a> e <a href="#" className="link">Política de Privacidade</a>
            </label>
          </div>

          <button type="submit" className="register-btn" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Criar Conta'}
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
