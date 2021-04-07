import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const deletePrinter = async deletedPrinterId => {
  const {data} = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${deletedPrinterId}`
  );
  return data;
};

export default function useDeletePrinter() {
  const queryClient = useQueryClient();

  return useMutation(deletePrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners-uncategorized');
    },
  });
}
