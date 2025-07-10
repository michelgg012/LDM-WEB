import styles from './ShoppingCart.module.scss';
import { useCart } from '@/Hooks';
export const ShoppingCart = () => {

  const { cart, removeItem } = useCart();

  return (
    <div className={styles.cartContainer}>
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img src={item.description.imageUrl} alt={item.descripcion} className={styles.cartImage} />
              <div className={styles.cartDetails}>
                <h3>{item.description.descripcion}</h3>
                <p>Cantidad: {item.quantity}</p>
              </div>
                <div className={styles.cartActions}>
                <button className={styles.editButton} title="Editar">
                  ✏️
                </button>
                <button onClick={()=>removeItem} className={styles.removeButton} title="Eliminar">
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    
    </div>
  );
};
