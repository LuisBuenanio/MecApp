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

export const fetchUsers = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error.response ? error.response.data : error;
  }
};

export const sendMessage = async (chatId, message) => {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${API_URL}/chats/${chatId}/messages`,
      { message },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error.response ? error.response.data : error;
  }
};

export const getUserChats = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los chats individuales y grupales
  } catch (error) {
    console.error('Error al obtener los chats del usuario:', error.response?.data);
    throw error;
  }
};


const performLogout = async () => {
  // Implementa la lógica para eliminar el token almacenado
};
