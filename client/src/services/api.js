import axios from "axios"

const api = axios.create({
  baseURL: "/api"
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
