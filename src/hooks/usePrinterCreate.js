import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const createPrinter = async newPrinter => {
  const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/printers`, newPrinter);
  return data;
};

export default function usePrinterCreate() {
  const queryClient = useQueryClient();

  return useMutation(createPrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
    },
  });
}
