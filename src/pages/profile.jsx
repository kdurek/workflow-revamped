import {signOut, useSession} from 'next-auth/client';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Head from 'next/head';

import Button from '@/common/components/Button';
import Card from '@/common/components/Card';
import DefaultLayout from '@/layouts/core';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import useUser from '@/modules/reactQuery/queries/useUser';

const ProfilePage = () => {
  const [session] = useSession();
  const {
    formState: {errors},
    getValues,
    handleSubmit,
    register,
  } = useForm();
  const {data: user, isLoading: isLoadingUser} = useUser(session.user._id);

  if (isLoadingUser) {
    return null;
  }

  const onPasswordChange = async data => {
    await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/changepassword`, data);
    signOut();
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Profile</title>
      </Head>

      <Card label="User Details" className="space-y-4">
        <Input readOnly defaultValue={user.email} label="Email" />
        <Input readOnly defaultValue={user.name} label="Name" />
        <Input readOnly defaultValue={user.role} label="Role" />
        <Input readOnly defaultValue={user.location} label="Location" />
      </Card>

      <Form label="Change password" className="mt-4" onSubmit={handleSubmit(onPasswordChange)}>
        <Input
          error={errors?.newPassword?.message}
          label="New Password"
          type="password"
          register={register('newPassword', {
            required: {value: true, message: 'New Password is required'},
          })}
        />
        <Input
          error={errors?.newPasswordConfirm?.message}
          label="New Password Confirm"
          type="password"
          register={register('newPasswordConfirm', {
            required: {value: true, message: 'New Password Confirm is required'},
            validate: {
              passwordEqual: value => value === getValues().newPassword,
            },
          })}
        />
        {errors.newPasswordConfirm && (
          <span className="block text-center text-red-500">Passwords must match</span>
        )}
        <Button type="submit" variant="primary" fullWidth onClick={handleSubmit(onPasswordChange)}>
          Reset Password And Login Again
        </Button>
      </Form>
    </DefaultLayout>
  );
};

export default ProfilePage;
