import {useQuery} from 'react-query';
import axios from 'axios';

const getCms = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/templates?category=cms`);
  return data.templates;
};

const useCms = () => {
  return useQuery('templates-cms', getCms);
};

export default useCms;
