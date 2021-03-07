import Head from 'next/head';
import Link from 'next/link';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useSession} from 'next-auth/client';

import DefaultLayout from '@/layouts/DefaultLayout';
import Printers from '@/components/Printers';
import {getPrinters} from 'src/services/printerService';
import {getUncatToners, updateToner} from 'src/services/tonerService';

const PrintersPage = () => {
  const [session, loading] = useSession();

  const queryClient = useQueryClient();

  const {data: printersList} = useQuery('printers', getPrinters, {
    enabled: !!session,
  });
  const {data: uncategorizedToners} = useQuery('uncategorized-toners', getUncatToners, {
    enabled: !!session,
  });

  const updateMutation = useMutation(arg => updateToner(arg), {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
    },
  });

  const useToner = async toner => {
    const updatedToner = {
      amount: toner.amount - 1,
    };
    updateMutation.mutate({id: toner._id, updatedToner});
  };

  if (loading) {
    return null;
  }

  if (!session) {
    return (
      <div>
        You must first sign in to access this page.
        <Link href={'/login'}>Login</Link>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Printers</title>
      </Head>
      <Printers
        printersList={printersList}
        session={session}
        uncategorizedToners={uncategorizedToners}
        useToner={useToner}
      />
    </DefaultLayout>
  );
};

export default PrintersPage;
