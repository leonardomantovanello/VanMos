import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Chat.css'

const Chat = () => {
    const { motoristaId } = useParams()
    const navigate = useNavigate()
    const messagesEndRef = useRef(null)
    
    const [motorista, setMotorista] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const motoristas = {
        1: { nome: 'João Silva', foto: '👨‍💼', status: 'online' },
        2: { nome: 'Maria Santos', foto: '👩‍💼', status: 'online' },
        3: { nome: 'Carlos Oliveira', foto: '👨‍🚐', status: 'offline' },
        4: { nome: 'Ana Costa', foto: '👩‍🚐', status: 'online' }
    }

    useEffect(() => {
        const motoristaData = motoristas[motoristaId]
        if (motoristaData) {
            setMotorista(motoristaData)
            setMessages([
                {
                    id: 1,
                    sender: 'motorista',
                    text: `Olá! Sou ${motoristaData.nome}. Como posso ajudá-lo?`,
                    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                }
            ])
        }
    }, [motoristaId])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: newMessage,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMessage])
        setNewMessage('')

        // Simular resposta do motorista
        setTimeout(() => {
            const responses = [
                'Entendi! Posso te ajudar com isso.',
                'Claro! Qual horário seria melhor para você?',
                'Sem problemas! Vou verificar a disponibilidade.',
                'Perfeito! Te envio mais detalhes em breve.',
                'Combinado! Qualquer dúvida, me chame.'
            ]
            
            const motoristaResponse = {
                id: messages.length + 2,
                sender: 'motorista',
                text: responses[Math.floor(Math.random() * responses.length)],
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            }

            setMessages(prev => [...prev, motoristaResponse])
        }, 1000)
    }

    if (!motorista) {
        return <div className="chat-loading">Carregando chat...</div>
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button className="back-btn" onClick={() => navigate('/motoristas')}>
                    ← Voltar
                </button>
                <div className="motorista-info">
                    <span className="motorista-foto">{motorista.foto}</span>
                    <div className="motorista-details">
                        <h3>{motorista.nome}</h3>
                        <span className={`status ${motorista.status}`}>
                            {motorista.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender}`}>
                        <div className="message-content">
                            <p>{message.text}</p>
                            <span className="message-time">{message.time}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    autoFocus
                />
                <button type="submit" disabled={!newMessage.trim()}>
                    📤
                </button>
            </form>
        </div>
    )
}

export default Chat