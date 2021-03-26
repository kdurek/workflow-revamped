import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const createToner = async newToner => {
  const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners`, newToner);
  return data;
};

export default function useTonerCreate() {
  const queryClient = useQueryClient();

  return useMutation(createToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('toners-uncategorized');
    },
  });
}
