import {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useSession} from 'next-auth/client';

import DefaultLayout from '@/layouts/DefaultLayout';
import Templates from '@/components/Templates';
import templateService from 'src/services/templateService';

const TemplatesPage = () => {
  const [session, loading] = useSession();

  const [cmsList, setCmsList] = useState([]);

  useEffect(async () => {
    if (session) {
      try {
        const {data} = await templateService.getAll();
        setCmsList(data.templates);
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
        <title>Templates</title>
      </Head>
      <Templates cmsList={cmsList} user={session.user} />
    </DefaultLayout>
  );
};

export default TemplatesPage;
