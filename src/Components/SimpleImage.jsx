import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de imagen simple con fallback garantizado
 */
const SimpleImage = ({ 
  src, 
  alt, 
  className = '',
  onError,
  onLoad,
  style = {}
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Imagen base64 simple como último recurso
  const base64Fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f8f9fa'/%3E%3Ctext x='150' y='130' text-anchor='middle' fill='%23666' font-family='Arial' font-size='16'%3EImagen no%3C/text%3E%3Ctext x='150' y='150' text-anchor='middle' fill='%23666' font-family='Arial' font-size='16'%3Edisponible%3C/text%3E%3Ctext x='150' y='180' text-anchor='middle' fill='%23999' font-family='Arial' font-size='32'%3E📷%3C/text%3E%3C/svg%3E";

  const handleError = (e) => {
    console.error('❌ Image failed to load');
    setHasError(true);
    setIsLoaded(false);
    
    // Si la imagen actual no es ya el fallback, intentar con el fallback
    if (src !== base64Fallback) {
      e.target.src = base64Fallback;
    }
    
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = (e) => {
    setIsLoaded(true);
    setHasError(false);
    
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <img
      src={src || base64Fallback}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
      onError={handleError}
      onLoad={handleLoad}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.7,
        transition: 'opacity 0.3s ease',
        backgroundColor: '#f8f9fa'
      }}
    />
  );
};

SimpleImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  style: PropTypes.object
};

export default SimpleImage;
