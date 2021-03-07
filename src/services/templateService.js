import axios from 'axios';

export const getTemplates = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/templates`);
  return data.templates;
};
