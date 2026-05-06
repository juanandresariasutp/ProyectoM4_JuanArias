import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../features/auth/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuthContext()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path ? 'active' : ''

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/login" className="navbar-logo">
          📋 GestorTareas
        </Link>

        <div className="navbar-menu">
          <Link to="/acerca-de" className={`navbar-link ${isActive('/acerca-de')}`}>
            Acerca de
          </Link>

          {user ? (
            <>
              <Link to="/tasks" className={`navbar-link ${isActive('/tasks')}`}>
                Mis Tareas
              </Link>
              <span className="navbar-user">{user.email}</span>
              <button className="navbar-btn navbar-btn-logout" onClick={logout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn navbar-btn-login">
                Iniciar sesión
              </Link>
              <Link to="/register" className="navbar-btn navbar-btn-register">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
