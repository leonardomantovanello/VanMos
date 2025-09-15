import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faMoon, faSun, faVanShuttle, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const { isDark, toggleTheme } = useTheme()

    return (
        <>
            <header className="header">
                <button 
                    className="hamburger-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                
                <Link to="/" className="logo">
                    <span className="logo-text"><FontAwesomeIcon icon={faVanShuttle} style={{color: "#e6ccff"}} />VANMOS</span>
                    <span className="logo-subtitle">Transport</span>
                </Link>
                
                <Link to="/login" className="nav-link login-btn">
                    <span>Login para Motoristas</span>
                </Link>
            </header>
            
            <div className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <button 
                        className="close-btn"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                
                <nav className="sidebar-nav">
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        <span>Página Principal</span>
                    </Link>
                    <Link to="/quem-somos" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        <span>Quem Somos</span>
                    </Link>
                    <Link to="/contato" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        <span>Contate-nos</span>
                    </Link>
                    
                    <div className="settings-container">
                        <button 
                            className="settings-btn"
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        >
                            <FontAwesomeIcon icon={faGear} /> Configurações
                        </button>
                        {isSettingsOpen && (
                            <div className="settings-dropdown">
                                <button 
                                    className="theme-toggle"
                                    onClick={toggleTheme}
                                >
                                    {isDark ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />} {isDark ? 'Modo Claro' : 'Modo Escuro'}
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            
            {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </>
    )
}

export default Nav