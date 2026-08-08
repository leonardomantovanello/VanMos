import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../ForgotPassword/ForgotPassword.css'
import { passageirosApi } from '../../services/passageirosApi'
import { isValidPassword } from '../../utils/validators'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') || ''

    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [enviando, setEnviando] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isValidPassword(novaSenha)) {
            alert('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número')
            return
        }
        if (novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem')
            return
        }

        setEnviando(true)
        try {
            await passageirosApi.redefinirSenhaComToken(token, novaSenha)
            alert('Senha redefinida com sucesso! Faça login com a nova senha.')
            navigate('/login')
        } catch (error) {
            alert(error.message || 'Não foi possível redefinir a senha. O link pode ter expirado.')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-background">
                <div className="bg-circle circle-1"></div>
                <div className="bg-circle circle-2"></div>
                <div className="bg-circle circle-3"></div>
            </div>

            <button
                type="button"
                className="voltar-btn"
                onClick={() => navigate('/login')}
            >
                <span>←</span> Voltar ao Login
            </button>

            <div className="forgot-password-content">
                {!token ? (
                    <div className="forgot-password-header">
                        <h1 className="forgot-password-title">Link inválido</h1>
                        <p className="forgot-password-subtitle">
                            Esse link de redefinição está incompleto. Solicite um novo em "Esqueci minha senha".
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="forgot-password-header">
                            <h1 className="forgot-password-title">Nova Senha</h1>
                            <p className="forgot-password-subtitle">
                                Escolha a nova senha da sua conta
                            </p>
                        </div>

                        <form className="forgot-password-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="novaSenha">Nova Senha</label>
                                <input
                                    type="password"
                                    id="novaSenha"
                                    name="novaSenha"
                                    placeholder="Digite sua nova senha"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                                <input
                                    type="password"
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    placeholder="Confirme sua nova senha"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="reset-btn" disabled={enviando}>
                                {enviando ? 'Salvando...' : 'Alterar Senha'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
