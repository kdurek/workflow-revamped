import Head from 'next/head';
import Link from 'next/link';
import {useSession} from 'next-auth/client';

import DefaultLayout from '@/layouts/DefaultLayout';
import Templates from '@/components/Templates';
import {getTemplates} from 'src/services/templateService';
import {useQuery} from 'react-query';

const TemplatesPage = () => {
  const [session, loading] = useSession();

  const {data: cmsList} = useQuery('cms-templates', getTemplates, {
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
        <title>Templates</title>
      </Head>
      <Templates cmsList={cmsList} user={session.user} />
    </DefaultLayout>
  );
};

export default TemplatesPage;
