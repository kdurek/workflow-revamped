import Link from 'next/link';
import {useState} from 'react';
import {firebaseClient} from '../../../firebaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="sm:w-96">
      <h1 className="mt-6 text-lg font-semibold text-gray-800">Login</h1>
      <form>
        <input value={email} onChange={e => setEmail(e.target.value)} className="mt-8" />
        <input
          type={'password'}
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="mt-4"
        />
        <button
          onClick={async e => {
            e.preventDefault();
            await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
            window.location.href = '/';
          }}
          type="submit"
          className="mt-6 font-semibold"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-trueGray-500">
        Don’t have an account yet?{' '}
        <Link href="/signup">
          <span className="text-lightBlue-500">SignUp</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
