import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      version: "2.0"
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks: {
    async jwt(token, user, account = {}, profile, isNewUser) {
      if ( account.provider && !token[account.provider] ) {
        token[account.provider] = {};
      }

      if ( account.accessToken ) {
        token[account.provider].accessToken = account.accessToken;
      }

      if ( account.refreshToken ) {
        token[account.provider].refreshToken = account.refreshToken;
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});