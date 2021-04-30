import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const updateToner = async updatedToner => {
  const {data} = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${updatedToner._id}`,
    updatedToner.data
  );
  return data;
};

const useUpdateToner = () => {
  const queryClient = useQueryClient();

  return useMutation(updateToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('toners-uncategorized');
    },
  });
};

export default useUpdateToner;
