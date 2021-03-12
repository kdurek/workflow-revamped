import axios from 'axios';

export const getToners = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners`);
  return data.toners;
};

export const getOutOfStockToners = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners?amount[lte]=1`);
  return data.toners;
};

export const getUncatToners = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/uncategorized`);
  return data.toners;
};

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
