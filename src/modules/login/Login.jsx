import Head from 'next/head';
import {useRouter} from 'next/router';

import AuthLayout from '@/layouts/auth';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import PasswordReset from '@/modules/login/PasswordReset';
import useLogin from '@/modules/login/hooks/useLogin';
import {useForm} from 'react-hook-form';

const Login = () => {
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();
  const {loginUser} = useLogin();
  const router = useRouter();

  if (router.query.resetToken) {
    return <PasswordReset />;
  }

  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
      </Head>
      <form className="space-y-4" onSubmit={handleSubmit(loginUser)}>
        <Input
          error={errors?.email?.message}
          label="Email"
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
          label="Password"
          type="password"
          register={register('password', {
            required: {value: true, message: 'Password is required'},
          })}
        />
        <Button variant="primary" fullWidth onClick={handleSubmit(loginUser)}>
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
