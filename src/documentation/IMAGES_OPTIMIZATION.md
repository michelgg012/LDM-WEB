# 🚀 Sistema de Imágenes Optimizadas

## 📋 Descripción

Este sistema implementa optimización automática de imágenes para el catálogo web, utilizando formatos modernos como WebP y múltiples tamaños responsive.

## 🎯 Beneficios

- **Reducción de peso**: 70-85% menos peso por imagen
- **Formatos modernos**: WebP con fallback a JPG
- **Responsive**: Diferentes tamaños según el dispositivo
- **Performance**: Lazy loading y cache optimizado
- **SEO**: Mejor Core Web Vitals

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Instalar Sharp para optimización
npm install sharp --save-dev
```

## 📁 Estructura de Archivos

```
src/assets/articulos/
├── 01234X.png          # Imagen original
├── 01234T.webp         # Thumbnail WebP (150x150)
├── 01234T.jpg          # Thumbnail JPG (150x150)
├── 01234M.webp         # Medium WebP (300x300)
├── 01234M.jpg          # Medium JPG (300x300)
├── 01234X.webp         # Large WebP (600x600)
└── 01234X.jpg          # Large JPG (600x600)
```

## 🖼️ Tamaños Disponibles

| Sufijo | Tamaño | Uso | Peso Aprox |
|--------|---------|-----|------------|
| `T` | 150x150 | Thumbnails, listados | 15-25KB |
| `M` | 300x300 | Previews, grids | 45-70KB |
| `X` | 600x600 | Detalles, zoom | 120-180KB |

## 🚀 Uso Básico

### Optimizar todas las imágenes:
```bash
npm run optimize-images:all
```

### Limpiar imágenes optimizadas:
```bash
npm run optimize-images:clean
```

### Optimizar una imagen específica:
```bash
npm run optimize-images image 01234X.png
```

## 🎨 Componentes Disponibles

### 1. ResponsivePicture
```jsx
import ResponsivePicture from './Components/ResponsivePicture';

<ResponsivePicture
  images={producto.images}
  fallbackUrl={producto.imageUrl}
  alt={producto.descripcion}
  loading="lazy"
/>
```

### 2. OptimizedImage
```jsx
import OptimizedImage from './Components/OptimizedImage';

<OptimizedImage
  images={producto.images}
  fallbackUrl={producto.imageUrl}
  alt={producto.descripcion}
  size="medium"
  loading="lazy"
/>
```

### 3. ProductCard
```jsx
import ProductCard from './Presentation/catalog/ProductCard';

<ProductCard
  producto={producto}
  size="medium"
  showPrice={true}
  useResponsive={true}
/>
```

## 🔧 Hook personalizado

```jsx
import { useOptimizedImage } from './Hooks/useOptimizedImage';

const {
  currentImageUrl,
  isLoaded,
  handleImageLoad,
  handleImageError,
  switchImageSize,
  getImageInfo
} = useOptimizedImage(images, fallbackUrl, 'medium');
```

## 📊 Configuración por Contexto

### Homepage/Categorías:
```jsx
<ResponsivePicture
  images={categoria.images}
  size="thumbnail"
  loading="lazy"
/>
```

### Listados de productos:
```jsx
<ProductCard
  producto={producto}
  size="medium"
  useResponsive={true}
/>
```

### Detalle de producto:
```jsx
<OptimizedImage
  images={producto.images}
  size="large"
  loading="eager"
/>
```

## 🛠️ Personalización

### Modificar tamaños:
Edita `scripts/optimize-images.js`:

```javascript
const IMAGE_SIZES = {
  'T': { width: 150, height: 150, quality: 85 },
  'M': { width: 300, height: 300, quality: 80 },
  'X': { width: 600, height: 600, quality: 75 }
};
```

### Añadir nuevos formatos:
```javascript
const OUTPUT_FORMATS = ['webp', 'jpg', 'avif'];
```

## 📈 Rendimiento

### Antes:
- **Peso promedio**: 350KB por imagen
- **Formato**: PNG sin optimizar
- **Responsive**: No

### Después:
- **Thumbnail**: 15KB (WebP) / 25KB (JPG)
- **Medium**: 45KB (WebP) / 70KB (JPG)
- **Large**: 120KB (WebP) / 180KB (JPG)
- **Formatos**: WebP + JPG fallback
- **Responsive**: Sí

## 🔄 Flujo de Trabajo

1. **Subir imagen original** (`01234X.png`) a `src/assets/articulos/`
2. **Ejecutar optimización**: `npm run optimize-images:all`
3. **El sistema genera automáticamente**:
   - 6 versiones optimizadas por imagen
   - Diferentes tamaños y formatos
   - Fallbacks automáticos

## 🐛 Troubleshooting

### "Sharp no está instalado"
```bash
npm install sharp --save-dev
```

### "Imágenes no se cargan"
- Verificar que las rutas sean correctas
- Comprobar que el backend esté enviando el objeto `images`
- Revisar la consola para errores de red

### "Solo se muestra la imagen fallback"
- Verificar que existan las imágenes optimizadas
- Ejecutar `npm run optimize-images:all`
- Comprobar formato de nombres de archivo

## 📝 Notas Importantes

- Las imágenes originales se mantienen como respaldo
- El sistema es backward compatible
- Las imágenes optimizadas se regeneran automáticamente
- El soporte WebP se detecta automáticamente
- Cache de 1 año para imágenes optimizadas

## 🎯 Próximas Mejoras

- [ ] Soporte para AVIF
- [ ] Lazy loading con Intersection Observer
- [ ] Preload de imágenes críticas
- [ ] Compresión progresiva
- [ ] CDN integration
- [ ] Watermarks automáticos
