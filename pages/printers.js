import Head from 'next/head';

import Card from '@/components/Card';
import DefaultLayout from '@/layouts/DefaultLayout';
import PrinterCreate from '@/components/Printers/PrinterCreate';
import PrintersList from '@/components/Printers/PrintersList';
import Protect from '@/components/Protect';
import TonerCreate from '@/components/Printers/TonerCreate';
import TonerEdit from '@/components/Printers/TonerEdit';

const PrintersPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Printers</title>
      </Head>
      <Protect>
        <Card className="flex gap-2 mb-4">
          <PrinterCreate />
          <TonerCreate />
          <TonerEdit />
        </Card>
      </Protect>
      <PrintersList />
    </DefaultLayout>
  );
};

export default PrintersPage;
