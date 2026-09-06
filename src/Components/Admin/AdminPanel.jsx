import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './AdminPanel.css'
import { useNavigate } from 'react-router-dom'
import { motoristasApi } from '../../services/motoristasApi'
import { useAuth } from '../../contexts/AuthContext'
import DonutChart from '../Charts/DonutChart'
import BarChart from '../Charts/BarChart'

const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  APROVADO: 'Aprovado',
  REPROVADO: 'Reprovado',
}

const MESES_CURTOS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

const formatarData = (valor) => {
  if (!valor) return '-'
  try {
    return new Date(valor).toLocaleDateString('pt-BR')
  } catch {
    return '-'
  }
}

const DETALHE_CAMPOS = [
  ['nome', 'Nome completo'],
  ['email', 'E-mail'],
  ['cpf', 'CPF'],
  ['rg', 'RG'],
  ['cnh', 'CNH'],
  ['telefone', 'Telefone'],
  ['idade', 'Idade'],
  ['genero', 'Gênero'],
  ['modeloVan', 'Modelo da van'],
  ['placaVan', 'Placa da van'],
]

const AdminPanel = () => {
  const navigate = useNavigate()
  const { isAdminAuthenticated, adminUser, logoutAdmin } = useAuth()

  const [motoristas, setMotoristas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [processandoId, setProcessandoId] = useState(null)
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos') // todos | ativos | inativos
  const [detalhe, setDetalhe] = useState(null)

  const sairPorSessao = useCallback(() => {
    logoutAdmin()
    navigate('/admin-login')
  }, [logoutAdmin, navigate])

  const carregarMotoristas = useCallback(async () => {
    setCarregando(true)
    setErro('')
    try {
      const data = await motoristasApi.listarAdmin()
      setMotoristas(Array.isArray(data) ? data : [])
    } catch (error) {
      if (error?.status === 401 || error?.status === 403) {
        sairPorSessao()
        return
      }
      setMotoristas([])
      setErro(error?.message || 'Não foi possível carregar os motoristas cadastrados.')
    } finally {
      setCarregando(false)
    }
  }, [sairPorSessao])

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin-login')
      return
    }
    carregarMotoristas()
  }, [isAdminAuthenticated, navigate, carregarMotoristas])

  const relatorio = useMemo(() => {
    const total = motoristas.length
    const ativos = motoristas.filter((m) => m.ativo).length
    const pendentes = motoristas.filter((m) => m.statusCadastro === 'PENDENTE').length
    const aprovados = motoristas.filter((m) => m.statusCadastro === 'APROVADO').length
    const reprovados = motoristas.filter((m) => m.statusCadastro === 'REPROVADO').length
    const comVan = motoristas.filter((m) => m.modeloVan && m.placaVan).length
    return { total, ativos, inativos: total - ativos, pendentes, aprovados, reprovados, comVan }
  }, [motoristas])

  // Cadastros nos últimos 6 meses, agrupados por mês.
  const cadastrosPorMes = useMemo(() => {
    const agora = new Date()
    const baldes = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(agora.getFullYear(), agora.getMonth() - i, 1)
      baldes.push({
        chave: `${d.getFullYear()}-${d.getMonth()}`,
        label: MESES_CURTOS[d.getMonth()],
        value: 0,
        color: '#b38fc6',
      })
    }
    const indice = new Map(baldes.map((b) => [b.chave, b]))
    motoristas.forEach((m) => {
      if (!m.criadoEm) return
      const d = new Date(m.criadoEm)
      const balde = indice.get(`${d.getFullYear()}-${d.getMonth()}`)
      if (balde) balde.value += 1
    })
    return baldes
  }, [motoristas])

  const dadosSituacao = useMemo(
    () => [
      { label: 'Ativos', value: relatorio.ativos, color: '#4ade80' },
      { label: 'Inativos', value: relatorio.inativos, color: '#ff6b6b' },
    ],
    [relatorio]
  )

  const dadosCadastro = useMemo(
    () => [
      { label: 'Aprovados', value: relatorio.aprovados, color: '#4ade80' },
      { label: 'Pendentes', value: relatorio.pendentes, color: '#fbbf24' },
      { label: 'Reprovados', value: relatorio.reprovados, color: '#ff6b6b' },
    ],
    [relatorio]
  )

  const motoristasFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return motoristas.filter((m) => {
      if (filtroStatus === 'ativos' && !m.ativo) return false
      if (filtroStatus === 'inativos' && m.ativo) return false
      if (!termo) return true
      return [m.nome, m.email, m.cpf, m.telefone, m.cnh]
        .filter(Boolean)
        .some((campo) => String(campo).toLowerCase().includes(termo))
    })
  }, [motoristas, busca, filtroStatus])

  const alterarStatus = async (motorista) => {
    const ativar = !motorista.ativo
    setProcessandoId(motorista.id)
    setAviso('')
    setErro('')

    setMotoristas((prev) =>
      prev.map((m) => (m.id === motorista.id ? { ...m, ativo: ativar } : m))
    )

    try {
      if (ativar) {
        await motoristasApi.ativar(motorista.id)
      } else {
        await motoristasApi.inativar(motorista.id)
      }
      setAviso(`${motorista.nome} foi ${ativar ? 'ativado' : 'inativado'} com sucesso.`)
    } catch (error) {
      setMotoristas((prev) =>
        prev.map((m) => (m.id === motorista.id ? { ...m, ativo: !ativar } : m))
      )
      if (error?.status === 401 || error?.status === 403) {
        sairPorSessao()
        return
      }
      setErro(error?.message || `Não foi possível ${ativar ? 'ativar' : 'inativar'} o motorista.`)
    } finally {
      setProcessandoId(null)
    }
  }

  const exportarCSV = () => {
    const colunas = [
      ['ID', 'id'],
      ['Nome', 'nome'],
      ['E-mail', 'email'],
      ['CPF', 'cpf'],
      ['RG', 'rg'],
      ['CNH', 'cnh'],
      ['Telefone', 'telefone'],
      ['Idade', 'idade'],
      ['Gênero', 'genero'],
      ['Modelo da van', 'modeloVan'],
      ['Placa da van', 'placaVan'],
      ['Status do cadastro', 'statusCadastro'],
      ['Ativo', '_ativo'],
      ['Criado em', '_criadoEm'],
    ]
    const escapar = (valor) => {
      const texto = valor == null ? '' : String(valor)
      return /[";\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto
    }
    const linhas = motoristasFiltrados.map((m) =>
      colunas
        .map(([, chave]) => {
          if (chave === '_ativo') return m.ativo ? 'Sim' : 'Não'
          if (chave === '_criadoEm') return formatarData(m.criadoEm)
          return escapar(m[chave])
        })
        .join(';')
    )
    const csv = ['﻿' + colunas.map(([titulo]) => titulo).join(';'), ...linhas].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `motoristas-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleLogout = () => {
    logoutAdmin()
    navigate('/login')
  }

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <div>
          <h1>Painel Administrativo</h1>
          {adminUser?.email && (
            <p className="admin-header-sub">Conectado como {adminUser.email}</p>
          )}
        </div>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </div>

      <div className="admin-content">
        <div className="section-header">
          <h2>Relatório de Motoristas</h2>
          <div className="section-header-acoes">
            <button onClick={exportarCSV} className="atualizar-btn" disabled={motoristas.length === 0}>
              Exportar CSV
            </button>
            <button onClick={carregarMotoristas} className="atualizar-btn" disabled={carregando}>
              {carregando ? 'Atualizando...' : 'Atualizar'}
            </button>
          </div>
        </div>

        <div className="relatorio-cards">
          <div className="relatorio-card">
            <span className="relatorio-numero">{relatorio.total}</span>
            <span className="relatorio-rotulo">Total</span>
          </div>
          <div className="relatorio-card card-ativo">
            <span className="relatorio-numero">{relatorio.ativos}</span>
            <span className="relatorio-rotulo">Ativos</span>
          </div>
          <div className="relatorio-card card-inativo">
            <span className="relatorio-numero">{relatorio.inativos}</span>
            <span className="relatorio-rotulo">Inativos</span>
          </div>
          <div className="relatorio-card">
            <span className="relatorio-numero">{relatorio.pendentes}</span>
            <span className="relatorio-rotulo">Pendentes</span>
          </div>
          <div className="relatorio-card">
            <span className="relatorio-numero">{relatorio.aprovados}</span>
            <span className="relatorio-rotulo">Aprovados</span>
          </div>
          <div className="relatorio-card">
            <span className="relatorio-numero">{relatorio.reprovados}</span>
            <span className="relatorio-rotulo">Reprovados</span>
          </div>
          <div className="relatorio-card">
            <span className="relatorio-numero">{relatorio.comVan}</span>
            <span className="relatorio-rotulo">Com van</span>
          </div>
        </div>

        {motoristas.length > 0 && (
          <div className="admin-graficos">
            <div className="admin-grafico-card">
              <h3>Situação das contas</h3>
              <DonutChart data={dadosSituacao} centerLabel="contas" />
            </div>
            <div className="admin-grafico-card">
              <h3>Status do cadastro</h3>
              <DonutChart data={dadosCadastro} centerLabel="cadastros" />
            </div>
            <div className="admin-grafico-card">
              <h3>Cadastros nos últimos 6 meses</h3>
              <BarChart data={cadastrosPorMes} />
            </div>
          </div>
        )}

        <div className="admin-filtros">
          <input
            type="search"
            className="admin-busca"
            placeholder="Buscar por nome, e-mail, CPF, telefone ou CNH"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="admin-filtro-status">
            {['todos', 'ativos', 'inativos'].map((opcao) => (
              <button
                key={opcao}
                className={filtroStatus === opcao ? 'ativo' : ''}
                onClick={() => setFiltroStatus(opcao)}
              >
                {opcao === 'todos' ? 'Todos' : opcao === 'ativos' ? 'Ativos' : 'Inativos'}
              </button>
            ))}
          </div>
        </div>

        {aviso && <div className="admin-msg admin-msg-sucesso">{aviso}</div>}
        {erro && <div className="admin-msg admin-msg-erro">{erro}</div>}

        <div className="motoristas-table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Cadastro</th>
                <th>Desde</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan="8" className="empty-state">Carregando motoristas...</td></tr>
              ) : erro && motoristas.length === 0 ? (
                <tr><td colSpan="8" className="empty-state">{erro}</td></tr>
              ) : motoristasFiltrados.length === 0 ? (
                <tr><td colSpan="8" className="empty-state">Nenhum motorista encontrado.</td></tr>
              ) : (
                motoristasFiltrados.map((motorista) => (
                  <tr key={motorista.id}>
                    <td>{motorista.nome || '-'}</td>
                    <td>{motorista.email || '-'}</td>
                    <td>{motorista.cpf || '-'}</td>
                    <td>{motorista.telefone || '-'}</td>
                    <td>{STATUS_LABEL[motorista.statusCadastro] || '-'}</td>
                    <td>{formatarData(motorista.criadoEm)}</td>
                    <td>
                      <span className={`status-badge ${motorista.ativo ? 'ativo' : 'inativo'}`}>
                        {motorista.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <div className="acoes-cell">
                        <button className="detalhe-btn" onClick={() => setDetalhe(motorista)}>
                          Detalhes
                        </button>
                        <button
                          onClick={() => alterarStatus(motorista)}
                          disabled={processandoId === motorista.id}
                          className={`toggle-btn ${motorista.ativo ? 'btn-inativar' : 'btn-ativar'}`}
                        >
                          {processandoId === motorista.id
                            ? '...'
                            : motorista.ativo
                              ? 'Inativar'
                              : 'Ativar'}
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

      {detalhe && (
        <div className="admin-modal-overlay" onClick={() => setDetalhe(null)}>
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detalhe-titulo"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div className="admin-modal-identidade">
                {detalhe.avatarBase64 ? (
                  <img src={detalhe.avatarBase64} alt="" className="admin-modal-avatar" />
                ) : (
                  <div className="admin-modal-avatar admin-modal-avatar-vazio">
                    {(detalhe.nome || '?').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 id="detalhe-titulo">{detalhe.nome || 'Motorista'}</h3>
                  <span className={`status-badge ${detalhe.ativo ? 'ativo' : 'inativo'}`}>
                    {detalhe.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  {' '}
                  <span className="admin-modal-status-cadastro">
                    {STATUS_LABEL[detalhe.statusCadastro] || 'Cadastro sem status'}
                  </span>
                </div>
              </div>
              <button className="admin-modal-fechar" onClick={() => setDetalhe(null)} aria-label="Fechar">
                ×
              </button>
            </div>

            <div className="admin-modal-dados">
              {DETALHE_CAMPOS.map(([chave, rotulo]) => (
                <div className="admin-modal-dado" key={chave}>
                  <span className="admin-modal-rotulo">{rotulo}</span>
                  <span className="admin-modal-valor">{detalhe[chave] || '-'}</span>
                </div>
              ))}
              <div className="admin-modal-dado">
                <span className="admin-modal-rotulo">Data do cadastro</span>
                <span className="admin-modal-valor">{formatarData(detalhe.criadoEm)}</span>
              </div>
            </div>

            {detalhe.statusCadastro === 'REPROVADO' && detalhe.motivoReprovacao && (
              <div className="admin-modal-motivo">
                <span className="admin-modal-rotulo">Motivo da reprovação</span>
                <p>{detalhe.motivoReprovacao}</p>
              </div>
            )}

            <div className="admin-modal-documentos">
              <div className="admin-modal-documento">
                <span className="admin-modal-rotulo">Documento do RG</span>
                {detalhe.rgDocumentoBase64 ? (
                  <a href={detalhe.rgDocumentoBase64} target="_blank" rel="noreferrer">
                    <img src={detalhe.rgDocumentoBase64} alt="Documento do RG" />
                  </a>
                ) : (
                  <p className="admin-modal-documento-vazio">Não enviado</p>
                )}
              </div>
              <div className="admin-modal-documento">
                <span className="admin-modal-rotulo">Documento da CNH</span>
                {detalhe.cnhDocumentoBase64 ? (
                  <a href={detalhe.cnhDocumentoBase64} target="_blank" rel="noreferrer">
                    <img src={detalhe.cnhDocumentoBase64} alt="Documento da CNH" />
                  </a>
                ) : (
                  <p className="admin-modal-documento-vazio">Não enviado</p>
                )}
              </div>
            </div>

            <div className="admin-modal-acoes">
              <button
                onClick={() => {
                  alterarStatus(detalhe)
                  setDetalhe(null)
                }}
                className={`toggle-btn ${detalhe.ativo ? 'btn-inativar' : 'btn-ativar'}`}
              >
                {detalhe.ativo ? 'Inativar motorista' : 'Ativar motorista'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
