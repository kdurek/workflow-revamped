import axios from 'axios';

const getAll = (query = '') => {
  return axios.get(`/templates${query}`);
};

const create = data => {
  return axios.post('/templates', data);
};

export default {
  getAll,
  create,
};
