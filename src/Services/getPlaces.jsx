import { axiosInstance } from "./axiosInstance";


// trae los lugares de la zona mas cercana a las coordenadas
export const GetPlaces = async(lat, lon) => {
    console.log('GetPlaces', lat, lon);
    
    const sendData = {
    lat: lat,
    lon: lon
    }
  try {
    const {data} = await axiosInstance.post('/zonas', sendData);
    console.log('GetPlaces', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
}
