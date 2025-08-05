import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faMoon, faSun, faVanShuttle } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const { isDark, toggleTheme } = useTheme()

    return (
        <header className="header">
            <Link to="/" className="logo">
         
                <span className="logo-text"><FontAwesomeIcon icon={faVanShuttle} style={{color: "#e6ccff"}} />VANMOS</span>
                <span className="logo-subtitle">Transport</span>
            </Link>
            <nav className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}>
                <Link to="/" className="nav-link">
                    <span>Página Principal</span>
                </Link>
                <Link to="/quem-somos" className="nav-link">
                    <span>Quem Somos</span>
                </Link>
                <Link to="/contato" className="nav-link">
                    <span>Contate-nos</span>
                </Link>
                <Link to="/login" className="nav-link login-btn">
                    <span>Login para Motoristas</span>
                </Link>
                <div className="settings-container">
                    <button 
                        className="settings-btn"
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    >
                        <FontAwesomeIcon icon={faGear} style={{color: "#e6ccff",}} />
                    </button>
                    {isSettingsOpen && (
                        <div className="settings-dropdown">
                            <button 
                                className="theme-toggle"
                                onClick={toggleTheme}
                            >
                                {isDark ? <FontAwesomeIcon icon={faSun} style={{color: "#B197FC",}}/> : <FontAwesomeIcon icon={faMoon} style={{color: "#B197FC",}}/>} {isDark ? 'Modo Claro' : 'Modo Escuro'}
                            </button>
                        </div>
                    )}
                </div>
            </nav>
            <button 
                className={`menu-toggle ${isMenuOpen ? 'menu-open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    )
}

export default Nav