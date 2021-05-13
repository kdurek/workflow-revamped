import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import PrinterCreate from '@/modules/printers/PrinterCreate';

const PrinterCreatePage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Create printer</title>
      </Head>
      <PrinterCreate />
    </DefaultLayout>
  );
};

export default PrinterCreatePage;
