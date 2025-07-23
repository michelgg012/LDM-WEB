import './StoreHours.css';

const StoreHours = () => {
  const storeData = [
    {
      name: "Posadas",
      hours: [
        { days: "Lunes a Sábado", time: "8:30hs a 12:30hs - 16:00hs a 20:00hs" },
        { days: "Domingos", time: "16:30hs a 20:00hs" }
      ]
    },
    {
      name: "Garupa",
      hours: [
        { days: "Lunes a Sábado", time: "8:30hs a 12:30hs - 13:30hs a 17:30hs" },
        { days: "Domingo", time: "Cerrado" }
      ]
    }
  ];

  return (
    <section className="store-hours-section">
      <div className="container">
        <div className="store-hours-header">
          <h2>Horarios de Atención</h2>
          <p>Visítanos en cualquiera de nuestras sucursales</p>
        </div>
        
        <div className="stores-grid">
          {storeData.map((store, index) => (
            <div key={index} className="store-card">
              <div className="store-header">
                <h3>{store.name}</h3>
                {/* <div className="store-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.58172 6.58172 2 11 2H13C17.4183 2 21 5.58172 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div> */}
              </div>
              
              <div className="store-hours">
                {store.hours.map((schedule, scheduleIndex) => (
                  <div key={scheduleIndex} className="hour-row">
                    <span className="days">{schedule.days}</span>
                    <span className={`time ${schedule.time === 'Cerrado' ? 'closed' : ''}`}>
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { StoreHours };
