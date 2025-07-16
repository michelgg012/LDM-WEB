import { Truck, Clock, Phone,  } from 'lucide-react';
import './ServicesSection.css';

export const ServicesSection = () => {
  const services = [
    {
      icon: <Truck size={48} />,
      title: "Envío Gratuito",
      description: "En compras superiores a $15,000",
      color: "text-green-600"
    },
    {
      icon: <Clock size={48} />,
      title: "Repartos Diarios",
      description: "Entregas todos los días en Posadas, Garupá y Candelaria",
      color: "text-blue-600"
    },
    // {
    //   icon: <Shield size={48} />,
    //   title: "Calidad Garantizada",
    //   description: "Productos frescos y de la mejor calidad",
    //   color: "text-purple-600"
    // },
    {
      icon: <Phone size={48} />,
      title: "Atención 24/7",
      description: "Los domingos estamos en sucursal posadas para que retires tus pedidos",
      color: "text-orange-600"
    }
  ];

//   const stats = [
//     {
//       icon: <Users size={32} />,
//       number: "5000+",
//       label: "Clientes Satisfechos"
//     },
//     {
//       icon: <Star size={32} />,
//       number: "4.9",
//       label: "Calificación Promedio"
//     },
//     {
//       icon: <Truck size={32} />,
//       number: "1000+",
//       label: "Entregas Mensuales"
//     }
//   ];

  return (
    <section className="services-section">
      {/* Servicios principales */}
      <div className="services-container">
        <div className="services-header">
          <h2>¿Por qué elegir Lo de Mario?</h2>
          <p>Ofrecemos la mejor relacion-precio-calidad del mercado con un servicio que marca la diferencia</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className={`service-icon ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">
                {stat.icon}
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};
