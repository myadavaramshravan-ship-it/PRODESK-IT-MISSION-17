import { createContext, useContext, useEffect, useMemo, useState } from "react"
import * as authService from "../services/authService"

const AuthContext = createContext(null)
const STORAGE_KEY = "prodesk_auth_state"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser(parsed.user || null)
        setToken(parsed.token || null)
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user, token })
      )
    }
  }, [user, token, loading])

  const login = async (payload) => {
    const response = await authService.login(payload)
    setUser(response.user)
    setToken(response.token)
    return response
  }

  const register = async (payload) => {
    const response = await authService.register(payload)
    if (response.token) {
      setUser(response.user)
      setToken(response.token)
    }
    return response
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
      register
    }),
    [user, token, loading]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
