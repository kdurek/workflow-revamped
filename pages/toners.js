import {useState, useEffect} from 'react';
import Head from 'next/head';
import nookies from 'nookies';
import DefaultLayout from '@/layouts/DefaultLayout';
import TonersPage from '@/templates/TonersPage';
import firebaseClient from 'firebaseClient';
import firebaseAdmin from 'firebaseAdmin';

const Toners = ({
  user,
  // config
}) => {
  const [tonersList, setTonersList] = useState([]);

  useEffect(() => {
    firebaseClient
      .firestore()
      .collection('toners')
      .onSnapshot(snapshot => {
        const tonersData = [];
        snapshot.forEach(doc => tonersData.push({...doc.data(), id: doc.id}));
        setTonersList(tonersData);
      });
  }, []);

  return (
    <DefaultLayout user={user}>
      <Head>
        <title>Templates</title>
      </Head>
      <TonersPage
        tonersList={tonersList}
        user={user}
        // config={config}
      />
    </DefaultLayout>
  );
};

export const getServerSideProps = async ctx => {
  try {
    const cookies = nookies.get(ctx);
    // console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const {uid, email} = token;

    const name = await firebaseAdmin
      .auth()
      .getUser(uid)
      .then(userRecord => userRecord.displayName || 'undefined')
      .catch(error => {
        console.log('Error fetching user data:', error);
      });
    // console.log('token:', token);

    // const config = await (
    //   await firebaseAdmin.firestore().collection('config').get()
    // ).docs.map(doc => doc.data());

    return {
      props: {
        user: {name, email, uid},
        // config: config[0]
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {},
    };
  }
};

export default Toners;
