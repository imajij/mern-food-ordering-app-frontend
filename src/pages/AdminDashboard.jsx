import { useState, useEffect } from 'react';
import { getFoods, createFood, updateFood, deleteFood } from '../services/api';

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data);
    } catch (err) {
      alert('Failed to load foods');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateFood(editing, formData);
        alert('Food updated successfully');
      } else {
        await createFood(formData);
        alert('Food added successfully');
      }
      resetForm();
      fetchFoods();
    } catch (err) {
      alert('Operation failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (food) => {
    setEditing(food._id);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      image: food.image || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteFood(id);
      alert('Food deleted successfully');
      fetchFoods();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({ name: '', description: '', price: '', category: '', image: '' });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-container">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>{editing ? 'Edit Food Item' : 'Add New Food Item'}</h2>
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL (optional)"
            value={formData.image}
            onChange={handleChange}
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editing ? 'Update' : 'Add'} Food
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
        <div className="admin-list">
          <h2>All Food Items</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>{food.category}</td>
                  <td>${food.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleEdit(food)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(food._id)} className="btn-delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
