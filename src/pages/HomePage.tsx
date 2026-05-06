import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>GestorTareas</h1>
          <p>Gestiona tus tareas de forma simple</p>
          <p className="hero-subtitle">Productividad minimalista y eficaz</p>
          
          <div className="hero-buttons">
            <a href="/register" className="btn btn-primary btn-large">
              Comenzar
            </a>
            <a href="/login" className="btn btn-secondary">
              Ingresar
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Características</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Simple</h3>
            <p>Interfaz limpia y directa</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Seguro</h3>
            <p>Tus datos protegidos</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Rápido</h3>
            <p>Respuesta instantánea</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive</h3>
            <p>Funciona en cualquier dispositivo</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Comienza ahora</h2>
        <a href="/register" className="btn btn-primary">
          Crear cuenta
        </a>
      </section>
    </div>
  )
}

export default HomePage
