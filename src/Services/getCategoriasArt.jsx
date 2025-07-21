
import { axiosInstance } from './axiosInstance';

export const getCategoryaArt = async ()=> {
  try {
    const { data } = await axiosInstance.get('/categorias/subrubro');
   
    return data;
  } catch (error) {
    console.error('Error al cargar categorías de artículos');
    throw error;
  }
};
