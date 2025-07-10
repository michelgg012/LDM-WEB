import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoriaPorSlug } from '../../../Services';
import { Breadcrumbs } from '../../../Components/Breadcrumbs';
import './CategoryDetail.css';

export const CategoryDetail = () => {
  const { categoriaSlug } = useParams();
  const [categoriaData, setCategoriaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        setLoading(true);
        const data = await getCategoriaPorSlug(categoriaSlug);
        setCategoriaData(data);
      } catch (err) {
        setError('Error al cargar la categoría');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoriaSlug) {
      fetchCategoria();
    }
  }, [categoriaSlug]);

  if (loading) {
    return (
      <div className="category-detail-loading">
        <div className="loading-spinner"></div>
        <p>Cargando categoría...</p>
      </div>
    );
  }

  if (error || !categoriaData) {
    return (
      <div className="category-detail-error">
        <h2>Categoría no encontrada</h2>
        <p>{error || 'La categoría que buscas no existe'}</p>
        <Link to="/catalogo" className="back-link">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    {
      nombre: categoriaData.categoria.rubro,
      url: `/catalogo/${categoriaData.categoria.slug}`
    }
  ];

  return (
    <div className="category-detail-container">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="category-detail-header">
        <h1>{categoriaData.categoria.rubro}</h1>
        <p>Explora nuestras subcategorías de {categoriaData.categoria.rubro.toLowerCase()}</p>
      </div>

      {categoriaData.subcategorias && categoriaData.subcategorias.length > 0 ? (
        <div className="subcategory-grid">
          {categoriaData.subcategorias.map((subcategoria) => (
            <div key={subcategoria.idsubrubro} className="subcategory-card">
              <Link to={subcategoria.url} className="subcategory-link">
                <div className="subcategory-header">
                  <h3>{subcategoria.subrubro}</h3>
                  <span className="product-count">
                    {subcategoria.productos?.length || 0} productos
                  </span>
                </div>
                
                {subcategoria.productos && subcategoria.productos.length > 0 && (
                  <div className="product-preview">
                    <div className="product-preview-grid">
                      {subcategoria.productos.slice(0, 4).map((producto) => (
                        <div key={producto.idarticulo} className="product-preview-item">
                          <img 
                            src={producto.imageUrl} 
                            alt={producto.descripcion}
                            className="product-preview-image"
                            onError={(e) => {
                              e.target.src = '/src/assets/Image/notFound.png';
                            }}
                          />
                          <span className="product-preview-name">
                            {producto.descripcion}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {subcategoria.productos.length > 4 && (
                      <div className="more-products">
                        +{subcategoria.productos.length - 4} productos más
                      </div>
                    )}
                  </div>
                )}
                
                <div className="subcategory-footer">
                  <span className="view-all-link">
                    Ver todos los productos →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-subcategories">
          <p>No hay subcategorías disponibles en esta categoría.</p>
          <Link to="/catalogo" className="back-link">
            ← Volver al catálogo
          </Link>
        </div>
      )}
    </div>
  );
};
