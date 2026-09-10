import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getTasks = (completed) => {
  const params = completed !== undefined ? { completed } : {};
  return api.get('/tasks', { params });
};

export const createTask = (title) => {
  return api.post('/tasks', { title });
};

export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};
