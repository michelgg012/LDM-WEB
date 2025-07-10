import { rubro1, rubro2, rubro3 } from '@/assets/category'
import './aboutUs.css'

export const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Sobre Nosotros
          </h1>
          <p className="hero-subtitle">
            Más de 15 años conectando sabores con la excelencia gastronómica
          </p>
        </div>
        <div className="hero-accent"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        
        {/* Company Introduction */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Nuestra Historia</h2>
            <div className="section-accent-line"></div>
          </div>
          
          <div className="company-intro">
            <div>
              <img
                src={rubro1}
                alt="Nuestra empresa distribuidora"
                className="company-image"
              />
            </div>
            <div className="company-content">
              <h3>Excelencia en Distribución Gastronómica</h3>
              <p>
                Desde nuestros inicios, nos hemos especializado en la distribución de productos gastronómicos premium para el sector HORECA. Trabajamos con los mejores proveedores nacionales e internacionales para garantizar <span className="highlight-text">fiambres, quesos, embutidos y delicatessen</span> de la más alta calidad.
              </p>
              <p>
                Nuestro compromiso va más allá de la simple distribución: somos partners estratégicos de restaurantes, hoteles, bares y catering, ofreciendo soluciones integrales que potencian el éxito de cada negocio gastronómico.
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Clientes Satisfechos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Años de Experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section">
          <div className="mission-vision-grid">
            {/* Mission */}
            <div className="mission-card">
              <div className="card-header">
                <div className="card-icon mission-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="card-title">Nuestra Misión</h3>
              </div>
              <img
                src={rubro2}
                alt="Misión de calidad"
                className="card-image"
              />
              <p className="card-description">
                Proveer productos gastronómicos de excelencia que permitan a nuestros clientes crear experiencias culinarias memorables. Nos comprometemos a ser el puente entre la calidad premium y el éxito gastronómico, garantizando frescura, puntualidad y un servicio personalizado que supere las expectativas.
              </p>
            </div>

            {/* Vision */}
            <div className="vision-card">
              <div className="card-header">
                <div className="card-icon vision-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="card-title">Nuestra Visión</h3>
              </div>
              <img
                src={rubro3}
                alt="Visión de futuro"
                className="card-image"
              />
              <p className="card-description">
                Ser la distribuidora líder en el sector gastronómico regional, reconocida por nuestra innovación, sostenibilidad y excelencia en el servicio. Aspiramos a ser el socio estratégico preferido que impulse el crecimiento y la diferenciación de cada establecimiento gastronómico.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Nuestros Valores</h2>
            <div className="section-accent-line"></div>
            <div className="values-intro">
              <p className="values-subtitle">
                Los principios que guían cada decisión y acción en nuestra empresa
              </p>
            </div>
          </div>

          <div className="values-grid">
            {/* <div className="value-card">
              <div className="value-icon">🏆</div>
              <h3 className="value-title">Excelencia en Calidad</h3>
              <p className="value-description">
                Seleccionamos cuidadosamente cada producto, garantizando los más altos estándares de calidad y frescura en cada entrega.
              </p>
            </div> */}

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3 className="value-title">Compromiso Total</h3>
              <p className="value-description">
                Nos comprometemos con el éxito de nuestros clientes, ofreciendo soluciones personalizadas y un servicio excepcional.
              </p>
            </div>

            {/* <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3 className="value-title">Eficiencia y Puntualidad</h3>
              <p className="value-description">
                Optimizamos nuestros procesos para garantizar entregas puntuales y un servicio ágil que no interrumpa tu operación.
              </p>
            </div> */}

            {/* <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3 className="value-title">Sostenibilidad</h3>
              <p className="value-description">
                Promovemos prácticas responsables con el medio ambiente y apoyamos a productores locales comprometidos.
              </p>
            </div> */}

            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3 className="value-title">Transparencia</h3>
              <p className="value-description">
                Mantenemos comunicación clara y honesta en todas nuestras relaciones comerciales y procesos.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3 className="value-title">Innovación Continua</h3>
              <p className="value-description">
                Nos adaptamos constantemente a las nuevas tendencias gastronómicas y tecnológicas del mercado.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2 className="cta-title">¿Listo para elevar tu negocio gastronómico?</h2>
          <p className="cta-description">
            Únete a más de 500 establecimientos que confían en nuestra calidad y servicio
          </p>
          <button className="cta-button">
            Contacta con Nosotros
          </button>
        </section>
      </div>
    </div>
  )
}
