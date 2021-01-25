import Head from 'next/head';
import nookies from 'nookies';
import DefaultLayout from '../src/components/layouts/DefaultLayout';
import TemplatesPage from '../src/components/templates/TemplatesPage';
import firebaseAdmin from '../firebaseAdmin';

const Templates = ({user, cmsList}) => {
  return (
    <DefaultLayout user={user}>
      <Head>
        <title>Templates</title>
      </Head>
      <TemplatesPage cmsList={cmsList} />
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

    const cmsList = await (await firebaseAdmin.firestore().collection('cmss').get()).docs.map(doc =>
      doc.data()
    );

    return {
      props: {user: {email, uid}, cmsList},
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