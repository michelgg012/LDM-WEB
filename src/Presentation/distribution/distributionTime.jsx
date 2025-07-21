import { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, XCircle, Search, Loader2 } from 'lucide-react';
import { DELIVERY_ZONES, GEOCODING_CONFIG, MESSAGES } from './deliveryConfig';
import './distributionTime.css';

export const DistributionTime = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  // Función para verificar si un punto está dentro de un polígono
  const isPointInPolygon = (point, polygon) => {
    const x = point.lat;
    const y = point.lng;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat;
      const yi = polygon[i].lng;
      const xj = polygon[j].lat;
      const yj = polygon[j].lng;

      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }

    return inside;
  };

  // Función para geocodificar la dirección usando OpenStreetMap (gratuito)
  const geocodeAddress = async (address) => {
    try {
      const query = `${address}, ${GEOCODING_CONFIG.defaultCity}, ${GEOCODING_CONFIG.defaultProvince}, ${GEOCODING_CONFIG.defaultCountry}`;
      const response = await fetch(
        `${GEOCODING_CONFIG.baseUrl}?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          display_name: data[0].display_name
        };
      } else {
        throw new Error(MESSAGES.addressNotFound);
      }
    } catch {
      throw new Error(MESSAGES.geocodingError);
    }
  };

  // Función para buscar sugerencias de direcciones más precisas
  const searchSuggestions = async (query) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      // Detectar si es una búsqueda por intersección usando la función mejorada
      const queryInfo = processIntersectionQuery(query);
      
      let searchQuery;
      if (queryInfo.isIntersection) {
        // Para intersecciones, buscar de forma más específica
        searchQuery = `${queryInfo.processed}, Posadas, Misiones, Argentina`;
      } else {
        // Para direcciones normales
        searchQuery = `${queryInfo.processed}, Posadas, Misiones, Argentina`;
      }
      
      const response = await fetch(
        `${GEOCODING_CONFIG.baseUrl}?format=json&q=${encodeURIComponent(searchQuery)}&limit=10&addressdetails=1&extratags=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const formattedSuggestions = data
          .filter(item => {
            // Filtrar solo resultados relevantes de la zona
            const displayName = item.display_name.toLowerCase();
            return displayName.includes('posadas') || 
                   displayName.includes('garupá') || 
                   displayName.includes('garupa') ||
                   displayName.includes('misiones');
          })
          .map(item => {
            // Formatear la dirección de manera más clara
            const parts = item.display_name.split(',');
            const address = parts[0].trim();
            const neighborhood = parts[1]?.trim();
            const city = parts[2]?.trim() || 'Posadas';
            const province = parts[3]?.trim() || 'Misiones';
            
            // Extraer información más detallada
            const addressDetails = item.address || {};
            const houseNumber = addressDetails.house_number || '';
            const street = addressDetails.road || address;
            const suburb = addressDetails.suburb || addressDetails.neighbourhood || neighborhood;
            
            // Formatear según el nuevo formato solicitado
            let formattedParts = [];
            
            // Calle
            if (street) {
              formattedParts.push(street);
            }
            
            // Altura (número de casa)
            if (houseNumber) {
              formattedParts[0] = `${street} ${houseNumber}`;
            }
            
            // Si es intersección, mantener el formato original
            if (queryInfo.isIntersection && address.toLowerCase().includes(' y ')) {
              formattedParts = [address];
            }
            
            const mainAddress = formattedParts[0] || address;
            
            return {
              display_name: item.display_name,
              address: mainAddress,
              street: street,
              houseNumber: houseNumber,
              neighborhood: suburb,
              city: city,
              province: province,
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              type: item.type || 'address',
              importance: item.importance || 0,
              isIntersection: queryInfo.isIntersection
            };
          })
          .sort((a, b) => b.importance - a.importance) // Ordenar por importancia
          .slice(0, 6); // Limitar a 6 resultados
        
        setSuggestions(formattedSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch {
      console.error('Error buscando sugerencias');
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Función para verificar en qué zona se encuentra la dirección
  const checkDeliveryZone = async () => {
    if (!address.trim()) {
      setError(MESSAGES.addressRequired);
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // Geocodificar la dirección
      const coordinates = await geocodeAddress(address);
      
      // Verificar en qué zona se encuentra
      let foundZone = null;
      for (const [zoneKey, zone] of Object.entries(DELIVERY_ZONES)) {
        if (isPointInPolygon(coordinates, zone.coordinates.bounds)) {
          foundZone = { key: zoneKey, ...zone };
          break;
        }
      }
      
      if (foundZone) {
        setResult({
          inDeliveryZone: true,
          zone: foundZone,
          coordinates: coordinates
        });
      } else {
        setResult({
          inDeliveryZone: false,
          coordinates: coordinates
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para verificar zona con coordenadas ya conocidas
  const checkDeliveryZoneWithCoordinates = async (lat, lng, addressText) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const coordinates = { lat, lng };
      
      // Verificar en qué zona se encuentra
      let foundZone = null;
      for (const [zoneKey, zone] of Object.entries(DELIVERY_ZONES)) {
        if (isPointInPolygon(coordinates, zone.coordinates.bounds)) {
          foundZone = { key: zoneKey, ...zone };
          break;
        }
      }
      
      if (foundZone) {
        setResult({
          inDeliveryZone: true,
          zone: foundZone,
          coordinates: coordinates,
          address: addressText
        });
      } else {
        setResult({
          inDeliveryZone: false,
          coordinates: coordinates,
          address: addressText
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el cambio en el input
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setError('');
    setResult(null);
    setSelectedSuggestionIndex(-1);
    
    // Buscar sugerencias con un pequeño delay
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      searchSuggestions(value);
    }, 300);
  };

  // Función para seleccionar una sugerencia
  const selectSuggestion = (suggestion) => {
    setAddress(suggestion.address);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    
    // Verificar automáticamente la zona al seleccionar
    setTimeout(() => {
      checkDeliveryZoneWithCoordinates(suggestion.lat, suggestion.lng, suggestion.address);
    }, 100);
  };

  // Función para manejar teclas de navegación
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          selectSuggestion(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkDeliveryZone();
  };

  // Efecto para ocultar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.address-form')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para detectar y procesar intersecciones
  const processIntersectionQuery = (query) => {
    const intersectionKeywords = [' y ', ' e ', ' esquina ', ' esq ', ' con ', ' &', ' and '];
    const lowerQuery = query.toLowerCase();
    
    for (const keyword of intersectionKeywords) {
      if (lowerQuery.includes(keyword)) {
        return {
          isIntersection: true,
          processed: query.trim()
        };
      }
    }
    
    return {
      isIntersection: false,
      processed: query.trim()
    };
  };

  return (
    <div className="distribution-time-container">
      <div className="distribution-card">
        <div className="card-header">
          <MapPin className="header-icon" size={32} />
          <h1>Verificar Zona de Reparto</h1>
          <p>Ingrese su dirección para conocer los horarios de entrega</p>
        </div>

        <form onSubmit={handleSubmit} className="address-form">
          <div className="input-group">
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              onKeyDown={handleKeyDown}
              placeholder={MESSAGES.placeholder}
              className="address-input"
              disabled={isLoading}
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="spin" size={20} />
              ) : (
                <Search size={20} />
              )}
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              {isLoadingSuggestions ? (
                <div className="suggestion-item loading">
                  <Loader2 className="spin" size={16} />
                  <span>Buscando direcciones...</span>
                </div>
              ) : (
                <div className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      <MapPin size={16} />
                      <div className="suggestion-content">
                        <div className="suggestion-main">
                          {suggestion.isIntersection ? (
                            <span className="intersection-text">{suggestion.address}</span>
                          ) : (
                            <>
                              <span className="street-name">{suggestion.street}</span>
                              {suggestion.houseNumber && (
                                <span className="house-number"> {suggestion.houseNumber}</span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="suggestion-secondary">
                          {suggestion.neighborhood && (
                            <span className="neighborhood">{suggestion.neighborhood}, </span>
                          )}
                          <span className="city">{suggestion.city}</span>
                          <span className="province">, {suggestion.province}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>

        {error && (
          <div className="error-message">
            <XCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="result-container">
            {result.inDeliveryZone ? (
              <div className="success-result">
                <div className="result-header">
                  <CheckCircle className="success-icon" size={24} />
                  <h3>{MESSAGES.inDeliveryZone}</h3>
                </div>
                <p className="zone-info">Zona: {result.zone.name}</p>
                
                <div className="schedules-container">
                  <h4><Clock size={20} /> Horarios de Reparto</h4>
                  <div className="schedules-grid">
                    {result.zone.schedules.map((schedule, index) => (
                      <div key={index} className="schedule-item">
                        <span className="schedule-day">{schedule.day}</span>
                        <span className="schedule-time">{schedule.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="delivery-info">
                  <p><strong>Envío gratuito</strong> en compras superiores a ${result.zone.deliveryInfo.freeShippingMinimum.toLocaleString()}</p>
                  <p>Tiempo estimado de entrega: {result.zone.deliveryInfo.estimatedTime}</p>
                  <p>Cobertura: {result.zone.deliveryInfo.coverage}</p>
                </div>
              </div>
            ) : (
              <div className="error-result">
                <div className="result-header">
                  <XCircle className="error-icon" size={24} />
                  <h3>{MESSAGES.notInDeliveryZone}</h3>
                </div>
                <p>Actualmente solo realizamos envíos al centro de la ciudad.</p>
                <p>{MESSAGES.expandingSoon}</p>
                
                <div className="contact-info">
                  <p>{MESSAGES.contactForOtherZones}</p>
                  <a 
                    href={`https://wa.me/5493764374028?text=${encodeURIComponent(MESSAGES.whatsappConsultText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
