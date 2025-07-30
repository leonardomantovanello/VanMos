import React from 'react'
import './Nav.css'

const Nav = () => {
    return (
    <header className="header">
        <a href="/" className="logo">VANMOS</a>

        <nav className="navbar">
            <a href="/">Pagina Principal</a>
            <a href="/">Quem somos</a>
            <a href="/">Contate-nos</a>
            <a href="/">Login Motorista</a>
        </nav>
    </header>


    )
}

export default Nav