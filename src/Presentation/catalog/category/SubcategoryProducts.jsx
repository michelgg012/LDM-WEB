import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubcategoriaPorSlug } from '../../../Services';
import { Breadcrumbs } from '../../../Components/Breadcrumbs';
import './SubcategoryProducts.css';

export const SubcategoryProducts = () => {
  const { categoriaSlug, subcategoriaSlug } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState(null);

  const PRODUCTS_PER_PAGE = 20;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const data = await getSubcategoriaPorSlug(categoriaSlug, subcategoriaSlug, {
          limit: PRODUCTS_PER_PAGE,
          offset
        });
        
        if (currentPage === 1) {
          setProductos(data.productos || []);
          setCategoryInfo(data.breadcrumbs);
        } else {
          setProductos(prev => [...prev, ...(data.productos || [])]);
        }
        
        setHasMore(data.productos && data.productos.length === PRODUCTS_PER_PAGE);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoriaSlug && subcategoriaSlug) {
      fetchProductos();
    }
  }, [categoriaSlug, subcategoriaSlug, currentPage]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (loading && currentPage === 1) {
    return (
      <div className="subcategory-loading">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subcategory-error">
        <h2>Error al cargar productos</h2>
        <p>{error}</p>
        <Link to="/catalogo" className="back-link">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  // Crear breadcrumb temporal usando los slugs de la URL
  const breadcrumbItems = categoryInfo && categoryInfo.categoria && categoryInfo.subcategoria ? [
    {
      nombre: categoryInfo.categoria.nombre,
      url: categoryInfo.categoria.url
    },
    {
      nombre: categoryInfo.subcategoria.nombre,
      url: categoryInfo.subcategoria.url
    }
  ] : [
    // Breadcrumb temporal usando los slugs
    {
      nombre: categoriaSlug.charAt(0).toUpperCase() + categoriaSlug.slice(1).replace('-', ' '),
      url: `/catalogo/${categoriaSlug}`
    },
    {
      nombre: subcategoriaSlug.charAt(0).toUpperCase() + subcategoriaSlug.slice(1).replace('-', ' '),
      url: `/catalogo/${categoriaSlug}/${subcategoriaSlug}`
    }
  ];

  return (
    <div className="subcategory-container">
    
      {/* Breadcrumb real */}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="subcategory-header">
        {categoryInfo && (
          <>
            <h1>{categoryInfo.subcategoria.nombre}</h1>
            <p>Productos de {categoryInfo.subcategoria.nombre.toLowerCase()} en {categoryInfo.categoria.nombre.toLowerCase()}</p>
          </>
        )}
      </div>

      {productos.length > 0 ? (
        <>
          <div className="products-grid">
            {productos.map((producto) => (
              <Link 
                key={producto.idarticulo} 
                to={producto.url}
                className="product-card"
              >
                <div className="product-image-container">
                  <img 
                    src={producto.imageUrl} 
                    alt={producto.descripcion}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = '/src/assets/Image/notFound.png';
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{producto.descripcion}</h3>
                  <div className="product-footer">
                    <span className="view-product">Ver producto →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container">
              <button 
                onClick={loadMore} 
                className="load-more-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner-small"></div>
                    Cargando...
                  </>
                ) : (
                  'Cargar más productos'
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-products">
          <h3>No hay productos disponibles</h3>
          <p>No se encontraron productos en esta subcategoría.</p>
          <Link to={`/catalogo/${categoriaSlug}`} className="back-link">
            ← Volver a la categoría
          </Link>
        </div>
      )}
    </div>
  );
};
