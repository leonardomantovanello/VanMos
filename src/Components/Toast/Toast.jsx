import React, { useState, useEffect, useCallback, useRef } from 'react'
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

    // Guarda a versão mais recente de onClose sem precisar recriar handleClose
    // a cada render (parents costumam passar um onClose inline, ex.: () => setShowToast(false)).
    const onCloseRef = useRef(onClose)
    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    const handleClose = useCallback(() => {
        setIsLeaving(true)
        setTimeout(() => {
            setIsVisible(false)
            onCloseRef.current && onCloseRef.current()
        }, 300)
    }, [])

    useEffect(() => {
        setIsVisible(true)

        const timer = setTimeout(() => {
            handleClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, handleClose])

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