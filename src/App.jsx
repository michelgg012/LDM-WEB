
import HomePage from './Screen/HomePages';
import { AboutUs, ContactUs,  } from './Presentation/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import{ Header} from './Presentation/header/Header'
import { ShoppingCart } from './Screen';
import Footer from './Presentation/footer/Footer';
import ScrollToTop from './Components/ScrollToTop';

import { Category, CategoryDetail, SubcategoryProducts, ProductDetail } from './Presentation/catalog/category';
import { DistributionTime } from './Presentation/distribution';

function App() {


  return (
    <Router>
      <ScrollToTop />
      <Header/>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Sobre-nosotros" element={<AboutUs />} />
      <Route path="/Contactanos" element={<ContactUs />} />
      <Route path="/shoppingCart" element={<ShoppingCart />} />
      <Route path="/Reparto" element={<DistributionTime />} />
      
      {/* Rutas del sistema de categorías jerárquico */}
      <Route path="/catalogo" element={<Category />} />
      <Route path="/catalogo/:categoriaSlug" element={<CategoryDetail />} />
      <Route path="/catalogo/:categoriaSlug/:subcategoriaSlug" element={<SubcategoryProducts />} />
      <Route path="/catalogo/:categoriaSlug/:subcategoriaSlug/:productoSlug" element={<ProductDetail />} />
      
      {/* Ruta legacy para productos individuales */}
      {/* <Route path="/Articulo/:idarticulo" element={<SelectedPruduct />} /> */}
      
      </Routes>
      <Footer/>
    </Router>


    
  )
}

export default App
