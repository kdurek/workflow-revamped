import {useState} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '@/context/AuthContext';
import Button from '@/elements/Button';
import Input from '@/elements/Input';

const LoginPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onSubmit = () => {
    return auth.signIn(email, pass).then(() => {
      router.push(window.location.pathname);
    });
  };

  return (
    <div className="container">
      <form>
        <Input value={email} onChange={e => setEmail(e.target.value)} label={'Email'} />
        <Input
          type={'password'}
          value={pass}
          onChange={e => setPass(e.target.value)}
          label={'Password'}
          className="mt-4"
        />
        <Button
          primary
          fullWidth
          onClick={e => {
            e.preventDefault();
            onSubmit();
          }}
          type="submit"
          className="mt-4 font-semibold"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
