import {useQuery} from 'react-query';
import axios from 'axios';

const getUser = async userId => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`);
  return data.user;
};

const useUser = userId => {
  return useQuery(['user', userId], () => getUser(userId));
};

export default useUser;
