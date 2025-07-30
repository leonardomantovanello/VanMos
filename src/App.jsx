import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Login from './Components/Login/Login'
import PaginaInicial from './Paginainicial'
import './App.css'

const AppContent = () => {
    const location = useLocation()
    const hideNav = location.pathname === '/login'

    return (
        <>
            {!hideNav && <Nav />}
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/quem-somos" element={<div className="page-content">Quem somos</div>} />
                <Route path="/contato" element={<div className="page-content">Contate-nos</div>} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

const App = () => (
    <Router>
        <AppContent />
    </Router>
)

export default App