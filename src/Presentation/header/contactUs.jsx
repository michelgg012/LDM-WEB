import React from 'react'
import './contactUs.css'

export const ContactUs = () => {
  const contactSections = [
    {
      id: 'cliente',
      title: 'Quiero ser Cliente',
      description: 'Para restaurantes, bares y establecimientos que quieran tener una cuenta',
      icon: '🏪',
      phone: '+54 3764-374028', 
      email: 'clientes@lodemario.com',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'empleado',
      title: 'Trabaja con Nosotros',
      description: 'Únete a nuestro equipo de trabajo y crece profesionalmente',
      icon: '👥',
      phone: '+54 3764-374028',
      email: 'rrhh@lodemario.com',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'proveedor',
      title: 'Soy Proveedor',
      description: 'Proveedores que quieran formar parte de nuestra cadena de suministro',
      icon: '🚛',
      phone: '+54 3764-374028',
      email: 'proveedores@lodemario.com',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ]

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self')
  }

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, '_blank')
  }

  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h2 className="contact-title">Contáctanos</h2>
        <p className="contact-subtitle">
          Elige la opción que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="contact-sections">
        {contactSections.map((section) => (
          <div 
            key={section.id} 
            className={`contact-card ${section.bgColor} ${section.borderColor}`}
          >
           
            <div className="card-content">
              <h3 className="card-title">{section.title}</h3>
              {/* <p className="card-description">{section.description}</p> */}
              
              <div className="contact-methods">
                <button 
                  onClick={() => handleCall(section.phone)}
                  className="contact-button phone-button"
                  title={`Llamar a ${section.phone}`}
                >
                  <span className="button-icon" style={{ marginRight: '6px' }}>🟢</span>
                  <span className="button-text">{section.phone}</span>
                </button>
                
                <button 
                  onClick={() => handleEmail(section.email)}
                  className="contact-button email-button"
                  title={`Enviar email a ${section.email}`}
                >
                  <span className="button-icon">✉️</span>
                  <span className="button-text">{section.email}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-footer">
        <p className="footer-text">
          ¿Tienes alguna pregunta? No dudes en contactarnos
        </p>
        
         <a href="mailto:Dis_lodemario@outlook.com">
                  dis_lodemario@outlook.com
                </a>
      </div>
    </div>
  )
}
