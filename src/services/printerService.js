import axios from 'axios';

export const createPrinter = async newPrinter => {
  const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/printers`, newPrinter);
  return data;
};

export const updatePrinter = async arg => {
  const {data} = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${arg.id}`,
    arg.updatedPrinter
  );
  return data;
};

export const deletePrinter = async deletedPrinterId => {
  const {data} = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${deletedPrinterId}`
  );
  return data;
};
