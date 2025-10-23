import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FoodCard = ({ food }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(food);
    alert(`${food.name} added to cart!`);
  };

  return (
    <div className="food-card">
      <img src={food.image || 'https://via.placeholder.com/300'} alt={food.name} />
      <div className="food-info">
        <h3>{food.name}</h3>
        <p className="description">{food.description}</p>
        <p className="category">{food.category}</p>
        <div className="food-footer">
          <span className="price">${food.price.toFixed(2)}</span>
          <button onClick={handleAddToCart} className="btn-add">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
