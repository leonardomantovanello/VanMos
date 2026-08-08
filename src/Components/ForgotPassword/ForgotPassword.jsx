import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ForgotPassword.css'
import { passageirosApi } from '../../services/passageirosApi'
import { isValidEmail } from '../../utils/validators'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [enviando, setEnviando] = useState(false)
    const [enviado, setEnviado] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido')
            return
        }

        setEnviando(true)
        try {
            // Resposta é sempre a mesma mensagem genérica, exista ou não o
            // e-mail — o backend evita confirmar cadastro de terceiros de
            // propósito, então não há "sucesso"/"falha" a distinguir aqui.
            await passageirosApi.esqueciSenha(email)
            setEnviado(true)
        } catch (error) {
            alert(error.message || 'Não foi possível processar o pedido. Tente novamente.')
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
                {enviado ? (
                    <div className="forgot-password-header">
                        <h1 className="forgot-password-title">Verifique seu e-mail</h1>
                        <p className="forgot-password-subtitle">
                            Se esse e-mail estiver cadastrado, enviamos um link de redefinição para ele.
                            O link vale por 30 minutos — clique nele para escolher uma nova senha.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="forgot-password-header">
                            <h1 className="forgot-password-title">Esqueceu a senha?</h1>
                            <p className="forgot-password-subtitle">
                                Digite seu e-mail cadastrado e enviaremos um link de redefinição de senha
                            </p>
                        </div>

                        <form className="forgot-password-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="verify-btn" disabled={enviando}>
                                {enviando ? 'Enviando...' : 'Enviar link de redefinição'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword
