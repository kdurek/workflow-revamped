import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/templates/LoginPage';

const login = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </AuthLayout>
  );
};

export default login;
