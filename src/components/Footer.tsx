import './Footer.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {year} Juan Andrés Arias. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
