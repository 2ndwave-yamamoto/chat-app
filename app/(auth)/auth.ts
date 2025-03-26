import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/db/queries';
import bcrypt from 'bcrypt';
import { z } from 'zod';

/**
 * Credentials Authentication
 */
export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // credentialsはサインページでフォーム生成するのに使用される
      credentials: {
        email: { label: 'メールアドレス', type: 'email' },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize(credentials) {
        // 入力値をバリデーションする
        const parsedCredentials = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          // ユーザが存在しない場合はnullを返す
          if (!user) return null;

          // パスワードを確認する
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // パスワードが一致した場合はユーザーを返す
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      }
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
