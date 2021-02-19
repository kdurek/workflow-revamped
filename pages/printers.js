import {useState, useEffect} from 'react';
import Head from 'next/head';
import firebaseClient from 'firebaseClient';
import {useAuth} from '@/context/AuthContext';
import DefaultLayout from '@/layouts/DefaultLayout';
import TonersPage from '@/templates/PrintersPage';

const Printers = () => {
  const {user} = useAuth();
  // const [newTonersList, setNewTonersList] = useState([]);
  // console.log(`file: toners.js > line 11 > Toners > newTonersList`, newTonersList);
  const [tonersList, setTonersList] = useState([]);
  const [printersList, setPrintersList] = useState([]);
  const [tonersUnsetId, setTonersUnsetId] = useState([]);

  const tonersUnset = tonersList.filter(toner => !tonersUnsetId.includes(toner.id));

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
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push(...doc.data().toners));
        setTonersUnsetId(data);
      });

    // Solution idea for storing toners within printers
    // firebaseClient
    //   .firestore()
    //   .collection(`printers`)
    //   .onSnapshot(snapshot => {
    //     const data = [];
    //     snapshot.forEach(doc => {
    //       const tonersData = [];
    //       firebaseClient
    //         .firestore()
    //         .collection(`printers`)
    //         .doc(doc.id)
    //         .collection('toners')
    //         .onSnapshot(snapshot => {
    //           snapshot.forEach(doc => {
    //             tonersData.push({...doc.data(), id: doc.id});
    //           });
    //         });
    //       data.push({...doc.data(), id: doc.id, toners: tonersData});
    //     });
    //     setNewTonersList(data);
    //   });
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>Printers</title>
      </Head>
      <TonersPage printersList={printersList} tonersList={tonersList} tonersUnset={tonersUnset} />
    </DefaultLayout>
  );
};

export default Printers;
