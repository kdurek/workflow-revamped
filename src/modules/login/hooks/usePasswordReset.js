import {signIn} from 'next-auth/client';
import {useRouter} from 'next/router';
import axios from 'axios';

const usePasswordReset = () => {
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

  return {onSubmit};
};

export default usePasswordReset;
