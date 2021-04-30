import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const createToner = async newTonerData => {
  const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners`, newTonerData);
  return data;
};

const useCreateToner = () => {
  const queryClient = useQueryClient();

  return useMutation(createToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('toners-uncategorized');
    },
  });
};

export default useCreateToner;
