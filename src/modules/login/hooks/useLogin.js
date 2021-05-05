import {signIn} from 'next-auth/client';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

const useLogin = () => {
  const {setError, setValue} = useForm();

  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setError('credentials', {
        message: router.query.error,
        type: 'credentials',
      });
      setValue('email', router.query.email);
    }
  }, [router, setError, setValue]);

  const loginUser = data => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: window.location.href,
    });
  };

  return {loginUser};
};

export default useLogin;
