import Head from 'next/head';
import nookies from 'nookies';
import DefaultLayout from '../src/components/layouts/DefaultLayout';
import DashboardPage from '../src/components/templates/DashboardPage';
import firebaseAdmin from '../firebaseAdmin';

const Index = ({user}) => {
  return (
    <DefaultLayout user={user}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardPage />
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

    return {
      props: {user: {name, email, uid}},
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
