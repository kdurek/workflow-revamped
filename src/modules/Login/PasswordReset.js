import {Controller, useForm} from 'react-hook-form';
import Head from 'next/head';

import {usePasswordReset} from '@/modules/Login/hooks/usePasswordReset';
import AuthLayout from '@/layouts/auth';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';

const PasswordReset = () => {
  const {control, errors, handleSubmit, getValues} = useForm();

  const {onSubmit} = usePasswordReset();

  return (
    <AuthLayout>
      <Head>
        <title>Password Reset</title>
      </Head>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <legend className="text-4xl text-center text-coolGray-600">Select your new Password</legend>
        <Controller
          name="password"
          control={control}
          defaultValue={''}
          rules={{
            required: {value: true, message: 'Password is required'},
          }}
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
        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue={''}
          rules={{
            required: {value: true, message: 'Password confirm is required'},
            validate: {
              passwordEqual: value => value === getValues().password,
            },
          }}
          render={({onChange, value}) => (
            <Input
              error={errors?.passwordConfirm?.message}
              label={'Password confirm'}
              onChange={onChange}
              type="password"
              value={value}
            />
          )}
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
