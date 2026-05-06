import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { useAuthContext } from '../features/auth/AuthContext'

const initialValues = {
  email: '',
  password: '',
}

const RegisterForm = () => {
  const { register, loginWithProvider, logout, loading, error } = useAuthContext()
  const [formValues, setFormValues] = useState(initialValues)
  const [submitting, setSubmitting] = useState(false)

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
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogle = async () => {
    setSubmitting(true)
    try {
      await loginWithProvider()
    } finally {
      setSubmitting(false)
    }
  }

  const isBusy = loading || submitting

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="register-email">Correo electrónico</label>
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-password">Contraseña</label>
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={formValues.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="button-group">
        <button type="submit" className="btn btn-primary" disabled={isBusy}>
          {isBusy ? '⏳ Registrando...' : '✓ Registrarme'}
        </button>

        <div className="divider">o continúa con</div>

        <button type="button" className="btn btn-secondary" onClick={handleGoogle} disabled={isBusy}>
          <span className="google-icon" aria-hidden="true">
            <span className="google-icon-letter">G</span>
          </span>
          Google
        </button>
      </div>

      <p className="login-link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  )
}

export default RegisterForm
