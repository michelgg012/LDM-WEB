import { createContext, useContext, useEffect, useState } from 'react';
import { getCatalogo, getCategoryaArt } from '../Services';

const CatalogoContext = createContext();

export const CatalogoProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([]);
  const [filteredArticulos, setFilteredArticulos] = useState([]);
  const [categoryArt, setCategoryArt] = useState([]);
  const [loadingArticle, setLoadingArticle] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null);
 
  useEffect(() => {
    (async () => {
      const data = await getCatalogo();
      if (data) {
        setArticulos(data);
        setFilteredArticulos(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getCategoryaArt();
      setCategoryArt(data || []);

    });
  }, []);
  
  useEffect(() => {
  if(articulos.length === 0 && categoryArt.length === 0){
  setLoadingArticle(true)
  }else{
  setLoadingArticle(false)
  }
  }, [articulos, categoryArt]);
  

  const filterByRubro = (idrubro) => {
    setFilteredArticulos(idrubro ? articulos.filter(a => a.idrubro === idrubro) : articulos);
  };



  const filterBySubrubro = (idsubrubro) => {
    setFilteredArticulos(idsubrubro ? articulos.filter(a => a.idsubrubro === idsubrubro) : articulos);
  };

  return (
    <CatalogoContext.Provider value={{
      articulos: filteredArticulos,
      filterByRubro,
      filterBySubrubro,
      categoryArt,
      loadingArticle,
      setSelectedArticle,
      selectedArticle,
      allArticulos: articulos,
    }}>
      {children}
    </CatalogoContext.Provider>
  );
};

 export const useCatalogo = () => useContext(CatalogoContext);
