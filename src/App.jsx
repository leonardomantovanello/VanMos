import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Nav from './Nav'
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner'
import './App.css'

// Componentes de rota carregados sob demanda (code splitting) — cada um vira
// seu próprio chunk em vez de tudo ser empacotado junto no bundle inicial.
const Login = lazy(() => import('./Components/Login/Login'))
const Register = lazy(() => import('./Components/Register/Register'))
const ForgotPassword = lazy(() => import('./Components/ForgotPassword/ForgotPassword'))
const ResetPassword = lazy(() => import('./Components/ResetPassword/ResetPassword'))
const QuemSomos = lazy(() => import('./Components/QuemSomos/QuemSomos'))
const Contato = lazy(() => import('./Components/Contato/Contato'))
const Motorista = lazy(() => import('./Components/Motorista/Motorista'))
const Motoristas = lazy(() => import('./Components/Motoristas/Motoristas'))
const AnaliseCadastro = lazy(() => import('./Components/AnaliseCadastro/AnaliseCadastro'))
const AdminLogin = lazy(() => import('./Components/Login/AdminLogin'))
const AdminPanel = lazy(() => import('./Components/Admin/AdminPanel'))
const PaginaInicial = lazy(() => import('./Paginainicial'))
const TermosDeUso = lazy(() => import('./Components/Legal/TermosDeUso'))
const PoliticaDePrivacidade = lazy(() => import('./Components/Legal/PoliticaDePrivacidade'))

const AppContent = () => {
    const location = useLocation()
    const hideNav = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/motorista' || location.pathname === '/forgot-password' || location.pathname === '/redefinir-senha' || location.pathname === '/motorista/analise-cadastro' || location.pathname === '/admin-login' || location.pathname === '/admin-panel'

    // Ao trocar de rota, sempre volta ao topo (SPA não faz isso sozinho).
    // O container de scroll aqui é o #root (tem height:100% + overflow-y:auto
    // no index.css), então a janela em si não rola — precisa rolar o #root.
    useEffect(() => {
        document.getElementById('root')?.scrollTo({ top: 0, left: 0 })
        window.scrollTo(0, 0)
    }, [location.pathname])

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
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/redefinir-senha" element={<ResetPassword />} />
                    <Route path="/motorista" element={<Motorista />} />
                    <Route path="/motorista/analise-cadastro" element={<AnaliseCadastro />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/termos-de-uso" element={<TermosDeUso />} />
                    <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
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