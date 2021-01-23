import {useState} from 'react';
import {firebaseClient} from '../../../firebaseClient';
import Button from '../elements/Button';
import Input from '../elements/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="container">
      <form>
        <Input
          icon={'mail'}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={'Email'}
        />
        <Input
          type={'password'}
          icon={'lock'}
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder={'Password'}
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

export default Login;
