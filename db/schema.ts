import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    created: timestamp().defaultNow().notNull(),
    updated: timestamp(),
}

//export const animalEnum = pgEnum("animal", ["Unknown", "Cat", "Dog"]);
//export const countryEnum = pgEnum("country", ["Unknown"]);

export const dbUsers = pgTable("test_users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 50 }).notNull().unique(),
    firstname: varchar({ length: 50 }).notNull(),
    lastname: varchar({ length: 50 }).notNull(),
    ...timestamps
});

export const dbProfiles = pgTable("profiles", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 50 }).notNull(),
    nicknames: varchar({ length: 100 }).notNull(),
    user: varchar({ length: 50 }).notNull(),    // TODO: User
    avatar: varchar({ length: 100 }).notNull(), // TODO: Media
    animal: varchar({ length: 50 }).notNull(),
    breed: varchar({ length: 50 }).notNull(),
    country: varchar({ length: 50 }).notNull(),
    home: varchar({ length: 50 }).notNull(),
    about: text().notNull(),
    dateOfBirth: timestamp(),
    ...timestamps
});