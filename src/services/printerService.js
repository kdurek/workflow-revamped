import axios from 'axios';

export const getPrinters = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/printers`);
  return data.printers;
};

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
