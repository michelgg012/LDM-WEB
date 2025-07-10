import { useState } from 'react';
import './style/HeaderStyle.css'
import { Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuList } from './MenuList';
import logo from '../../assets/Image/LoDeMario.png';
import { useCart } from '@/Hooks';

export const Header = () => {
  const { total } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="modern-header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link to='/' onClick={closeMobileMenu}>
            <img src={logo} alt="Lo de Mario" className="logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <MenuList />
        </nav>

        {/* Desktop Actions */}
        <div className="desktop-actions">
          <div className="cart-wrapper">
            <button 
              className="action-btn"
              onClick={() => navigate('/shoppingCart')}
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={20} />
              {total > 0 && (
                <span className="cart-badge">{total}</span>
              )}
            </button>
          </div>
          
          <button 
            className="action-btn"
            onClick={() => navigate('/likes')}
            aria-label="Favoritos"
          >
            <Heart size={20} />
          </button>

          <button 
            className="action-btn"
            onClick={() => alert('Usuario')}
            aria-label="Usuario"
          >
            <User size={20} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Menú"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
            <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-menu-header">
                <img src={logo} alt="Lo de Mario" className="mobile-logo" />
                <button 
                  className="close-btn"
                  onClick={closeMobileMenu}
                  aria-label="Cerrar menú"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="mobile-nav">
                <MenuList onItemClick={closeMobileMenu} />
              </nav>

              <div className="mobile-actions">
                <button 
                  className="mobile-action-btn"
                  onClick={() => {
                    navigate('/shoppingCart');
                    closeMobileMenu();
                  }}
                >
                  <ShoppingCart size={20} />
                  <span>Carrito</span>
                  {total > 0 && <span className="cart-badge">{total}</span>}
                </button>
                
                <button 
                  className="mobile-action-btn"
                  onClick={() => {
                    navigate('/likes');
                    closeMobileMenu();
                  }}
                >
                  <Heart size={20} />
                  <span>Favoritos</span>
                </button>

                <button 
                  className="mobile-action-btn"
                  onClick={() => {
                    alert('Usuario');
                    closeMobileMenu();
                  }}
                >
                  <User size={20} />
                  <span>Mi Cuenta</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

