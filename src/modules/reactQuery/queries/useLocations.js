import {useQuery} from 'react-query';
import axios from 'axios';

const getLocations = async () => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locations`);
  return data.locations;
};

const useLocations = () => {
  return useQuery('locations', getLocations);
};

export default useLocations;
