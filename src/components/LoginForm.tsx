import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { useAuthContext } from '../features/auth/AuthContext'

const initialValues = {
  email: '',
  password: '',
}

const LoginForm = () => {
  const { login, loginWithProvider, loading, error } = useAuthContext()
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
      await login(formValues)
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
        <label htmlFor="login-email">Correo electrónico</label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Contraseña</label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Tu contraseña"
          value={formValues.password}
          onChange={handleChange}
          required
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="button-group">
        <button type="submit" className="btn btn-primary" disabled={isBusy}>
          {isBusy ? '⏳ Ingresando...' : '→ Ingresar'}
        </button>

        <div className="divider">o continúa con</div>

        <button type="button" className="btn btn-secondary" onClick={handleGoogle} disabled={isBusy}>
          <span className="google-icon" aria-hidden="true">
            <span className="google-icon-letter">G</span>
          </span>
          Google
        </button>
      </div>

      <p className="signin-link">
        ¿Sin cuenta? <Link to="/register">Crea una</Link>
      </p>
    </form>
  )
}

export default LoginForm
