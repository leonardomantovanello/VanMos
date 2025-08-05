import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Motoristas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faVanShuttle, faStar, faPhone, faMap } from '@fortawesome/free-solid-svg-icons'



const Motoristas = () => {
    const navigate = useNavigate()
    const [motoristas] = useState([
        {
            id: 1,
            nome: 'João Silva',
            telefone: '(11) 99999-1111',
            van: 'Mercedes Sprinter - Placa ABC-1234',
            foto: <FontAwesomeIcon icon={faUser} style={{color: "#b38fc6",}}/>,
            avaliacao: 4.8,
            experiencia: '5 anos',
            rota: 'Centro - Zona Sul'
        },
        {
            id: 2,
            nome: 'Maria Santos',
            telefone: '(11) 99999-2222',
            van: 'Iveco Daily - Placa DEF-5678',
            foto: <FontAwesomeIcon icon={faUser} style={{color: "#b38fc6",}}/>,
            avaliacao: 4.9,
            experiencia: '3 anos',
            rota: 'Zona Norte - Centro'
        },
        {
            id: 3,
            nome: 'Carlos Oliveira',
            telefone: '(11) 99999-3333',
            van: 'Fiat Ducato - Placa GHI-9012',
            foto: <FontAwesomeIcon icon={faUser} style={{color: "#b38fc6",}}/>,
            avaliacao: 4.7,
            experiencia: '7 anos',
            rota: 'Zona Leste - Centro'
        },
        {
            id: 4,
            nome: 'Ana Costa',
            telefone: '(11) 99999-4444',
            van: 'Renault Master - Placa JKL-3456',
            foto: <FontAwesomeIcon icon={faUser} style={{color: "#b38fc6",}}/>,
            avaliacao: 4.9,
            experiencia: '4 anos',
            rota: 'Zona Oeste - Centro'
        }
    ])

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="motoristas-container">
            <section className={`motoristas-hero ${isVisible ? 'fade-in' : ''}`}>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Nossos <span className="highlight">Motoristas</span>
                    </h1>
                    <p className="hero-description">
                        Conheça nossa equipe de motoristas qualificados e experientes
                    </p>
                </div>
                
                <div className="bg-elements">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
            </section>

            <section className="motoristas-grid-section">
                <div className="container">
                    <div className="motoristas-grid">
                        {motoristas.map(motorista => (
                            <div key={motorista.id} className="motorista-card">
                                <div className="motorista-foto">
                                    <span className="foto-emoji">{motorista.foto}</span>
                                </div>
                                <div className="motorista-info">
                                    <h3>{motorista.nome}</h3>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faPhone} style={{color: "#9243bdff",}} /></span>
                                        <span>{motorista.telefone}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faVanShuttle} style={{color: "#9243bdff"}} /></span>
                                        <span>{motorista.van}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faMap} style={{color: "#9243bdff",}} /></span>
                                        <span>{motorista.rota}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faStar} style={{color: "#9243bdff",}} /></span>
                                        <span>{motorista.avaliacao} • {motorista.experiencia}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Motoristas