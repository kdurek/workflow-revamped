import {Controller, useForm} from 'react-hook-form';
import {signIn} from 'next-auth/client';
import {useRouter} from 'next/router';
import axios from 'axios';
import Head from 'next/head';

import AuthLayout from '@/layouts/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';

const LoginReset = () => {
  const {control, errors, handleSubmit, getValues} = useForm();
  const router = useRouter();

  const onSubmit = async data => {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/resetpassword/${router.query.resetToken}`,
      data
    );

    if (response) {
      signIn('credentials', {
        email: response.data.email,
        password: data.password,
        callbackUrl: window.location.hostname,
      });
    }
  };

  return (
    <AuthLayout>
      <Head>
        <title>Change Password</title>
      </Head>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <legend className="text-4xl text-center text-coolGray-600">Change Password</legend>
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

export default LoginReset;
