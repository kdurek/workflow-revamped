import {useForm} from 'react-hook-form';
import Head from 'next/head';

import {usePasswordReset} from '@/modules/login/hooks/usePasswordReset';
import AuthLayout from '@/layouts/auth';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';

const PasswordReset = () => {
  const {
    formState: {errors},
    handleSubmit,
    getValues,
    register,
  } = useForm();
  const {onSubmit} = usePasswordReset();

  return (
    <AuthLayout>
      <Head>
        <title>Password Reset</title>
      </Head>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <legend className="text-4xl text-center text-gray-500">Select your new Password</legend>
        <Input
          error={errors?.password?.message}
          label={'Password'}
          type="password"
          register={register('password', {
            required: {value: true, message: 'Password is required'},
          })}
        />
        <Input
          error={errors?.passwordConfirm?.message}
          label={'Password Confirm'}
          type="password"
          register={register('passwordConfirm', {
            required: {value: true, message: 'Password Confirm is required'},
            validate: {
              passwordEqual: value => value === getValues().password,
            },
          })}
        />
        {errors.passwordConfirm && (
          <span className="block text-center text-red-500">Passwords must match</span>
        )}
        <Button variant="primary" fullWidth onClick={handleSubmit(onSubmit)}>
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
};

export default PasswordReset;
