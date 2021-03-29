import {signIn} from 'next-auth/client';

const useLogin = () => {
  const onSubmit = data => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: window.location.href,
    });
  };
  return {onSubmit};
};

export default useLogin;
