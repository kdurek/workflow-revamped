import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

// const auth = firebase.auth();
// const db = firebase.firestore();
const now = firebase.firestore.Timestamp.now();
// const storage = firebase.storage();

export {
  // auth,
  // db,
  now,
  // storage,
};

import firebaseClient from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage';
import 'firebase/auth';

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  firebaseClient.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
  firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  window.firebase = firebaseClient;
}

// const auth = firebaseClient.auth();
// const db = firebase.firestore();
// const now = firebaseClient.firestore.Timestamp.now();
// const storage = firebase.storage();

export {
  firebaseClient,
  // auth,
  // db,
  // now,
  // storage,
};
