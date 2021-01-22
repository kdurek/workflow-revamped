import Head from 'next/head';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Dashboard from '../components/templates/Dashboard';

const Index = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard />
    </DefaultLayout>
  );
};

export default Index;
