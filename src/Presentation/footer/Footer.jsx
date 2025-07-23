import { MapPin, Mail, Phone, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FooterStyle.css';
import logo from '../../assets/Image/LoDeMario.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      {/* Sección principal del footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Información de la empresa */}
          <div className="footer-section company-info">
            <div className="footer-logo">
              <img src={logo} alt="Lo de Mario" className="logo-footer" />
            </div>
            <p className="company-description">
              Tu distribuidora de confianza en Posadas, Garupá y Candelaria. 
            </p>
            {/* <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div> */}
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-section quick-links">
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              {/* <li><Link to="/Reparto">Repartos</Link></li> */}
              <li><Link to="/Sobre-nosotros">Sobre Nosotros</Link></li>
              <li><Link to="/Contactanos">Contactanos</Link></li>

              {/* <li><Link to="/shoppingCart">Carrito</Link></li> */}
            </ul>
          </div>

          {/* Sucursales */}
          <div className="footer-section locations">
            <h3 className="footer-title">Nuestras Sucursales</h3>
            <div className="location-item">
              <div className="location-header">
                <MapPin size={18} />
                <h4>Sucursal Posadas</h4>
              </div>
              <p>Estado de Israel 3542</p>
              <a 
                href="https://www.google.com/maps/place/27%C2%B022'56.4%22S+55%C2%B053'52.7%22W/@-27.3821047,-55.8989163" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                Ver en mapa →
              </a>
            </div>
            <div className="location-item">
              <div className="location-header">
                <MapPin size={18} />
                <h4>Sucursal Garupá</h4>
              </div>
              <p>Colectora Tita Merelo 611</p>
              <a 
                href="https://www.google.com/maps/place/27%C2%B027'35.6%22S+55%C2%B049'41.4%22W/@-27.459901,-55.8307279,736" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                Ver en mapa →
              </a>
            </div>
          </div>

          {/* Contacto */}
                  {/* Contacto */}
          <div className="footer-section contact-info">
            <h3 className="footer-title">Contacto</h3>
            <div className="contact-item">
              <Mail size={18} />
              <div>
                <p>Email</p>
                <a href="mailto:dis_lodemario@outlook.com">
                  dis_lodemario@outlook.com
                </a>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <div>
                <p>Teléfono</p>
                <a href="tel:3764374028">3764-374028</a>
              </div>
            </div>
          </div>


          {/* Horarios */}
          {/* <div className="footer-section schedule-info">
            <h3 className="footer-title">Horarios</h3>
            <div className="schedule-item">
              <div className="schedule-header">
                <Clock size={18} />
                <h4>Posadas</h4>
              </div>
              <div className="schedule-details">
                <p className="schedule-time">L-S: 08:30-12:30 / 16:00-20:00</p>
                <p className="schedule-special">Dom: 16:30-20:00</p>
                <p className="schedule-note">Solo retiro en sucursal</p>
              </div>
            </div>
            <div className="schedule-item">
              <div className="schedule-header">
                <Clock size={18} />
                <h4>Garupá</h4>
              </div>
              <div className="schedule-details">
                <p className="schedule-time">L-S: 08:30-12:30 / 13:30-17:30</p>
                <p className="schedule-special">Dom: Cerrado</p>
              </div>
            </div>
          </div> */}
    
    
    
    
        </div>
      </div>

      {/* Sección de servicios destacados */}
      {/* <div className="footer-services">
        <div className="footer-container">
          <div className="services-grid">
            <div className="service-highlight">
              <div className="service-icon">🚚</div>
              <div>
                <h4>Envío Gratuito</h4>
                <p>En compras +$15,000</p>
              </div>
            </div>
            <div className="service-highlight">
              <div className="service-icon">⭐</div>
              <div>
                <h4>Calidad Garantizada</h4>
                <p>Productos frescos</p>
              </div>
            </div>
            <div className="service-highlight">
              <div className="service-icon">📞</div>
              <div>
                <h4>Atención 24/7</h4>
                <p>Siempre disponibles</p>
              </div>
            </div>
            <div className="service-highlight">
              <div className="service-icon">🏪</div>
              <div>
                <h4>Múltiples Ubicaciones</h4>
                <p>Posadas y Garupá</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="copyright-content">
            <p>&copy; {currentYear} Lo de Mario. Todos los derechos reservados.</p>
            <div className="footer-bottom-links">
              <a href="#">Términos y Condiciones</a>
              <a href="#">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
