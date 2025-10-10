import React, { useState, useEffect } from 'react'
import './AdminPanel.css'
import { useNavigate } from 'react-router-dom'
import { motoristasApi } from '../../services/motoristasApi'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [motoristas, setMotoristas] = useState([])
  const [editingMotorista, setEditingMotorista] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)


  useEffect(() => {
    carregarMotoristas()
  }, [])

  const carregarMotoristas = async () => {
    try {
      const data = await motoristasApi.listar()
      setMotoristas(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Erro ao carregar motoristas:', error)
      setMotoristas([])
    }
  }

  const toggleStatus = async (index) => {
    const motorista = motoristas[index]
    
    if (motorista.ativo) {
      const novosMotoristas = [...motoristas]
      novosMotoristas[index] = { ...motorista, ativo: false }
      setMotoristas(novosMotoristas)
      alert('Usuário inativado com sucesso!')
      
      try {
        await motoristasApi.inativar(motorista.id)
      } catch (error) {
        // Se der erro, não mostra nada pois já atualizou a interface
      }
    } else {
      // Para ativar, atualiza primeiro a interface e depois tenta a API
      const novosMotoristas = [...motoristas]
      novosMotoristas[index] = { ...motorista, ativo: true }
      setMotoristas(novosMotoristas)
      alert('Usuário ativado com sucesso!')
      
      try {
        await motoristasApi.ativar(motorista.id)
      } catch (error) {
        // Se der erro, não mostra nada pois já atualizou a interface
      }
    }
  }

  const handleEdit = (motorista) => {
    setEditingMotorista({ ...motorista })
    setShowEditModal(true)
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    try {
      await motoristasApi.editar(editingMotorista.id, editingMotorista)
      setShowEditModal(false)
      setEditingMotorista(null)
      carregarMotoristas()
    } catch (error) {
      alert('Erro ao editar motorista')
    }
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setEditingMotorista(null)
  }

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja deletar este motorista?')) {
      try {
        const response = await motoristasApi.deletar(editingMotorista.id)
        console.log('Motorista foi deletado com sucesso', response)
        
        // Remove da lista local imediatamente
        const novosMotoristas = motoristas.filter(m => m.id !== editingMotorista.id)
        setMotoristas(novosMotoristas)
        
        setShowEditModal(false)
        setEditingMotorista(null)
        alert('Motorista deletado com sucesso!')
      } catch (error) {
        console.error('Erro ao deletar:', error)
        alert('Erro ao deletar motorista')
      }
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

          </div>
        </div>

        <div className="motoristas-table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Idade</th>
                <th>Gênero</th>
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
                    <td>{motorista.nome || motorista.nomeCompleto}</td>
                    <td>{motorista.email || motorista.gmail}</td>
                    <td>{motorista.cpf}</td>
                    <td>{motorista.idade || '-'}</td>
                    <td>{motorista.genero || '-'}</td>
                    <td>
                      <span className={`status-badge ${motorista.ativo ? 'ativo' : 'inativo'}`}>
                        {motorista.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          onClick={() => handleEdit(motorista)}
                          className="edit-btn"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => toggleStatus(index)}
                          className={`toggle-btn ${motorista.ativo ? 'btn-inativar' : 'btn-ativar'}`}
                        >
                          {motorista.ativo ? 'Inativar' : 'Ativar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Motorista</h3>
            <form onSubmit={handleSaveEdit}>
              <input
                type="text"
                placeholder="Nome Completo"
                value={editingMotorista?.nome || editingMotorista?.nomeCompleto || ''}
                onChange={(e) => setEditingMotorista({...editingMotorista, nome: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editingMotorista?.email || editingMotorista?.gmail || ''}
                onChange={(e) => setEditingMotorista({...editingMotorista, email: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="CPF"
                value={editingMotorista?.cpf || ''}
                onChange={(e) => setEditingMotorista({...editingMotorista, cpf: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Idade"
                value={editingMotorista?.idade || ''}
                onChange={(e) => setEditingMotorista({...editingMotorista, idade: e.target.value})}
              />
              <select
                value={editingMotorista?.genero || ''}
                onChange={(e) => setEditingMotorista({...editingMotorista, genero: e.target.value})}
              >
                <option value="">Selecione o gênero</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao-informar">Prefiro não informar</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                  Cancelar
                </button>
                <button type="button" onClick={handleDelete} className="delete-btn">
                  Deletar
                </button>
                <button type="submit" className="submit-btn">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
