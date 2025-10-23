import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/menu')} className="btn-primary">
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
        <div className="cart-actions">
          <button onClick={clearCart} className="btn-secondary">
            Clear Cart
          </button>
          <button onClick={() => navigate('/checkout')} className="btn-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
