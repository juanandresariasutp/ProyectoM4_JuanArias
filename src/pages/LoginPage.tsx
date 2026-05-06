import LoginForm from '../components/LoginForm'
import './LoginPage.css'

const LoginPage = () => {
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
