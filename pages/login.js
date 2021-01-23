import Head from 'next/head';
import AuthLayout from '../src/components/layouts/AuthLayout';
import Login from '../src/components/templates/Login';

const login = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </AuthLayout>
  );
};

export default login;
