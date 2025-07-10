import { Cart } from '@/Services/Api';
import { Item } from '@radix-ui/react-navigation-menu';
import { createContext, useContext, useEffect, useState } from 'react';


export const CartContext = createContext();
const cartCtrl = new Cart();


export const CartProvider = ({children}) => {
   const [cart, setCart] = useState([]);
   
   const [total, setTotal] = useState(cartCtrl.count());



  useEffect(() => {
 const response = cartCtrl.getAll();
  setCart(response);

  },[])

    const addToCart = (ArticleId,article ,quantity) => {
    cartCtrl.add(ArticleId, article,quantity);
    refreshTotalCart();
      } 

const removeItem = (id) => {
  cartCtrl.remove(id);
  refreshTotalCart();
};

      const refreshTotalCart = () => {
        setTotal(cartCtrl.count());
        setCart(cartCtrl.getAll());
      } 

const data ={
  cart,
  addToCart,
  addCar: () => {},
  total,
  removeItem,
  reniveAllItems: () => {},
  changeQuantityItem: () => {},
}


  return (
    <CartContext.Provider value={data}>
      {children}
    </CartContext.Provider>
  );
}