import axios from "axios"

const base = import.meta.env.VITE_API_URL || "/api"

const api = axios.create({
  baseURL: base
})

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("prodesk_auth_state")
  if (stored) {
    try {
      const { token } = JSON.parse(stored)
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // ignore parser errors
    }
  }
  return config
})

export default api
