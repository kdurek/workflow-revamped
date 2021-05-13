import {getSession} from 'next-auth/client';
import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import TonerCreate from '@/modules/toners/TonerCreate';

const TonerCreatePage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Create toner</title>
      </Head>
      <TonerCreate />
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/printers',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default TonerCreatePage;
