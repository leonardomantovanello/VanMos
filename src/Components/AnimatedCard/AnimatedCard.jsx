import React, { useState, useRef } from 'react'
import './AnimatedCard.css'

const AnimatedCard = ({ 
    children, 
    className = '', 
    variant = 'default',
    hover3D = true,
    glowEffect = true,
    ...props 
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const cardRef = useRef(null)

    const handleMouseMove = (e) => {
        if (!hover3D || !cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        setMousePosition({ x: rotateX, y: rotateY })
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
    }

    const cardStyle = hover3D ? {
        transform: `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) ${isHovered ? 'translateZ(20px)' : 'translateZ(0px)'}`
    } : {}

    return (
        <div
            ref={cardRef}
            className={`animated-card animated-card--${variant} ${className} ${isHovered ? 'hovered' : ''} ${glowEffect ? 'glow-effect' : ''}`}
            style={cardStyle}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <div className="card-content">
                {children}
            </div>
            {glowEffect && <div className="card-glow-overlay"></div>}
            <div className="card-shine"></div>
        </div>
    )
}

export default AnimatedCard