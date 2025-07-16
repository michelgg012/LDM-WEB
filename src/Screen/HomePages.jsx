
import { Link } from 'react-router-dom';
import { ModernCarousel } from '../Presentation/catalog/ModernCarousel';
import { ServicesSection } from '../Presentation/home/ServicesSection';
import { FeaturedCategories } from '../Presentation/home/FeaturedCategories';
import { StoreHours } from '../Presentation/home/StoreHours';

import './HomePage.css';

const HomePage = () => (
  <div className="homepage">
    {/* Hero Carousel */}
    <div className="hero-container">
      <ModernCarousel />
    </div>

    {/* Servicios */}
    <ServicesSection />

    {/* Horarios de Atención */}
    <StoreHours />

    {/* Categorías Destacadas */}
    <FeaturedCategories />

    {/* Sección destacada del catálogo */}
    {/* <div className="catalog-hero-section">
      <div className="catalog-hero-content">
        <h2>¿Necesitas algo específico?</h2>
        <p>Navega por nuestro catálogo completo y encuentra exactamente lo que buscas con nuestro sistema de categorías organizado</p>
        <Link to="/catalogo" className="catalog-hero-btn">
          Explorar Catálogo Completo →
        </Link>
      </div>
    </div> */}

  </div>
);

export default HomePage;
