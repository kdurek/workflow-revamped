import {useState, useEffect} from 'react';
import Head from 'next/head';
import firebaseClient from 'firebaseClient';
import DefaultLayout from '@/layouts/DefaultLayout';
import TonersPage from '@/templates/TonersPage';
import {useAuth} from '@/context/AuthContext';

const Toners = () => {
  const {user} = useAuth();
  const [tonersList, setTonersList] = useState([]);

  useEffect(() => {
    firebaseClient
      .firestore()
      .collection(`toners${user.location}`)
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
        setTonersList(data);
      });
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>Templates</title>
      </Head>
      <TonersPage tonersList={tonersList} />
    </DefaultLayout>
  );
};

export default Toners;
