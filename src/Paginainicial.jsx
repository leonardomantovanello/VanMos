import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faMoneyBillTrendUp, faShield, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

import './Paginainicial.css'

const PaginaInicial = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setIsVisible(true)
        
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
                <div className="hero-content">
                    <h1 className="vanmos-title">VANMOS</h1>
                    <div className="hero-actions">
                        <Link to="/motoristas" className="cta-btn pulse-btn">
                            <FontAwesomeIcon icon={faPeopleGroup} style={{color: "#B197FC",}} /> 
                            <span>Ver Motoristas</span>
                            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                        </Link>
                    </div>
                </div>
                
                {/* Animated background elements */}
                <div className="bg-elements">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>

                    <div className="cursor-glow" 
                         style={{
                             left: mousePosition.x - 100,
                             top: mousePosition.y - 100
                         }}></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Por que escolher VanMos?</h2>
                    <div className="features-grid">
                        <div className="feature-card interactive-feature">
                            <div className="feature-icon bounce-icon">
                                <FontAwesomeIcon icon={faBolt} style={{color: "#913b91ff"}} />
                            </div>
                            <h3>Rápido & Eficiente</h3>
                            <p>Otimização de rotas em tempo real para chegar ao seu destino mais rapidamente.</p>
                            <div className="feature-progress">
                                <div className="progress-bar" style={{width: '95%'}}></div>
                            </div>
                        </div>
                        <div className="feature-card interactive-feature">
                            <div className="feature-icon bounce-icon">
                                <FontAwesomeIcon icon={faShield} style={{color: "#913b91ff"}} />
                            </div>
                            <h3>Seguro & Confiável</h3>
                            <p>Motoristas verificados e veículos monitorados para sua total segurança.</p>
                            <div className="feature-progress">
                                <div className="progress-bar" style={{width: '98%'}}></div>
                            </div>
                        </div>
                        <div className="feature-card interactive-feature">
                            <div className="feature-icon bounce-icon">
                                <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{color: "#913b91ff"}} />
                            </div>
                            <h3>Preços Justos</h3>
                            <p>Tarifas transparentes e competitivas sem taxas ocultas.</p>
                            <div className="feature-progress">
                                <div className="progress-bar" style={{width: '92%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PaginaInicial