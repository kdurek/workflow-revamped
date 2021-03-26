import {Controller, useForm} from 'react-hook-form';
import {signIn} from 'next-auth/client';
import {useRouter} from 'next/router';
import Head from 'next/head';

import AuthLayout from '@/layouts/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import LoginReset from '@/components/Login/LoginReset';

const Login = () => {
  const {control, errors, handleSubmit} = useForm();
  const router = useRouter();

  if (router.query.resetToken) {
    return <LoginReset />;
  }

  const onSubmit = data => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: window.location.pathname,
    });
  };

  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
      </Head>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue={''}
          rules={{required: {value: true, message: 'Email is required'}}}
          render={({onChange, value}) => (
            <Input
              error={errors?.email?.message}
              label={'Email'}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue={''}
          rules={{required: {value: true, message: 'Password is required'}}}
          render={({onChange, value}) => (
            <Input
              error={errors?.password?.message}
              label={'Password'}
              onChange={onChange}
              type="password"
              value={value}
            />
          )}
        />
        <Button variant="primary" fullWidth onClick={handleSubmit(onSubmit)}>
          Login
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
