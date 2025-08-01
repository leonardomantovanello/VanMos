import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Motorista.css'

const Motorista = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [showAddPassenger, setShowAddPassenger] = useState(false)
    const [passageiros, setPassageiros] = useState([
        { id: 1, nome: 'Ana Silva', telefone: '(11) 99999-1111', endereco: 'Rua A, 123', ponto: 'Ponto 1', status: 'ativo' },
        { id: 2, nome: 'Carlos Santos', telefone: '(11) 99999-2222', endereco: 'Rua B, 456', ponto: 'Ponto 2', status: 'ativo' },
        { id: 3, nome: 'Maria Oliveira', telefone: '(11) 99999-3333', endereco: 'Rua C, 789', ponto: 'Ponto 3', status: 'ativo' }
    ])
    const [novoPassageiro, setNovoPassageiro] = useState({
        nome: '', telefone: '', endereco: '', ponto: ''
    })

    const handleLogout = () => {
        navigate('/')
    }

    const handleAddPassenger = (e) => {
        e.preventDefault()
        const newId = Math.max(...passageiros.map(p => p.id)) + 1
        setPassageiros([...passageiros, { 
            ...novoPassageiro, 
            id: newId, 
            status: 'ativo' 
        }])
        setNovoPassageiro({ nome: '', telefone: '', endereco: '', ponto: '' })
        setShowAddPassenger(false)
    }

    const handleRemovePassenger = (id) => {
        setPassageiros(passageiros.filter(p => p.id !== id))
    }

    const handleInputChange = (e) => {
        setNovoPassageiro({
            ...novoPassageiro,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="motorista-container">
            {/* Header */}
            <header className="motorista-header">
                <div className="header-content">
                    <div className="logo-section">
                        <h1>🚌 VanMos Driver</h1>
                        <span className="driver-name">João Motorista</span>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Sair 🚪
                    </button>
                </div>
            </header>

            {/* Navigation */}
            <nav className="motorista-nav">
                <button 
                    className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    📊 Dashboard
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'passageiros' ? 'active' : ''}`}
                    onClick={() => setActiveTab('passageiros')}
                >
                    👥 Passageiros
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'rota' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rota')}
                >
                    🗺️ Rota
                </button>
            </nav>

            {/* Content */}
            <main className="motorista-content">
                {activeTab === 'dashboard' && (
                    <div className="dashboard-section">
                        <h2>Dashboard</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">👥</div>
                                <div className="stat-info">
                                    <h3>{passageiros.length}</h3>
                                    <p>Passageiros Ativos</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">🗺️</div>
                                <div className="stat-info">
                                    <h3>5</h3>
                                    <p>Pontos de Parada</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">⏰</div>
                                <div className="stat-info">
                                    <h3>45min</h3>
                                    <p>Tempo Médio</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">💰</div>
                                <div className="stat-info">
                                    <h3>R$ 850</h3>
                                    <p>Receita Mensal</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="recent-activity">
                            <h3>Atividade Recente</h3>
                            <div className="activity-list">
                                <div className="activity-item">
                                    <span className="activity-icon">✅</span>
                                    <span>Viagem concluída - Centro → Bairro A</span>
                                    <span className="activity-time">10:30</span>
                                </div>
                                <div className="activity-item">
                                    <span className="activity-icon">🚌</span>
                                    <span>Iniciada rota matinal</span>
                                    <span className="activity-time">07:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'passageiros' && (
                    <div className="passageiros-section">
                        <div className="section-header">
                            <h2>Gerenciar Passageiros</h2>
                            <button 
                                className="add-btn"
                                onClick={() => setShowAddPassenger(true)}
                            >
                                ➕ Adicionar Passageiro
                            </button>
                        </div>

                        <div className="passageiros-grid">
                            {passageiros.map(passageiro => (
                                <div key={passageiro.id} className="passageiro-card">
                                    <div className="passageiro-info">
                                        <h4>{passageiro.nome}</h4>
                                        <p>📞 {passageiro.telefone}</p>
                                        <p>📍 {passageiro.endereco}</p>
                                        <p>🚏 {passageiro.ponto}</p>
                                    </div>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => handleRemovePassenger(passageiro.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        {showAddPassenger && (
                            <div className="modal-overlay">
                                <div className="modal">
                                    <h3>Adicionar Novo Passageiro</h3>
                                    <form onSubmit={handleAddPassenger}>
                                        <input
                                            type="text"
                                            name="nome"
                                            placeholder="Nome completo"
                                            value={novoPassageiro.nome}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="tel"
                                            name="telefone"
                                            placeholder="Telefone"
                                            value={novoPassageiro.telefone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="endereco"
                                            placeholder="Endereço"
                                            value={novoPassageiro.endereco}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <select
                                            name="ponto"
                                            value={novoPassageiro.ponto}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Selecione o ponto</option>
                                            <option value="Ponto 1">Ponto 1 - Centro</option>
                                            <option value="Ponto 2">Ponto 2 - Bairro A</option>
                                            <option value="Ponto 3">Ponto 3 - Bairro B</option>
                                            <option value="Ponto 4">Ponto 4 - Terminal</option>
                                        </select>
                                        <div className="modal-actions">
                                            <button type="submit" className="confirm-btn">Adicionar</button>
                                            <button 
                                                type="button" 
                                                className="cancel-btn"
                                                onClick={() => setShowAddPassenger(false)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'rota' && (
                    <div className="rota-section">
                        <h2>Informações da Rota</h2>
                        <div className="rota-info">
                            <div className="rota-card">
                                <h3>🗺️ Rota Principal</h3>
                                <div className="rota-details">
                                    <p><strong>Origem:</strong> Terminal Central</p>
                                    <p><strong>Destino:</strong> Bairro Residencial</p>
                                    <p><strong>Distância:</strong> 15.2 km</p>
                                    <p><strong>Tempo Estimado:</strong> 45 minutos</p>
                                </div>
                            </div>

                            <div className="pontos-parada">
                                <h3>🚏 Pontos de Parada</h3>
                                <div className="pontos-list">
                                    <div className="ponto-item">
                                        <span className="ponto-numero">1</span>
                                        <div className="ponto-info">
                                            <h4>Terminal Central</h4>
                                            <p>Ponto de partida - 07:00</p>
                                        </div>
                                    </div>
                                    <div className="ponto-item">
                                        <span className="ponto-numero">2</span>
                                        <div className="ponto-info">
                                            <h4>Avenida Principal</h4>
                                            <p>Primeira parada - 07:15</p>
                                        </div>
                                    </div>
                                    <div className="ponto-item">
                                        <span className="ponto-numero">3</span>
                                        <div className="ponto-info">
                                            <h4>Centro Comercial</h4>
                                            <p>Segunda parada - 07:30</p>
                                        </div>
                                    </div>
                                    <div className="ponto-item">
                                        <span className="ponto-numero">4</span>
                                        <div className="ponto-info">
                                            <h4>Bairro Residencial</h4>
                                            <p>Destino final - 07:45</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="horarios-card">
                                <h3>⏰ Horários de Operação</h3>
                                <div className="horarios-grid">
                                    <div className="horario-item">
                                        <strong>Manhã:</strong> 07:00 - 12:00
                                    </div>
                                    <div className="horario-item">
                                        <strong>Tarde:</strong> 13:00 - 18:00
                                    </div>
                                    <div className="horario-item">
                                        <strong>Intervalo:</strong> 30 minutos
                                    </div>
                                    <div className="horario-item">
                                        <strong>Dias:</strong> Segunda a Sábado
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Motorista