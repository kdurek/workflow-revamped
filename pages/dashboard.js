import {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useSession} from 'next-auth/client';

import DefaultLayout from '@/layouts/DefaultLayout';
import Dashboard from 'src/components/Dashboard';
import tonerService from 'src/services/tonerService';

const DashboardPage = () => {
  const [session, loading] = useSession();
  const [tonersList, setTonersList] = useState([]);

  useEffect(async () => {
    if (session) {
      try {
        const {data} = await tonerService.getAll('?amount[lte]=1');
        setTonersList(data.toners);
      } catch (err) {
        const errorMessage = err.response.data.message;
        console.log(errorMessage);
      }
    }
  }, [session]);

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
