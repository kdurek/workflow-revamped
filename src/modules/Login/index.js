import {Controller, useForm} from 'react-hook-form';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';

import AuthLayout from '@/layouts/auth';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import PasswordReset from '@/modules/Login/PasswordReset';
import useLogin from '@/modules/Login/hooks/useLogin';

const Login = () => {
  const {control, errors, handleSubmit, setError, setValue} = useForm();
  const router = useRouter();

  const {onSubmit} = useLogin();

  if (router.query.resetToken) {
    return <PasswordReset />;
  }

  useEffect(() => {
    if (router.query.error) {
      setError('credentials', {
        message: router.query.error,
        type: 'credentials',
      });
      setValue('email', router.query.email);
    }
  }, [router]);

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
          rules={{
            required: {value: true, message: 'Email is required'},
            pattern: {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
              message: 'Email in bad format',
            },
          }}
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
        {errors.credentials && (
          <span className="block font-medium text-center text-red-500">
            {errors.credentials.message}
          </span>
        )}
      </form>
    </AuthLayout>
  );
};

export default Login;
