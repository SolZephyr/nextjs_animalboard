import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    created: timestamp().defaultNow().notNull(),
    updated: timestamp(),
}

export const dbUsers = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkId: varchar({ length: 50 }).notNull().unique(),
    email: varchar({ length: 50 }).notNull().unique(),
    firstname: varchar({ length: 50 }).notNull(),
    lastname: varchar({ length: 50 }).notNull(),
    ...timestamps
});

export const userRelations = relations(dbUsers, ({ many }) => ({
    favourites: many(dbUserProfileFavourites),
    likes: many(dbUserPostLikes),
}));

export const dbMedia = pgTable("media", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    type: varchar({ length: 50 }).notNull(),
    source: varchar({ length: 255 }).notNull(),
    ...timestamps
});

export const mediaRelations = relations(dbMedia, ({ one, many }) => ({
    avatar: one(dbProfiles, {
        fields: [dbMedia.id],
        references: [dbProfiles.avatarId],
    }),
    posts: many(dbMediaToPost),
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

export const profileRelations = relations(dbProfiles, ({ one, many }) => ({
    avatar: one(dbMedia, {
        fields: [dbProfiles.avatarId],
        references: [dbMedia.id],
    }),
    posts: many(dbPosts),
}));

export const dbPosts = pgTable("posts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    type: varchar({ length: 50 }).notNull(),
    title: varchar({ length: 100 }).notNull(),
    content: text().notNull(),
    profileId: integer("profile_id"),
    ...timestamps
});

export const postRelations = relations(dbPosts, ({ one, many }) => ({
    profile: one(dbProfiles, {
        fields: [dbPosts.profileId],
        references: [dbProfiles.id],
    }),
    media: many(dbMediaToPost),
}));

export const dbMediaToPost = pgTable("media_to_post", {
    postId: integer('post_id').notNull().references(() => dbPosts.id),
    mediaId: integer('media_id').notNull().references(() => dbMedia.id),
},
    (t) => [primaryKey({ columns: [t.postId, t.mediaId] })],
);

export const mediaToPostRelations = relations(dbMediaToPost, ({ one }) => ({
    post: one(dbPosts, {
        fields: [dbMediaToPost.postId],
        references: [dbPosts.id],
    }),
    media: one(dbMedia, {
        fields: [dbMediaToPost.mediaId],
        references: [dbMedia.id],
    }),
}));

export const dbUserProfileFavourites = pgTable("user_profile_favourites", {
    userId: integer('user_id').notNull().references(() => dbUsers.id),
    profileId: integer('profile_id').notNull().references(() => dbProfiles.id),
},
    (t) => [primaryKey({ columns: [t.userId, t.profileId] })],
);

export const userProfileFavouriteRelations = relations(dbUserProfileFavourites, ({ one }) => ({
    user: one(dbUsers, {
        fields: [dbUserProfileFavourites.userId],
        references: [dbUsers.id],
    }),
    profile: one(dbProfiles, {
        fields: [dbUserProfileFavourites.profileId],
        references: [dbProfiles.id],
    }),
}));

export const dbUserPostLikes = pgTable("user_post_likes", {
    userId: integer('user_id').notNull().references(() => dbUsers.id),
    postId: integer('post_id').notNull().references(() => dbPosts.id),
},
    (t) => [primaryKey({ columns: [t.userId, t.postId] })],
);

export const userPostLikeRelations = relations(dbUserPostLikes, ({ one }) => ({
    user: one(dbUsers, {
        fields: [dbUserPostLikes.userId],
        references: [dbUsers.id],
    }),
    post: one(dbPosts, {
        fields: [dbUserPostLikes.postId],
        references: [dbPosts.id],
    }),
}));