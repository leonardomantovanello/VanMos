import React, { useState, useEffect } from 'react'
import './AdminPanel.css'
import { useNavigate } from 'react-router-dom'
import { motoristasApi } from '../../services/motoristasApi'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [motoristas, setMotoristas] = useState([])


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


    </div>
  )
}

export default AdminPanel
