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

export default TonerCreatePage;
