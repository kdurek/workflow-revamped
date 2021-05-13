import {useRouter} from 'next/router';
import Head from 'next/head';

import Button from '@/common/components/Button';
import Card from '@/common/components/Card';
import DefaultLayout from '@/layouts/core';
import PrintersList from '@/modules/printers/PrintersList';
import Protect from '@/common/components/Protect';
import {QueryClient} from 'react-query';
import axios from 'axios';
import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';

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
        <Card className="flex gap-2 p-2 mb-4">
          <Button onClick={handleCreatePrinter}>Create Printer</Button>
          <Button onClick={handleCreateToner}>Create Toner</Button>
          <Button onClick={handleEditToner}>Edit Toner</Button>
        </Card>
      </Protect>
      <PrintersList />
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);

  const getPrinters = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/printers`, {
      headers: {
        Authorization: `bearer ${session.accessToken}`,
      },
    });
    return data.printers;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('printers', getPrinters);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default PrintersPage;
