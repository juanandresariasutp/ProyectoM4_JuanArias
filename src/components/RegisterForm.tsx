import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../features/auth/AuthContext'

const initialValues = {
  email: '',
  password: '',
}

const RegisterForm = () => {
  const { register, logout, loading, error } = useAuthContext()
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
      await register(formValues)
      await logout()
      setFormValues(initialValues)
      navigate('/login')
    } finally {
      setSubmitting(false)
    }
  }

  const isBusy = loading || submitting

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear cuenta</h2>

      <label htmlFor="register-email">Correo electrónico</label>
      <input
        id="register-email"
        name="email"
        type="email"
        value={formValues.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="register-password">Contraseña</label>
      <input
        id="register-password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        required
        minLength={6}
      />

      {error ? <p role="alert">{error}</p> : null}

      <button type="submit" disabled={isBusy}>
        {isBusy ? 'Registrando...' : 'Registrarme'}
      </button>
    </form>
  )
}

export default RegisterForm
