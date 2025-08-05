import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Contato.css'
import { faEnvelope, faMessage, faPhone } from '@fortawesome/free-solid-svg-icons'

const Contato = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
    })

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Formulário enviado:', formData)
        // Aqui você pode adicionar a lógica de envio
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            assunto: '',
            mensagem: ''
        })
    }

    return (
        <div className="contato-container">
            {/* Hero Section */}
            <section className={`hero-contato ${isVisible ? 'fade-in' : ''}`}>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Entre em <span className="highlight">Contato</span>
                    </h1>
                    <p className="hero-description">
                        Estamos aqui para ajudar você. Entre em contato conosco através dos canais abaixo
                    </p>
                </div>
                
                {/* Animated background elements */}
                <div className="bg-elements">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
            </section>

            {/* Informações de Contato */}
            <section className="info-contato">
                <div className="container">
                    <div className="contato-grid">
                        {/* Cartão Email */}
                        <div className="contato-card">
                            <div className="contato-icon">
                                <span><FontAwesomeIcon icon={faEnvelope} style={{color: "#9243bdff",}} /></span>
                            </div>
                            <h3>E-mail</h3>
                            <p className="contato-info">contato@vanmos.com.br</p>
                            <p className="contato-desc">Envie sua dúvida ou sugestão</p>
                            <a 
                                href="mailto:contato@vanmos.com.br" 
                                className="contato-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Enviar E-mail
                            </a>
                        </div>

                        {/* Cartão WhatsApp */}
                        <div className="contato-card">
                            <div className="contato-icon">
                                <span><FontAwesomeIcon icon={faMessage} style={{color: "#9243bdff",}} /></span>
                            </div>
                            <h3>WhatsApp</h3>
                            <p className="contato-info">(11) 99999-8888</p>
                            <p className="contato-desc">Atendimento rápido e direto</p>
                            <a 
                                href="https://wa.me/5511999998888?text=Olá! Gostaria de saber mais sobre a VanMos." 
                                className="contato-btn whatsapp"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Abrir WhatsApp
                            </a>
                        </div>

                        {/* Cartão Telefone */}
                        <div className="contato-card">
                            <div className="contato-icon">
                                <span><FontAwesomeIcon icon={faPhone} style={{color: "#9243bdff",}} /></span>
                            </div>
                            <h3>Telefone</h3>
                            <p className="contato-info">(11) 3333-4444</p>
                            <p className="contato-desc">Seg à Sex: 8h às 18h</p>
                            <a 
                                href="tel:+551133334444" 
                                className="contato-btn"
                            >
                                Ligar Agora
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formulário de Contato */}
            <section className="formulario-contato">
                <div className="container">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <h2>Envie sua Mensagem</h2>
                            <p>Preencha o formulário abaixo e nossa equipe entrará em contato</p>
                        </div>

                        <form className="contato-form" onSubmit={handleSubmit}>
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
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Digite seu e-mail"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="telefone">Telefone</label>
                                    <input
                                        type="tel"
                                        id="telefone"
                                        name="telefone"
                                        placeholder="(11) 99999-9999"
                                        value={formData.telefone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="assunto">Assunto</label>
                                    <select
                                        id="assunto"
                                        name="assunto"
                                        value={formData.assunto}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecione um assunto</option>
                                        <option value="duvida">Dúvida Geral</option>
                                        <option value="suporte">Suporte Técnico</option>
                                        <option value="parceria">Parceria</option>
                                        <option value="motorista">Quero ser Motorista</option>
                                        <option value="reclamacao">Reclamação</option>
                                        <option value="sugestao">Sugestão</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="mensagem">Mensagem</label>
                                <textarea
                                    id="mensagem"
                                    name="mensagem"
                                    placeholder="Digite sua mensagem..."
                                    rows="6"
                                    value={formData.mensagem}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Horários de Atendimento */}
            <section className="horarios-atendimento">
                <div className="container">
                    <div className="horarios-content">
                        <h2>Horários de Atendimento</h2>
                        <div className="horarios-grid">
                            <div className="horario-item">
                                <span className="dia">Segunda a Sexta</span>
                                <span className="hora">8h às 18h</span>
                            </div>
                            <div className="horario-item">
                                <span className="dia">Sábado</span>
                                <span className="hora">9h às 14h</span>
                            </div>
                            <div className="horario-item">
                                <span className="dia">Domingo</span>
                                <span className="hora">Fechado</span>
                            </div>
                        </div>
                        <p className="horario-obs">
                            * WhatsApp disponível 24h para emergências
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contato
