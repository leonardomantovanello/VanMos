import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMessage } from '@fortawesome/free-solid-svg-icons'
import './Legal.css'

// Layout compartilhado pelas páginas de Termos de Uso e Política de
// Privacidade: barra de progresso de leitura, hero com título/selo(s) e um
// sumário (TOC) que vira uma lista horizontal em telas estreitas. As seções
// em si (os "children") ficam a cargo de cada página.
const LegalLayout = ({ title, subtitle, badges = [], toc = [], children }) => {
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        // #root (não window/body) é quem realmente rola nesta app — ver
        // App.jsx, que já chama root.scrollTo() no reset de rota por causa
        // disso. Escuta os dois pra funcionar em qualquer um dos layouts.
        const scroller = document.getElementById('root')
        const handleScroll = () => {
            const scrollTop = scroller?.scrollTop || window.scrollY
            const clientHeight = scroller?.clientHeight || window.innerHeight
            const scrollHeight = scroller?.scrollHeight || document.documentElement.scrollHeight
            const maxScroll = scrollHeight - clientHeight
            setProgress(maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0)
        }
        scroller?.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => {
            scroller?.removeEventListener('scroll', handleScroll)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="legal-container">
            <div className="legal-progress-track">
                <div className="legal-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <section className={`legal-hero ${isVisible ? 'fade-in' : ''}`}>
                <div className="bg-elements">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>

                <div className="legal-hero-inner">
                    <button type="button" className="legal-back-btn" onClick={() => navigate('/')}>
                        Voltar
                    </button>

                    <h1 className="legal-title">{title}</h1>
                    <p className="legal-subtitle">{subtitle}</p>

                    {badges.length > 0 && (
                        <div className="legal-meta">
                            {badges.map((badge) => (
                                <span className="legal-badge" key={badge.label}>
                                    <FontAwesomeIcon icon={badge.icon} /> {badge.label}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="legal-content">
                <div className="container">
                    <div className="legal-layout">
                        {toc.length > 0 && (
                            <nav className="legal-toc" aria-label="Sumário">
                                <p className="legal-toc-title">Nesta página</p>
                                <ul className="legal-toc-list">
                                    {toc.map((item, index) => (
                                        <li key={item.id}>
                                            <a href={`#${item.id}`}>
                                                <span className="legal-toc-num">{index + 1}</span>
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}

                        <div className="legal-sections">
                            {children}

                            <div className="legal-cta">
                                <h3>Ainda com dúvidas?</h3>
                                <p>Nossa equipe responde rapidinho por e-mail ou pelo formulário de contato.</p>
                                <div className="legal-cta-actions">
                                    <a
                                        className="legal-cta-btn primary"
                                        href="mailto:vanmos.support@gmail.com"
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} /> vanmos.support@gmail.com
                                    </a>
                                    <button
                                        type="button"
                                        className="legal-cta-btn ghost"
                                        onClick={() => navigate('/contato')}
                                    >
                                        <FontAwesomeIcon icon={faMessage} /> Falar com a VanMos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LegalLayout
