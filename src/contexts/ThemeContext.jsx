import React, { useEffect } from 'react'

export const ThemeProvider = ({ children }) => {
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'dark')
    }, [])

    return children
}