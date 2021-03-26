import {useQuery} from 'react-query';
import axios from 'axios';

const getTonersUncategorized = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/uncategorized`);
  return data.toners;
};

export default function useTonersUncategorized() {
  return useQuery('toners-uncategorized', getTonersUncategorized);
}
