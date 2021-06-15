import {useQuery} from 'react-query';
import axios from 'axios';

const getLocation = async locationId => {
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locations/${locationId}`);
  return data.location;
};

const useLocation = locationId => {
  return useQuery(['location', locationId], () => getLocation(locationId));
};

export default useLocation;
