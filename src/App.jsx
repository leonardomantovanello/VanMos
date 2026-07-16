import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Nav from './Nav'
import Login from './Components/Login/Login'
import AdminLogin from './Components/Login/AdminLogin'
import AdminPanel from './Components/Admin/AdminPanel'
import Register from './Components/Register/Register'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import QuemSomos from './Components/QuemSomos/QuemSomos'
import Contato from './Components/Contato/Contato'
import Motorista from './Components/Motorista/Motorista'
import Motoristas from './Components/Motoristas/Motoristas'
import PaginaInicial from './Paginainicial'
import './App.css'

const AppContent = () => {
    const location = useLocation()
    const hideNav = location.pathname === '/login' || location.pathname === '/admin-login' || location.pathname === '/admin-panel' || location.pathname === '/register' || location.pathname === '/motorista' || location.pathname === '/forgot-password'

    return (
        <>
            {!hideNav && <Nav />}
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/quem-somos" element={<QuemSomos />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/motoristas" element={<Motoristas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/motorista" element={<Motorista />} />
            </Routes>
        </>
    )
}

const App = () => (
    <ThemeProvider>
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    </ThemeProvider>
)

export default App