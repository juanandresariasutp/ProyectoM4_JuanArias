import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../features/auth/AuthContext'
import LoginForm from '../components/LoginForm'
import './LoginPage.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuthContext()

  useEffect(() => {
    if (user && !loading) {
      navigate('/tasks', { replace: true })
    }
  }, [user, loading, navigate])

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Iniciar sesión</h1>
          <p>Accede a tu cuenta para gestionar tus tareas</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
