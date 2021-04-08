import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import OutOfStock from '@/modules/dashboard/OutOfStock';
import useTonersOutOfStock from '@/modules/reactQuery/queries/useTonersOutOfStock';

const DashboardPage = () => {
  const {data: tonersList} = useTonersOutOfStock();

  return (
    <DefaultLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <OutOfStock tonersList={tonersList} />
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
