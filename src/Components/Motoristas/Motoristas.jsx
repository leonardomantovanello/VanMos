import React, { useState, useEffect } from 'react'
import './Motoristas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMap, faSchool } from '@fortawesome/free-solid-svg-icons'
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
            const data = await motoristasApi.listarPublico()
            setAllMotoristas(data)
        } catch (error) {
            console.error('Erro ao carregar motoristas:', error)
        }
    }

    useEffect(() => {
        let motoristasFiltrados = allMotoristas

        if (filtroLocalizacao) {
            motoristasFiltrados = motoristasFiltrados.filter(motorista =>
                (motorista.placaVan || '').toLowerCase().includes(filtroLocalizacao.toLowerCase())
            )
        }

        if (filtroEscola) {
            motoristasFiltrados = motoristasFiltrados.filter(motorista =>
                (motorista.modeloVan || '').toLowerCase().includes(filtroEscola.toLowerCase())
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
                    
                    <div className="filters-inputs">
                        <div className="filter-group">
                            <label htmlFor="placa">
                                <FontAwesomeIcon icon={faMap} /> Placa da van
                            </label>
                            <input
                                type="text"
                                id="placa"
                                placeholder="Digite a placa..."
                                value={filtroLocalizacao}
                                onChange={(e) => setFiltroLocalizacao(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <label htmlFor="modelo">
                                <FontAwesomeIcon icon={faSchool} /> Modelo da van
                            </label>
                            <input
                                type="text"
                                id="modelo"
                                placeholder="Digite o modelo..."
                                value={filtroEscola}
                                onChange={(e) => setFiltroEscola(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="motoristas-grid">
                        {motoristas.map(motorista => (
                            <div key={motorista.id} className="motorista-card">
                                <div className="motorista-foto">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div className="motorista-info">
                                    <h3>{motorista.nomeCompleto}</h3>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faMap} style={{color: "#9243bdff"}} /></span>
                                        <span>Placa: {motorista.placaVan || 'Não informado'}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="icon"><FontAwesomeIcon icon={faSchool} style={{color: "#9243bdff"}} /></span>
                                        <span>Van: {motorista.modeloVan || 'Não informado'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-elements">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
            </section>
        </div>
    )
}

export default Motoristas