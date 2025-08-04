import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ForgotPassword.css'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    })

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password) => {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /\d/.test(password)
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleVerifyEmail = (e) => {
        e.preventDefault()
        
        if (!validateEmail(formData.email)) {
            alert('Por favor, insira um e-mail válido')
            return
        }

        const users = JSON.parse(localStorage.getItem('vanmos_users') || '[]')
        const user = users.find(u => u.email === formData.email)
        
        if (!user) {
            alert('E-mail não encontrado. Verifique o endereço digitado.')
            return
        }

        setStep(2)
    }

    const handleResetPassword = (e) => {
        e.preventDefault()
        
        if (!validatePassword(formData.newPassword)) {
            alert('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número')
            return
        }

        if (formData.newPassword !== formData.confirmPassword) {
            alert('As senhas não coincidem')
            return
        }

        const users = JSON.parse(localStorage.getItem('vanmos_users') || '[]')
        const updatedUsers = users.map(user => 
            user.email === formData.email 
                ? { ...user, senha: formData.newPassword }
                : user
        )
        
        localStorage.setItem('vanmos_users', JSON.stringify(updatedUsers))
        alert('Senha alterada com sucesso!')
        navigate('/login')
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
                {step === 1 ? (
                    <>
                        <div className="forgot-password-header">
                            <h1 className="forgot-password-title">Esqueceu a senha?</h1>
                            <p className="forgot-password-subtitle">
                                Digite seu e-mail para recuperar sua conta
                            </p>
                        </div>

                        <form className="forgot-password-form" onSubmit={handleVerifyEmail}>
                            <div className="input-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Digite seu e-mail"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="verify-btn">
                                Verificar E-mail
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="forgot-password-header">
                            <h1 className="forgot-password-title">Nova Senha</h1>
                            <p className="forgot-password-subtitle">
                                Digite sua nova senha
                            </p>
                        </div>

                        <form className="forgot-password-form" onSubmit={handleResetPassword}>
                            <div className="input-group">
                                <label htmlFor="newPassword">Nova Senha</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="Digite sua nova senha"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="confirmPassword">Confirmar Senha</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirme sua nova senha"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="reset-btn">
                                Alterar Senha
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword