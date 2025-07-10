
import { axiosInstance } from './axiosInstance';

export const getCategoryaArt = async ()=> {
  try {
    const { data } = await axiosInstance.get('/categorias/subrubro');
   
    return data;
  } catch (error) {
    console.error('No se ha podido realizar la solicitud', error);
    throw error;
  }
};
