import {useSession} from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';

import DefaultLayout from '@/layouts/DefaultLayout';
import Templates from '@/components/Templates';

const TemplatesPage = () => {
  const [session, loading] = useSession();

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
      <Templates user={session.user} />
    </DefaultLayout>
  );
};

export default TemplatesPage;
