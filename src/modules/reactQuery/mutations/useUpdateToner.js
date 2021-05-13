import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const updateToner = async updatedToner => {
  console.log(`file: useUpdateToner.js > line 5 > updatedToner`, updatedToner);
  const {data} = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${updatedToner._id}`,
    updatedToner
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
