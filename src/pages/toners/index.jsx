import Head from 'next/head';

import Card from '@/common/components/Card';
import DefaultLayout from '@/layouts/core';
import TonersList from '@/modules/toners/TonersList';

const TonersListPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Toners</title>
      </Head>
      <Card className="flex flex-col gap-4">
        <TonersList />
      </Card>
    </DefaultLayout>
  );
};

export default TonersListPage;
