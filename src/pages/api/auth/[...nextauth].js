import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      authorize: async credentials => {
        try {
          const {data} = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
            {
              password: credentials.password,
              email: credentials.email,
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
              },
            }
          );

          if (data) {
            return data;
          }
          return null;
        } catch (err) {
          const errorMessage = err.response.data.message;
          throw new Error(`${errorMessage}&email=${credentials.email}`);
        }
      },
    }),
  ],

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },

  pages: {error: '/'},

  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },
});
