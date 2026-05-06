import './AboutPage.css'

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>Acerca de</h1>
        
        <section className="about-section">
          <h2>¿Qué es GestorTareas?</h2>
          <p>
            Una aplicación minimalista para gestionar tus tareas diarias. Diseñada para ser simple, rápida y segura.
          </p>
        </section>

        <section className="about-section">
          <h2>Stack Tecnológico</h2>
          <div className="tech-stack">
            <div className="tech-item">React</div>
            <div className="tech-item">TypeScript</div>
            <div className="tech-item">Firebase</div>
            <div className="tech-item">Vite</div>
          </div>
        </section>

        <section className="about-section">
          <h2>Proyecto Educativo</h2>
          <p>
            Desarrollado como proyecto integrador del Módulo 4 de Soy Henry.
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
