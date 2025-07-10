import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ModernCarousel.css';

// Importar imágenes del carrusel
const images = import.meta.glob('../../assets/carrusel/*.png', { eager: true });

export const ModernCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Productos Frescos Todos los Días",
      subtitle: "Calidad garantizada en cada compra",
      description: "Descubre nuestra selección de productos frescos y de alta calidad",
      cta: "Ver Productos",
      ctaLink: "/catalogo",
      gradient: "from-green-600 to-emerald-700"
    },
    {
      id: 2,
      title: "Envío Gratuito",
      subtitle: "En compras superiores a $15,000",
      description: "Disfruta de envío sin costo en Posadas, Garupá y Candelaria",
      cta: "Conocer Más",
      ctaLink: "/Reparto",
      gradient: "from-blue-600 to-cyan-700"
    },
    {
      id: 3,
      title: "Atención Personalizada",
      subtitle: "Estamos aquí para ayudarte",
      description: "Contactanos para una atención especializada y personalizada",
      cta: "Contactar",
      ctaLink: "https://wa.me/5493764374028?text=Hola%2C%20me%20interesa%20obtener%20más%20información%20sobre%20sus%20productos%20y%20servicios.%20¿Podrían%20ayudarme%3F",
      gradient: "from-purple-600 to-indigo-700"
    }
  ];

  const imageUrls = Object.keys(images).map(path => images[path].default);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="modern-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {/* Imagen de fondo */}
            {imageUrls[index] && (
              <div 
                className="slide-background"
                style={{ backgroundImage: `url(${imageUrls[index]})` }}
              />
            )}
            
            {/* Overlay con gradiente */}
            <div className={`slide-overlay bg-gradient-to-r ${slide.gradient}`} />
            
            {/* Contenido del slide */}
            <div className="slide-content">
              <div className="slide-text">
                <h1 className="slide-title">{slide.title}</h1>
                <h2 className="slide-subtitle">{slide.subtitle}</h2>
                <p className="slide-description">{slide.description}</p>
                {slide.ctaLink.startsWith('https://wa.me/') ? (
                  <a 
                    href={slide.ctaLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="slide-cta"
                  >
                    {slide.cta}
                    <span className="cta-arrow">→</span>
                  </a>
                ) : (
                  <Link to={slide.ctaLink} className="slide-cta">
                    {slide.cta}
                    <span className="cta-arrow">→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <button 
        className="carousel-nav carousel-nav-prev"
        onClick={goToPrevious}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        className="carousel-nav carousel-nav-next"
        onClick={goToNext}
        aria-label="Siguiente slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
