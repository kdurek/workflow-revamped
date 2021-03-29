import {useSession} from 'next-auth/client';

const Protect = ({children}) => {
  const [session] = useSession();

  if (session.user.role !== 'admin') {
    return null;
  }

  return children;
};

export default Protect;
