import {signOut} from 'next-auth/client';
import {useForm} from 'react-hook-form';
import axios from 'axios';

import Button from '@/common/components/Button';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';

const PasswordChange = () => {
  const {
    formState: {errors},
    getValues,
    handleSubmit,
    register,
  } = useForm();

  const onPasswordChange = async data => {
    await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/changepassword`, data);
    signOut();
  };

  return (
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
  );
};

export default PasswordChange;
