import {useState, useEffect} from 'react';
import Head from 'next/head';
import firebaseClient from 'firebaseClient';
import DefaultLayout from '@/layouts/DefaultLayout';
import TonersPage from '@/templates/TonersPage';
import {useAuth} from '@/context/AuthContext';

const Toners = () => {
  const {user} = useAuth();
  const [tonersList, setTonersList] = useState([]);
  const [printersList, setPrintersList] = useState([]);
  const [tonersUnset, setTonersUnset] = useState([]);

  useEffect(() => {
    firebaseClient
      .firestore()
      .collection(`toners${user.location}`)
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
        setTonersList(data);
      });

    firebaseClient
      .firestore()
      .collection(`printers${user.location}`)
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
        setPrintersList(data);
      });

    firebaseClient
      .firestore()
      .collection(`printers${user.location}`)
      .get()
      .then(doc => {
        const data = [];
        doc.forEach(doc => data.push(...doc.data().toners));
        setTonersUnset(data);
      });
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>Templates</title>
      </Head>
      <TonersPage printersList={printersList} tonersList={tonersList} tonersUnset={tonersUnset} />
    </DefaultLayout>
  );
};

export default Toners;
