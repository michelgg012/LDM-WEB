import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ResponsivePicture.css';

/**
 * Componente Picture que implementa responsive images con soporte WebP
 * y múltiples tamaños según el viewport
 */
const ResponsivePicture = ({ 
  images, 
  fallbackUrl = '/src/assets/Image/notFound.png', 
  alt, 
  className = '',
  loading = 'lazy',
  onClick,
  onError,
  style = {},
  sizes = '(max-width: 480px) 150px, (max-width: 768px) 300px, 600px'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  // Determinar la mejor imagen para usar
  useEffect(() => {
    const selectBestImage = () => {
      // Si no hay objeto images, usar fallback
      if (!images || typeof images !== 'object') {
        const finalFallback = fallbackUrl || '/src/assets/Image/notFound.png';
        setCurrentSrc(finalFallback);
        return;
      }

      // Orden de prioridad para seleccionar imagen
      const priorityOrder = ['medium', 'large', 'thumbnail'];
      
      for (const size of priorityOrder) {
        const imageData = images[size];
        if (imageData && imageData.url) {
          // Convertir URL absoluta a relativa para usar el proxy
          let proxyUrl = imageData.url;
          if (proxyUrl.includes('192.168.1.10:3412')) {
            proxyUrl = proxyUrl.replace('http://192.168.1.10:3412', '');
          }
          setCurrentSrc(proxyUrl);
          return;
        }
      }

      // Si no hay imágenes optimizadas, usar fallback del objeto images o el fallback general
      const finalFallback = images.fallback || fallbackUrl || '/src/assets/Image/notFound.png';
      let proxyUrl = finalFallback;
      if (proxyUrl.includes('192.168.1.10:3412')) {
        proxyUrl = proxyUrl.replace('http://192.168.1.10:3412', '');
      }
      setCurrentSrc(proxyUrl);
    };

    selectBestImage();
  }, [images, fallbackUrl, alt]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = (e) => {
    setHasError(true);
    setIsLoaded(false);
    
    // Intentar con fallback si no estamos ya usándolo
    const finalFallback = images?.fallback || fallbackUrl || '/src/assets/Image/notFound.png';
    
    if (currentSrc !== finalFallback) {
      setCurrentSrc(finalFallback);
    }
    
    if (onError) {
      onError(e);
    }
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e, images);
    }
  };

  return (
    <div className={`responsive-picture-container ${className}`} style={style}>
      {!isLoaded && !hasError && (
        <div className="image-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt}
        className={`responsive-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
        loading={loading}
        sizes={sizes}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={handleClick}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />

      {hasError && (
        <div className="error-overlay">
          <div className="error-message">
            <span>❌</span>
            <small>Error cargando imagen</small>
          </div>
        </div>
      )}
    </div>
  );
};

ResponsivePicture.propTypes = {
  images: PropTypes.shape({
    thumbnail: PropTypes.shape({
      url: PropTypes.string.isRequired,
      format: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    medium: PropTypes.shape({
      url: PropTypes.string.isRequired,
      format: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    large: PropTypes.shape({
      url: PropTypes.string.isRequired,
      format: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    fallback: PropTypes.string.isRequired
  }),
  fallbackUrl: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  onClick: PropTypes.func,
  onError: PropTypes.func,
  style: PropTypes.object,
  sizes: PropTypes.string
};

export default ResponsivePicture;
