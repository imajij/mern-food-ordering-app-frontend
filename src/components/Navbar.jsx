import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍔 FoodApp
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          {user && (
            <>
              <li>
                <Link to="/cart" className="cart-link">
                  🛒 Cart ({getTotalItems()})
                </Link>
              </li>
              <li><Link to="/orders">My Orders</Link></li>
              {user.isAdmin && (
                <>
                  <li><Link to="/admin">Menu Management</Link></li>
                  <li><Link to="/admin/orders">All Orders</Link></li>
                </>
              )}
              <li><span>Hello, {user.name}</span></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
