import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Solo hacer scroll al top en navegación hacia adelante, no en el botón "atrás"
    const isBackNavigation = window.history.state && window.history.state.idx > 0;
    
    if (!isBackNavigation) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
