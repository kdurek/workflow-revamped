import {useQuery} from 'react-query';
import axios from 'axios';

const getToners = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners`);
  return data.toners;
};

const useToners = () => {
  return useQuery('toners', getToners);
};

export default useToners;
