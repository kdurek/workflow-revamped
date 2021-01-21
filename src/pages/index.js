import Head from 'next/head';
import DefaultLayout from '../components/layouts/DefaultLayout';
import HomePage from '../components/templates/HomePage';

const Index = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>NextJS Boilerplate</title>
      </Head>
      <HomePage />
    </DefaultLayout>
  );
};

export default Index;
