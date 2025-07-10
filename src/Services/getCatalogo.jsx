
import { axiosInstance } from './axiosInstance';

export const getCatalogo = async ()=> {
  let offset = 0;
  const limit = 300;
  try {
    const { data } = await axiosInstance.get('/catalogo', {
      params: {
        offset,
        limit,
      },
    });
    
       offset += limit;
    return data;
  } catch (error) {
    console.error('No se ha podido realizar la solicitud', error);
    throw error;
  }
};
