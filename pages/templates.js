import Head from 'next/head';

import DefaultLayout from '@/layouts/DefaultLayout';
import Tabs from '@/components/Tabs';
import TemplateCms from '@/components/Templates/TemplateCms';
import TemplateReset from '@/components/Templates/TemplateReset';

const TemplatesPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Templates</title>
      </Head>
      <Tabs>
        <div label="cms">
          <TemplateCms />
        </div>
        <div label="reset">
          <TemplateReset />
        </div>
      </Tabs>
    </DefaultLayout>
  );
};

export default TemplatesPage;
