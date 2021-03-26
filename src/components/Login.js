import {signIn} from 'next-auth/client';
import {Controller, useForm} from 'react-hook-form';
import Head from 'next/head';

import AuthLayout from '@/layouts/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';

const Login = () => {
  const {control, errors, handleSubmit} = useForm();

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
          rules={{required: true}}
          render={({onChange, value}) => (
            <Input label={'Email'} onChange={onChange} value={value} />
          )}
        />
        {errors.email && <span className="block text-red-600">You must provide email</span>}
        <Controller
          name="password"
          control={control}
          defaultValue={''}
          rules={{required: true}}
          render={({onChange, value}) => (
            <Input label={'Password'} onChange={onChange} type="password" value={value} />
          )}
        />
        {errors.password && <span className="block text-red-600">You must provide password</span>}
        <Button variant="primary" fullWidth onClick={handleSubmit(onSubmit)} type="submit">
          Login
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
