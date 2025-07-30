import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import QuemSomos from './Components/QuemSomos/QuemSomos'
import Contato from './Components/Contato/Contato'
import PaginaInicial from './Paginainicial'
import './App.css'

const AppContent = () => {
    const location = useLocation()
    const hideNav = location.pathname === '/login' || location.pathname === '/register'

    return (
        <>
            {!hideNav && <Nav />}
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/quem-somos" element={<QuemSomos />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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