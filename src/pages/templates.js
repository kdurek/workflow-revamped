import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import Tabs from '@/common/components/Tabs';
import TemplateCms from '@/modules/Templates/TemplateCms';
import TemplateReset from '@/modules/Templates/TemplateReset';

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
