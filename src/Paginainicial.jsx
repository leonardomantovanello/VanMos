import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faMoneyBillTrendUp, faShield, faVanShuttle } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

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
                        <div className="hero-actions">
                            <Link to="/motoristas" className="cta-btn">
                                <FontAwesomeIcon icon={faPeopleGroup} style={{color: "#B197FC",}} /> Ver Motoristas
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="floating-card">
                            <div className="card-icon"><FontAwesomeIcon icon={faVanShuttle} style={{color: "#6d1a6d"}} /></div>
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
                            <div className="feature-icon"><FontAwesomeIcon icon={faBolt} style={{color: "#913b91ff",}} /></div>
                            <h3>Rápido & Eficiente</h3>
                            <p>Otimização de rotas em tempo real para chegar ao seu destino mais rapidamente.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><FontAwesomeIcon icon={faShield} style={{color: "#913b91ff",}} /></div>
                            <h3>Seguro & Confiável</h3>
                            <p>Motoristas verificados e veículos monitorados para sua total segurança.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><FontAwesomeIcon icon={faMoneyBillTrendUp} style={{color: "#913b91ff",}} /></div>
                            <h3>Preços Justos</h3>
                            <p>Tarifas transparentes e competitivas sem taxas ocultas.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PaginaInicial