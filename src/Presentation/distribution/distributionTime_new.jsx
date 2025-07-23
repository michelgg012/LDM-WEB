import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import './distributionTime.css';

export const DistributionTime = () => {
  const [address, setAddress] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar lógica de verificación
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
              placeholder="Ingrese su dirección..."
              className="address-input"
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="search-button"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
