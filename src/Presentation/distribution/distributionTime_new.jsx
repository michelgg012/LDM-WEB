import { useState, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import {  Search, Clock, MapIcon, Truck } from 'lucide-react';
import { GetPlaces } from '../../Services/getPlaces';
import './distributionTime.css';
import { Capitalizar } from '@/Theme/Catalogoaux';

// Librerías de Google Maps necesarias
const libraries = ['places'];

export const DistributionTime = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const autocompleteRef = useRef(null);

  // Maneja cuando se selecciona una dirección del autocompletado
  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      
      setAddress(place.formatted_address);
      setCoordinates({ lat, lng });
    }
  };

  // Formatea hora para mostrar
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Obtiene estado de la guía
  const getEstadoText = (estado) => {
    return estado === 6 || estado === 3 ? 'Finalizada' : 'Pendiente';
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!coordinates) {
      alert('Por favor seleccione una dirección válida');
      return;
    }

    try {
      // Envía coordenadas usando el servicio GetPlaces
      const response = await GetPlaces(coordinates.lat, coordinates.lng);
      console.log('Respuesta del backend:', response);
      
      // Guarda toda la respuesta
      if (response.success && response.data) {
        setResponseData(response.data);
      } else {
        setResponseData(null);
      }
    } catch (error) {
      console.error('Error al verificar zona:', error);
      setResponseData(null);
    }
  };

  // Maneja cambios en el input
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="distribution-time-container">
        <div className="distribution-card">
          <div className="card-headers">
            {/* <MapPin className="header-icon" size={32} /> */}
            <h1>Verificar Zona de Reparto</h1>
            <p>Ingrese su dirección para conocer los horarios de entrega</p>
          </div>

          <form onSubmit={handleSubmit} className="address-form">
            <div className="input-group">
              <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={onPlaceChanged}
                options={{
                  componentRestrictions: { country: 'ar' },
                 bounds: {
                  north: -27.2000,  // Límite norte
                  south: -27.5500,  // Límite sur (incluye Candelaria)
                  east: -55.7500,   // Límite este
                  west: -56.1000    // Límite oeste (incluye Garupá)
                },
              
                 strictBounds: true, //para que no se muestren resultados fuera del radio
                 types: [ 'geocode'] // Filtrar solo direcciones y geocódigos
                }}
                style={{ width: '100%', flex: 1 }}
              >
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Ingrese su dirección..."
                  className="address-input"
                  autoComplete="off"
                />
                
              </Autocomplete>
              <button type="submit" className="search-button">
                <Search size={20} />
              </button> 
            </div>
          </form>

          {/* Información de zona y horarios */}
          {responseData && (
            <div className="zone-result">
              {/* Encabezado con datos de zona */}
              <div className="zone-header">
                <MapIcon className="zone-icon" size={24} />
                <div className="zone-title">
                  <h3>{responseData.zona.desczona.trim()}</h3>
                  <p>{responseData.zona.localidad.trim()} - Zona {responseData.zona.zona}</p>
                </div>
              </div>

              {/* Lista de horarios */}
              <div className="schedule-section">
                <div className="schedule-header">
                  <Clock className="schedule-icon" size={20} />

                  <h4>Horarios de Entrega Disponibles</h4>
                </div>
                
              <div className="schedule-list">
               {responseData.guias.length === 0 ? (
    <p className="no-schedule">No contamos con repartos a su zona el dia de hoy</p>
        ) : (
          responseData.guias.map((guia) => (
            <div key={guia.idguia} className="schedule-item">
            <div className="schedule-info">
              <Truck size={16} />
              <span className="schedule-name">{Capitalizar(guia.nombre.trim())}</span>
            </div>
            <div className="schedule-time">
              <span className="time">{formatTime(guia.hora_e_s)}</span>
              <span className={`status ${guia.estado === 6 || guia.estado === 3 ? 'pending' : 'finished'}`}>
                {getEstadoText(guia.estado)}
              </span>
            </div>
          </div>
        ))
     )}
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};