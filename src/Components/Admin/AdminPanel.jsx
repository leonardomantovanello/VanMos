import React, { useState, useEffect } from 'react'
import './AdminPanel.css'
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [motoristas, setMotoristas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [novoMotorista, setNovoMotorista] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    cnh: '',
    placa_van: '',
    modelo_van: '',
    ativo: true
  })

  useEffect(() => {
    const motoristasCadastrados = JSON.parse(localStorage.getItem('motoristas_cadastrados') || '[]')
    setMotoristas(motoristasCadastrados)
  }, [])

  const toggleStatus = (index) => {
    const novosMotoristas = [...motoristas]
    novosMotoristas[index].ativo = !novosMotoristas[index].ativo
    setMotoristas(novosMotoristas)
    localStorage.setItem('motoristas_cadastrados', JSON.stringify(novosMotoristas))
  }

  const handleAddMotorista = (e) => {
    e.preventDefault()
    const novosMotoristas = [...motoristas, novoMotorista]
    setMotoristas(novosMotoristas)
    localStorage.setItem('motoristas_cadastrados', JSON.stringify(novosMotoristas))
    setShowModal(false)
    setNovoMotorista({ nome: '', email: '', cpf: '', senha: '', cnh: '', placa_van: '', modelo_van: '', ativo: true })
  }

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <button onClick={() => navigate('/admin-login')} className="logout-btn">Sair</button>
      </div>

      <div className="admin-content">
        <div className="section-header">
          <h2>Gerenciar Motoristas</h2>
          <div className="header-actions">
            <span className="total-count">{motoristas.length} motoristas</span>
            <button onClick={() => setShowModal(true)} className="add-btn">+ Adicionar Motorista</button>
          </div>
        </div>

        <div className="motoristas-table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>CNH</th>
                <th>Placa Van</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {motoristas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">Nenhum motorista cadastrado</td>
                </tr>
              ) : (
                motoristas.map((motorista, index) => (
                  <tr key={index}>
                    <td>{motorista.nome}</td>
                    <td>{motorista.email}</td>
                    <td>{motorista.cpf}</td>
                    <td>{motorista.cnh || '-'}</td>
                    <td>{motorista.placa_van || '-'}</td>
                    <td>
                      <span className={`status-badge ${motorista.ativo ? 'ativo' : 'inativo'}`}>
                        {motorista.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => toggleStatus(index)}
                        className={`toggle-btn ${motorista.ativo ? 'btn-inativar' : 'btn-ativar'}`}
                      >
                        {motorista.ativo ? 'Inativar' : 'Ativar'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Adicionar Novo Motorista</h3>
            <form onSubmit={handleAddMotorista}>
              <input
                type="text"
                placeholder="Nome completo"
                value={novoMotorista.nome}
                onChange={(e) => setNovoMotorista({...novoMotorista, nome: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={novoMotorista.email}
                onChange={(e) => setNovoMotorista({...novoMotorista, email: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="CPF"
                value={novoMotorista.cpf}
                onChange={(e) => setNovoMotorista({...novoMotorista, cpf: e.target.value})}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={novoMotorista.senha}
                onChange={(e) => setNovoMotorista({...novoMotorista, senha: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="CNH"
                value={novoMotorista.cnh}
                onChange={(e) => setNovoMotorista({...novoMotorista, cnh: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Placa da Van"
                value={novoMotorista.placa_van}
                onChange={(e) => setNovoMotorista({...novoMotorista, placa_van: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Modelo da Van"
                value={novoMotorista.modelo_van}
                onChange={(e) => setNovoMotorista({...novoMotorista, modelo_van: e.target.value})}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">Cancelar</button>
                <button type="submit" className="submit-btn">Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
