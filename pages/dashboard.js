import Head from 'next/head';
import Link from 'next/link';
import {useSession} from 'next-auth/client';

import DefaultLayout from '@/layouts/DefaultLayout';
import Dashboard from 'src/components/Dashboard';
import {getOutOfStockToners} from 'src/services/tonerService';
import {useQuery} from 'react-query';

const DashboardPage = () => {
  const [session, loading] = useSession();

  const {data: tonersList} = useQuery('outofstock-toners', getOutOfStockToners, {
    enabled: !!session,
  });

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
        <title>Dashboard</title>
      </Head>
      <Dashboard tonersList={tonersList} />
    </DefaultLayout>
  );
};

export default DashboardPage;
