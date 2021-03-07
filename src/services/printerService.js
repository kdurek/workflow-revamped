import axios from 'axios';

export const getPrinters = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/printers`);
  return data.printers;
};

export const updatePrinter = async arg => {
  const {data} = axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${arg.id}`,
    arg.updatedPrinter
  );
  return data;
};
