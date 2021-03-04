import {useSession} from 'next-auth/client';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {signIn} from 'next-auth/client';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

import AuthLayout from '@/layouts/AuthLayout';
import Head from 'next/head';

const Login = () => {
  const router = useRouter();

  const [session, loading] = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    signIn('credentials', {
      email,
      password,
      callbackUrl: window.location.pathname,
    });
  };
  if (loading) {
    return null;
  }

  if (session) {
    router.push('/');
  }

  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
      </Head>
      <div className="container">
        <form>
          <Input value={email} onChange={e => setEmail(e.target.value)} label={'Email'} />
          <Input
            type={'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            label={'Password'}
            className="mt-4"
          />
          <Button
            primary
            fullWidth
            onClick={e => {
              e.preventDefault();
              onSubmit();
            }}
            type="submit"
            className="mt-4 font-semibold"
          >
            Login
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
