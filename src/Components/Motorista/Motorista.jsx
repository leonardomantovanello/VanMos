    import React, { useState, useEffect, useMemo } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { useTheme } from '../../contexts/ThemeContext'
    import { useAuth } from '../../contexts/AuthContext'
    import { passageirosApi } from '../../services/passageirosApi'
    import { alunosApi } from '../../services/alunosApi'
    import { isValidPassword } from '../../utils/validators'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import {faChartSimple, faChartPie, faSun, faGear, faUsers, faUser,
    faMoneyBill, faVanShuttle, faDoorClosed,faMoon, faPhone, faMapPin, faTrashCan,
    faPlus, faPencil, faMapLocation, faIdCard, faLock}
    from '@fortawesome/free-solid-svg-icons'
    import DonutChart from '../Charts/DonutChart'
    import BarChart from '../Charts/BarChart'
    import './Motorista.css'


const Motorista = () => {
    const navigate = useNavigate()
    const { isDark, toggleTheme } = useTheme()
    const { guardianUser, isGuardianAuthenticated, updateGuardian, logoutGuardian } = useAuth()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [showAddPassenger, setShowAddPassenger] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [driverName, setDriverName] = useState('Motorista')
    const [passageiros, setPassageiros] = useState([])
    const [carregandoPassageiros, setCarregandoPassageiros] = useState(true)
    const [erroPassageiros, setErroPassageiros] = useState('')
    const [novoPassageiro, setNovoPassageiro] = useState({
        nomeAluno: '', telefoneResponsavel: '', enderecoEmbarque: '', enderecoDesembarque: '', escola: '', turno: '',
        valor: '',
        nomeResponsavel: '', cpfResponsavel: '', emailResponsavel: '', idadeResponsavel: '', generoResponsavel: ''
    })
    const [cadastrandoPassageiro, setCadastrandoPassageiro] = useState(false)
    // Lista estática: cadastro/remoção de escola só existia na aba Rota
    // (removida) — hoje só serve pro <select> do modal de passageiro.
    const [escolas] = useState([
        { nome: 'Escola Municipal A', endereco: 'Rua das Flores, 123 - Centro' },
        { nome: 'Colégio Estadual B', endereco: 'Av. Principal, 456 - Bairro Norte' },
        { nome: 'Escola Particular C', endereco: 'Rua da Educação, 789 - Vila Sul' },
        { nome: 'Instituto Federal', endereco: 'Av. Tecnológica, 100 - Campus' },
        { nome: 'Universidade Local', endereco: 'Rua Universitária, 500 - Centro Acadêmico' }
    ])
    const [showPassageiroDetails, setShowPassageiroDetails] = useState(false)
    const [selectedPassageiro, setSelectedPassageiro] = useState(null)
    const [showEditPassageiro, setShowEditPassageiro] = useState(false)
    const [editingPassageiro, setEditingPassageiro] = useState(null)
    const [showPerfil, setShowPerfil] = useState(false)
    const [loggedUser, setLoggedUser] = useState({})
    const [editingPerfil, setEditingPerfil] = useState(false)
    const [ajustesTab, setAjustesTab] = useState('senha')
    const [senhaForm, setSenhaForm] = useState({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' })
    const [alterandoSenha, setAlterandoSenha] = useState(false)

    // Passageiros agrupados por turno — vira o donut chart do dashboard.
    const statsPorTurno = useMemo(() => {
        const cores = { MANHA: '#b38fc6', TARDE: '#B197FC', NOITE: '#6d1a6d' }
        const rotulos = { MANHA: 'Manhã', TARDE: 'Tarde', NOITE: 'Noite' }
        const contagem = { MANHA: 0, TARDE: 0, NOITE: 0 }
        let semTurno = 0

        passageiros.forEach(p => {
            if (p.turno && contagem[p.turno] !== undefined) contagem[p.turno]++
            else semTurno++
        })

        const resultado = Object.keys(contagem)
            .filter(turno => contagem[turno] > 0)
            .map(turno => ({ label: rotulos[turno], value: contagem[turno], color: cores[turno] }))

        if (semTurno > 0) {
            resultado.push({ label: 'Não definido', value: semTurno, color: 'rgba(255, 255, 255, 0.25)' })
        }

        return resultado
    }, [passageiros])

    // Passageiros agrupados por escola (top 6) — vira o bar chart do dashboard.
    const statsPorEscola = useMemo(() => {
        const paleta = ['#b38fc6', '#B197FC', '#6d1a6d', '#4ade80', '#e6ccff', '#9333ea']
        const contagem = {}

        passageiros.forEach(p => {
            const escola = p.escola || 'Não informada'
            contagem[escola] = (contagem[escola] || 0) + 1
        })

        return Object.entries(contagem)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([escola, valor], i) => ({ label: escola, value: valor, color: paleta[i % paleta.length] }))
    }, [passageiros])

    // Soma o valor mensal dos alunos ativos — só conta receita de quem está
    // sendo transportado de fato agora, não alunos inativos/desligados.
    const receitaMensal = useMemo(() => {
        return passageiros
            .filter(p => p.status === 'ativo')
            .reduce((soma, p) => soma + (Number(p.valor) || 0), 0)
    }, [passageiros])

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
        valor: aluno.valor,
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
                valor: novoPassageiro.valor ? Number(novoPassageiro.valor) : null,
            })

            await carregarPassageiros()

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
                valor: editingPassageiro.valor ? Number(editingPassageiro.valor) : null,
                ativo: editingPassageiro.ativo,
            })
            await carregarPassageiros()
            setShowEditPassageiro(false)
            setEditingPassageiro(null)
        } catch (error) {
            alert(error.message || 'Erro ao editar passageiro')
        }
    }

    const handleSenhaInputChange = (e) => {
        setSenhaForm({
            ...senhaForm,
            [e.target.name]: e.target.value
        })
    }

    const handleAlterarSenha = async (e) => {
        e.preventDefault()

        if (senhaForm.novaSenha !== senhaForm.confirmarNovaSenha) {
            alert('A nova senha e a confirmação não coincidem')
            return
        }
        if (!isValidPassword(senhaForm.novaSenha)) {
            alert('A nova senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número')
            return
        }

        setAlterandoSenha(true)
        try {
            await passageirosApi.alterarSenha(guardianUser.id, senhaForm.senhaAtual, senhaForm.novaSenha)
            alert('Senha alterada com sucesso!')
            setSenhaForm({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' })
        } catch (error) {
            alert(error.message || 'Erro ao alterar senha')
        } finally {
            setAlterandoSenha(false)
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
                    </nav>

                    <div className="settings-container">
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
                                    className="perfil-option"
                                    onClick={() => { setShowPerfil(true); setIsSettingsOpen(false) }}
                                >
                                    <FontAwesomeIcon icon={faUser} style={{color: "#b852b8ff"}} /> Meu Perfil
                                </button>
                                <button
                                    className="ajustes-option"
                                    onClick={() => { setActiveTab('ajustes'); setIsSettingsOpen(false) }}
                                >
                                    <FontAwesomeIcon icon={faGear} style={{color: "#b852b8ff"}} /> Ajustes
                                </button>
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
                                    <h3>{passageiros.filter(p => p.status === 'ativo').length}</h3>
                                    <p>Passageiros Ativos</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faMapLocation} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>{new Set(passageiros.map(p => p.escola)).size}</h3>
                                    <p>Escolas Atendidas</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FontAwesomeIcon icon={faMoneyBill} style={{color: "#b852b8ff"}} /></div>
                                <div className="stat-info">
                                    <h3>R$ {receitaMensal.toFixed(2).replace('.', ',')}</h3>
                                    <p>Receita Mensal</p>
                                </div>
                            </div>
                        </div>

                        {passageiros.length > 0 ? (
                            <div className="charts-grid">
                                <div className="chart-card">
                                    <div className="card-header">
                                        <h3><FontAwesomeIcon icon={faChartPie} style={{color: "#b38fc6"}} /> Passageiros por Turno</h3>
                                    </div>
                                    <DonutChart data={statsPorTurno} centerLabel="passageiros" />
                                </div>
                                <div className="chart-card">
                                    <div className="card-header">
                                        <h3><FontAwesomeIcon icon={faMapLocation} style={{color: "#b38fc6"}} /> Passageiros por Escola</h3>
                                    </div>
                                    <BarChart data={statsPorEscola} />
                                </div>
                            </div>
                        ) : (
                            !carregandoPassageiros && (
                                <p className="empty-state">Cadastre passageiros para ver os gráficos do dashboard.</p>
                            )
                        )}

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
                                        <div className="detail-row">
                                            <span className="detail-label">Valor mensal:</span>
                                            <span className="detail-value">
                                                {selectedPassageiro.valor ? `R$ ${Number(selectedPassageiro.valor).toFixed(2).replace('.', ',')}` : 'Não informado'}
                                            </span>
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
                                        <input
                                            type="number"
                                            name="valor"
                                            placeholder="Valor mensal (R$)"
                                            value={editingPassageiro.valor ?? ''}
                                            onChange={handleEditPassageiroInputChange}
                                            min="0"
                                            step="0.01"
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

                {activeTab === 'ajustes' && (
                    <div className="ajustes-section">
                        <div className="section-header-dashboard">
                            <h2>Ajustes</h2>
                            <p>Gerencie as configurações da sua conta</p>
                        </div>

                        <div className="ajustes-tabs">
                            <button
                                className={`ajustes-tab-btn ${ajustesTab === 'senha' ? 'active' : ''}`}
                                onClick={() => setAjustesTab('senha')}
                            >
                                <FontAwesomeIcon icon={faLock} /> Alterar Senha
                            </button>
                        </div>

                        {ajustesTab === 'senha' && (
                            <div className="ajustes-card">
                                <h3><FontAwesomeIcon icon={faLock} style={{color: "#b38fc6"}} /> Alterar Senha</h3>
                                <p className="form-section-label">Confirme sua senha atual para definir uma nova senha de acesso.</p>
                                <form className="ajustes-form" onSubmit={handleAlterarSenha}>
                                    <input
                                        type="password"
                                        name="senhaAtual"
                                        placeholder="Senha atual"
                                        value={senhaForm.senhaAtual}
                                        onChange={handleSenhaInputChange}
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="novaSenha"
                                        placeholder="Nova senha"
                                        value={senhaForm.novaSenha}
                                        onChange={handleSenhaInputChange}
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="confirmarNovaSenha"
                                        placeholder="Confirmar nova senha"
                                        value={senhaForm.confirmarNovaSenha}
                                        onChange={handleSenhaInputChange}
                                        required
                                    />
                                    <small className="ajustes-hint">
                                        A nova senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número.
                                    </small>
                                    <div className="modal-actions">
                                        <button type="submit" className="confirm-btn" disabled={alterandoSenha}>
                                            {alterandoSenha ? 'Salvando...' : 'Salvar nova senha'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

export default Motorista