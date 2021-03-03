import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const getUserFromTheAPIServer = async token => {
  const {data} = await axios.get(`${process.env.BACKEND_URL}/users/getuserfromtoken`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.user;
};

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      authorize: async credentials => {
        try {
          const user = await axios.post(`${process.env.BACKEND_URL}/users/login`, {
            password: credentials.password,
            email: credentials.email,
          });
          if (user) {
            return user.data;
          }
        } catch (err) {
          const errorMessage = err.response.data.message;
          throw new Error(errorMessage + '&email=' + credentials.email);
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

  pages: {error: '/login'},

  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },

    async jwt(token, user) {
      if (user) {
        token.accessToken = user.token;
      }

      return token;
    },

    async session(session, token) {
      const user = await getUserFromTheAPIServer(token.accessToken);
      if (!user) {
        return null;
      }

      session.accessToken = token.accessToken;
      session.user = user;

      return session;
    },
  },
});
