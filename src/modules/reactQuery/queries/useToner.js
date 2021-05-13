import {useQuery} from 'react-query';
import axios from 'axios';
import {useRouter} from 'next/router';

const getToner = async tonerId => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${tonerId}`);
  return data.toner;
};

const useToner = () => {
  const {query} = useRouter();
  return useQuery(['toners', query.tonerId], () => getToner(query.tonerId));
};

export default useToner;
