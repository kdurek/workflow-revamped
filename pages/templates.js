import Head from 'next/head';
import nookies from 'nookies';
import DefaultLayout from '@/layouts/DefaultLayout';
import TemplatesPage from '@/templates/TemplatesPage';
import firebaseAdmin from 'firebaseAdmin';

const Templates = ({user, cmsList, config}) => {
  return (
    <DefaultLayout user={user}>
      <Head>
        <title>Templates</title>
      </Head>
      <TemplatesPage cmsList={cmsList} user={user} config={config} />
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

    const cmsList = await (
      await firebaseAdmin.firestore().collection('cmss').orderBy('name').get()
    ).docs.map(doc => doc.data());

    const config = await (
      await firebaseAdmin.firestore().collection('config').get()
    ).docs.map(doc => doc.data());

    return {
      props: {user: {name, email, uid}, cmsList, config: config[0]},
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

export default Templates;
