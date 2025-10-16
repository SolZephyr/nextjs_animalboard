import { relations } from "drizzle-orm";
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

export const dbMedia = pgTable("media", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    type: varchar({ length: 50 }).notNull(),
    source: varchar({ length: 255 }).notNull(),
    ...timestamps
});

export const mediaRelations = relations(dbMedia, ({ one }) => ({
    avatar: one(dbProfiles, {
        fields: [dbMedia.id],
        references: [dbProfiles.avatarId],
    }),
}));

export const dbProfiles = pgTable("profiles", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 50 }).notNull(),
    nicknames: varchar({ length: 100 }).notNull(),
    user: varchar({ length: 50 }).notNull(),    // TODO: User
    avatarId: integer("avatar_id"),
    animal: varchar({ length: 50 }).notNull(),
    breed: varchar({ length: 50 }).notNull(),
    country: varchar({ length: 50 }).notNull(),
    home: varchar({ length: 50 }).notNull(),
    about: text().notNull(),
    dateOfBirth: timestamp(),
    ...timestamps
});

export const profileRelations = relations(dbProfiles, ({ one }) => ({
    avatar: one(dbMedia, {
        fields: [dbProfiles.avatarId],
        references: [dbMedia.id],
    }),
}));