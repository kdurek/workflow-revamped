import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import OutOfStock from '@/modules/Dashboard/OutOfStock';

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

export default DashboardPage;
