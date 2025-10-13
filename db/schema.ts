import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    created: timestamp().defaultNow().notNull(),
    updated: timestamp(),
}

export const dbUsers = pgTable("test_users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 50 }).notNull().unique(),
    firstname: varchar({ length: 50 }).notNull(),
    lastname: varchar({ length: 50 }).notNull(),
    ...timestamps
});