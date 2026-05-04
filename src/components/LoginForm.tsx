import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../features/auth/AuthContext'

const initialValues = {
  email: '',
  password: '',
}

const LoginForm = () => {
  const { login, loginWithProvider, loading, error } = useAuthContext()
  const [formValues, setFormValues] = useState(initialValues)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      await login(formValues)
      setFormValues(initialValues)
      navigate('/tasks')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogle = async () => {
    setSubmitting(true)
    try {
      await loginWithProvider()
      navigate('/tasks')
    } finally {
      setSubmitting(false)
    }
  }

  const isBusy = loading || submitting

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      <label htmlFor="login-email">Correo electrónico</label>
      <input
        id="login-email"
        name="email"
        type="email"
        value={formValues.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="login-password">Contraseña</label>
      <input
        id="login-password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        required
      />

      {error ? <p role="alert">{error}</p> : null}

      <button type="submit" disabled={isBusy}>
        {isBusy ? 'Ingresando...' : 'Entrar'}
      </button>

      <button type="button" onClick={handleGoogle} disabled={isBusy}>
        Continuar con Google
      </button>

      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </form>
  )
}

export default LoginForm
