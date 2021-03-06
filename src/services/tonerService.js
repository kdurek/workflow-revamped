import axios from 'axios';

const getAll = (query = '') => {
  return axios.get(`/toners${query}`);
};

const getAllUncategorized = () => {
  return axios.get(`/toners/uncategorized`);
};

const get = id => {
  return axios.get(`/toners/${id}`);
};

const create = data => {
  return axios.post('/toners', data);
};

const update = (id, data) => {
  return axios.patch(`/toners/${id}`, data);
};

const remove = id => {
  return axios.delete(`/toners/${id}`);
};

export default {
  getAll,
  getAllUncategorized,
  get,
  create,
  update,
  remove,
};
