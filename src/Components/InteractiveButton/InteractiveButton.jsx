import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './InteractiveButton.css'

const InteractiveButton = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'medium',
    icon,
    disabled = false,
    loading = false,
    className = '',
    ...props 
}) => {
    const [ripples, setRipples] = useState([])

    const createRipple = (event) => {
        const button = event.currentTarget
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = event.clientX - rect.left - size / 2
        const y = event.clientY - rect.top - size / 2
        
        const newRipple = {
            x,
            y,
            size,
            id: Date.now()
        }

        setRipples(prev => [...prev, newRipple])

        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
        }, 600)
    }

    const handleClick = (event) => {
        if (!disabled && !loading) {
            createRipple(event)
            onClick && onClick(event)
        }
    }

    return (
        <button
            className={`interactive-btn interactive-btn--${variant} interactive-btn--${size} ${className} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            <span className="btn-content">
                {icon && <FontAwesomeIcon icon={icon} className="btn-icon" />}
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    children
                )}
            </span>
            
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size
                    }}
                />
            ))}
        </button>
    )
}

export default InteractiveButton