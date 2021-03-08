import Head from 'next/head';
import Link from 'next/link';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useSession} from 'next-auth/client';

import DefaultLayout from '@/layouts/DefaultLayout';
import Printers from '@/components/Printers';
import {getPrinters} from '@/services/printerService';
import {getUncatToners, updateToner} from '@/services/tonerService';

const PrintersPage = () => {
  const [session, loading] = useSession();

  const queryClient = useQueryClient();

  const {data: printersList} = useQuery('printers', getPrinters, {
    enabled: !!session,
  });
  const {data: uncategorizedToners} = useQuery('uncategorized-toners', getUncatToners, {
    enabled: !!session,
  });

  const updateTonerMutation = useMutation(updateToner, {
    onMutate: async newToner => {
      await queryClient.cancelQueries(['toners', newToner.id]);
      const previousToner = queryClient.getQueryData(['toners', newToner.id]);
      queryClient.setQueryData(['toners', newToner.id], newToner);
      return {previousToner, newToner};
    },
    onError: (err, newToner, context) => {
      queryClient.setQueryData(['toners', context.newToner._id], context.previousToner);
    },
    onSettled: () => {
      queryClient.invalidateQueries('printers');
    },
  });

  const useToner = async toner => {
    const updatedToner = {
      amount: toner.amount - 1,
    };
    updateTonerMutation.mutate({id: toner._id, updatedToner});
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
