import axios from 'axios';

export const getCms = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/templates?category=cms`);
  return data.templates;
};
