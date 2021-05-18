import {useSession} from 'next-auth/client';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, {createContext} from 'react';

import Login from '@/modules/login/Login';
import Loading from '@/app/contexts/FetchContext/Loading';

const FetchContext = createContext();

const FetchProvider = ({children}) => {
  const [session, loading] = useSession();

  if (loading) {
    return <Loading />;
  }

  if (!session) {
    return <Login />;
  }

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  axios.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

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
  children: PropTypes.shape({
    $$typeof: PropTypes.symbol,
  }).isRequired,
};

export {FetchContext, FetchProvider};
