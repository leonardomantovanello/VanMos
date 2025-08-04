import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import QuemSomos from './Components/QuemSomos/QuemSomos'
import Contato from './Components/Contato/Contato'
import Motorista from './Components/Motorista/Motorista'
import PaginaInicial from './Paginainicial'
import './App.css'

const AppContent = () => {
    const location = useLocation()
    const hideNav = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/motorista' || location.pathname === '/forgot-password'

    return (
        <>
            {!hideNav && <Nav />}
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/quem-somos" element={<QuemSomos />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/motorista" element={<Motorista />} />
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