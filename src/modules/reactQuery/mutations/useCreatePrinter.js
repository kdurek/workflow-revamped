import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const createPrinter = async newPrinterData => {
  const {data} = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers`,
    newPrinterData
  );
  return data;
};

const useCreatePrinter = () => {
  const queryClient = useQueryClient();

  return useMutation(createPrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
    },
  });
};

export default useCreatePrinter;
