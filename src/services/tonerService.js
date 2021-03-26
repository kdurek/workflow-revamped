import axios from 'axios';

export const createToner = async newToner => {
  const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners`, newToner);
  return data;
};

export const updateToner = async arg => {
  const {data} = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${arg.id}`,
    arg.updatedToner
  );
  return data;
};

export const deleteToner = async deletedTonerId => {
  const {data} = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${deletedTonerId}`
  );
  return data;
};
