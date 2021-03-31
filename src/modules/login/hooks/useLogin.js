import {signIn} from 'next-auth/client';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

const useLogin = ({setError, setValue}) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setError('credentials', {
        message: router.query.error,
        type: 'credentials',
      });
      setValue('email', router.query.email);
    }
  }, [router]);

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
