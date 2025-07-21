
import { axiosInstance } from './axiosInstance';

export const GetRubros = async ()=> {
  try {
    const { data } = await axiosInstance.get('/categorias/rubro');
   
    return data;
  } catch (error) {
    console.error('Error al cargar rubros');
    throw error;
  }
};
