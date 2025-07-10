# Componente de Verificación de Zona de Reparto

Este componente permite a los clientes verificar si realizas envíos a su zona e ingresar su dirección para conocer los horarios de entrega.

## Características

- ✅ Geocodificación gratuita usando OpenStreetMap Nominatim
- ✅ Verificación de zonas mediante coordenadas geográficas
- ✅ Horarios de reparto configurables por zona
- ✅ Interfaz moderna y responsive
- ✅ Integración con WhatsApp para consultas
- ✅ Animaciones suaves y feedback visual

## Configuración

### 1. Definir Zonas de Reparto

Edita el archivo `deliveryConfig.js` para configurar tus zonas de reparto:

```javascript
export const DELIVERY_ZONES = {
  centro: {
    name: 'Centro',
    coordinates: {
      bounds: [
        { lat: -27.3650, lng: -55.9050 }, // Noroeste
        { lat: -27.3650, lng: -55.8750 }, // Noreste
        { lat: -27.3750, lng: -55.8750 }, // Sureste
        { lat: -27.3750, lng: -55.9050 }  // Suroeste
      ]
    },
    schedules: [
      { day: 'Lunes a Viernes', time: '9:00 AM - 6:00 PM' },
      { day: 'Sábados', time: '9:00 AM - 1:00 PM' },
      { day: 'Domingos', time: 'No hay reparto' }
    ],
    deliveryInfo: {
      freeShippingMinimum: 15000,
      estimatedTime: '2-4 horas',
      coverage: 'Centro de la ciudad'
    }
  }
};
```

### 2. Cómo Obtener las Coordenadas

Para definir las coordenadas de tu zona de reparto:

1. **Opción 1 - Google Maps:**
   - Ve a [Google Maps](https://maps.google.com)
   - Haz clic derecho en los puntos del perímetro de tu zona
   - Selecciona las coordenadas que aparecen
   - Usa formato: `{ lat: -27.3650, lng: -55.9050 }`

2. **Opción 2 - OpenStreetMap:**
   - Ve a [OpenStreetMap](https://www.openstreetmap.org)
   - Haz clic derecho en los puntos del perímetro
   - Selecciona "Mostrar dirección" para obtener las coordenadas

3. **Opción 3 - Herramientas online:**
   - Usa [GPS Coordinates](https://www.gps-coordinates.net/)
   - Busca tu ciudad y obtén las coordenadas específicas

### 3. Agregar Nuevas Zonas

Para agregar una nueva zona de reparto:

```javascript
// En deliveryConfig.js
export const DELIVERY_ZONES = {
  centro: { /* configuración existente */ },
  
  // Nueva zona
  garupa: {
    name: 'Garupá',
    coordinates: {
      bounds: [
        { lat: -27.4800, lng: -55.8200 },
        { lat: -27.4800, lng: -55.7800 },
        { lat: -27.5000, lng: -55.7800 },
        { lat: -27.5000, lng: -55.8200 }
      ]
    },
    schedules: [
      { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
      { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
      { day: 'Domingos', time: 'No hay reparto' }
    ],
    deliveryInfo: {
      freeShippingMinimum: 20000,
      estimatedTime: '3-5 horas',
      coverage: 'Garupá y alrededores'
    }
  }
};
```

### 4. Personalizar Mensajes

Edita los mensajes en `deliveryConfig.js`:

```javascript
export const MESSAGES = {
  placeholder: 'Ingrese su dirección completa (ej: Av. Corrientes 1234)',
  addressRequired: 'Por favor ingrese una dirección',
  // ... más mensajes
};
```

## Cómo Usar el Componente

### 1. Importar y Usar

```javascript
import { DistributionTime } from './path/to/DistributionTime';

function App() {
  return (
    <div>
      <DistributionTime />
    </div>
  );
}
```

### 2. Integrar con React Router

```javascript
import { Routes, Route } from 'react-router-dom';
import { DistributionTime } from './DistributionTime';

function App() {
  return (
    <Routes>
      <Route path="/zona-reparto" element={<DistributionTime />} />
    </Routes>
  );
}
```

## Funcionalidades

### Geocodificación
- Usa OpenStreetMap Nominatim (gratuito, sin límites estrictos)
- Busca direcciones en formato: "Dirección, Posadas, Misiones, Argentina"
- Maneja errores de conexión y direcciones no encontradas

### Verificación de Zonas
- Usa algoritmo "Point in Polygon" para verificar si una coordenada está dentro de una zona
- Soporta zonas con formas irregulares (polígonos de cualquier cantidad de puntos)
- Compara con todas las zonas configuradas

### Interfaz de Usuario
- Diseño moderno con gradientes y animaciones
- Responsive para móviles y desktop
- Feedback visual durante la carga
- Mensajes de error claros

## Personalización de Estilos

El archivo `distributionTime.css` contiene todos los estilos. Puedes personalizar:

- **Colores:** Modifica las variables de gradientes
- **Tamaños:** Ajusta padding, margins y font-sizes
- **Animaciones:** Modifica las animaciones CSS
- **Responsive:** Ajusta los media queries

## Troubleshooting

### Problema: Direcciones no encontradas
- Verifica que la ciudad esté correctamente configurada en `GEOCODING_CONFIG`
- Intenta con direcciones más específicas
- Asegúrate de incluir el nombre de la calle y número

### Problema: Zona no detectada correctamente
- Verifica que las coordenadas del polígono estén en el orden correcto
- Asegúrate de que el polígono esté cerrado (último punto conecta con el primero)
- Usa herramientas como [Polygon Drawer](http://apps.headwallphotonics.com/polygon_drawer/) para visualizar

### Problema: API no funciona
- OpenStreetMap Nominatim es gratuito pero tiene límites de uso
- Para uso intensivo, considera usar Google Maps Geocoding API
- Implementa un sistema de cache para direcciones frecuentes

## Mejoras Futuras

- [ ] Cache de direcciones en localStorage
- [ ] Integración con Google Maps API
- [ ] Mapa visual de las zonas de reparto
- [ ] Notificaciones push para nuevas zonas
- [ ] Analytics de direcciones consultadas
- [ ] Integración con sistema de envíos
