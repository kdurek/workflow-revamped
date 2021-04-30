import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const updatePrinter = async updatedPrinter => {
  const {data} = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${updatedPrinter._id}`,
    updatedPrinter.data
  );
  return data;
};

const useUpdatePrinter = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners-uncategorized');
    },
  });
};

export default useUpdatePrinter;
