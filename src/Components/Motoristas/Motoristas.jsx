import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Motoristas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faVanShuttle, faStar, faPhone, faMap, faSchool, faFilter } from '@fortawesome/free-solid-svg-icons'



const Motoristas = () => {
    const navigate = useNavigate()
    const [allMotoristas] = useState([
        {
            id: 1,
            nome: 'João Silva',
            telefone: '(11) 99999-1111',
            van: 'Mercedes Sprinter - Placa ABC-1234',
            foto: <FontAwesomeIcon icon={faUser} style={{color: "#b38fc6",}}/>,
            avaliacao: 4.8,
            experiencia: '5 anos',
            rota: 'Centro - Zona Sul',
            localizacao: 'São Paulo - SP',
            escola: 'Colégio São Paulo'
        },
        {
            id: 2,
            nome: 'Maria Santos',
            telefone: '(11) 99999-2222',
            van: 'Iveco Daily - Placa DEF-5678',
            foto: <FontAwesomeIcon icon={faUser} style={{color: "#b38fc6",}}/>,
            avaliacao: 4.9,
            experiencia: '3 anos',
            rota: 'Zona Norte - Centro',
            localizacao: 'Guarulhos - SP',
            escola: 'Escola Municipal Norte'
        },
        {
            id: 3,
            nome: 'Carlos Oliveira',
            telefone: '(11) 99999-3333',
            van: 'Fiat Ducato - Placa GHI-9012',
            foto: <FontAwesomeIcon icon={faUser} style={{color: "#b38fc6",}}/>,
            avaliacao: 4.7,
            experiencia: '7 anos',
            rota: 'Zona Leste - Centro',
            localizacao: 'Santo André - SP',
            escola: 'Colégio Leste'
        },
        {
            id: 4,
            nome: 'Ana Costa',
            telefone: '(11) 99999-4444',
            van: 'Renault Master - Placa JKL-3456',
            foto: <FontAwesomeIcon icon={faUser} style={{color: "#b38fc6",}}/>,
            avaliacao: 4.9,
            experiencia: '4 anos',
            rota: 'Zona Oeste - Centro',
            localizacao: 'São Paulo - SP',
            escola: 'Colégio São Paulo'
        }
    ])
    
    const [filtroLocalizacao, setFiltroLocalizacao] = useState('')
    const [filtroEscola, setFiltroEscola] = useState('')
    const [motoristas, setMotoristas] = useState(allMotoristas)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])
    
    useEffect(() => {
        let motoristasFiltrados = allMotoristas
        
        if (filtroLocalizacao) {
            motoristasFiltrados = motoristasFiltrados.filter(motorista => 
                motorista.localizacao.toLowerCase().includes(filtroLocalizacao.toLowerCase())
            )
        }
        
        if (filtroEscola) {
            motoristasFiltrados = motoristasFiltrados.filter(motorista => 
                motorista.escola.toLowerCase().includes(filtroEscola.toLowerCase())
            )
        }
        
        setMotoristas(motoristasFiltrados)
    }, [filtroLocalizacao, filtroEscola, allMotoristas])

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
                    <div className="filters-section">
                        <h2 className="filters-title">
                            <FontAwesomeIcon icon={faFilter} /> Filtrar Motoristas
                        </h2>
                        <div className="filters-grid">
                            <div className="filter-group">
                                <label htmlFor="localizacao">
                                    <FontAwesomeIcon icon={faMap} /> Localização
                                </label>
                                <input
                                    type="text"
                                    id="localizacao"
                                    placeholder="Digite a localização..."
                                    value={filtroLocalizacao}
                                    onChange={(e) => setFiltroLocalizacao(e.target.value)}
                                />
                            </div>
                            <div className="filter-group">
                                <label htmlFor="escola">
                                    <FontAwesomeIcon icon={faSchool} /> Escola
                                </label>
                                <input
                                    type="text"
                                    id="escola"
                                    placeholder="Digite o nome da escola..."
                                    value={filtroEscola}
                                    onChange={(e) => setFiltroEscola(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
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
                                        <span className="icon"><FontAwesomeIcon icon={faMap} style={{color: "#9243bdff",}} /></span>
                                        <span>{motorista.localizacao}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faSchool} style={{color: "#9243bdff",}} /></span>
                                        <span>{motorista.escola}</span>
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