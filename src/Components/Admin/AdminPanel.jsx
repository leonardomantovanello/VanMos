import React, { useState, useEffect } from 'react'
import './AdminPanel.css'
import { useNavigate } from 'react-router-dom'
import { motoristasApi } from '../../services/motoristasApi'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [motoristas, setMotoristas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [novoMotorista, setNovoMotorista] = useState({
    nomeCompleto: '',
    gmail: '',
    cpf: '',
    senha: '',
    cnh: '',
    placaVan: '',
    modeloVan: '',
    ativo: true
  })

  useEffect(() => {
    carregarMotoristas()
  }, [])

  const carregarMotoristas = async () => {
    try {
      const data = await motoristasApi.listar()
      setMotoristas(data || [])
    } catch (error) {
      console.error('Erro ao carregar motoristas:', error)
    }
  }

  const toggleStatus = async (index) => {
    const motorista = motoristas[index]
    try {
      if (motorista.ativo) {
        await motoristasApi.inativar(motorista.id)
      } else {
        await motoristasApi.ativar(motorista.id)
      }
      carregarMotoristas()
    } catch (error) {
      alert('Erro ao conectar com o servidor')
    }
  }

  const handleAddMotorista = async (e) => {
    e.preventDefault()
    try {
      console.log('Enviando motorista:', novoMotorista)
      const response = await motoristasApi.adicionar(novoMotorista)
      console.log('Resposta da API:', response)
      
      if (response.sucesso) {
        setShowModal(false)
        setNovoMotorista({ nomeCompleto: '', gmail: '', cpf: '', senha: '', cnh: '', placaVan: '', modeloVan: '', ativo: true })
        await carregarMotoristas()
        alert('Motorista adicionado com sucesso!')
      } else {
        alert('Erro: ' + response.mensagem)
      }
    } catch (error) {
      console.error('Erro completo:', error)
      alert('Erro ao conectar com o servidor: ' + error.message)
    }
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
                <th>Gmail</th>
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
                  <tr key={motorista.id || index}>
                    <td>{motorista.nomeCompleto}</td>
                    <td>{motorista.gmail}</td>
                    <td>{motorista.cpf}</td>
                    <td>{motorista.cnh || '-'}</td>
                    <td>{motorista.placaVan || '-'}</td>
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
                value={novoMotorista.nomeCompleto}
                onChange={(e) => setNovoMotorista({...novoMotorista, nomeCompleto: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Gmail"
                value={novoMotorista.gmail}
                onChange={(e) => setNovoMotorista({...novoMotorista, gmail: e.target.value})}
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
                value={novoMotorista.placaVan}
                onChange={(e) => setNovoMotorista({...novoMotorista, placaVan: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Modelo da Van"
                value={novoMotorista.modeloVan}
                onChange={(e) => setNovoMotorista({...novoMotorista, modeloVan: e.target.value})}
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
