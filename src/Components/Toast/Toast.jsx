import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faExclamationTriangle, faInfo, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons'
import './Toast.css'

const Toast = ({ 
    message, 
    type = 'info', 
    duration = 4000, 
    onClose,
    position = 'top-right',
    showCloseButton = true 
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)

    useEffect(() => {
        setIsVisible(true)
        
        const timer = setTimeout(() => {
            handleClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration])

    const handleClose = () => {
        setIsLeaving(true)
        setTimeout(() => {
            setIsVisible(false)
            onClose && onClose()
        }, 300)
    }

    const getIcon = () => {
        switch (type) {
            case 'success':
                return faCheck
            case 'error':
                return faTimes
            case 'warning':
                return faExclamationTriangle
            default:
                return faInfo
        }
    }

    if (!isVisible) return null

    return (
        <div className={`toast toast--${type} toast--${position} ${isLeaving ? 'toast--leaving' : 'toast--entering'}`}>
            <div className="toast-icon">
                <FontAwesomeIcon icon={getIcon()} />
            </div>
            <div className="toast-content">
                <p className="toast-message">{message}</p>
            </div>
            {showCloseButton && (
                <button className="toast-close" onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            )}
            <div className="toast-progress"></div>
        </div>
    )
}

export default Toast