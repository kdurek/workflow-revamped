import {useSession} from 'next-auth/client';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, {createContext} from 'react';

import Login from '@/modules/login/Login';

const FetchContext = createContext();

const FetchProvider = ({children}) => {
  const [session, loading] = useSession();

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  if (loading) {
    return <div className="inset-0 bg-coolGray-50" />;
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

FetchProvider.propTypes = {
  children: PropTypes.object,
};

export {FetchContext, FetchProvider};
