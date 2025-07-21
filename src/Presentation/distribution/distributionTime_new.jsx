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
  const [geocoder, setGeocoder] = useState(null);

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

  // Cargar Google Maps JS API con Places
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      initializeGoogleServices();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GEOCODING_CONFIG.googleMapsApiKey}&libraries=places&loading=async&callback=initGoogleMaps`;
      script.async = true;
      
      // Definir callback global
      window.initGoogleMaps = () => {
        initializeGoogleServices();
      };
      
      document.body.appendChild(script);
    }

    // Limpiar callback al desmontar
    return () => {
      if (window.initGoogleMaps) {
        delete window.initGoogleMaps;
      }
    };
  }, []);

  const initializeGoogleServices = () => {
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      setGeocoder(new window.google.maps.Geocoder());
    } else {
      console.error('Google Maps services not available');
    }
  };

  // Función para geocodificar la dirección usando Google Maps Geocoding API
  const geocodeAddress = async (address) => {
    return new Promise((resolve, reject) => {
      if (!geocoder) {
        reject(new Error('Geocoder no disponible'));
        return;
      }
      geocoder.geocode({
        address: `${address}, Posadas, Misiones, Argentina`,
        componentRestrictions: { country: 'AR', locality: 'Posadas' }
      }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const result = results[0];
          resolve({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            display_name: result.formatted_address
          });
        } else {
          reject(new Error(MESSAGES.addressNotFound));
        }
      });
    });
  };

  // Función para buscar sugerencias usando Google Places Autocomplete
  const searchSuggestions = async (query) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoadingSuggestions(true);
    try {
      await searchSuggestionsGoogle(query);
    } catch {
      console.error('Error buscando sugerencias');
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Función para buscar sugerencias usando Google Places
  const searchSuggestionsGoogle = async (query) => {
    try {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        throw new Error('Google Maps Places no está disponible');
      }

      const queryInfo = processIntersectionQuery(query);
      
      // Usar el formato específico para intersecciones o direcciones normales
      const searchQuery = queryInfo.searchFormat;
      
      const request = {
        input: searchQuery,
        componentRestrictions: { country: 'ar' },
        locationBias: {
          center: new window.google.maps.LatLng(GEOCODING_CONFIG.posadas.lat, GEOCODING_CONFIG.posadas.lng),
          radius: GEOCODING_CONFIG.posadas.radius
        },
        types: queryInfo.isIntersection ? ['geocode'] : ['geocode', 'establishment']
      };

      // Si es intersección, también intentar con diferentes formatos
      if (queryInfo.isIntersection) {
        // Intentar múltiples formatos para intersecciones
        const alternativeFormats = [
          searchQuery,
          `${queryInfo.processed}, Posadas, Misiones, Argentina`,
          `intersection of ${queryInfo.processed}, Posadas, Argentina`,
          queryInfo.processed.replace(' y ', ' & ') + ', Posadas, Argentina'
        ];
        
        // Usar el primer formato y guardar los alternativos para retry si es necesario
        request.input = alternativeFormats[0];
      }

      // Intentar usar AutocompleteSuggestion primero (nueva API)
      if (window.google.maps.places.AutocompleteSuggestion) {
        try {
          const service = new window.google.maps.places.AutocompleteSuggestion();
          
          // Verificar si tiene el método getQueryPredictions (nueva API)
          if (typeof service.getQueryPredictions === 'function') {
            service.getQueryPredictions(request, (predictions, status) => {
              handlePredictionsResponse(predictions, status, queryInfo);
            });
            return;
          }
          // Verificar si tiene el método getPlacePredictions (compatibilidad)
          else if (typeof service.getPlacePredictions === 'function') {
            service.getPlacePredictions(request, (predictions, status) => {
              handlePredictionsResponse(predictions, status, queryInfo);
            });
            return;
          }
        } catch {
          // Silenciar error de AutocompleteSuggestion
        }
      }

      // Fallback a AutocompleteService (API clásica)
      if (window.google.maps.places.AutocompleteService) {
        const service = new window.google.maps.places.AutocompleteService();
        if (typeof service.getPlacePredictions === 'function') {
          service.getPlacePredictions(request, (predictions, status) => {
            handlePredictionsResponse(predictions, status, queryInfo);
          });
          return;
        }
      }

      throw new Error('No hay servicios de autocompletado disponibles');

    } catch {
      console.error('Error con servicio de lugares');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Función para manejar la respuesta de las predicciones
  const handlePredictionsResponse = (predictions, status, queryInfo) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
      const formattedSuggestions = predictions
        .filter(prediction => {
          const description = prediction.description.toLowerCase();
          return description.includes('posadas') || 
                 description.includes('misiones');
        })
        .map(prediction => {
          const parts = prediction.description.split(',');
          let mainAddress = parts[0].trim();
          const neighborhood = parts[1]?.trim();
          const city = parts[2]?.trim() || 'Posadas';
          const province = parts[3]?.trim() || 'Misiones';
          
          // Para intersecciones, mantener el formato completo de la consulta
          if (queryInfo.isIntersection) {
            // Si la descripción contiene palabras clave de intersección, usarla tal como viene
            const intersectionKeywords = ['&', ' y ', ' e ', ' and ', 'intersection', 'esquina'];
            const hasIntersectionKeyword = intersectionKeywords.some(keyword => 
              prediction.description.toLowerCase().includes(keyword)
            );
            
            if (hasIntersectionKeyword) {
              mainAddress = parts[0].trim();
            } else {
              // Si no tiene palabra clave de intersección, usar la consulta original
              mainAddress = queryInfo.processed;
            }
          }
          
          return {
            display_name: prediction.description,
            address: mainAddress,
            street: mainAddress,
            houseNumber: '',
            neighborhood: neighborhood,
            city: city,
            province: province,
            place_id: prediction.place_id,
            isIntersection: queryInfo.isIntersection,
            prediction: prediction
          };
        })
        .slice(0, 6);
      
      setSuggestions(formattedSuggestions);
      setShowSuggestions(true);
    } else {

      
      setSuggestions([]);
      setShowSuggestions(false);
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
  const selectSuggestion = async (suggestion) => {
    setAddress(suggestion.address);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    
    // Si la sugerencia tiene place_id (de Google Places), geocodificar primero
    if (suggestion.place_id) {
      try {
        setIsLoading(true);
        const coordinates = await geocodeAddress(suggestion.address);
        setTimeout(() => {
          checkDeliveryZoneWithCoordinates(coordinates.lat, coordinates.lng, suggestion.address);
        }, 100);
      } catch {
        console.error('Error geocodificando sugerencia');
        setError('Error al procesar la dirección seleccionada');
      } finally {
        setIsLoading(false);
      }
    } else if (suggestion.lat && suggestion.lng) {
      // Si ya tiene coordenadas (fallback), usar directamente
      setTimeout(() => {
        checkDeliveryZoneWithCoordinates(suggestion.lat, suggestion.lng, suggestion.address);
      }, 100);
    }
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
    const intersectionKeywords = [' y ', ' e ', ' esquina ', ' esq ', ' con ', ' &', ' and ', ' intersection '];
    const lowerQuery = query.toLowerCase();
    
    for (const keyword of intersectionKeywords) {
      if (lowerQuery.includes(keyword)) {
        // Para intersecciones, no agregamos "Posadas, Misiones, Argentina" automáticamente
        // Esto permite que Google Maps entienda mejor la consulta de intersección
        return {
          isIntersection: true,
          processed: query.trim(),
          // Formatear para Google Maps con palabra clave específica
          searchFormat: `${query.trim()} intersection, Posadas, Misiones, Argentina`
        };
      }
    }
    
    return {
      isIntersection: false,
      processed: query.trim(),
      searchFormat: `${query.trim()}, Posadas, Misiones, Argentina`
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
