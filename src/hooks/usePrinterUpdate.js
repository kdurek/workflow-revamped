import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const updatePrinter = async arg => {
  const {data} = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${arg.id}`,
    arg.updatedPrinter
  );
  return data;
};

export default function usePrinterUpdate() {
  const queryClient = useQueryClient();

  return useMutation(updatePrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners-uncategorized');
    },
  });
}
