import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    // databaseURL: 'process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL',
  });
}

export default firebaseAdmin;
