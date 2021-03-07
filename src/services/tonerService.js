import axios from 'axios';

export const getOutOfStockToners = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners?amount[lte]=1`);
  return data.toners;
};

export const getUncatToners = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/uncategorized`);
  return data.toners;
};

export const updateToner = async arg => {
  const {data} = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${arg.id}`,
    arg.updatedToner
  );
  return data;
};
