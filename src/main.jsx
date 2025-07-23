import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartProvider, CatalogoProvider } from './context/';

createRoot(document.getElementById('root')).render(

    <CartProvider>
    <CatalogoProvider>
      <App />
     </CatalogoProvider>
     </CartProvider>

);

// Registrar el service worker para PWA, para poder descargar la app y usarla offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/public/service-worker.js')
      
  });
}

