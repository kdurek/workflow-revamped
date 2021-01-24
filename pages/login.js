import Head from 'next/head';
import AuthLayout from '../src/components/layouts/AuthLayout';
import LoginPage from '../src/components/templates/LoginPage';

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
