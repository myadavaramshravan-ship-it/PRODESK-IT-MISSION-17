import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const pageTitle = {
    "/dashboard": "Dashboard",
    "/login": "Login",
    "/register": "Register"
  }[location.pathname]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isCurrentPage = (path) => location.pathname === path

  return (
    <nav>
      <div className="nav-brand">
        <strong>MERN Cloud</strong>
        {user ? <span> · {user.name}</span> : null}
      </div>
      <div className="nav-right">
        {pageTitle ? <div className="nav-page-title">{pageTitle}</div> : null}
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              {!isCurrentPage("/dashboard") && <NavLink to="/dashboard">Dashboard</NavLink>}
              <button type="button" className="secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {!isCurrentPage("/login") && <NavLink to="/login">Login</NavLink>}
              {!isCurrentPage("/register") && <NavLink to="/register">Register</NavLink>}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
