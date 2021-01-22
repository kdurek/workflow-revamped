import Head from 'next/head';
import AuthLayout from '../components/layouts/AuthLayout';
import Login from '../components/templates/Login';

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
