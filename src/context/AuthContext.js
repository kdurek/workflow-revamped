import {useState, useEffect, useContext, createContext} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import firebaseClient from 'firebaseClient';
import {ConfigProvider} from '@/context/ConfigContext';
import LoginPage from '@/templates/LoginPage';
import AuthLayout from '@/layouts/AuthLayout';

const AuthContext = createContext({user: {}});

export const AuthProvider = ({children}) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const signIn = (email, password) => {
    return firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        prepareUser(response.user);
      })
      .catch(error => {
        return {error};
      });
  };

  const signOut = () => {
    return firebaseClient
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        router.reload();
      })
      .catch(error => {
        return {error};
      });
  };

  const prepareUser = user => {
    firebaseClient
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(userData => {
        if (userData.data()) {
          setUser(userData.data());
          setAuthenticated(true);
        }
      })
      .catch(error => {
        return {error};
      });
  };

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
      if (user) {
        prepareUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = firebaseClient
        .firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(doc => setUser(doc.data()));
      return () => unsubscribe();
    }
  }, []);

  const value = {
    user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      <ConfigProvider>
        {authenticated
          ? children
          : user === false && (
              <AuthLayout>
                <Head>
                  <title>Login</title>
                </Head>
                <LoginPage />
              </AuthLayout>
            )}
      </ConfigProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
