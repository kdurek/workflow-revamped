import {useQuery} from 'react-query';
import axios from 'axios';

export const getPrinters = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/printers`);
  return data.printers;
};

export default function usePrinters() {
  return useQuery('printers', getPrinters);
}
