import {useState, useEffect} from 'react';
import Head from 'next/head';
import firebaseClient from 'firebaseClient';
import {useAuth} from '@/context/AuthContext';
import DefaultLayout from '@/layouts/DefaultLayout';
import TemplatesPage from '@/templates/TemplatesPage';

const Templates = () => {
  const {user} = useAuth();

  const [cmsList, setCmsList] = useState();

  useEffect(() => {
    firebaseClient
      .firestore()
      .collection('cmss')
      .orderBy('name')
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
        setCmsList(data);
      });
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>Templates</title>
      </Head>
      {cmsList && <TemplatesPage cmsList={cmsList} user={user} />}
    </DefaultLayout>
  );
};

export default Templates;
