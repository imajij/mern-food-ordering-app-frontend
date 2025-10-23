import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Auth APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// Food APIs
export const getFoods = () => api.get('/foods');
export const getFoodById = (id) => api.get(`/foods/${id}`);
export const createFood = (foodData) => api.post('/foods', foodData);
export const updateFood = (id, foodData) => api.put(`/foods/${id}`, foodData);
export const deleteFood = (id) => api.delete(`/foods/${id}`);

// Order APIs
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getUserOrders = () => api.get('/orders/user');
export const getAllOrders = () => api.get('/orders');

export default api;
