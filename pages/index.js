import {useState, useEffect} from 'react';
import Head from 'next/head';
import firebaseClient from 'firebaseClient';
import DefaultLayout from '@/layouts/DefaultLayout';
import DashboardPage from '@/templates/DashboardPage';

const Index = () => {
  const [tonersList, setTonersList] = useState([]);

  useEffect(() => {
    firebaseClient
      .firestore()
      .collection('toners')
      .where('amount', '<=', 1)
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
        setTonersList(data);
      });
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardPage tonersList={tonersList} />
    </DefaultLayout>
  );
};

export default Index;
