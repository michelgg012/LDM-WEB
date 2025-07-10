import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar imágenes optimizadas
 * @param {Object} images - Objeto con las URLs de las imágenes optimizadas
 * @param {string} fallbackUrl - URL de imagen fallback
 * @param {string} preferredSize - Tamaño preferido ('thumbnail', 'medium', 'large')
 * @returns {Object} - Estado y funciones para manejar la imagen
 */
export const useOptimizedImage = (images, fallbackUrl = '/src/assets/Image/notFound.png', preferredSize = 'medium') => {
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageFormat, setImageFormat] = useState('');
  const [imageSize, setImageSize] = useState(preferredSize);
  const [isWebPSupported, setIsWebPSupported] = useState(false);

  // Detectar soporte para WebP
  useEffect(() => {
    const checkWebPSupport = async () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, 1, 1);
        
        const dataURL = canvas.toDataURL('image/webp');
        setIsWebPSupported(dataURL.indexOf('data:image/webp') === 0);
      } catch {
        setIsWebPSupported(false);
      }
    };

    checkWebPSupport();
  }, []);

  // Determinar la mejor URL de imagen
  useEffect(() => {
    if (!images) {
      setCurrentImageUrl(fallbackUrl);
      setImageFormat('fallback');
      return;
    }

    const selectBestImage = () => {
      // Orden de prioridad de tamaños
      const sizePriority = [preferredSize, 'medium', 'large', 'thumbnail'];
      
      for (const size of sizePriority) {
        const imageData = images[size];
        if (imageData && imageData.url) {
          // Verificar si es WebP y si es compatible
          if (imageData.format === 'webp' && !isWebPSupported) {
            continue; // Buscar alternativa
          }
          
          setCurrentImageUrl(imageData.url);
          setImageFormat(imageData.format);
          setImageSize(size);
          return;
        }
      }
      
      // Si no se encuentra nada, usar fallback
      setCurrentImageUrl(images.fallback || fallbackUrl);
      setImageFormat('fallback');
    };

    selectBestImage();
  }, [images, fallbackUrl, preferredSize, isWebPSupported]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(false);
    
    // Intentar con fallback si no es ya el fallback
    const currentFallback = images?.fallback || fallbackUrl;
    if (currentImageUrl !== currentFallback) {
      setCurrentImageUrl(currentFallback);
      setImageFormat('fallback');
    }
  };

  const switchImageSize = (newSize) => {
    if (images && images[newSize]) {
      setImageSize(newSize);
      setCurrentImageUrl(images[newSize].url);
      setImageFormat(images[newSize].format);
      setIsLoaded(false);
    }
  };

  const preloadImage = (size = preferredSize) => {
    if (images && images[size]) {
      const img = new Image();
      img.src = images[size].url;
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    }
    return Promise.reject('Image not found');
  };

  const getImageInfo = () => {
    if (!images || !images[imageSize]) return null;
    
    return {
      url: currentImageUrl,
      format: imageFormat,
      size: imageSize,
      dimensions: {
        width: images[imageSize].width,
        height: images[imageSize].height
      },
      isWebP: imageFormat === 'webp',
      isOptimized: imageFormat !== 'fallback'
    };
  };

  return {
    // Estado
    currentImageUrl,
    isLoaded,
    hasError,
    imageFormat,
    imageSize,
    isWebPSupported,
    
    // Funciones
    handleImageLoad,
    handleImageError,
    switchImageSize,
    preloadImage,
    getImageInfo,
    
    // Propiedades calculadas
    isOptimized: imageFormat !== 'fallback',
    isWebP: imageFormat === 'webp'
  };
};

export default useOptimizedImage;
