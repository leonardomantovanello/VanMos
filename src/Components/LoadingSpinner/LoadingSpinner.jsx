import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = ({ 
    size = 'medium', 
    variant = 'primary',
    text = '',
    className = '' 
}) => {
    return (
        <div className={`loading-container ${className}`}>
            <div className={`loading-spinner loading-spinner--${size} loading-spinner--${variant}`}>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-core"></div>
            </div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    )
}

export default LoadingSpinner