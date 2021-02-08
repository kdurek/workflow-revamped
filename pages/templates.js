import {useState, useEffect} from 'react';
import Head from 'next/head';
import firebaseClient from 'firebaseClient';
import {useAuth} from '@/context/AuthContext';
import DefaultLayout from '@/layouts/DefaultLayout';
import TemplatesPage from '@/templates/TemplatesPage';

const Templates = () => {
  const {user} = useAuth();

  const [config, setConfig] = useState();
  const [cmsList, setCmsList] = useState();

  console.log(config);
  console.log(user);

  useEffect(() => {
    firebaseClient
      .firestore()
      .collection('cmss')
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
        setCmsList(data);
      });

    firebaseClient
      .firestore()
      .collection('config')
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()));
        setConfig(data[0]);
      });
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>Templates</title>
      </Head>
      {cmsList && <TemplatesPage cmsList={cmsList} user={user} config={config} />}
    </DefaultLayout>
  );
};

export default Templates;
