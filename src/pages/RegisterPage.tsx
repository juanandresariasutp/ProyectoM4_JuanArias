import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../features/auth/AuthContext'
import RegisterForm from '../components/RegisterForm'
import './RegisterPage.css'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuthContext()

  useEffect(() => {
    if (user && !loading) {
      navigate('/tasks', { replace: true })
    }
  }, [user, loading, navigate])

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Crear cuenta</h1>
          <p>Únete ahora y comienza a organizar tus tareas</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
