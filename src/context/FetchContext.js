import React, {createContext} from 'react';
import {useSession} from 'next-auth/client';
import axios from 'axios';

const FetchContext = createContext();

const FetchProvider = ({children}) => {
  const [session] = useSession();

  if (session) {
    axios.defaults.baseURL = process.env.BACKEND_URL;
    axios.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  axios.interceptors.request.use(
    request => {
      // console.log(request);
      // Edit request config
      return request;
    },
    error => {
      // console.log(error);
      return Promise.reject(error);
    }
  );
  0;
  axios.interceptors.response.use(
    response => {
      // console.log(response);
      // Edit response config
      return response;
    },
    error => {
      // console.log(error);
      return Promise.reject(error);
    }
  );

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
