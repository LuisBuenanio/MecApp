import axios from 'axios';
import Config from '../../config';

const API_URL = Config.API_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }

    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

const getToken = async () => {
  // Implementa la lógica para obtener el token almacenado
};

export const logout = async () => {
  try {
    await performLogout();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const performLogout = async () => {
  // Implementa la lógica para eliminar el token almacenado
};
