import { createUser, getUser } from '@/utils/mongodb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getSession } from 'next-auth/react';
import { compare, hash } from 'bcryptjs';
import { IncomingMessage } from 'http';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			credentials: {
				email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' }
			},
			authorize: async (credentials, req) => {
				// TODO... maybe look into getting CSRF working
				// const csrfTokenValue = await csrfToken(req);
				const session = await getSession({ req: req as IncomingMessage });
				if (session) { throw new Error('You are already authenticated'); }
				if (!credentials) { return null; }

				const user = await getUser(credentials?.email);

        if (!user) {
					// TODO... maybe get email verification working... but Vercel doesnt supply free SMTP server, so would have to use a third-party (maybe SendGrid)... also its so easy to bypass anyway
					// const verificationToken = randomBytes(32).toString('hex');
					// await sendVerificationEmail(credentials.email, verificationToken);

					const hashedPassword = await hash(credentials.password + process.env.BCRYPT_SALT, 10);
          const newUserId = await createUser(credentials.email, hashedPassword);
					return { id: newUserId, email: credentials.email }
        }

				// if (!user.isEmailVerified) {
				// 	throw new Error('Email not verified');
				// }

				const isPasswordValid = await compare(credentials.password + process.env.BCRYPT_SALT, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        throw user;
			}
		})
  ],
	callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  secret: process.env.SECRET_JWT,
  session: {
    strategy: 'jwt'
  },

  jwt: {
    secret: process.env.SECRET_JWT,
  },

  pages: {
    // signIn: '/login',  // Displays signin buttons
    // signOut: '/logout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  events: {},
  debug: false,
})