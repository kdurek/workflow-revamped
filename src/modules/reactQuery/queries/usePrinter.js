import {useQuery} from 'react-query';
import axios from 'axios';
import {useRouter} from 'next/router';

const getPrinter = async printerId => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${printerId}`);
  return data.printer;
};

const usePrinter = () => {
  const {query} = useRouter();
  return useQuery(['printers', query.printerId], () => getPrinter(query.printerId));
};

export default usePrinter;
