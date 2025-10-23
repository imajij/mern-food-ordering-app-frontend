import { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import { getFoods } from '../services/api';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load menu');
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(foods.map(food => food.category))];
  const filteredFoods = filter === 'all' 
    ? foods 
    : foods.filter(food => food.category === filter);

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu">
      <h1>Our Menu</h1>
      <div className="filter-buttons">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={filter === category ? 'active' : ''}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="food-grid">
        {filteredFoods.map(food => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
