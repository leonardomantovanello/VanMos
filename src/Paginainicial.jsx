import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Paginainicial.css'

const PaginaInicial = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Transporte
                            <span className="highlight"> Inteligente</span>
                            <br />
                            Para Sua
                            <span className="highlight"> Cidade</span>
                        </h1>
                        <p className="hero-description">
                            Conectamos você ao melhor transporte urbano com tecnologia de ponta, 
                            segurança garantida e conforto excepcional.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/login" className="cta-button primary">
                                Começar Agora
                            </Link>
                            <Link to="/quem-somos" className="cta-button secondary">
                                Saiba Mais
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="floating-card">
                            <div className="card-icon">🚐</div>
                            <h3>VanMos Transport</h3>
                            <p>Sua jornada começa aqui</p>
                        </div>
                    </div>
                </div>
                
                {/* Animated background elements */}
                <div className="bg-elements">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Por que escolher VanMos?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Rápido & Eficiente</h3>
                            <p>Otimização de rotas em tempo real para chegar ao seu destino mais rapidamente.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛡️</div>
                            <h3>Seguro & Confiável</h3>
                            <p>Motoristas verificados e veículos monitorados para sua total segurança.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3>Preços Justos</h3>
                            <p>Tarifas transparentes e competitivas sem taxas ocultas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">10K+</div>
                            <div className="stat-label">Viagens Realizadas</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Motoristas Ativos</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Cidades Atendidas</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">4.9★</div>
                            <div className="stat-label">Avaliação Média</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PaginaInicial