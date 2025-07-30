import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Login from './Components/Login/Login'

const AppContent = () => {
    const location = useLocation()
    const hideNav = location.pathname === '/login'

    return (
        <>
            {!hideNav && <Nav />}
            <Routes>
                <Route path="/" element={<div>Página Principal</div>} />
                <Route path="/quem-somos" element={<div>Quem somos</div>} />
                <Route path="/contato" element={<div>Contate-nos</div>} />
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