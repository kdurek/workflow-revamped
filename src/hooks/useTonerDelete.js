import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const deleteToner = async deletedTonerId => {
  const {data} = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${deletedTonerId}`
  );
  return data;
};

export default function useTonerDelete() {
  const queryClient = useQueryClient();

  return useMutation(deleteToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('toners-uncategorized');
    },
  });
}