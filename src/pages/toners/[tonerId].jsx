import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';
import {QueryClient} from 'react-query';
import axios from 'axios';
import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import TonerEdit from '@/modules/toners/TonerEdit';

const TonerEditPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Edit toner</title>
      </Head>
      <TonerEdit />
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

  const getToner = async () => {
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${context.params.tonerId}`,
      {
        headers: {
          Authorization: `bearer ${session.accessToken}`,
        },
      }
    );
    return data.toner;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['toners', context.params.tonerId], getToner);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default TonerEditPage;
