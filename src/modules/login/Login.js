import {useForm} from 'react-hook-form';
import Head from 'next/head';
import {useRouter} from 'next/router';

import AuthLayout from '@/layouts/auth';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import PasswordReset from '@/modules/login/PasswordReset';
import useLogin from '@/modules/login/hooks/useLogin';

const Login = () => {
  const {
    formState: {errors},
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm();
  const {onSubmit} = useLogin({setError, setValue});
  const router = useRouter();

  if (router.query.resetToken) {
    return <PasswordReset />;
  }

  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
      </Head>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors?.email?.message}
          label={'Email'}
          register={register('email', {
            required: {value: true, message: 'Email is required'},
            pattern: {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
              message: 'Email in bad format',
            },
          })}
        />
        <Input
          error={errors?.password?.message}
          label={'Password'}
          type="password"
          register={register('password', {
            required: {value: true, message: 'Password is required'},
          })}
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
