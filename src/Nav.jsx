import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="header">
            <Link to="/" className="logo">
                <span className="logo-text">VANMOS</span>
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