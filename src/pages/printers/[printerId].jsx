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

export default PrinterEditPage;
