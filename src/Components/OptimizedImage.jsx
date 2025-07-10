import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './OptimizedImage.css';

/**
 * Componente de imagen optimizada que utiliza el nuevo sistema de imágenes del backend
 * Soporta WebP, lazy loading, y diferentes tamaños según el contexto
 */
const OptimizedImage = ({ 
  images, 
  fallbackUrl, 
  alt, 
  className = '',
  size = 'medium', // 'thumbnail', 'medium', 'large'
  loading = 'lazy',
  onClick,
  onError,
  style = {}
}) => {
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isWebPSupported, setIsWebPSupported] = useState(false);

  // Detectar soporte para WebP
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      setIsWebPSupported(dataURL.indexOf('data:image/webp') === 0);
    };

    checkWebPSupport();
  }, []);

  // Determinar la mejor URL de imagen
  useEffect(() => {
    if (!images) {
      setCurrentImageUrl(fallbackUrl || '/src/assets/Image/notFound.png');
      return;
    }

    // Obtener la imagen del tamaño solicitado
    const imageData = images[size];
    
    if (imageData) {
      // Si la imagen es WebP y el navegador no lo soporta, buscar alternativa
      if (imageData.format === 'webp' && !isWebPSupported) {
        // Buscar alternativa en JPG del mismo tamaño
        const alternativeFormats = ['jpg', 'png'];
        const alternativeImage = alternativeFormats.find(format => 
          images[size]?.format === format
        );
        
        if (alternativeImage) {
          setCurrentImageUrl(images[size].url);
        } else {
          // Si no hay alternativa del mismo tamaño, usar fallback
          setCurrentImageUrl(images.fallback || fallbackUrl || '/src/assets/Image/notFound.png');
        }
      } else {
        setCurrentImageUrl(imageData.url);
      }
    } else {
      // Si no hay imagen del tamaño solicitado, usar fallback
      setCurrentImageUrl(images.fallback || fallbackUrl || '/src/assets/Image/notFound.png');
    }
  }, [images, size, fallbackUrl, isWebPSupported]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = (e) => {
    setHasError(true);
    const fallback = images?.fallback || fallbackUrl || '/src/assets/Image/notFound.png';
    if (currentImageUrl !== fallback) {
      setCurrentImageUrl(fallback);
    }
    onError && onError(e);
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e, images);
    }
  };

  return (
    <div className={`optimized-image-container ${className}`} style={style}>
      {!isLoaded && !hasError && (
        <div className="image-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <img
        src={currentImageUrl}
        alt={alt}
        className={`optimized-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={handleClick}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {/* Información de debug en desarrollo */}
      {import.meta.env.DEV && images && (
        <div className="image-debug-info">
          <small>
            {size}: {images[size]?.format || 'N/A'} | 
            {images[size]?.width}x{images[size]?.height}
          </small>
        </div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
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
  size: PropTypes.oneOf(['thumbnail', 'medium', 'large']),
  loading: PropTypes.oneOf(['lazy', 'eager']),
  onClick: PropTypes.func,
  onError: PropTypes.func,
  style: PropTypes.object
};

export default OptimizedImage;
