    import React, { useState, useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { useTheme } from '../../contexts/ThemeContext'
    import { useAuth } from '../../contexts/AuthContext'
    import { passageirosApi } from '../../services/passageirosApi'
    import { alunosApi } from '../../services/alunosApi'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import {faChartSimple, faSun, faGear, faUsers, faMap, faUser, faLocationPin, faClock,
    faMoneyBill, faVanShuttle, faDoorClosed,faMoon, faCheck, faPhone, faMapPin, faTrashCan,
    faPlus, faArrowsUpDown, faPencil, faMapLocation, faIdCard}
    from '@fortawesome/free-solid-svg-icons'
    import './Motorista.css'
    import { buscarEscolasPorNome } from '../../services/googlePlaces'


const Motorista = () => {
    const navigate = useNavigate()
    const { isDark, toggleTheme } = useTheme()
    const { guardianUser, isGuardianAuthenticated, updateGuardian, logoutGuardian } = useAuth()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [showAddPassenger, setShowAddPassenger] = useState(false)
    const [showAddRota, setShowAddRota] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [driverName, setDriverName] = useState('Motorista')
    const [passageiros, setPassageiros] = useState([])
    const [carregandoPassageiros, setCarregandoPassageiros] = useState(true)
    const [erroPassageiros, setErroPassageiros] = useState('')
    const [rotas, setRotas] = useState([
        { id: 1, nome: 'Terminal Central', endereco: 'Av. Central, 100', horario: '07:00' },
        { id: 2, nome: 'Avenida Principal', endereco: 'Av. Principal, 500', horario: '07:15' },
        { id: 3, nome: 'Centro Comercial', endereco: 'Rua Comercial, 200', horario: '07:30' },
        { id: 4, nome: 'Bairro Residencial', endereco: 'Rua Residencial, 300', horario: '07:45' }
    ])
    const [novoPassageiro, setNovoPassageiro] = useState({
        nomeAluno: '', telefoneResponsavel: '', enderecoEmbarque: '', enderecoDesembarque: '', escola: '', turno: '',
        valor: '',
        nomeResponsavel: '', cpfResponsavel: '', emailResponsavel: '', idadeResponsavel: '', generoResponsavel: ''
    })
    const [cadastrandoPassageiro, setCadastrandoPassageiro] = useState(false)
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
    const [showPerfil, setShowPerfil] = useState(false)
    const [loggedUser, setLoggedUser] = useState({})
    const [editingPerfil, setEditingPerfil] = useState(false)
    const [bgElements, setBgElements] = useState([
        { id: 1, x: 5, y: 10, size: 300, speedX: 0.5, speedY: 0.3 },
        { id: 2, x: 80, y: 60, size: 200, speedX: -0.3, speedY: 0.4 },
        { id: 3, x: 15, y: 80, size: 150, speedX: 0.4, speedY: -0.2 },
        { id: 4, x: 70, y: 30, size: 100, speedX: -0.2, speedY: 0.5 },
        { id: 5, x: 85, y: 60, size: 80, speedX: 0.3, speedY: -0.4 }
    ])


    useEffect(() => {
        // Guarda de rota: redireciona para o login se não houver responsável logado.
        if (!isGuardianAuthenticated) {
            navigate('/login')
            return
        }
        setLoggedUser(guardianUser)
        const nomes = guardianUser.nome.trim().split(' ')
        const primeiroNome = nomes[0]
        const ultimoNome = nomes.length > 1 ? nomes[nomes.length - 1] : ''
        setDriverName(ultimoNome ? `${primeiroNome} ${ultimoNome}` : primeiroNome)

        carregarPassageiros()

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


    }, [isGuardianAuthenticated, guardianUser, navigate])

    const handleLogout = () => {
        logoutGuardian()
        navigate('/')
    }

    // Mapeia o Aluno do backend pros campos que os cards/modais já usam.
    const mapAlunoParaPassageiro = (aluno) => ({
        id: aluno.id,
        nome: aluno.nome,
        telefoneResponsavel: aluno.telefoneResponsavel,
        endereco: aluno.enderecoEmbarque,
        enderecoEmbarque: aluno.enderecoEmbarque,
        enderecoDesembarque: aluno.enderecoDesembarque,
        escola: aluno.escola,
        turno: aluno.turno,
        ativo: aluno.ativo,
        status: aluno.ativo ? 'ativo' : 'inativo',
    })

    const carregarPassageiros = async () => {
        setCarregandoPassageiros(true)
        setErroPassageiros('')
        try {
            const alunos = await alunosApi.listar()
            setPassageiros(alunos.map(mapAlunoParaPassageiro))
        } catch (error) {
            console.error('Erro ao carregar passageiros:', error)
            setPassageiros([])
            setErroPassageiros(error.message || 'Não foi possível carregar os passageiros cadastrados.')
        } finally {
            setCarregandoPassageiros(false)
        }
    }

    const handleAddPassenger = async (e) => {
        e.preventDefault()
        setCadastrandoPassageiro(true)

        try {
            // Cria a conta do responsável (tabela passageiros, tipo PASSAGEIRO —
            // senha gerada e enviada por e-mail, nunca passa por aqui) E o Aluno
            // vinculado a essa conta e ao motorista logado (é o Aluno que
            // aparece no dashboard do app).
            await passageirosApi.cadastrarPeloMotorista({
                nomeResponsavel: novoPassageiro.nomeResponsavel,
                cpfResponsavel: novoPassageiro.cpfResponsavel,
                emailResponsavel: novoPassageiro.emailResponsavel,
                idadeResponsavel: novoPassageiro.idadeResponsavel ? Number(novoPassageiro.idadeResponsavel) : null,
                generoResponsavel: novoPassageiro.generoResponsavel,
                nomeAluno: novoPassageiro.nomeAluno,
                telefoneResponsavel: novoPassageiro.telefoneResponsavel,
                enderecoEmbarque: novoPassageiro.enderecoEmbarque,
                enderecoDesembarque: novoPassageiro.enderecoDesembarque,
                escola: novoPassageiro.escola,
                turno: novoPassageiro.turno,
            })

            await carregarPassageiros()

            setAlunosAdicionadosSemana(prev => prev + 1)
            if (novoPassageiro.valor) {
                setReceitaMensal(prev => prev + parseFloat(novoPassageiro.valor))
            }

            alert(`Aluno cadastrado com sucesso!\n\nA senha de acesso ao aplicativo do responsável foi enviada para ${novoPassageiro.emailResponsavel}.`)

            setNovoPassageiro({
                nomeAluno: '', telefoneResponsavel: '', enderecoEmbarque: '', enderecoDesembarque: '', escola: '', turno: '',
                valor: '',
                nomeResponsavel: '', cpfResponsavel: '', emailResponsavel: '', idadeResponsavel: '', generoResponsavel: ''
            })
            setShowAddPassenger(false)
        } catch (error) {
            alert(error.message || 'Erro ao cadastrar passageiro')
        } finally {
            setCadastrandoPassageiro(false)
        }
    }

    const handleRemovePassenger = async (id) => {
        if (!confirm('Tem certeza que deseja remover este passageiro?')) return

        try {
            await alunosApi.deletar(id)
            setPassageiros(passageiros.filter(p => p.id !== id))
        } catch (error) {
            alert(error.message || 'Erro ao remover passageiro')
        }
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

    const handleUpdatePassageiro = async (e) => {
        e.preventDefault()
        try {
            await alunosApi.editar(editingPassageiro.id, {
                nome: editingPassageiro.nome,
                telefoneResponsavel: editingPassageiro.telefoneResponsavel,
                enderecoEmbarque: editingPassageiro.enderecoEmbarque,
                enderecoDesembarque: editingPassageiro.enderecoDesembarque,
                escola: editingPassageiro.escola,
                turno: editingPassageiro.turno,
                ativo: editingPassageiro.ativo,
            })
            await carregarPassageiros()
            setShowEditPassageiro(false)
            setEditingPassageiro(null)
        } catch (error) {
            alert(error.message || 'Erro ao editar passageiro')
        }
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
                            className="perfil-btn"
                            onClick={() => setShowPerfil(true)}
                            title="Meu Perfil"
                            aria-label="Meu Perfil"
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                        <button
                            className="settings-btn"
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            aria-label="Configurações"
                            aria-expanded={isSettingsOpen}
                            aria-haspopup="true"
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

            {showPerfil && (
                <div className="modal-overlay">
                    <div className="modal modal-flexible" role="dialog" aria-modal="true" aria-labelledby="modal-title-perfil">
                        <h3 id="modal-title-perfil"><FontAwesomeIcon icon={faIdCard} style={{color: "#b38fc6"}} /> Meu Perfil</h3>
                        {editingPerfil ? (
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                updateGuardian(loggedUser)
                                setEditingPerfil(false)
                            }}>
                                <input type="text" placeholder="Nome" value={loggedUser.nome || ''} onChange={(e) => setLoggedUser({...loggedUser, nome: e.target.value})} required />
                                <input type="email" placeholder="Email" value={loggedUser.email || loggedUser.gmail || ''} onChange={(e) => setLoggedUser({...loggedUser, email: e.target.value})} />
                                <input type="tel" placeholder="Telefone" value={loggedUser.telefone || ''} onChange={(e) => setLoggedUser({...loggedUser, telefone: e.target.value})} />
                                <input type="number" placeholder="Idade" value={loggedUser.idade || ''} onChange={(e) => setLoggedUser({...loggedUser, idade: e.target.value})} />
                                <div className="modal-actions">
                                    <button type="submit" className="confirm-btn">Salvar</button>
                                    <button type="button" className="cancel-btn" onClick={() => setEditingPerfil(false)}>Cancelar</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="passageiro-details-modal">
                                    <div className="detail-row">
                                        <span className="detail-label">Nome</span>
                                        <span className="detail-value">{loggedUser.nome}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Email</span>
                                        <span className="detail-value">{loggedUser.email || loggedUser.gmail || 'Não informado'}</span>
                                    </div>
                                    {loggedUser.cpf && (
                                        <div className="detail-row">
                                            <span className="detail-label">CPF</span>
                                            <span className="detail-value">{loggedUser.cpf.slice(0, -2) + '**'}</span>
                                        </div>
                                    )}
                                    {loggedUser.telefone && (
                                        <div className="detail-row">
                                            <span className="detail-label">Telefone</span>
                                            <span className="detail-value">{loggedUser.telefone}</span>
                                        </div>
                                    )}
                                    {loggedUser.idade && (
                                        <div className="detail-row">
                                            <span className="detail-label">Idade</span>
                                            <span className="detail-value">{loggedUser.idade} anos</span>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-actions">
                                    <button className="confirm-btn" onClick={() => setEditingPerfil(true)}>
                                        <FontAwesomeIcon icon={faPencil} /> Editar
                                    </button>
                                    <button className="cancel-btn" onClick={() => setShowPerfil(false)}>Fechar</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

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

                        {carregandoPassageiros ? (
                            <p className="empty-state">Carregando passageiros...</p>
                        ) : erroPassageiros ? (
                            <p className="empty-state">{erroPassageiros}</p>
                        ) : passageiros.length === 0 ? (
                            <p className="empty-state">Nenhum passageiro cadastrado ainda.</p>
                        ) : (
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
                                            <span className={`status-badge ${passageiro.status === 'ativo' ? 'active' : ''}`}>
                                                {passageiro.status === 'ativo' ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleRemovePassenger(passageiro.id)
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                    
                                    <div className="passageiro-details">
                                        <div className="detail-item">
                                            <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                                            <span>{passageiro.telefoneResponsavel}</span>
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
                        )}

                        {showAddPassenger && (
                            <div className="modal-overlay">
                                <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title-add-passageiro">
                                    <h3 id="modal-title-add-passageiro">Adicionar Novo Passageiro</h3>
                                    <form onSubmit={handleAddPassenger}>
                                        <p className="form-section-label">Dados do aluno</p>
                                        <input
                                            type="text"
                                            name="nomeAluno"
                                            placeholder="Nome completo do aluno"
                                            value={novoPassageiro.nomeAluno}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="enderecoEmbarque"
                                            placeholder="Endereço de embarque"
                                            value={novoPassageiro.enderecoEmbarque}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="enderecoDesembarque"
                                            placeholder="Endereço de desembarque"
                                            value={novoPassageiro.enderecoDesembarque}
                                            onChange={handleInputChange}
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
                                        <select
                                            name="turno"
                                            value={novoPassageiro.turno}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Selecione o turno</option>
                                            <option value="MANHA">Manhã</option>
                                            <option value="TARDE">Tarde</option>
                                            <option value="NOITE">Noite</option>
                                        </select>
                                        <input
                                            type="number"
                                            name="valor"
                                            placeholder="Valor mensal (R$)"
                                            value={novoPassageiro.valor}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="0.01"
                                        />

                                        <p className="form-section-label">Dados do responsável (recebe o acesso ao app)</p>
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
                                        <input
                                            type="email"
                                            name="emailResponsavel"
                                            placeholder="E-mail do responsável (a senha de acesso é enviada aqui)"
                                            value={novoPassageiro.emailResponsavel}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="cpfResponsavel"
                                            placeholder="CPF do responsável"
                                            value={novoPassageiro.cpfResponsavel}
                                            onChange={handleInputChange}
                                        />
                                        <div className="modal-actions">
                                            <button type="submit" className="confirm-btn" disabled={cadastrandoPassageiro}>
                                                {cadastrandoPassageiro ? 'Cadastrando...' : 'Adicionar'}
                                            </button>
                                            <button
                                                type="button"
                                                className="cancel-btn"
                                                onClick={() => setShowAddPassenger(false)}
                                                disabled={cadastrandoPassageiro}
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
                                <div className="modal modal-flexible" role="dialog" aria-modal="true" aria-labelledby="modal-title-detalhes-passageiro">
                                    <h3 id="modal-title-detalhes-passageiro">Detalhes do Passageiro</h3>
                                    <div className="passageiro-details-modal">
                                        <div className="detail-row">
                                            <span className="detail-label">Nome:</span>
                                            <span className="detail-value">{selectedPassageiro.nome}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Telefone do responsável:</span>
                                            <span className="detail-value">{selectedPassageiro.telefoneResponsavel}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Endereço de embarque:</span>
                                            <span className="detail-value">{selectedPassageiro.enderecoEmbarque}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Endereço de desembarque:</span>
                                            <span className="detail-value">{selectedPassageiro.enderecoDesembarque || '-'}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Escola:</span>
                                            <span className="detail-value">{selectedPassageiro.escola}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Turno:</span>
                                            <span className="detail-value">{selectedPassageiro.turno || '-'}</span>
                                        </div>
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
                                <div className="modal modal-flexible" role="dialog" aria-modal="true" aria-labelledby="modal-title-edit-passageiro">
                                    <h3 id="modal-title-edit-passageiro">Editar Passageiro</h3>
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
                                            name="telefoneResponsavel"
                                            placeholder="Telefone do responsável"
                                            value={editingPassageiro.telefoneResponsavel}
                                            onChange={handleEditPassageiroInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="enderecoEmbarque"
                                            placeholder="Endereço de embarque"
                                            value={editingPassageiro.enderecoEmbarque}
                                            onChange={handleEditPassageiroInputChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="enderecoDesembarque"
                                            placeholder="Endereço de desembarque"
                                            value={editingPassageiro.enderecoDesembarque || ''}
                                            onChange={handleEditPassageiroInputChange}
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
                                        <select
                                            name="turno"
                                            value={editingPassageiro.turno || ''}
                                            onChange={handleEditPassageiroInputChange}
                                        >
                                            <option value="">Selecione o turno</option>
                                            <option value="MANHA">Manhã</option>
                                            <option value="TARDE">Tarde</option>
                                            <option value="NOITE">Noite</option>
                                        </select>
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
                                <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title-add-rota">
                                    <h3 id="modal-title-add-rota">Adicionar Nova Rota</h3>
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
                                <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title-edit-rota">
                                    <h3 id="modal-title-edit-rota">Editar Rota</h3>
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
                                <div className="modal escola-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title-add-escola">
                                    <h3 id="modal-title-add-escola">Adicionar Nova Escola</h3>
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