import {useState, useEffect, useContext, createContext} from 'react';
import firebaseClient from 'firebaseClient';

export const ConfigContext = createContext();

export function ConfigProvider({children}) {
  const [config, setConfig] = useState([]);

  // useEffect(() => {
  //   setConfig(initConfig);
  // }, []);

  // const [config, setConfig] = useState({exampleConfigKey: 'exampleConfigValue'});

  useEffect(async () => {
    setConfig(
      (await firebaseClient.firestore().collection('config').get()).docs.map(doc => doc.data())
    );
    // setConfig(
    //   await (await firebaseAdmin.firestore().collection('config').get()).docs.map(doc => doc.data())
    // );
  }, []);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export const useConfig = () => {
  const state = useContext(ConfigContext);
  return state;
};
