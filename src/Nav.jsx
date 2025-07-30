import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">VANMOS</Link>
            <nav className="navbar">
                <nav className="navbar">
        <Link to="/">Pagina Principal</Link>
        <Link to="/quem-somos">Quem somos</Link>
        <Link to="/contato">Contate-nos</Link>
        <Link to="/login">Login Motorista</Link>
        </nav>
            </nav>
        </header>
    )
}

export default Nav