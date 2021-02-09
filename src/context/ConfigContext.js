import {useState, useEffect, useContext, createContext} from 'react';
import firebaseClient from 'firebaseClient';

export const ConfigContext = createContext();

export function ConfigProvider({children}) {
  const [config, setConfig] = useState();

  useEffect(() => {
    firebaseClient
      .firestore()
      .collection('config')
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()));
        setConfig(data[0]);
      });
  }, []);

  const value = {config};

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export const useConfig = () => {
  return useContext(ConfigContext);
};
