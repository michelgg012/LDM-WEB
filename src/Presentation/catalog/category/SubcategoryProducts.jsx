import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubcategoriaPorSlug } from '../../../Services';
import { Breadcrumbs } from '../../../Components/Breadcrumbs';
import './SubcategoryProducts.css';
import { Capitalizar } from '@/Theme/Catalogoaux';

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
          setCategoryInfo(data);
          console.log(data, 'data from subcategory');
          
        } else {
          setProductos(prev => [...prev, ...(data.productos || [])]);
        }
        
        setHasMore(data.productos && data.productos.length === PRODUCTS_PER_PAGE);
      } catch {
        setError('Error al cargar los productos');
        console.error('Error al cargar productos');
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

const breadcrumbItems = categoryInfo && categoryInfo.categoria && categoryInfo.subcategoria ? [
  {
    nombre: categoryInfo.categoria.rubro,
    url: `/catalogo/${categoryInfo.categoria.slug}`
  },
  {
    nombre: categoryInfo.subcategoria.subrubro,
    url: `/catalogo/${categoryInfo.categoria.slug}/${categoryInfo.subcategoria.slug}`
  }
] : [
  {
    nombre: categoriaSlug.charAt(0).toUpperCase() + categoriaSlug.slice(1).replace('-', ' '),
    url: `/catalogo/${categoriaSlug}`
  },
  {
    nombre: subcategoriaSlug.charAt(0).toUpperCase() + subcategoriaSlug.slice(1).replace('-', ' '),
    url: `/catalogo/${categoriaSlug}/${subcategoriaSlug}`
  }
];
 console.log(categoryInfo);
 
  return (
    <div className="subcategory-container">
    
      {/* Breadcrumb real */}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="subcategory-header">
        {categoryInfo && (
          <>
            <h1>{categoryInfo.subcategoria.subrubro}</h1>
            <p>Productos de {categoryInfo.subcategoria.subrubro.toLowerCase()} en {categoryInfo.categoria.rubro.toLowerCase()}</p>
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
                  <h3 className="product-title">{Capitalizar(producto.descripcion)}</h3>
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
