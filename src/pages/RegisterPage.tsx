import RegisterForm from '../components/RegisterForm'
import './RegisterPage.css'

const RegisterPage = () => {
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
