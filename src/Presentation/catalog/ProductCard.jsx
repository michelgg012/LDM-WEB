import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResponsivePicture from '../../Components/ResponsivePicture';
import OptimizedImage from '../../Components/OptimizedImage';
import './ProductCard.css';

const ProductCard = ({ 
  producto, 
  size = 'medium', 
  showPrice = false, 
  className = '',
  useResponsive = true 
}) => {
  const ImageComponent = useResponsive ? ResponsivePicture : OptimizedImage;
  
  return (
    <div className={`product-card ${className}`}>
      <Link to={producto.url} className="product-link">
        <div className="product-image-container">
          <ImageComponent
            images={producto.images}
            fallbackUrl={producto.imageUrl}
            alt={producto.descripcion}
            className="product-image"
            size={size}
            loading="lazy"
          />
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{producto.descripcion}</h3>
          
          {showPrice && producto.precios && producto.precios.length > 0 && (
            <div className="product-price">
              <span className="price-from">Desde:</span>
              <span className="price-amount">${producto.precios[0].precio}</span>
            </div>
          )}
          
          {producto.stockmin && (
            <div className="product-stock">
              <span className={`stock-indicator ${producto.stockmin > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {producto.stockmin > 0 ? '✓ En Stock' : '✗ Sin Stock'}
              </span>
            </div>
          )}
          
          <div className="product-arrow">→</div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  producto: PropTypes.shape({
    idarticulo: PropTypes.number.isRequired,
    descripcion: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    images: PropTypes.object,
    url: PropTypes.string.isRequired,
    stockmin: PropTypes.number,
    precios: PropTypes.array
  }).isRequired,
  size: PropTypes.oneOf(['thumbnail', 'medium', 'large']),
  showPrice: PropTypes.bool,
  className: PropTypes.string,
  useResponsive: PropTypes.bool
};

export default ProductCard;
