import ResponsivePicture from '../../../Components/ResponsivePicture';
import OptimizedImage from '../../../Components/OptimizedImage';
import ProductCard from '../ProductCard';
import { useOptimizedImage } from '../../../Hooks';
import './ExampleUsage.css';

/**
 * Ejemplo de uso del sistema de imágenes optimizadas
 * Muestra diferentes casos de uso y componentes
 */
const ExampleUsage = () => {

  // Ejemplo de producto con imágenes optimizadas
  const exampleProduct = {
    idarticulo: 1234,
    descripcion: "Ejemplo de Producto con Imágenes Optimizadas",
    url: "/ejemplo",
    images: {
      thumbnail: {
        url: "http://192.168.1.10:3412/src/assets/articulos/01234T.webp",
        format: "webp",
        width: 150,
        height: 150
      },
      medium: {
        url: "http://192.168.1.10:3412/src/assets/articulos/01234M.webp",
        format: "webp",
        width: 300,
        height: 300
      },
      large: {
        url: "http://192.168.1.10:3412/src/assets/articulos/01234X.webp",
        format: "webp",
        width: 600,
        height: 600
      },
      fallback: "http://192.168.1.10:3412/src/assets/articulos/01234X.png"
    },
    imageUrl: "http://192.168.1.10:3412/src/assets/articulos/01234X.png",
    precios: [
      { cantmin: 1, precio: 100 },
      { cantmin: 10, precio: 90 }
    ],
    stockmin: 25
  };

  // Hook personalizado para manejo de imágenes
  const {
    currentImageUrl,
    isLoaded,
    handleImageLoad,
    handleImageError,
    switchImageSize,
    getImageInfo
  } = useOptimizedImage(exampleProduct.images, exampleProduct.imageUrl, 'medium');

  return (
    <div className="example-usage">
      <h1>🚀 Sistema de Imágenes Optimizadas - Ejemplos de Uso</h1>
      
      {/* Sección 1: ResponsivePicture */}
      <section className="example-section">
        <h2>1. ResponsivePicture - Responsive Images</h2>
        <p>Automáticamente selecciona el tamaño correcto según el viewport</p>
        
        <div className="responsive-demo">
          <ResponsivePicture
            images={exampleProduct.images}
            fallbackUrl={exampleProduct.imageUrl}
            alt={exampleProduct.descripcion}
            className="demo-image"
            loading="lazy"
          />
        </div>
        
        <div className="code-example">
          <pre>{`<ResponsivePicture
  images={producto.images}
  fallbackUrl={producto.imageUrl}
  alt={producto.descripcion}
  loading="lazy"
/>`}</pre>
        </div>
      </section>

      {/* Sección 2: OptimizedImage */}
      <section className="example-section">
        <h2>2. OptimizedImage - Tamaño Específico</h2>
        <p>Permite especificar el tamaño exacto de imagen a cargar</p>
        
        <div className="size-demo">
          <div className="size-option">
            <h3>Thumbnail (150x150)</h3>
            <OptimizedImage
              images={exampleProduct.images}
              fallbackUrl={exampleProduct.imageUrl}
              alt={exampleProduct.descripcion}
              size="thumbnail"
              className="demo-image"
            />
          </div>
          
          <div className="size-option">
            <h3>Medium (300x300)</h3>
            <OptimizedImage
              images={exampleProduct.images}
              fallbackUrl={exampleProduct.imageUrl}
              alt={exampleProduct.descripcion}
              size="medium"
              className="demo-image"
            />
          </div>
          
          <div className="size-option">
            <h3>Large (600x600)</h3>
            <OptimizedImage
              images={exampleProduct.images}
              fallbackUrl={exampleProduct.imageUrl}
              alt={exampleProduct.descripcion}
              size="large"
              className="demo-image"
            />
          </div>
        </div>
      </section>

      {/* Sección 3: ProductCard */}
      <section className="example-section">
        <h2>3. ProductCard - Componente Completo</h2>
        <p>Componente de producto con imagen optimizada integrada</p>
        
        <div className="product-card-demo">
          <ProductCard
            producto={exampleProduct}
            size="medium"
            showPrice={true}
            useResponsive={true}
            className="demo-product-card"
          />
        </div>
      </section>

      {/* Sección 4: Hook personalizado */}
      <section className="example-section">
        <h2>4. useOptimizedImage Hook</h2>
        <p>Hook para control manual de imágenes optimizadas</p>
        
        <div className="hook-demo">
          <div className="image-container">
            <img
              src={currentImageUrl}
              alt={exampleProduct.descripcion}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`hook-image ${isLoaded ? 'loaded' : ''}`}
            />
          </div>
          
          <div className="controls">
            <button onClick={() => switchImageSize('thumbnail')}>
              Thumbnail
            </button>
            <button onClick={() => switchImageSize('medium')}>
              Medium
            </button>
            <button onClick={() => switchImageSize('large')}>
              Large
            </button>
          </div>
          
          <div className="image-info">
            <p><strong>URL actual:</strong> {currentImageUrl}</p>
            <p><strong>Información:</strong> {JSON.stringify(getImageInfo(), null, 2)}</p>
          </div>
        </div>
      </section>

      {/* Sección 5: Comparación de rendimiento */}
      <section className="example-section">
        <h2>5. Comparación de Rendimiento</h2>
        
        <div className="performance-demo">
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Tamaño</th>
                  <th>Formato</th>
                  <th>Peso Aprox.</th>
                  <th>Uso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Original</td>
                  <td>Variable</td>
                  <td>PNG</td>
                  <td>200-500KB</td>
                  <td>Backup</td>
                </tr>
                <tr className="optimized">
                  <td>Thumbnail</td>
                  <td>150x150</td>
                  <td>WebP</td>
                  <td>15-25KB</td>
                  <td>Listados</td>
                </tr>
                <tr className="optimized">
                  <td>Medium</td>
                  <td>300x300</td>
                  <td>WebP</td>
                  <td>45-70KB</td>
                  <td>Previews</td>
                </tr>
                <tr className="optimized">
                  <td>Large</td>
                  <td>600x600</td>
                  <td>WebP</td>
                  <td>120-180KB</td>
                  <td>Detalles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sección 6: Casos de uso reales */}
      <section className="example-section">
        <h2>6. Casos de Uso Reales</h2>
        
        <div className="real-usage">
          <h3>Homepage - Categorías</h3>
          <div className="usage-code">
            <pre>{`// En categories.jsx
<ResponsivePicture
  images={categoria.images}
  fallbackUrl={categoria.imageUrl}
  alt={categoria.rubro}
  className="category-image"
  loading="lazy"
/>`}</pre>
          </div>
          
          <h3>Listado de Productos</h3>
          <div className="usage-code">
            <pre>{`// En SubcategoryProducts.jsx
<ProductCard
  producto={producto}
  size="medium"
  showPrice={false}
  useResponsive={true}
/>`}</pre>
          </div>
          
          <h3>Detalle de Producto</h3>
          <div className="usage-code">
            <pre>{`// En ProductDetail.jsx
<OptimizedImage
  images={producto.images}
  fallbackUrl={producto.imageUrl}
  alt={producto.descripcion}
  size="large"
  loading="eager"
/>`}</pre>
          </div>
        </div>
      </section>

      {/* Sección 7: Comandos útiles */}
      <section className="example-section">
        <h2>7. Comandos Útiles</h2>
        
        <div className="commands">
          <div className="command-group">
            <h3>Optimizar todas las imágenes:</h3>
            <code>npm run optimize-images:all</code>
          </div>
          
          <div className="command-group">
            <h3>Limpiar imágenes optimizadas:</h3>
            <code>npm run optimize-images:clean</code>
          </div>
          
          <div className="command-group">
            <h3>Optimizar una imagen específica:</h3>
            <code>npm run optimize-images image 01234X.png</code>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExampleUsage;
