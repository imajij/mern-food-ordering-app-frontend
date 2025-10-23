import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} />
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-controls">
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
      </div>
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button onClick={() => removeFromCart(item._id)} className="btn-remove">
        ❌
      </button>
    </div>
  );
};

export default CartItem;
