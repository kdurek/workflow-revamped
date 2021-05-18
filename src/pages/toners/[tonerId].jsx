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

export default TonerEditPage;
