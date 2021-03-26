import {useQuery} from 'react-query';
import {useSession} from 'next-auth/client';
import Head from 'next/head';

import {getPrinters} from '@/services/printerService';
import {getTonersUncategorized} from '@/services/tonerService';
import Card from '@/components/Card';
import DefaultLayout from '@/layouts/DefaultLayout';
import PrinterCreate from '@/components/Printers/PrinterCreate';
import PrintersList from '@/components/Printers/PrintersList';
import TonerCreate from '@/components/Printers/TonerCreate';
import TonerEdit from '@/components/Printers/TonerEdit';

const PrintersPage = () => {
  const [session] = useSession();

  const {data: printersList} = useQuery('printers', getPrinters);
  const {data: uncategorizedToners} = useQuery('toners-uncategorized', getTonersUncategorized);

  return (
    <DefaultLayout>
      <Head>
        <title>Printers</title>
      </Head>
      <div className="space-y-4">
        {session.user.role === 'admin' && (
          <Card className="flex gap-2">
            <PrinterCreate />
            <TonerCreate />
            <TonerEdit />
          </Card>
        )}
        <PrintersList
          printersList={printersList}
          session={session}
          uncategorizedToners={uncategorizedToners}
        />
      </div>
    </DefaultLayout>
  );
};

export default PrintersPage;
