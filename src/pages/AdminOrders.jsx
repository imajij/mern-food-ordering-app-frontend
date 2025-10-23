import { useState, useEffect } from 'react';
import { getAllOrders, updateOrder } from '../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      console.log('All orders:', response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to load orders');
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      alert('Order status updated successfully!');
    } catch (err) {
      console.error('Error updating order:', err);
      alert(err.response?.data?.message || 'Failed to update order status');
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

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status?.toLowerCase() === filter);

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h1>All Orders ({orders.length})</h1>
        <button onClick={fetchOrders} className="btn-refresh">
          🔄 Refresh
        </button>
      </div>

      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All ({orders.length})
        </button>
        <button 
          className={filter === 'pending' ? 'active' : ''} 
          onClick={() => setFilter('pending')}
        >
          Pending ({orders.filter(o => o.status?.toLowerCase() === 'pending').length})
        </button>
        <button 
          className={filter === 'confirmed' ? 'active' : ''} 
          onClick={() => setFilter('confirmed')}
        >
          Confirmed ({orders.filter(o => o.status?.toLowerCase() === 'confirmed').length})
        </button>
        <button 
          className={filter === 'preparing' ? 'active' : ''} 
          onClick={() => setFilter('preparing')}
        >
          Preparing ({orders.filter(o => o.status?.toLowerCase() === 'preparing').length})
        </button>
        <button 
          className={filter === 'out-for-delivery' ? 'active' : ''} 
          onClick={() => setFilter('out-for-delivery')}
        >
          Out for Delivery ({orders.filter(o => o.status?.toLowerCase() === 'out-for-delivery').length})
        </button>
        <button 
          className={filter === 'delivered' ? 'active' : ''} 
          onClick={() => setFilter('delivered')}
        >
          Delivered ({orders.filter(o => o.status?.toLowerCase() === 'delivered').length})
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-orders">
          <h2>No {filter !== 'all' ? filter : ''} orders</h2>
        </div>
      ) : (
        <div className="admin-orders-grid">
          {filteredOrders.map((order) => (
            <div key={order._id} className="admin-order-card">
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

              <div className="customer-info">
                <p><strong>Customer:</strong> {order.user?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
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

              <div className="order-address">
                <strong>Delivery Address:</strong>
                <p>{order.deliveryAddress}</p>
              </div>

              <div className="order-payment">
                <p><strong>Payment:</strong> {order.paymentMethod?.toUpperCase() || 'N/A'}</p>
                <p className="order-total"><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
              </div>

              <div className="order-actions">
                <label>Update Status:</label>
                <select 
                  value={order.status || 'pending'} 
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
