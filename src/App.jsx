import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Nav from './Nav'
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner'
import './App.css'

// Componentes de rota carregados sob demanda (code splitting) — cada um vira
// seu próprio chunk em vez de tudo ser empacotado junto no bundle inicial.
const Login = lazy(() => import('./Components/Login/Login'))
const AdminLogin = lazy(() => import('./Components/Login/AdminLogin'))
const AdminPanel = lazy(() => import('./Components/Admin/AdminPanel'))
const Register = lazy(() => import('./Components/Register/Register'))
const ForgotPassword = lazy(() => import('./Components/ForgotPassword/ForgotPassword'))
const ResetPassword = lazy(() => import('./Components/ResetPassword/ResetPassword'))
const QuemSomos = lazy(() => import('./Components/QuemSomos/QuemSomos'))
const Contato = lazy(() => import('./Components/Contato/Contato'))
const Motorista = lazy(() => import('./Components/Motorista/Motorista'))
const Motoristas = lazy(() => import('./Components/Motoristas/Motoristas'))
const PaginaInicial = lazy(() => import('./Paginainicial'))

const AppContent = () => {
    const location = useLocation()
    const hideNav = location.pathname === '/login' || location.pathname === '/admin-login' || location.pathname === '/admin-panel' || location.pathname === '/register' || location.pathname === '/motorista' || location.pathname === '/forgot-password' || location.pathname === '/redefinir-senha'

    return (
        <>
            {!hideNav && <Nav />}
            <Suspense fallback={<LoadingSpinner size="large" />}>
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
                    <Route path="/redefinir-senha" element={<ResetPassword />} />
                    <Route path="/motorista" element={<Motorista />} />
                </Routes>
            </Suspense>
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