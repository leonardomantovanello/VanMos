import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../ForgotPassword/ForgotPassword.css'
import './AnaliseCadastro.css'
import { aprovacaoApi } from '../../services/aprovacaoApi'

const CAMPOS = [
    ['nome', 'Nome completo'],
    ['cpf', 'CPF'],
    ['rg', 'RG'],
    ['cnh', 'CNH'],
    ['telefone', 'Telefone'],
    ['email', 'E-mail'],
    ['idade', 'Idade'],
    ['genero', 'Gênero'],
]

const formatarData = (valor) => {
    if (!valor) return '-'
    try {
        return new Date(valor).toLocaleString('pt-BR')
    } catch {
        return valor
    }
}

const AnaliseCadastro = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') || ''

    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [motorista, setMotorista] = useState(null)
    const [processando, setProcessando] = useState(false)
    const [resultado, setResultado] = useState(null)
    const [mostrarMotivo, setMostrarMotivo] = useState(false)
    const [motivo, setMotivo] = useState('')

    useEffect(() => {
        if (!token) {
            setCarregando(false)
            return
        }

        aprovacaoApi.buscarPorToken(token)
            .then((resposta) => {
                if (resposta?.sucesso) {
                    setMotorista(resposta.dados)
                } else {
                    setErro(resposta?.mensagem || 'Não foi possível carregar este cadastro.')
                }
            })
            .catch(() => setErro('Não foi possível carregar este cadastro.'))
            .finally(() => setCarregando(false))
    }, [token])

    const handleAprovar = async () => {
        setProcessando(true)
        try {
            const resposta = await aprovacaoApi.aprovar(token)
            if (resposta?.sucesso) {
                setResultado({ tipo: 'aprovado', mensagem: resposta.mensagem })
            } else {
                setErro(resposta?.mensagem || 'Não foi possível aprovar este cadastro.')
            }
        } catch {
            setErro('Não foi possível aprovar este cadastro.')
        } finally {
            setProcessando(false)
        }
    }

    const handleReprovar = async () => {
        setProcessando(true)
        try {
            const resposta = await aprovacaoApi.reprovar(token, motivo.trim())
            if (resposta?.sucesso) {
                setResultado({ tipo: 'reprovado', mensagem: resposta.mensagem })
            } else {
                setErro(resposta?.mensagem || 'Não foi possível reprovar este cadastro.')
            }
        } catch {
            setErro('Não foi possível reprovar este cadastro.')
        } finally {
            setProcessando(false)
        }
    }

    return (
        <div className="forgot-password-container analise-cadastro-container">
            <div className="forgot-password-background">
                <div className="bg-circle circle-1"></div>
                <div className="bg-circle circle-2"></div>
                <div className="bg-circle circle-3"></div>
            </div>

            <button type="button" className="voltar-btn" onClick={() => navigate('/')}>
                <span>←</span> Início
            </button>

            <div className="forgot-password-content analise-cadastro-content">
                {!token ? (
                    <div className="forgot-password-header">
                        <h1 className="forgot-password-title">Link inválido</h1>
                        <p className="forgot-password-subtitle">
                            Este link de aprovação está incompleto.
                        </p>
                    </div>
                ) : carregando ? (
                    <div className="forgot-password-header">
                        <h1 className="forgot-password-title">Carregando...</h1>
                    </div>
                ) : resultado ? (
                    <div className="forgot-password-header">
                        <h1 className="forgot-password-title">
                            {resultado.tipo === 'aprovado' ? 'Cadastro aprovado' : 'Cadastro reprovado'}
                        </h1>
                        <p className="forgot-password-subtitle">{resultado.mensagem}</p>
                    </div>
                ) : erro ? (
                    <div className="forgot-password-header">
                        <h1 className="forgot-password-title">Não foi possível continuar</h1>
                        <p className="forgot-password-subtitle">{erro}</p>
                    </div>
                ) : (
                    <>
                        <div className="forgot-password-header">
                            <h1 className="forgot-password-title">Análise de cadastro</h1>
                            <p className="forgot-password-subtitle">
                                Confira os dados e documentos antes de decidir
                            </p>
                        </div>

                        <div className="analise-dados">
                            {CAMPOS.map(([chave, rotulo]) => (
                                <div className="analise-dado-item" key={chave}>
                                    <span className="analise-dado-rotulo">{rotulo}</span>
                                    <span className="analise-dado-valor">{motorista?.[chave] || '-'}</span>
                                </div>
                            ))}
                            <div className="analise-dado-item">
                                <span className="analise-dado-rotulo">Data do cadastro</span>
                                <span className="analise-dado-valor">{formatarData(motorista?.criadoEm)}</span>
                            </div>
                        </div>

                        <div className="analise-documentos">
                            <div className="analise-documento">
                                <span className="analise-dado-rotulo">Documento do RG</span>
                                {motorista?.rgDocumentoBase64
                                    ? <img src={motorista.rgDocumentoBase64} alt="Documento do RG" />
                                    : <p className="analise-documento-vazio">Não enviado</p>}
                            </div>
                            <div className="analise-documento">
                                <span className="analise-dado-rotulo">Documento da CNH</span>
                                {motorista?.cnhDocumentoBase64
                                    ? <img src={motorista.cnhDocumentoBase64} alt="Documento da CNH" />
                                    : <p className="analise-documento-vazio">Não enviado</p>}
                            </div>
                        </div>

                        {mostrarMotivo && (
                            <div className="input-group">
                                <label htmlFor="motivo">Motivo da reprovação (opcional)</label>
                                <textarea
                                    id="motivo"
                                    rows={3}
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                    placeholder="Explique por que este cadastro está sendo reprovado"
                                />
                            </div>
                        )}

                        <div className="analise-acoes">
                            {!mostrarMotivo ? (
                                <>
                                    <button
                                        type="button"
                                        className="reset-btn analise-btn-aprovar"
                                        onClick={handleAprovar}
                                        disabled={processando}
                                    >
                                        {processando ? 'Aprovando...' : 'Aprovar motorista'}
                                    </button>
                                    <button
                                        type="button"
                                        className="reset-btn analise-btn-reprovar"
                                        onClick={() => setMostrarMotivo(true)}
                                        disabled={processando}
                                    >
                                        Reprovar motorista
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="reset-btn analise-btn-reprovar"
                                        onClick={handleReprovar}
                                        disabled={processando}
                                    >
                                        {processando ? 'Enviando...' : 'Confirmar reprovação'}
                                    </button>
                                    <button
                                        type="button"
                                        className="reset-btn analise-btn-cancelar"
                                        onClick={() => setMostrarMotivo(false)}
                                        disabled={processando}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AnaliseCadastro
