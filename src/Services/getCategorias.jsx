import { axiosInstance } from './axiosInstance';

// Obtener todas las categorías principales
export const getCategorias = async () => {
  try {
    const { data } = await axiosInstance.get('/catalogo/');
    return data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

// ...existing code...
export const getCategoriaPorSlug = async (slug) => {
  try {
    const { data } = await axiosInstance.get(`/catalogo/${slug}/`);
    return data;
  } catch (error) {
    console.error(`Error al obtener categoría ${slug}:`, error);
    throw error;
  }
};

// Obtener productos de una subcategoría
export const getSubcategoriaPorSlug = async (categoriaSlug, subcategoriaSlug, params = {}) => {
  try {
    const { limit = 20, offset = 0 } = params;
    const { data } = await axiosInstance.get(`/catalogo/${categoriaSlug}/${subcategoriaSlug}/`, {
      params: { limit, offset },
    });
    console.log('Datos de subcategoría obtenidos:', data);
    return data;
  } catch (error) {
    console.error(`Error al obtener subcategoría ${subcategoriaSlug}:`, error);
    throw error;
  }
};

// Obtener producto específico
export const getProductoPorSlug = async (categoriaSlug, subcategoriaSlug, productoSlug) => {
  try {
    const { data } = await axiosInstance.get(`/catalogo/${categoriaSlug}/${subcategoriaSlug}/${productoSlug}/`);
    return data;
  } catch (error) {
    console.error(`Error al obtener producto ${productoSlug}:`, error);
    throw error;
  }
};
