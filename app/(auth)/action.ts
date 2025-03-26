'use server';

import { signIn } from './auth';
import { AuthError } from 'next-auth';
import { createUser, getUserByEmail } from '@/db/queries';
import { z } from 'zod';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 入力値をバリデーション
    const validationResult = z.object({
      email: z.string().email('有効なメールアドレスを入力してください'),
      password: z.string().min(6, 'パスワードは6文字以上必要です'),
    }).safeParse({ email, password });

    if (!validationResult.success) {
      return validationResult.error.errors[0].message;
    }

    // メールアドレスが既に使用されているか確認
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return 'このメールアドレスは既に使用されています';
    }

    // ユーザーを作成
    await createUser(email, password);

    // 作成後に自動でログイン
    await signIn('credentials', formData);

    return undefined;
  } catch (error) {
    console.error('Registration error:', error);
    return 'ユーザー登録中にエラーが発生しました';
  }
}
