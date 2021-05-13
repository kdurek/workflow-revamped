import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';
import {QueryClient} from 'react-query';
import axios from 'axios';
import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import PrinterEdit from '@/modules/printers/PrinterEdit';

const PrinterEditPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Edit printer</title>
      </Head>
      <PrinterEdit />
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

  const getPrinter = async () => {
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${context.params.printerId}`,
      {
        headers: {
          Authorization: `bearer ${session.accessToken}`,
        },
      }
    );
    return data.printer;
  };

  const getTonersUncategorized = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/uncategorized`, {
      headers: {
        Authorization: `bearer ${session.accessToken}`,
      },
    });
    return data.toners;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['printers', context.params.printerId], getPrinter);
  await queryClient.prefetchQuery('toners-uncategorized', getTonersUncategorized);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default PrinterEditPage;
