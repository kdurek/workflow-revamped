import {useState, useEffect, useContext, createContext} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import firebaseClient from 'firebaseClient';
import LoginPage from '@/templates/LoginPage';
import AuthLayout from '@/layouts/AuthLayout';

const AuthContext = createContext({user: {}});

export const AuthProvider = ({children}) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = (email, password) => {
    return firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        getUserAdditionalData(user);
        return response.user;
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
      });
  };

  const getUserAdditionalData = user => {
    return firebaseClient
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(userData => {
        if (userData.data()) {
          setUser(userData.data());
        }
      });
  };

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        getUserAdditionalData(user);
        setLoading(false);
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
      {!loading
        ? children
        : user === false && (
            <AuthLayout>
              <Head>
                <title>Login</title>
              </Head>
              <LoginPage />
            </AuthLayout>
          )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
