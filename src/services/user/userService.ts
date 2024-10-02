import api from '../api';

export const getUsers = async (params: unknown) => {
  try {
    const response = await api.get('/api/', { params });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
