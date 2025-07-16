import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoPorSlug } from '../../../Services';
import { Breadcrumbs } from '../../../Components/Breadcrumbs';
import OptimizedImage from '../../../Components/OptimizedImage';
import { useOptimizedImage } from '../../../Hooks';
import './ProductDetail.css';

export const ProductDetail = () => {
  const { categoriaSlug, subcategoriaSlug, productoSlug } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [currentImageSize, setCurrentImageSize] = useState('large');

  const {
    handleImageLoad,
    handleImageError,
    switchImageSize,
    getImageInfo
  } = useOptimizedImage(
    producto?.images, 
    producto?.imageUrl, 
    currentImageSize
  );

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const data = await getProductoPorSlug(categoriaSlug, subcategoriaSlug, productoSlug);
        setProducto(data);
        
        // Seleccionar el primer precio por defecto
        if (data.precios && data.precios.length > 0) {
          setSelectedPrice(data.precios[0]);
        }
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoriaSlug && subcategoriaSlug && productoSlug) {
      fetchProducto();
    }
  }, [categoriaSlug, subcategoriaSlug, productoSlug]);

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="product-detail-error">
        <h2>Producto no encontrado</h2>
        <p>{error || 'El producto que buscas no existe'}</p>
        <Link to={`/catalogo/${categoriaSlug}/${subcategoriaSlug}`} className="back-link">
          ← Volver a la subcategoría
        </Link>
      </div>
    );
  }

  const breadcrumbItems = producto.breadcrumbs ? [
    {
      nombre: producto.breadcrumbs.categoria.nombre,
      url: producto.breadcrumbs.categoria.url
    },
    {
      nombre: producto.breadcrumbs.subcategoria.nombre,
      url: producto.breadcrumbs.subcategoria.url
    },
    {
      nombre: producto.descripcion,
      url: `/catalogo/${categoriaSlug}/${subcategoriaSlug}/${productoSlug}`
    }
  ] : [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };
  console.log('algo',producto);
  
  return (
    <div className="product-detail-container">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="product-detail-content">
        <div className="product-image-section">
          <div className="product-main-image">
            <img
              src={producto.imageUrl}
              // fallbackUrl={producto.imageUrl}
              alt={producto.descripcion}
              className="product-image"
              size={currentImageSize}
              loading="eager"
              onLoad={handleImageLoad}
              onError={handleImageError}
              onClick={() => switchImageSize('large')}
            />
          </div>
          
          {/* Controles de tamaño de imagen */}
          {/* {producto.images && (
            <div className="image-size-controls">
              <button
                onClick={() => {
                  setCurrentImageSize('medium');
                  switchImageSize('medium');
                }}
                className={`size-btn ${currentImageSize === 'medium' ? 'active' : ''}`}
              >
                Vista normal
              </button>
              <button
                onClick={() => {
                  setCurrentImageSize('large');
                  switchImageSize('large');
                }}
                className={`size-btn ${currentImageSize === 'large' ? 'active' : ''}`}
              >
                Vista ampliada
              </button>
            </div>
          )} */}
          
          {/* Información de la imagen (solo en desarrollo) */}
          {/* {import.meta.env.DEV && producto.images && (
            <div className="image-info-debug">
              <small>
                Actual: {getImageInfo()?.format || 'N/A'} | 
                Tamaño: {getImageInfo()?.size || 'N/A'} |
                Optimizada: {getImageInfo()?.isOptimized ? '✓' : '✗'}
              </small>
            </div>
          )} */}
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{producto.descripcion}</h1>
          
          <div className="product-meta">
            <div classNa  me="product-code">
              Código: {producto.idarticulo}
            </div>
            
            {producto.stockmin && (
              <div className="product-stock">
                Stock mínimo: {producto.stockmin} unidades
              </div>
            )}
            
            {producto.peses && (
              <div className="product-weight-info">
                📏 Producto que se vende por peso
              </div>
            )}
          </div>

          {/* {producto.precios && producto.precios.length > 0 && (
            <div className="pricing-section">
              <h3>Precios por cantidad</h3>
              <div className="price-tiers">
                {producto.precios.map((precio, index) => (
                  <div 
                    key={index}
                    className={`price-tier ${selectedPrice?.cantmin === precio.cantmin ? 'selected' : ''}`}
                    onClick={() => setSelectedPrice(precio)}
                  >
                    <div className="price-quantity">
                      Desde {precio.cantmin} {precio.cantmin === 1 ? 'unidad' : 'unidades'}
                    </div>
                    <div className="price-amount">
                      {formatPrice(precio.precio)}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedPrice && (
                <div className="selected-price-info">
                  <div className="current-price">
                    <span className="price-label">Precio seleccionado:</span>
                    <span className="price-value">{formatPrice(selectedPrice.precio)}</span>
                  </div>
                  <div className="quantity-info">
                    Para pedidos desde {selectedPrice.cantmin} {selectedPrice.cantmin === 1 ? 'unidad' : 'unidades'}
                  </div>
                </div>
              )}
            </div>
          )} */}

          <div className="product-actions">
            {/* <button className="add-to-cart-btn">
              🛒 Agregar al carrito
            </button> */}
            <button className="contact-btn">
              📞 Consultar disponibilidad
            </button>
          </div>

          <div className="product-navigation">
            <Link 
              to={`/catalogo/${categoriaSlug}/${subcategoriaSlug}`}
              className="nav-link back-to-category"
            >
              ← Volver a {producto.breadcrumbs?.subcategoria?.nombre}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
