import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { getCategorias } from '../../Services';
import './FeaturedCategories.css';

export const FeaturedCategories = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        // Mostrar solo las primeras 6 categorías
        setCategorias(data.slice(0, 6));
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) {
    return (
      <section className="featured-categories">
        <div className="categories-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Cargando categorías...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-categories">
      <div className="categories-container">
        <div className="categories-header">
          <div className="header-content">
            <h2>Explora Nuestras Categorías</h2>
            <p>Encuentra exactamente lo que necesitas navegando por nuestras categorías principales</p>
          </div>
          <Link to="/catalogo" className="view-all-link">
            Ver todas
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="categories-grid">
          {categorias.map((categoria, index) => (
            <Link 
              key={categoria.idrubro} 
              to={categoria.url || `/catalogo/${categoria.slug}`}
              className={`category-item ${index < 2 ? 'featured' : ''}`}
            >
              <div className="category-image-wrapper">
                <img 
                  src={categoria.imageUrl} 
                  alt={categoria.rubro}
                  className="category-image"
                  onError={(e) => {
                    e.target.src = '/src/assets/Image/notFound.png';
                  }}
                />
                <div className="category-overlay">
                  <Package size={32} className="category-overlay-icon" />
                </div>
              </div>
              <div className="category-content">
                <h3 className="category-name">{categoria.rubro}</h3>
                <span className="category-arrow">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="categories-footer">
          <Link to="/catalogo" className="explore-btn">
            <Package size={20} />
            Explorar Catálogo Completo
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};
