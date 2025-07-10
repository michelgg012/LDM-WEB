import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias } from '../../../Services';
import ResponsivePicture from '../../../Components/ResponsivePicture';
import './CategoryGrid.css';

export const Category = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const data = await getCategorias();
        setCategorias(data);
      } catch (err) {
        setError('Error al cargar las categorías');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) {
    return (
      <div className="category-loading">
        <div className="loading-spinner"></div>
        <p>Cargando categorías...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Nuestras Categorías</h1>
        <p>Explora nuestra amplia variedad de productos organizados por categorías</p>
      </div>
      
      <div className="category-grid">
        {categorias.map((categoria) => (
          <Link 
            key={categoria.idrubro} 
            to={categoria.url} 
            className="category-card"
          >
            <div className="category-image-container">
              <ResponsivePicture
                images={categoria.images}
                fallbackUrl={categoria.imageUrl}
                alt={categoria.rubro}
                className="category-image"
                loading="lazy"
              />
            </div>
            <div className="category-content">
              <h3 className="category-title">{categoria.rubro}</h3>
              <div className="category-arrow">→</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
