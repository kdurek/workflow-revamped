import React, {createContext} from 'react';
import axios from 'axios';
import {useSession} from 'next-auth/client';
import Login from '@/components/Login/Login';

const FetchContext = createContext();

const FetchProvider = ({children}) => {
  const [session, loading] = useSession();

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  if (loading) {
    return null;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <FetchContext.Provider
      value={{
        axios,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export {FetchContext, FetchProvider};
