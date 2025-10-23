import { useState, useEffect } from 'react';
import { getUserOrders } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      console.log('User orders:', response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to load orders');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#f78c6b';
      case 'confirmed': return '#3498db';
      case 'preparing': return '#ffd23f';
      case 'out-for-delivery': return '#06d6a0';
      case 'delivered': return '#27ae60';
      case 'cancelled': return '#ef476f';
      default: return '#95a5a6';
    }
  };

  if (loading) return <div className="loading">Loading your orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet</h2>
          <p>Start ordering delicious food!</p>
          <button onClick={() => navigate('/menu')} className="btn-primary">
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="order-status" style={{ background: getStatusColor(order.status) }}>
                  {order.status?.replace('-', ' ').toUpperCase() || 'PENDING'}
                </div>
              </div>
              <div className="order-items">
                <strong>Items:</strong>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.food?.name || 'Item'} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-address">
                  <strong>Delivery Address:</strong> {order.deliveryAddress}
                </div>
                <div className="order-payment">
                  <strong>Payment:</strong> {order.paymentMethod?.toUpperCase() || 'N/A'}
                </div>
                <div className="order-total">
                  <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
