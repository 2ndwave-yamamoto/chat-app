import {
  pgTable,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull().unique(),
  password: varchar('password', { length: 64 }).notNull(),
});

export type User = typeof users.$inferSelect;