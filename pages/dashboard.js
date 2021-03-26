import {useQuery} from 'react-query';
import Head from 'next/head';

import {getOutOfStockToners} from '@/services/tonerService';
import DefaultLayout from '@/layouts/DefaultLayout';
import OutOfStock from '@/components/Dashboard/OutOfStock';

const DashboardPage = () => {
  const {data: tonersList} = useQuery('outofstock-toners', getOutOfStockToners);

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
