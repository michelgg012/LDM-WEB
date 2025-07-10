// Configuración de zonas de reparto


export const DELIVERY_ZONES = {
    centro: {
        name: 'Centro',
        coordinates: {
            bounds: [ 
                { lat: -27.385233456339964, lng: -55.88630494363633 },
                { lat: -27.37458043740859, lng: -55.88076384235242 }, 
                { lat: -27.361061971723167, lng: -55.88552514207859 },
                { lat: -27.34721542351066, lng: -55.89894963936907 }, 
                { lat: -27.351496722247344, lng: -55.90265935897855 },
                { lat: -27.383351595011536, lng: -55.9076228415559 }
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
    },

    villaCabello: {
        name: 'Villa Cabello',
        coordinates: {
            bounds: [
                { lat: -27.3517803, lng: -55.9024896 },
                { lat: -27.3537202, lng: -55.9432068 },
                { lat: -27.3608839, lng: -55.9583816 },
                { lat: -27.3821741, lng: -55.9533176 },
                { lat: -27.3872125, lng: -55.9041066 },
                { lat: -27.3739853, lng: -55.9022613 },
                { lat: -27.3735208, lng: -55.9061632 },
                { lat: -27.3734479, lng: -55.9062689 },
                { lat: -27.3519481, lng: -55.9024373 }
            ]
        },
        schedules: [
            { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
            { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
            { day: 'Domingos', time: 'No hay reparto' }
        ],
        deliveryInfo: {
            freeShippingMinimum: 20000,
            estimatedTime: '1-2 horas',
            coverage: 'Villa Cabello'
        }
    },
    villaCabelloRuta: {
        name: 'Villa Cabello Ruta',
        coordinates: {
            bounds: [
                { lng: -55.9252038, lat: -27.4018800 },
                { lng: -55.9229078, lat: -27.3851586 },
                { lng: -55.9536996, lat: -27.3818648 },
                { lng: -55.9500389, lat: -27.3870969 },
                { lng: -55.9509058, lat: -27.3955611 },
                { lng: -55.9534378, lat: -27.3952564 },
                { lng: -55.9541373, lat: -27.3987731 },
                { lng: -55.9475327, lat: -27.3994134 },
                { lng: -55.9252167, lat: -27.4019419 }
            ]
        },
        schedules: [
            { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
            { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
            { day: 'Domingos', time: 'No hay reparto' }
        ],
        deliveryInfo: {
            freeShippingMinimum: 20000,
            estimatedTime: '1-2 horas',
            coverage: 'Villa Cabello Ruta'
        }
    },
    terminal: {
        name: 'Terminal',
        coordinates: {
            bounds: [
                { lat: -27.3844700, lng: -55.8998759 },
                { lat: -27.3840281, lng: -55.9036908 },
                { lat: -27.3872525, lng: -55.9041967 },
                { lat: -27.3852715, lng: -55.9228937 },
                { lat: -27.4018273, lng: -55.9251250 },
                { lat: -27.4045739, lng: -55.9027262 },
                { lat: -27.3846152, lng: -55.9000009 }
            ]
        },
        schedules: [
            { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
            { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
            { day: 'Domingos', time: 'No hay reparto' }
        ],
        deliveryInfo: {
            freeShippingMinimum: 20000,
            estimatedTime: '1-2 horas',
            coverage: 'Terminal'
        }
    },
    lopezTorres: {
        name: 'Lopez Torres',
        coordinates: {
            bounds: [
                { lat: -27.3843526, lng: -55.8998805 },
                { lat: -27.3857902, lng: -55.8864188 },
                { lat: -27.3897313, lng: -55.8895112 },
                { lat: -27.3944258, lng: -55.8919066 },
                { lat: -27.3972153, lng: -55.8923180 },
                { lat: -27.4047992, lng: -55.8911351 },
                { lat: -27.4073046, lng: -55.8943177 },
                { lat: -27.4119743, lng: -55.8974853 },
                { lat: -27.4167120, lng: -55.8971677 },
                { lat: -27.4188056, lng: -55.8998523 },
                { lat: -27.4065679, lng: -55.9030981 },
                { lat: -27.4050373, lng: -55.9027858 },
                { lat: -27.3843817, lng: -55.8999919 }
            ]
        },
        schedules: [
            { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
            { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
            { day: 'Domingos', time: 'No hay reparto' }
        ],
        deliveryInfo: {
            freeShippingMinimum: 20000,
            estimatedTime: '1-2 horas',
            coverage: 'Lopez Torres'
        }
    },
    itaembeMini: {
        name: 'Itaembe Mini',
        coordinates: {
            bounds: [
                { lng: -55.9032869, lat: -27.4045813 },
                { lng: -55.9029865, lat: -27.4056096 },
                { lng: -55.9031367, lat: -27.4064552 },
                { lng: -55.9003901, lat: -27.4185131 },
                { lng: -55.9078703, lat: -27.4191402 },
                { lng: -55.9130201, lat: -27.4193232 },
                { lng: -55.9142818, lat: -27.4278748 },
                { lng: -55.9342976, lat: -27.4255604 },
                { lng: -55.9500217, lat: -27.4412593 },
                { lng: -55.9596176, lat: -27.4354575 },
                { lng: -55.9598408, lat: -27.4279238 },
                { lng: -55.9649992, lat: -27.4261456 },
                { lng: -55.9641495, lat: -27.4193177 },
                { lng: -55.9798565, lat: -27.4120054 },
                { lng: -55.9728012, lat: -27.4066559 },
                { lng: -55.9656858, lat: -27.4014745 },
                { lng: -55.9627247, lat: -27.3995160 },
                { lng: -55.9595404, lat: -27.3985789 },
                { lng: -55.9561930, lat: -27.3986854 },
                { lng: -55.9032998, lat: -27.4045836 }
            ]
        },
        schedules: [
            { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
            { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
            { day: 'Domingos', time: 'No hay reparto' }
        ],
        deliveryInfo: {
            freeShippingMinimum: 20000,
            estimatedTime: '1-2 horas',
            coverage: 'Itaembe Mini'
        }
    },
    sanIsidroManana: {
        name: 'San Isidro - Mañana',
        coordinates: {
            bounds: [
                { lng: -55.9133710, lat: -27.4215501 },
                { lng: -55.9158182, lat: -27.4398859 },
                { lng: -55.9095354, lat: -27.4406423 },
                { lng: -55.9092865, lat: -27.4388400 },
                { lng: -55.9054971, lat: -27.4391636 },
                { lng: -55.9052396, lat: -27.4370560 },
                { lng: -55.9043598, lat: -27.4371512 },
                { lng: -55.9038234, lat: -27.4360755 },
                { lng: -55.9032977, lat: -27.4356148 },
                { lng: -55.9034801, lat: -27.4339521 },
                { lng: -55.9048727, lat: -27.4325552 },
                { lng: -55.9100590, lat: -27.4220394 },
                { lng: -55.9116420, lat: -27.4216862 },
                { lng: -55.9133731, lat: -27.4215483 }
            ]
        },
        schedules: [
            { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
            { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
            { day: 'Domingos', time: 'No hay reparto' }
        ],
        deliveryInfo: {
            freeShippingMinimum: 20000,
            estimatedTime: '1-2 horas',
            coverage: 'San Isidro - Mañana'
        }
    },
    sanIsidroManana2: {
        name: 'San Isidro - Mañana 2',
        coordinates: {
            bounds: [
                { lng: -55.9419311, lat: -27.4422118 },
                { lng: -55.9400643, lat: -27.4416026 },
                { lng: -55.9407649, lat: -27.4399290 },
                { lng: -55.9385676, lat: -27.4390457 },
                { lng: -55.9354777, lat: -27.4357901 },
                { lng: -55.9351945, lat: -27.4336977 },
                { lng: -55.9286327, lat: -27.4345316 },
                { lng: -55.9297700, lat: -27.4436319 },
                { lng: -55.9420009, lat: -27.4422231 }
            ]
        },
        schedules: [
            { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
            { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
            { day: 'Domingos', time: 'No hay reparto' }
        ],
        deliveryInfo: {
            freeShippingMinimum: 20000,
            estimatedTime: '1-2 horas',
            coverage: 'San Isidro - Mañana 2'
        }
    },
    itaembeGuazu: {
        name: 'Itaembe Guazú',
        coordinates: {
            bounds: [
                { lng: -55.9641495, lat: -27.3997035 },
                { lng: -55.9741058, lat: -27.3867521 },
                { lng: -56.0035458, lat: -27.3914757 },
                { lng: -56.0046616, lat: -27.4014556 },
                { lng: -56.0075798, lat: -27.4016842 },
                { lng: -56.0149612, lat: -27.4088447 },
                { lng: -56.0164204, lat: -27.4214127 },
                { lng: -55.9969540, lat: -27.4234942 },
                { lng: -55.9642353, lat: -27.4000082 }
            ]
        },
        schedules: [
            { day: 'Lunes a Viernes', time: '10:00 AM - 5:00 PM' },
            { day: 'Sábados', time: '10:00 AM - 12:00 PM' },
            { day: 'Domingos', time: 'No hay reparto' }
        ],
        deliveryInfo: {
            freeShippingMinimum: 20000,
            estimatedTime: '1-2 horas',
            coverage: 'Itaembe Guazú'
        }
    }
};

// Configuración de la API de geocodificación
export const GEOCODING_CONFIG = {
  // Usando OpenStreetMap Nominatim (gratuito)
  baseUrl: 'https://nominatim.openstreetmap.org/search',
  defaultCity: 'Posadas',
  defaultProvince: 'Misiones',
  defaultCountry: 'Argentina'
};

// Mensajes de la aplicación
export const MESSAGES = {
  placeholder: 'Ingrese dirección (ej: Av. Corrientes 1234) o intersección (ej: Jujuy y Córdoba, San Martín esquina Rivadavia)',
  addressRequired: 'Por favor ingrese una dirección',
  addressNotFound: 'No se encontró la dirección',
  geocodingError: 'Error al buscar la dirección',
  inDeliveryZone: '¡Genial! Realizamos envíos a tu zona',
  notInDeliveryZone: 'Lo sentimos, no llegamos a tu zona',
  expandingSoon: '¡Pronto estaremos expandiendo nuestras zonas de reparto!',
  contactForOtherZones: 'Para consultas sobre otras zonas, contactanos:',
  whatsappConsultText: 'Hola, me interesa saber si realizan envíos a mi zona'
};
