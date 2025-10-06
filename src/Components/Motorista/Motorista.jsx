    import React, { useState, useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { useTheme } from '../../contexts/ThemeContext'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import {faChartSimple, faSun, faGear, faUsers, faMap, faUser, faLocationPin, faClock, 
    faMoneyBill, faVanShuttle, faDoorClosed,faMoon, faCheck, faPhone, faMapPin, faTrashCan, 
    faPlus, faArrowsUpDown, faPencil, faMapLocation, faArrowRight} 
    from '@fortawesome/free-solid-svg-icons'
    import './Motorista.css'
    import { buscarEscolasPorNome } from '../../services/googlePlaces'


const Motorista = () => {
    const navigate = useNavigate()
    const { isDark, toggleTheme } = useTheme()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [showAddPassenger, setShowAddPassenger] = useState(false)
    const [showAddRota, setShowAddRota] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [driverName, setDriverName] = useState('Motorista')
    const [passageiros, setPassageiros] = useState([
        { id: 1, nome: 'Ana Silva', telefone: '(11) 99999-1111', endereco: 'Rua A, 123', pontoEmbarque: 'Terminal Central', escola: 'Escola Municipal A', pontoDesembarque: 'Bairro Residencial', status: 'ativo' },
        { id: 2, nome: 'Carlos Santos', telefone: '(11) 99999-2222', endereco: 'Rua B, 456', pontoEmbarque: 'Avenida Principal', escola: 'Colégio Estadual B', pontoDesembarque: 'Centro Comercial', status: 'ativo' },
        { id: 3, nome: 'Maria Oliveira', telefone: '(11) 99999-3333', endereco: 'Rua C, 789', pontoEmbarque: 'Centro Comercial', escola: 'Escola Particular C', pontoDesembarque: 'Terminal Central', status: 'ativo' }
    ])
    const [rotas, setRotas] = useState([
        { id: 1, nome: 'Terminal Central', endereco: 'Av. Central, 100', horario: '07:00' },
        { id: 2, nome: 'Avenida Principal', endereco: 'Av. Principal, 500', horario: '07:15' },
        { id: 3, nome: 'Centro Comercial', endereco: 'Rua Comercial, 200', horario: '07:30' },
        { id: 4, nome: 'Bairro Residencial', endereco: 'Rua Residencial, 300', horario: '07:45' }
    ])
    const [novoPassageiro, setNovoPassageiro] = useState({
        nome: '', telefone: '', endereco: '', escola: '', valor: '', nomeResponsavel: '', telefoneResponsavel: ''
    })
    const [escolas, setEscolas] = useState([
        { nome: 'Escola Municipal A', endereco: 'Rua das Flores, 123 - Centro' },
        { nome: 'Colégio Estadual B', endereco: 'Av. Principal, 456 - Bairro Norte' },
        { nome: 'Escola Particular C', endereco: 'Rua da Educação, 789 - Vila Sul' },
        { nome: 'Instituto Federal', endereco: 'Av. Tecnológica, 100 - Campus' },
        { nome: 'Universidade Local', endereco: 'Rua Universitária, 500 - Centro Acadêmico' }
    ])
    const [showAddEscola, setShowAddEscola] = useState(false)
    const [novaEscola, setNovaEscola] = useState({ nome: '', endereco: '' })
    const [escolasSugeridas, setEscolasSugeridas] = useState([])
    const [buscandoEscolas, setBuscandoEscolas] = useState(false)
    const [novaRota, setNovaRota] = useState({
        nome: '', endereco: '', horario: ''
    })
    const [selectedRotas, setSelectedRotas] = useState([])
    const [showEditRota, setShowEditRota] = useState(false)
    const [editingRota, setEditingRota] = useState(null)
    const [draggedItem, setDraggedItem] = useState(null)
    const [alunosAdicionadosSemana, setAlunosAdicionadosSemana] = useState(2)
    const [receitaMensal, setReceitaMensal] = useState(850)
    const [showPassageiroDetails, setShowPassageiroDetails] = useState(false)
    const [selectedPassageiro, setSelectedPassageiro] = useState(null)
    const [showEditPassageiro, setShowEditPassageiro] = useState(false)
    const [editingPassageiro, setEditingPassageiro] = useState(null)
    const [bgElements, setBgElements] = useState([
        { id: 1, x: 5, y: 10, size: 300, speedX: 0.5, speedY: 0.3 },
        { id: 2, x: 80, y: 60, size: 200, speedX: -0.3, speedY: 0.4 },
        { id: 3, x: 15, y: 80, size: 150, speedX: 0.4, speedY: -0.2 },
        { id: 4, x: 70, y: 30, size: 100, speedX: -0.2, speedY: 0.5 },
        { id: 5, x: 85, y: 60, size: 80, speedX: 0.3, speedY: -0.4 }
    ])

    useEffect(() => {
        // Obter dados do usuário logado
        const loggedUser = JSON.parse(localStorage.getItem('vanmos_logged_user') || '{}')
        if (!loggedUser.nome) {
            navigate('/login')
            return
        }
        
        const nomes = loggedUser.nome.trim().split(' ')
        const primeiroNome = nomes[0]
        const ultimoNome = nomes.length > 1 ? nomes[nomes.length - 1] : ''
        setDriverName(ultimoNome ? `${primeiroNome} ${ultimoNome}` : primeiroNome)

        // Animação dos elementos de fundo
        const animateElements = () => {
            setBgElements(prev => prev.map(element => {
                let newX = element.x + element.speedX
                let newY = element.y + element.speedY
                let newSpeedX = element.speedX
                let newSpeedY = element.speedY

                // Rebater nas bordas
                if (newX <= 0 || newX >= 95) {
                    newSpeedX = -element.speedX
                    newX = Math.max(0, Math.min(95, newX))
                }
                if (newY <= 0 || newY >= 90) {
                    newSpeedY = -element.speedY
                    newY = Math.max(0, Math.min(90, newY))
                }

                return {
                    ...element,
                    x: newX,
                    y: newY,
                    speedX: newSpeedX,
                    speedY: newSpeedY
                }
            }))
        }

        const interval = setInterval(animateElements, 50)
        return () => clearInterval(interval)
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('vanmos_logged_user')
        navigate('/')
    }

    const handleAddPassenger = (e) => {
        e.preventDefault()
        const newId = Math.max(...passageiros.map(p => p.id)) + 1
        
        // Gerar login e senha para o aluno
        const nomePartes = novoPassageiro.nome.toLowerCase().split(' ')
        const primeiroNome = nomePartes[0]
        const ultimoNome = nomePartes[nomePartes.length - 1] || ''
        const login = `${primeiroNome}.${ultimoNome}@vanmos.app`
        const senha = `${primeiroNome}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
        
        // Salvar aluno como usuário no sistema
        const users = JSON.parse(localStorage.getItem('vanmos_users') || '[]')
        const novoUsuario = {
            id: Date.now(),
            nome: novoPassageiro.nome,
            email: login,
            senha: senha,
            tipo: 'aluno'
        }
        users.push(novoUsuario)
        localStorage.setItem('vanmos_users', JSON.stringify(users))
        
        // Adicionar passageiro
        setPassageiros([...passageiros, { 
            ...novoPassageiro, 
            id: newId, 
            status: 'ativo',
            login: login,
            senha: senha
        }])
        
        // Incrementar contador da semana e receita mensal
        setAlunosAdicionadosSemana(prev => prev + 1)
        setReceitaMensal(prev => prev + parseFloat(novoPassageiro.valor))
        
        // Mostrar credenciais para o motorista
        const credenciais = `Aluno cadastrado com sucesso!\n\nCredenciais para acesso ao aplicativo mobile:\n\nLogin: ${login}\nSenha: ${senha}\n\nInforme essas credenciais ao aluno.`
        alert(credenciais)
        
        setNovoPassageiro({ nome: '', telefone: '', endereco: '', escola: '', valor: '', nomeResponsavel: '', telefoneResponsavel: '' })
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

    const handleAddEscola = (e) => {
        e.preventDefault()
        if (novaEscola.nome.trim() && !escolas.find(e => e.nome === novaEscola.nome.trim())) {
            setEscolas([...escolas, { nome: novaEscola.nome.trim(), endereco: novaEscola.endereco.trim() }])
            setNovaEscola({ nome: '', endereco: '' })
            setShowAddEscola(false)
            setEscolasSugeridas([])
        }
    }

    const buscarEscolas = async (query) => {
        if (query.length < 3) {
            setEscolasSugeridas([])
            return
        }
        
        setBuscandoEscolas(true)
        try {
            const resultados = await buscarEscolasPorNome(query)
            setEscolasSugeridas(resultados)
        } catch (error) {
            console.error('Erro ao buscar escolas:', error)
            setEscolasSugeridas([])
        } finally {
            setBuscandoEscolas(false)
        }
    }

    const selecionarEscola = (escola) => {
        setNovaEscola(escola)
        setEscolasSugeridas([])
    }

    const handleRemoveEscola = (escolaNome) => {
        setEscolas(escolas.filter(e => e.nome !== escolaNome))
    }

    const handleShowPassageiroDetails = (passageiro) => {
        setSelectedPassageiro(passageiro)
        setShowPassageiroDetails(true)
    }

    const handleEditPassageiro = (passageiro) => {
        setEditingPassageiro({...passageiro})
        setShowEditPassageiro(true)
        setShowPassageiroDetails(false)
    }

    const handleUpdatePassageiro = (e) => {
        e.preventDefault()
        setPassageiros(passageiros.map(p => 
            p.id === editingPassageiro.id ? editingPassageiro : p
        ))
        setShowEditPassageiro(false)
        setEditingPassageiro(null)
    }

    const handleEditPassageiroInputChange = (e) => {
        setEditingPassageiro({
            ...editingPassageiro,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="motorista-container">
            {/* Background Elements */}
            <div className="motorista-bg-elements">
                {bgElements.map(element => (
                    <div
                        key={element.id}
                        className="motorista-floating-shape"
                        style={{
                            left: `${element.x}%`,
                            top: `${element.y}%`,
                            width: `${element.size}px`,
                            height: `${element.size}px`,
                            transition: 'all 0.05s linear'
                        }}
                    ></div>
                ))}
            </div>
            
            {/* Unified Header and Navigation */}
            <header className="motorista-header">
                <div className="header-content">
                    <div className="logo-section">
                        <h1><FontAwesomeIcon icon={faVanShuttle} style={{color: "#b38fc6"}} /> VanMos <span>Motorista</span></h1>
                        <span className="driver-name">{driverName}</span>
                    </div>
                    
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

            {/* Content */}
            <main className="motorista-content">
                {activeTab === 'dashboard' && (
                    <div className="dashboard-section">
                        <div className="section-header-dashboard">
                            <h2>Painel de Controle</h2>
                            <p>Visão geral das suas atividades</p>
                        </div>
                        
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faUser} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>{passageiros.length}</h3>
                                    <p>Passageiros Ativos</p>
                                    <span className="stat-trend">+{alunosAdicionadosSemana} esta semana</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faLocationPin} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>{rotas.length}</h3>
                                    <p>Pontos de Parada</p>
                                    <span className="stat-trend">Rota otimizada</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faClock} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>{rotas.length * 10}min</h3>
                                    <p>Tempo Médio</p>
                                    <span className="stat-trend">-5min hoje</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faMoneyBill} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>R$ {receitaMensal.toFixed(2).replace('.', ',')}</h3>
                                    <p>Receita Mensal</p>
                                    <span className="stat-trend">+12% vs mês anterior</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="dashboard-grid">
                            <div className="recent-activity">
                                <div className="card-header">
                                    <h3><FontAwesomeIcon icon={faClock} style={{color: "#b38fc6"}} /> Atividades Recentes</h3>
                                </div>
                                <div className="activity-list">
                                    <div className="activity-item">
                                        <div className="activity-icon success"><FontAwesomeIcon icon={faCheck} /></div>
                                        <div className="activity-content">
                                            <span className="activity-title">Viagem concluída</span>
                                            <span className="activity-desc">Centro → Bairro A</span>
                                        </div>
                                        <span className="activity-time">10:30</span>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon info"><FontAwesomeIcon icon={faVanShuttle} /></div>
                                        <div className="activity-content">
                                            <span className="activity-title">Rota iniciada</span>
                                            <span className="activity-desc">Turno matinal</span>
                                        </div>
                                        <span className="activity-time">07:00</span>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon warning"><FontAwesomeIcon icon={faUser} /></div>
                                        <div className="activity-content">
                                            <span className="activity-title">Novo passageiro</span>
                                            <span className="activity-desc">Maria Silva cadastrada</span>
                                        </div>
                                        <span className="activity-time">Ontem</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="quick-actions">
                                <div className="card-header">
                                    <h3><FontAwesomeIcon icon={faPlus} style={{color: "#b38fc6"}} /> Ações Rápidas</h3>
                                </div>
                                <div className="actions-grid">
                                    <button className="quick-action-btn" onClick={() => setActiveTab('passageiros')}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span>Adicionar Passageiro</span>
                                    </button>
                                    <button className="quick-action-btn" onClick={() => setActiveTab('rota')}>
                                        <FontAwesomeIcon icon={faMapPin} />
                                        <span>Nova Rota</span>
                                    </button>
                                    <button className="quick-action-btn" onClick={() => setActiveTab('rota')}>
                                        <FontAwesomeIcon icon={faMapLocation} />
                                        <span>Adicionar Escola</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'passageiros' && (
                    <div className="passageiros-section">
                        <div className="section-header">
                            <div className="section-title-group">
                                <h2><FontAwesomeIcon icon={faUsers} style={{color: "#b38fc6"}} /> Meus Passageiros</h2>
                                <p>Gerencie todos os seus passageiros cadastrados</p>
                            </div>
                            <button 
                                className="add-btn"
                                onClick={() => setShowAddPassenger(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Novo Passageiro
                            </button>
                        </div>

                        <div className="passageiros-stats">
                            <div className="mini-stat">
                                <span className="mini-stat-number">{passageiros.length}</span>
                                <span className="mini-stat-label">Total</span>
                            </div>
                            <div className="mini-stat">
                                <span className="mini-stat-number">{passageiros.filter(p => p.status === 'ativo').length}</span>
                                <span className="mini-stat-label">Ativos</span>
                            </div>
                            <div className="mini-stat">
                                <span className="mini-stat-number">{new Set(passageiros.map(p => p.escola)).size}</span>
                                <span className="mini-stat-label">Escolas</span>
                            </div>
                        </div>

                        <div className="passageiros-grid">
                            {passageiros.map(passageiro => (
                                <div 
                                    key={passageiro.id} 
                                    className="passageiro-card"
                                    onClick={() => handleShowPassageiroDetails(passageiro)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <div className="passageiro-header">
                                        <div className="passageiro-avatar">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <div className="passageiro-basic">
                                            <h4>{passageiro.nome}</h4>
                                            <span className="status-badge active">Ativo</span>
                                        </div>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => handleRemovePassenger(passageiro.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                    
                                    <div className="passageiro-details">
                                        <div className="detail-item">
                                            <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                                            <span>{passageiro.telefone}</span>
                                        </div>
                                        <div className="detail-item">
                                            <FontAwesomeIcon icon={faMapPin} className="detail-icon" />
                                            <span>{passageiro.endereco}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="escola-info">
                                        <div className="escola-display">
                                            <div className="escola-icon">
                                                <FontAwesomeIcon icon={faMapLocation} />
                                            </div>
                                            <div className="escola-content">
                                                <span className="escola-label">Escola</span>
                                                <span className="escola-value">{passageiro.escola}</span>
                                            </div>
                                        </div>
                                    </div>
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
                                            name="escola"
                                            value={novoPassageiro.escola}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Selecione a escola</option>
                                            {escolas.map(escola => (
                                                <option key={escola.nome} value={escola.nome}>
                                                    {escola.nome}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            name="valor"
                                            placeholder="Valor mensal (R$)"
                                            value={novoPassageiro.valor}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="nomeResponsavel"
                                            placeholder="Nome do responsável"
                                            value={novoPassageiro.nomeResponsavel}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="tel"
                                            name="telefoneResponsavel"
                                            placeholder="Telefone do responsável"
                                            value={novoPassageiro.telefoneResponsavel}
                                            onChange={handleInputChange}
                                            required
                                        />
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

                        {showPassageiroDetails && selectedPassageiro && (
                            <div className="modal-overlay">
                                <div className="modal modal-flexible">
                                    <h3>Detalhes do Passageiro</h3>
                                    <div className="passageiro-details-modal">
                                        <div className="detail-row">
                                            <span className="detail-label">Nome:</span>
                                            <span className="detail-value">{selectedPassageiro.nome}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Telefone:</span>
                                            <span className="detail-value">{selectedPassageiro.telefone}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Endereço:</span>
                                            <span className="detail-value">{selectedPassageiro.endereco}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Escola:</span>
                                            <span className="detail-value">{selectedPassageiro.escola}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Valor Mensal:</span>
                                            <span className="detail-value">R$ {selectedPassageiro.valor}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Responsável:</span>
                                            <span className="detail-value">{selectedPassageiro.nomeResponsavel}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Telefone do Responsável:</span>
                                            <span className="detail-value">{selectedPassageiro.telefoneResponsavel}</span>
                                        </div>
                                        {selectedPassageiro.login && (
                                            <>
                                                <div className="detail-row">
                                                    <span className="detail-label">Login:</span>
                                                    <span className="detail-value">{selectedPassageiro.login}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Senha:</span>
                                                    <span className="detail-value">{selectedPassageiro.senha}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="modal-actions">
                                        <button 
                                            className="confirm-btn"
                                            onClick={() => handleEditPassageiro(selectedPassageiro)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="cancel-btn"
                                            onClick={() => setShowPassageiroDetails(false)}
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showEditPassageiro && editingPassageiro && (
                            <div className="modal-overlay">
                                <div className="modal modal-flexible">
                                    <h3>Editar Passageiro</h3>
                                    <form onSubmit={handleUpdatePassageiro}>
                                        <input
                                            type="text"
                                            name="nome"
                                            placeholder="Nome completo"
                                            value={editingPassageiro.nome}
                                            onChange={handleEditPassageiroInputChange}
                                            required
                                        />
                                        <input
                                            type="tel"
                                            name="telefone"
                                            placeholder="Telefone"
                                            value={editingPassageiro.telefone}
                                            onChange={handleEditPassageiroInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="endereco"
                                            placeholder="Endereço"
                                            value={editingPassageiro.endereco}
                                            onChange={handleEditPassageiroInputChange}
                                            required
                                        />
                                        <select
                                            name="escola"
                                            value={editingPassageiro.escola}
                                            onChange={handleEditPassageiroInputChange}
                                            required
                                        >
                                            <option value="">Selecione a escola</option>
                                            {escolas.map(escola => (
                                                <option key={escola.nome} value={escola.nome}>
                                                    {escola.nome}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            name="valor"
                                            placeholder="Valor mensal (R$)"
                                            value={editingPassageiro.valor}
                                            onChange={handleEditPassageiroInputChange}
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="nomeResponsavel"
                                            placeholder="Nome do responsável"
                                            value={editingPassageiro.nomeResponsavel}
                                            onChange={handleEditPassageiroInputChange}
                                            required
                                        />
                                        <input
                                            type="tel"
                                            name="telefoneResponsavel"
                                            placeholder="Telefone do responsável"
                                            value={editingPassageiro.telefoneResponsavel}
                                            onChange={handleEditPassageiroInputChange}
                                            required
                                        />
                                        <div className="modal-actions">
                                            <button type="submit" className="confirm-btn">Salvar</button>
                                            <button 
                                                type="button" 
                                                className="cancel-btn"
                                                onClick={() => {
                                                    setShowEditPassageiro(false)
                                                    setEditingPassageiro(null)
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

                {activeTab === 'rota' && (
                    <div className="rota-section">
                        <div className="section-header">
                            <h2>Gerenciar Rotas<br />e Escolas</h2>
                            <div className="header-buttons">
                                <button 
                                    className="add-btn"
                                    onClick={() => setShowAddRota(true)}
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Adicionar Rota
                                </button>
                                <button 
                                    className="add-btn escola-btn"
                                    onClick={() => setShowAddEscola(true)}
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Adicionar Escola
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
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => handleRemoveRota(rota.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} style={{color: "#dc3545"}} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="escolas-card">
                                <h3><FontAwesomeIcon icon={faMapLocation} style={{color: "#b38fc6"}} /> Escolas Cadastradas</h3>
                                <div className="escolas-list">
                                    {escolas.map(escola => (
                                        <div key={escola.nome} className="escola-item">
                                            <div className="escola-info">
                                                <strong>{escola.nome}</strong>
                                                <small>{escola.endereco}</small>
                                            </div>
                                            <button 
                                                className="remove-escola-btn"
                                                onClick={() => handleRemoveEscola(escola.nome)}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} style={{color: "#dc3545"}} />
                                            </button>
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

                        {showAddEscola && (
                            <div className="modal-overlay">
                                <div className="modal escola-modal">
                                    <h3>Adicionar Nova Escola</h3>
                                    <form onSubmit={handleAddEscola}>
                                        <div className="search-container">
                                            <input
                                                type="text"
                                                placeholder="Digite o nome da escola para buscar..."
                                                value={novaEscola.nome}
                                                onChange={(e) => {
                                                    setNovaEscola({ ...novaEscola, nome: e.target.value })
                                                    buscarEscolas(e.target.value)
                                                }}
                                                required
                                            />
                                            {buscandoEscolas && <div className="loading-search">Buscando...</div>}
                                            {escolasSugeridas.length > 0 && (
                                                <div className="sugestoes-lista">
                                                    {escolasSugeridas.map((escola, index) => (
                                                        <div 
                                                            key={index} 
                                                            className="sugestao-item"
                                                            onClick={() => selecionarEscola(escola)}
                                                        >
                                                            <strong>{escola.nome}</strong>
                                                            <small>{escola.endereco}</small>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Endereço da escola"
                                            value={novaEscola.endereco}
                                            onChange={(e) => setNovaEscola({ ...novaEscola, endereco: e.target.value })}
                                            required
                                        />
                                        <div className="modal-actions">
                                            <button type="submit" className="confirm-btn">Adicionar</button>
                                            <button 
                                                type="button" 
                                                className="cancel-btn"
                                                onClick={() => {
                                                    setShowAddEscola(false)
                                                    setNovaEscola({ nome: '', endereco: '' })
                                                    setEscolasSugeridas([])
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