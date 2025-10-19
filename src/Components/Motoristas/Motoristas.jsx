import React, { useState, useEffect } from 'react'
import './Motoristas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faVanShuttle, faStar, faPhone, faMap, faSchool, faFilter } from '@fortawesome/free-solid-svg-icons'
import { motoristasApi } from '../../services/motoristasApi'



const Motoristas = () => {
    const [allMotoristas, setAllMotoristas] = useState([])
    
    const [filtroLocalizacao, setFiltroLocalizacao] = useState('')
    const [filtroEscola, setFiltroEscola] = useState('')
    const [motoristas, setMotoristas] = useState(allMotoristas)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
        carregarMotoristasAtivos()
    }, [])

    const carregarMotoristasAtivos = async () => {
        try {
            const data = await motoristasApi.listar()
            const motoristasAtivos = data.filter(motorista => motorista.ativo)
            setAllMotoristas(motoristasAtivos)
        } catch (error) {
            console.error('Erro ao carregar motoristas:', error)
        }
    }
    
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
                                    <h3>{motorista.nome || motorista.nomeCompleto}</h3>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faPhone} style={{color: "#9243bdff",}} /></span>
                                        <span>{motorista.email || motorista.gmail}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faUser} style={{color: "#9243bdff"}} /></span>
                                        <span>CPF: {motorista.cpf ? motorista.cpf.slice(0, -2) + '**' : 'Não informado'}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faMap} style={{color: "#9243bdff",}} /></span>
                                        <span>Idade: {motorista.idade} anos</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faUser} style={{color: "#9243bdff",}} /></span>
                                        <span>Gênero: {motorista.genero || 'Não informado'}</span>
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