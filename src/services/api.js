import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const registerUser = (userData) => api.post('/api/auth/register', userData);
export const loginUser = (credentials) => api.post('/api/auth/login', credentials);

// Food APIs
export const getFoods = () => api.get('/api/foods');
export const getFoodById = (id) => api.get(`/api/foods/${id}`);
export const createFood = (foodData) => api.post('/api/foods', foodData);
export const updateFood = (id, foodData) => api.put(`/api/foods/${id}`, foodData);
export const deleteFood = (id) => api.delete(`/api/foods/${id}`);

// Order APIs
export const createOrder = (orderData) => api.post('/api/orders', orderData);
export const getUserOrders = () => api.get('/api/orders/user');
export const getAllOrders = () => api.get('/api/orders');
export const updateOrder = (id, orderData) => api.put(`/api/orders/${id}`, orderData);

export default api;
