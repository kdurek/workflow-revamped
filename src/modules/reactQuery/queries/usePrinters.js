import {useQuery} from 'react-query';
import axios from 'axios';

const getPrinters = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/printers`);
  return data.printers;
};

const usePrinters = () => {
  return useQuery('printers', getPrinters);
};

export default usePrinters;
