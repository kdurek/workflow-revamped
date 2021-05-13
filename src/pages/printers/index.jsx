import {useRouter} from 'next/router';
import Head from 'next/head';

import Button from '@/common/components/Button';
import Card from '@/common/components/Card';
import DefaultLayout from '@/layouts/core';
import PrintersList from '@/modules/printers/PrintersList';
import Protect from '@/common/components/Protect';

const PrintersPage = () => {
  const router = useRouter();

  const handleCreateToner = () => {
    router.push('/toners/create');
  };

  const handleCreatePrinter = () => {
    router.push('/printers/create');
  };

  const handleEditToner = () => {
    router.push('/toners');
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Printers</title>
      </Head>
      <Protect>
        <Card className="flex gap-2 mb-4">
          <Button onClick={handleCreatePrinter}>Create Printer</Button>
          <Button onClick={handleCreateToner}>Create Toner</Button>
          <Button onClick={handleEditToner}>Edit Toner</Button>
        </Card>
      </Protect>
      <PrintersList />
    </DefaultLayout>
  );
};

export default PrintersPage;
