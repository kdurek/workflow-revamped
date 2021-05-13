import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';
import {QueryClient} from 'react-query';
import axios from 'axios';
import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import Tabs from '@/common/components/Tabs';
import TemplateCms from '@/modules/templates/TemplateCms';
import TemplateReset from '@/modules/templates/TemplateReset';

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

export const getServerSideProps = async context => {
  const session = await getSession(context);

  const getCms = async () => {
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/templates?category=cms`,
      {
        headers: {
          Authorization: `bearer ${session.accessToken}`,
        },
      }
    );
    return data.templates;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('templates-cms', getCms);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default TemplatesPage;
