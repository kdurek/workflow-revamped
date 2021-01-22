import Head from 'next/head';
import nookies from 'nookies';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Dashboard from '../components/templates/Dashboard';
import {firebaseAdmin} from '../../firebaseAdmin';

const Index = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard />
    </DefaultLayout>
  );
};

export const getServerSideProps = async ctx => {
  try {
    const cookies = nookies.get(ctx);
    // console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const {uid, email} = token;

    // console.log('token:', token);

    return {
      props: {email, uid},
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

export default Index;
