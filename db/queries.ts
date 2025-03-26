import db from "./index";
import {
  eq,
 } from "drizzle-orm";
import {
  users,
  type User
} from "./schema";
import bcrypt from "bcrypt";

/**
 * メールアドレスからユーザーを取得する
 * @param email メールアドレス
 * @returns ユーザー
 */
export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

/**
 * ユーザーを作成する
 * @param email メールアドレス
 * @param password パスワード
 * @returns 作成したユーザー
 */
export const createUser = async (email: string, password: string): Promise<User | undefined> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db.insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning();

  return newUser;
};
