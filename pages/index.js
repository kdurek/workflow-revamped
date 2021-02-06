import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import DashboardPage from '@/templates/DashboardPage';

const Index = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardPage />
    </DefaultLayout>
  );
};

export default Index;
