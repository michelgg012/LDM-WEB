import { useNavigate } from 'react-router-dom';

export const MenuList = ({ onItemClick }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onItemClick) onItemClick();
  };

  return (
    <div className="menu-list">
      <button 
        onClick={() => handleNavigation('/')} 
        className="menu-item"
      >
        Inicio
      </button>
      <button 
        onClick={() => handleNavigation('/catalogo')} 
        className="menu-item"
      >
        Catálogo
      </button>
      <button 
        onClick={() => handleNavigation('/Reparto')} 
        className="menu-item"
      >
        Repartos
      </button>
      <button 
        onClick={() => handleNavigation('/Sobre-nosotros')} 
        className="menu-item"
      >
        Sobre Nosotros
      </button>
      <button 
        onClick={() => handleNavigation('/Contactanos')} 
        className="menu-item"
      >
        Contactanos
      </button>
    </div> 
  );
};