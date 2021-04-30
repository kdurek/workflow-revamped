import {useQuery} from 'react-query';
import axios from 'axios';

const getTonersOutOfStock = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners?amount[lte]=1`);
  return data.toners;
};

const useTonersOutOfStock = () => {
  return useQuery('toners-outofstock', getTonersOutOfStock);
};

export default useTonersOutOfStock;
