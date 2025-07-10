
import { axiosInstance } from './axiosInstance';

export const GetRubros = async ()=> {
  try {
    const { data } = await axiosInstance.get('/categorias/rubro');
   
    return data;
  } catch (error) {
    console.error('No se ha podido realizar la solicitud', error);
    throw error;
  }
};
