import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';
import {QueryClient} from 'react-query';
import axios from 'axios';
import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import OutOfStock from '@/modules/dashboard/OutOfStock/OutOfStockList';

const DashboardPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <OutOfStock />
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);

  const getTonersOutOfStock = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners?amount[lte]=1`, {
      headers: {
        Authorization: `bearer ${session.accessToken}`,
      },
    });
    return data.toners;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('toners-outofstock', getTonersOutOfStock);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default DashboardPage;
