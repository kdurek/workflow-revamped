import {useState} from 'react';
import firebaseClient from 'firebaseClient';
import Button from '@/elements/Button';
import Input from '@/elements/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

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
          onClick={async e => {
            e.preventDefault();
            await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
            window.location.href = '/';
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
