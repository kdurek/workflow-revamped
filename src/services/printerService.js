import axios from 'axios';

const getAll = (query = '') => {
  return axios.get(`/printers${query}`);
};

const get = id => {
  return axios.get(`/printers/${id}`);
};

const create = data => {
  return axios.post('/printers', data);
};

const update = (id, data) => {
  return axios.patch(`/printers/${id}`, data);
};

const remove = id => {
  return axios.delete(`/printers/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
