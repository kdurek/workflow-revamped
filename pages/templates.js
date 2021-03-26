import {useSession} from 'next-auth/client';
import Head from 'next/head';

import DefaultLayout from '@/layouts/DefaultLayout';
import Tabs from '@/components/Tabs';
import TemplateCms from '@/components/Templates/TemplateCms';
import TemplateReset from '@/components/Templates/TemplateReset';

const TemplatesPage = () => {
  const [session] = useSession();

  return (
    <DefaultLayout>
      <Head>
        <title>Templates</title>
      </Head>
      <Tabs>
        <div label="cms">
          <TemplateCms user={session.user} />
        </div>
        <div label="reset">
          <TemplateReset user={session.user} />
        </div>
      </Tabs>
    </DefaultLayout>
  );
};

export default TemplatesPage;
