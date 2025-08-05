import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChartSimple, 
    faSun, 
    faGear, 
    faUsers, 
    faMap, 
    faUser, 
    faLocationPin, 
    faClock, 
    faMoneyBill, 
    faVanShuttle, 
    faDoorClosed,
    faMoon, 
    faCheck, 
    faPhone, 
    faMapPin, 
    faTrashCan, 
    faPlus, 
    faArrowsUpDown, 
    faPencil, 
    faMapLocation
} from '@fortawesome/free-solid-svg-icons'
import './Motorista.css'


const Motorista = () => {
    const navigate = useNavigate()
    const { isDark, toggleTheme } = useTheme()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [showAddPassenger, setShowAddPassenger] = useState(false)
    const [showAddRota, setShowAddRota] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [passageiros, setPassageiros] = useState([
        { id: 1, nome: 'Ana Silva', telefone: '(11) 99999-1111', endereco: 'Rua A, 123', ponto: 'Ponto 1', status: 'ativo' },
        { id: 2, nome: 'Carlos Santos', telefone: '(11) 99999-2222', endereco: 'Rua B, 456', ponto: 'Ponto 2', status: 'ativo' },
        { id: 3, nome: 'Maria Oliveira', telefone: '(11) 99999-3333', endereco: 'Rua C, 789', ponto: 'Ponto 3', status: 'ativo' }
    ])
    const [rotas, setRotas] = useState([
        { id: 1, nome: 'Terminal Central', endereco: 'Av. Central, 100', horario: '07:00' },
        { id: 2, nome: 'Avenida Principal', endereco: 'Av. Principal, 500', horario: '07:15' },
        { id: 3, nome: 'Centro Comercial', endereco: 'Rua Comercial, 200', horario: '07:30' },
        { id: 4, nome: 'Bairro Residencial', endereco: 'Rua Residencial, 300', horario: '07:45' }
    ])
    const [novoPassageiro, setNovoPassageiro] = useState({
        nome: '', telefone: '', endereco: '', ponto: ''
    })
    const [novaRota, setNovaRota] = useState({
        nome: '', endereco: '', horario: ''
    })
    const [selectedRotas, setSelectedRotas] = useState([])
    const [showEditRota, setShowEditRota] = useState(false)
    const [editingRota, setEditingRota] = useState(null)
    const [draggedItem, setDraggedItem] = useState(null)

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

    const handleAddRota = (e) => {
        e.preventDefault()
        const newId = Math.max(...rotas.map(r => r.id)) + 1
        const newRotas = [...rotas, { 
            ...novaRota, 
            id: newId
        }].sort((a, b) => a.horario.localeCompare(b.horario))
        setRotas(newRotas)
        setNovaRota({ nome: '', endereco: '', horario: '' })
        setShowAddRota(false)
    }

    const handleRemoveRota = (id) => {
        setRotas(rotas.filter(r => r.id !== id))
    }

    const handleSelectRota = (id) => {
        setSelectedRotas(prev => 
            prev.includes(id) 
                ? prev.filter(rotaId => rotaId !== id)
                : [...prev, id]
        )
    }

    const handleRemoveSelectedRotas = () => {
        setRotas(rotas.filter(r => !selectedRotas.includes(r.id)))
        setSelectedRotas([])
    }

    const handleEditRota = (rota) => {
        setEditingRota(rota)
        setShowEditRota(true)
    }

    const handleUpdateRota = (e) => {
        e.preventDefault()
        const updatedRotas = rotas.map(r => 
            r.id === editingRota.id ? editingRota : r
        ).sort((a, b) => a.horario.localeCompare(b.horario))
        setRotas(updatedRotas)
        setShowEditRota(false)
        setEditingRota(null)
    }

    const handleEditInputChange = (e) => {
        setEditingRota({
            ...editingRota,
            [e.target.name]: e.target.value
        })
    }

    const handleDragStart = (e, index) => {
        setDraggedItem(index)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e, dropIndex) => {
        e.preventDefault()
        if (draggedItem === null) return
        
        const newRotas = [...rotas]
        const draggedRota = newRotas[draggedItem]
        newRotas.splice(draggedItem, 1)
        newRotas.splice(dropIndex, 0, draggedRota)
        
        setRotas(newRotas)
        setDraggedItem(null)
    }

    const handleRotaInputChange = (e) => {
        setNovaRota({
            ...novaRota,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="motorista-container">
            {/* Header */}
            <header className="motorista-header">
                <div className="header-content">
                    <div className="logo-section">
                        <h1><FontAwesomeIcon icon={faVanShuttle} style={{color: "#b38fc6"}} /> VanMos Motorista</h1>
                        <span className="driver-name">João Motorista</span>
                    </div>
                    <div className="settings-container">
                        <button 
                            className="settings-btn"
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        >
                            <FontAwesomeIcon icon={faGear} style={{color: "#B197FC"}} />
                        </button>
                        {isSettingsOpen && (
                            <div className="settings-dropdown">
                                <button 
                                    className="theme-toggle"
                                    onClick={toggleTheme}
                                >
                                    {isDark ? <FontAwesomeIcon icon={faSun} style={{color: "#b852b8ff"}} /> : <FontAwesomeIcon icon={faMoon} style={{color: "#b852b8ff"}} />} {isDark ? 'Modo Claro' : 'Modo Escuro'}
                                </button>
                                <button 
                                    className="logout-option"
                                    onClick={handleLogout}
                                >
                                    <FontAwesomeIcon icon={faDoorClosed} style={{color: "#b852b8ff"}} /> Sair
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="motorista-nav">
                <button 
                    className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                   <FontAwesomeIcon icon={faChartSimple} style={{color: "#691569ff"}} /> Dashboard
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'passageiros' ? 'active' : ''}`}
                    onClick={() => setActiveTab('passageiros')}
                >
                    <FontAwesomeIcon icon={faUsers} style={{color: "#691569ff"}} /> Passageiros
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'rota' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rota')}
                >
                    <FontAwesomeIcon icon={faMap} style={{color: "#691569ff"}} /> Rota
                </button>
            </nav>

            {/* Content */}
            <main className="motorista-content">
                {activeTab === 'dashboard' && (
                    <div className="dashboard-section">
                        <h2>Dashboard</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faUser} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>{passageiros.length}</h3>
                                    <p>Passageiros Ativos</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faLocationPin} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>{rotas.length}</h3>
                                    <p>Pontos de Parada</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faClock} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>{rotas.length * 10}min</h3>
                                    <p>Tempo Médio</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faMoneyBill} style={{color: "#b852b8ff"}} /></div>
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
                                    <span className="activity-icon"><FontAwesomeIcon icon={faCheck} style={{color: "#b852b8ff"}} /></span>
                                    <span>Viagem concluída - Centro → Bairro A</span>
                                    <span className="activity-time">10:30</span>
                                </div>
                                <div className="activity-item">
                                    <span className="activity-icon"><FontAwesomeIcon icon={faVanShuttle} style={{color: "#b852b8ff"}} /></span>
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
                                <FontAwesomeIcon icon={faPlus} /> Adicionar Passageiro
                            </button>
                        </div>

                        <div className="passageiros-grid">
                            {passageiros.map(passageiro => (
                                <div key={passageiro.id} className="passageiro-card">
                                    <div className="passageiro-info">
                                        <h4>{passageiro.nome}</h4>
                                        <p><FontAwesomeIcon icon={faPhone} style={{color: "#8b258bff"}} /> {passageiro.telefone}</p>
                                        <p><FontAwesomeIcon icon={faMapPin} style={{color: "#8b258bff"}} /> {passageiro.endereco}</p>
                                        <p><FontAwesomeIcon icon={faLocationPin} style={{color: "#8b258bff"}} /> {passageiro.ponto}</p>
                                    </div>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => handleRemovePassenger(passageiro.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} style={{color: "#b852b8ff"}} />
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
                                            {rotas.map(rota => (
                                                <option key={rota.id} value={rota.nome}>
                                                    {rota.nome} - {rota.horario}
                                                </option>
                                            ))}
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
                        <div className="section-header">
                            <h2>Gerenciar Rotas</h2>
                            <div className="header-buttons">
                                <button 
                                    className="add-btn"
                                    onClick={() => setShowAddRota(true)}
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Adicionar Rota
                                </button>
                                {selectedRotas.length > 0 && (
                                    <button 
                                        className="remove-selected-btn"
                                        onClick={handleRemoveSelectedRotas}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} /> Remover Selecionadas ({selectedRotas.length})
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        <div className="rota-info">
                            <div className="rota-card">
                                <h3><FontAwesomeIcon icon={faMapLocation} style={{color: "#b38fc6"}} /> Rota Principal</h3>
                                <div className="rota-details">
                                    <p><strong>Origem:</strong> {rotas[0]?.nome || 'Terminal Central'}</p>
                                    <p><strong>Destino:</strong> {rotas[rotas.length - 1]?.nome || 'Bairro Residencial'}</p>
                                    <p><strong>Total de Paradas:</strong> {rotas.length}</p>
                                    <p><strong>Tempo Estimado:</strong> {rotas.length * 10} minutos</p>
                                </div>
                            </div>

                            <div className="pontos-parada">
                                <h3><FontAwesomeIcon icon={faMapPin} style={{color: "#b38fc6"}} /> Pontos de Parada</h3>
                                <div className="pontos-list">
                                    {rotas.map((rota, index) => (
                                        <div 
                                            key={rota.id} 
                                            className={`ponto-item ${selectedRotas.includes(rota.id) ? 'selected' : ''} ${draggedItem === index ? 'dragging' : ''}`}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, index)}
                                        >
                                            <div className="drag-handle"><FontAwesomeIcon icon={faArrowsUpDown} style={{color: "#b38fc6"}} /></div>
                                            <input 
                                                type="checkbox"
                                                className="rota-checkbox"
                                                checked={selectedRotas.includes(rota.id)}
                                                onChange={() => handleSelectRota(rota.id)}
                                            />
                                            <span className="ponto-numero">{index + 1}</span>
                                            <div className="ponto-info">
                                                <h4>{rota.nome}</h4>
                                                <p>{rota.endereco} - {rota.horario}</p>
                                            </div>
                                            <div className="ponto-actions">
                                                <button 
                                                    className="edit-btn"
                                                    onClick={() => handleEditRota(rota)}
                                                >
                                                    <FontAwesomeIcon icon={faPencil} style={{color: "#28a745"}} />
                                                </button>
                                            
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="horarios-card">
                                <h3><FontAwesomeIcon icon={faClock} style={{color: "#b38fc6"}} /> Horários de Operação</h3>
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

                        {showAddRota && (
                            <div className="modal-overlay">
                                <div className="modal">
                                    <h3>Adicionar Nova Rota</h3>
                                    <form onSubmit={handleAddRota}>
                                        <input
                                            type="text"
                                            name="nome"
                                            placeholder="Nome da parada"
                                            value={novaRota.nome}
                                            onChange={handleRotaInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="endereco"
                                            placeholder="Endereço completo"
                                            value={novaRota.endereco}
                                            onChange={handleRotaInputChange}
                                            required
                                        />
                                        <input
                                            type="time"
                                            name="horario"
                                            placeholder="Horário"
                                            value={novaRota.horario}
                                            onChange={handleRotaInputChange}
                                            required
                                        />
                                        <div className="modal-actions">
                                            <button type="submit" className="confirm-btn">Adicionar</button>
                                            <button 
                                                type="button" 
                                                className="cancel-btn"
                                                onClick={() => setShowAddRota(false)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {showEditRota && editingRota && (
                            <div className="modal-overlay">
                                <div className="modal">
                                    <h3>Editar Rota</h3>
                                    <form onSubmit={handleUpdateRota}>
                                        <input
                                            type="text"
                                            name="nome"
                                            placeholder="Nome da parada"
                                            value={editingRota.nome}
                                            onChange={handleEditInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="endereco"
                                            placeholder="Endereço completo"
                                            value={editingRota.endereco}
                                            onChange={handleEditInputChange}
                                            required
                                        />
                                        <input
                                            type="time"
                                            name="horario"
                                            placeholder="Horário"
                                            value={editingRota.horario}
                                            onChange={handleEditInputChange}
                                            required
                                        />
                                        <div className="modal-actions">
                                            <button type="submit" className="confirm-btn">Salvar</button>
                                            <button 
                                                type="button" 
                                                className="cancel-btn"
                                                onClick={() => {
                                                    setShowEditRota(false)
                                                    setEditingRota(null)
                                                }}
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
            </main>
        </div>
    )
}

export default Motorista