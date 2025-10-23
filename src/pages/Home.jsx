import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to FoodApp</h1>
        <p>Order delicious food from the comfort of your home</p>
        <Link to="/menu" className="btn-primary">
          Browse Menu
        </Link>
      </div>
      <div className="features">
        <div className="feature">
          <h3>🍕 Wide Selection</h3>
          <p>Choose from hundreds of dishes</p>
        </div>
        <div className="feature">
          <h3>🚀 Fast Delivery</h3>
          <p>Get your food delivered quickly</p>
        </div>
        <div className="feature">
          <h3>💳 Easy Payment</h3>
          <p>Multiple payment options available</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
